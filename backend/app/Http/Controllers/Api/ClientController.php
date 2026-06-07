<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $query = User::where('role_utilisateur', 'CLIENT');

        // Filtrage par statut
        if ($request->has('statut') && $request->statut !== 'tous') {
            $isActive = $request->statut === 'débloqué' ? true : false;
            $query->where('compte_est_actif', $isActive);
        }

        // Filtrage par date de début
        if ($request->filled('date_debut')) {
            $query->whereDate('created_at', '>=', $request->date_debut);
        }
        
        // Filtrage par date de fin
        if ($request->filled('date_fin')) {
            $query->whereDate('created_at', '<=', $request->date_fin);
        }

        $clients = $query->orderBy('created_at', 'desc')->get();

        $formattedClients = $clients->map(function ($client) {
            return [
                'id' => $client->id_utilisateur, // Utilisation de la bonne clé
                'nom' => $client->nom_complet,
                'email' => $client->email,
                'statut' => $client->compte_est_actif ? 'débloqué' : 'bloqué',
                'created_at' => $client->created_at ? $client->created_at->toDateString() : null
            ];
        });

        return response()->json($formattedClients, 200);
    }

    public function toggleStatut($id)
    {
        // FIX : Recherche sur la bonne colonne de clé primaire 'id_utilisateur'
        $client = User::where('role_utilisateur', 'CLIENT')
            ->where('id_utilisateur', $id)
            ->first();

        if (!$client) {
            return response()->json(['message' => 'Client introuvable.'], 404);
        }

        $client->compte_est_actif = !$client->compte_est_actif;
        $client->save();

        return response()->json([
            'success' => true,
            'message' => $client->compte_est_actif ? 'Client débloqué avec succès.' : 'Client bloqué avec succès.',
            'statut' => $client->compte_est_actif ? 'débloqué' : 'bloqué' // Aligné avec les valeurs attendues par React
        ], 200);
    }

    public function show($id): JsonResponse
    {
        try {
            // FIX : Si findOrFail n'utilise pas la bonne clé primaire par défaut dans le modèle User,
            // il vaut mieux expliciter la recherche ici aussi.
            $user = User::where('id_utilisateur', $id)
                ->with(['commandes' => function($query) {
                    $query->with('details')->orderBy('created_at', 'desc');
                }])
                ->firstOrFail();

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