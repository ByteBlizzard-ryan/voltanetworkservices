<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse; // <-- AJOUTÉ ICI

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $query = User::where('role_utilisateur', 'CLIENT');

        if ($request->has('statut') && $request->statut !== 'tous') {
            $isActive = $request->statut === 'débloqué' ? true : false;
            $query->where('compte_est_actif', $isActive);
        }

        if ($request->filled('date_debut')) {
            $query->whereDate('created_at', '>=', $request->date_debut);
        }
        if ($request->filled('date_fin')) {
            $query->whereDate('created_at', '<=', $request->date_fin);
        }

        $clients = $query->orderBy('created_at', 'desc')->get();

        $formattedClients = $clients->map(function ($client) {
            return [
                'id' => $client->id_utilisateur,
                'nom' => $client->nom_complet,
                'email' => $client->email,
                'statut' => $client->compte_est_actif ? 'débloqué' : 'bloqué',
                'created_at' => $client->created_at->toDateString()
            ];
        });

        return response()->json($formattedClients, 200);
    }

    public function toggleStatut($id)
    {
        $client = User::where('role_utilisateur', 'CLIENT')->find($id);

        if (!$client) {
            return response()->json(['message' => 'Client introuvable.'], 404);
        }

        $client->compte_est_actif = !$client->compte_est_actif;
        $client->save();

        return response()->json([
            'success' => true,
            'message' => $client->compte_est_actif ? 'Client débloqué avec succès.' : 'Client bloqué avec succès.',
            'statut' => $client->compte_est_actif ? 'ACTIF' : 'BLOQUÉ' // Aligné avec le state React
        ], 200);
    }

    public function show($id): JsonResponse
    {
        try {
            // On charge aussi 'commandes.details' pour pouvoir calculer le montant sans refaire de requêtes
            $user = User::with(['commandes' => function($query) {
                $query->with('details')->orderBy('created_at', 'desc');
            }])->findOrFail($id);

            $partiesNom = explode(' ', $user->nom_complet, 2);
            $prenom = $partiesNom[0] ?? '';
            $nom = $partiesNom[1] ?? '';

            $clientFormate = [
                'id' => $user->id_utilisateur,
                'prenom' => $prenom,
                'nom' => $nom,
                'email' => $user->email,
                'statut' => $user->compte_est_actif ? 'ACTIF' : 'BLOQUÉ',
                'created_at' => $user->created_at,
                'avatar' => null 
            ];

            $commandesFormatees = $user->commandes->map(function ($commande) {
                return [
                    'id' => $commande->id_commande,
                    'created_at' => $commande->created_at->toIso8601String(),
                    'statut' => $commande->statut_commande, 
                    // Utilisation de la collection déjà chargée en mémoire
                    'montant' => $commande->details->sum('prix_global_scelle')
                ];
            });

            return response()->json([
                'client' => $clientFormate,
                'orders' => $commandesFormatees
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => "Impossible de charger les détails : " . $e->getMessage()
            ], 500);
        }
    }
}