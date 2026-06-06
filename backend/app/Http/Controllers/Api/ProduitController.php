<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produit;
use App\Models\DetailCommande;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse; 
use Illuminate\Support\Facades\DB; // 👈 OBLIGATOIRE pour pouvoir utiliser DB::raw() !

class ProduitController extends Controller
{
    public function index()
    {
        return response()->json(Produit::with('sousCategorie')->get());
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

    // Ajout du type de retour et recherche par la colonne explicite 'id_produit'
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
            // En cas de crash, on renvoie l'erreur exacte pour savoir d'où vient le problème
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du calcul des best-sellers',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}