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
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CommandeController extends Controller
{
    /**
     * Obtenir la liste globale des commandes (Espace Admin)
     */
    public function index(Request $request)
    {
        try {
            $commandes = Commande::with(['produits', 'details'])
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($commande) {
                    // Calcul du prix total à la volée pour le tableau React
                    $commande->total_commande = $commande->details->sum('prix_global_scelle');
                    
                    // Formatage propre de la date de création au format ISO8601 pour le filtre React
                    $commande->created_at_formatted = $commande->created_at ? $commande->created_at->toIso8601String() : null;
                    
                    return $commande;
                });

            return response()->json($commandes, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur technique lors de la récupération des données.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Enregistrer une nouvelle commande
     */
    public function store(Request $request)
    {
        // 1. Validation des entrées (Nettoyage des tableaux vides d'arguments)
        $request->validate([
            'nom_destinataire' => 'required|string|max:100',
            'email_contact' => 'required_if:canal_commande,FORMULAIRE|email|nullable',
            'telephone_contact' => 'required|string|max:20',
            'canal_commande' => 'required|in:FORMULAIRE,WHATSAPP',
            'panier' => 'required|array|min:1',
        ]);

        try {
            // Exécution sécurisée de la transaction de la base de données
            $dataResponse = DB::transaction(function () use ($request) {
                
                // Déterminer l'ID utilisateur via le Token Sanctum
                $userId = null;
                if ($request->user()) {
                    $userId = $request->user()->id_utilisateur;
                } elseif (auth('sanctum')->check()) {
                    $userId = auth('sanctum')->user()->id_utilisateur;
                }

                // 2. Création de la commande parente
                $commande = Commande::create([
                    'id_commande' => (string) Str::uuid(),
                    'id_utilisateur_fk' => $userId,
                    'nom_destinataire' => $request->nom_destinataire,
                    'email_contact' => $request->email_contact,
                    'telephone_contact' => $request->telephone_contact,
                    'telephone_secondaire' => $request->telephone_secondaire,
                    'adresse_livraison' => $request->adresse_livraison,
                    'canal_commande' => $request->canal_commande,
                    'statut_commande' => 'EN COURS',
                ]);

                // 3. Enregistrement des lignes de détails du panier
                foreach ($request->panier as $item) {
                    // Nettoyage des chaînes de prix alphanumériques
                    $prixUnitaire = (int) preg_replace('/[^0-9]/', '', $item['prix_unitaire_produit']);
                    
                    DetailCommande::create([
                        'id_detail_ligne' => (string) Str::uuid(),
                        'id_commande_fk' => $commande->id_commande,
                        'id_produit_fk' => $item['id_produit'],
                        'quantite_commandee' => $item['quantity'],
                        'prix_global_scelle' => $prixUnitaire * $item['quantity'],
                    ]);
                }

                // 4. Routage de notifications par e-mail si canal "FORMULAIRE"
                if ($commande->canal_commande === 'FORMULAIRE') {
                    try {
                        // Expédition mail Administrateur
                        Mail::to("gabybryannapani@gmail.com")->send(new NewOrderMail($commande));

                        // Expédition mail Client récapitulatif
                        if (!empty($commande->email_contact)) {
                            Mail::to($commande->email_contact)->send(new OrderConfirmationMail($commande));
                        }
                    } catch (\Exception $mailEx) {
                        // Utilisation sécurisée de la façade Log précédemment importée
                        Log::error("Erreur envoi mail commande : " . $mailEx->getMessage());
                    }
                }

                return [
                    'success' => true,
                    'message' => 'Commande traitée avec succès',
                    'id_commande' => $commande->id_commande
                ];
            });

            // Renvoi de la réponse HTTP standardisée avec le code 201
            return response()->json($dataResponse, 201);

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur technique lors du traitement en base de données.',
                'debug' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Afficher une commande spécifique
     */
    public function show($id)
    {
        try {
            $commande = Commande::with(['produits', 'details'])->find($id);
            
            if (!$commande) {
                return response()->json(['error' => 'Commande non trouvée'], 404);
            }

            return response()->json($commande, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}