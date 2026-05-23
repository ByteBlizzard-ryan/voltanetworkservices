<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use App\Models\DetailCommande;
use App\Mail\NewOrderMail;
use App\Mail\OrderConfirmationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class CommandeController extends Controller
{

   // app/Http/Controllers/API/CommandeController.php

        public function index(Request $request)
    {
        try {
            $user = $request->user();

            $commandes = Commande::where('id_utilisateur_fk', $user->id_utilisateur)
                ->with(['produits', 'details']) // On charge les produits et les lignes de détails
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($commande) {
                    // On ajoute dynamiquement le total de la commande pour le front React
                    $commande->total_commande = $commande->details->sum('prix_global_scelle');
                    return $commande;
                });

            return response()->json($commandes);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        // 1. Validation
        $request->validate([
            'nom_destinataire' => 'required|string|max:100',
            'email_contact' => 'required_if:canal_commande,FORMULAIRE|email|nullable',
            'telephone_contact' => 'required|string|max:20',
            'canal_commande' => 'required|in:FORMULAIRE,WHATSAPP',
            'panier' => 'required|array|min:1',
        ]);

        try {
            return DB::transaction(function () use ($request) {
                
                // Déterminer l'ID utilisateur avant la création
                // On utilise $request->user() qui est la méthode la plus fiable avec Sanctum
                $userId = null;
                if ($request->user()) {
                    $userId = $request->user()->id_utilisateur;
                } elseif (auth('sanctum')->check()) {
                    $userId = auth('sanctum')->user()->id_utilisateur;
                }

                // 2. Création de la commande principale en une fois
                $commande = Commande::create([
                    'id_commande' => (string) Str::uuid(),
                    'id_utilisateur_fk' => $userId, // L'ID est injecté directement ici
                    'nom_destinataire' => $request->nom_destinataire,
                    'email_contact' => $request->email_contact,
                    'telephone_contact' => $request->telephone_contact,
                    'telephone_secondaire' => $request->telephone_secondaire,
                    'adresse_livraison' => $request->adresse_livraison,
                    'canal_commande' => $request->canal_commande,
                    'statut_commande' => 'EN COURS',
                ]);

                // 3. Enregistrement des détails
                foreach ($request->panier as $item) {
                    // Nettoyage du prix (au cas où le front envoie "15 000 FCFA")
                    $prixUnitaire = (int) preg_replace('/[^0-9]/', '', $item['prix_unitaire_produit']);
                    
                    DetailCommande::create([
                        'id_detail_ligne' => (string) Str::uuid(),
                        'id_commande_fk' => $commande->id_commande,
                        'id_produit_fk' => $item['id_produit'],
                        'quantite_commandee' => $item['quantity'],
                        'prix_global_scelle' => $prixUnitaire * $item['quantity'],
                    ]);
                }

                // 4. Gestion des e-mails (Uniquement si canal FORMULAIRE)
                if ($commande->canal_commande === 'FORMULAIRE') {
                    try {
                        // Email Admin
                        Mail::to("gabybryannapani@gmail.com")->send(new NewOrderMail($commande));

                        // Email Client
                        if (!empty($commande->email_contact)) {
                            // On peut utiliser queue() au lieu de send() si tu as configuré les files d'attente
                            Mail::to($commande->email_contact)->send(new OrderConfirmationMail($commande));
                        }
                    } catch (\Exception $mailEx) {
                        // Optionnel : Loguer l'erreur mail sans faire échouer la transaction
                        \Log::error("Erreur envoi mail commande : " . $mailEx->getMessage());
                    }
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Commande traitée avec succès',
                    'id_commande' => $commande->id_commande
                ], 201);
            });

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur technique lors de la commande',
                'debug' => $e->getMessage() // À retirer en production
            ], 500);
        }
    }
}