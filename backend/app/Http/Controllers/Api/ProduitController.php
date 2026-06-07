<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produit;
use App\Models\DetailCommande;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse; 
use Illuminate\Support\Facades\DB;

class ProduitController extends Controller
{
    public function index(Request $request)
    {
        // On initialise la requête d'interrogation sur le modèle Produit
        $query = Produit::with('sousCategorie');

        // Filtre : Date de création supérieure ou égale à...
        if ($request->filled('date_debut')) {
            $query->whereDate('created_at', '>=', $request->date_debut);
        }

        // Filtre : Date de création inférieure ou égale à...
        if ($request->filled('date_fin')) {
            $query->whereDate('created_at', '<=', $request->date_fin);
        }

        // On ordonne par date récente et on récupère les données
        $produits = $query->orderBy('created_at', 'desc')->get();

        return response()->json($produits);
    }

    public function show($id)
    {
        // 🔍 Sécurisation : On cherche via 'id_produit' au lieu de 'id'
        $produit = Produit::with(['sousCategorie', 'imagesSecondaires'])
            ->where('id_produit', $id)
            ->first();

        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé en BDD'], 404);
        }

        return response()->json($produit);
    }

    public function toggleDisponibilite($id): JsonResponse
    {
        // On cherche le produit via 'id_produit' au cas où l'UUID ne se lie pas sur 'id'
        $produit = Produit::where('id_produit', $id)->first();

        if (!$produit) {
            return response()->json(['message' => 'Produit introuvable en BDD'], 404);
        }

        // On inverse le statut
        $produit->est_disponible = $produit->est_disponible ? 0 : 1;
        $produit->save();

        return response()->json([
            'message' => 'Statut mis à jour avec succès',
            'est_disponible' => $produit->est_disponible
        ]);
    }

    public function getBestSellers(): JsonResponse
    {
        try {
            // 1. Agrégation des produits vendus et payés
            $topProducts = DetailCommande::select('detail_commandes.id_produit_fk', DB::raw('SUM(detail_commandes.quantite_commandee) as total_ventes'))
                ->join('commandes', 'detail_commandes.id_commande_fk', '=', 'commandes.id_commande')
                ->where('commandes.statut_commande', '=', 'PAYE') 
                ->groupBy('detail_commandes.id_produit_fk')
                ->orderBy('total_ventes', 'desc')
                ->pluck('detail_commandes.id_produit_fk')
                ->toArray();

            // 2. Si aucun produit n'a encore été payé
            if (empty($topProducts)) {
                $produits = Produit::with('sousCategorie')
                    ->where('est_disponible', 1)
                    ->take(12)
                    ->get();
                return response()->json($produits);
            }

            // 3. Récupération des produits triés par popularité
            $idsOrdered = implode(',', $topProducts);
            $produits = Produit::with('sousCategorie')
                ->where('est_disponible', 1)
                ->whereIn('id_produit', $topProducts)
                ->orderByRaw("FIELD(id_produit, $idsOrdered)")
                ->get();
                
            // 4. Compléter si moins de 6 produits populaires trouvés
            if ($produits->count() < 6) {
                $autresProduits = Produit::with('sousCategorie')
                    ->where('est_disponible', 1)
                    ->whereNotIn('id_produit', $topProducts)
                    ->take(6 - $produits->count())
                    ->get();
                $produits = $produits->concat($autresProduits);
            }

            return response()->json($produits);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du calcul des best-sellers',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}