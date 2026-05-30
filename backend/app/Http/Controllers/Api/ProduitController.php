<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse; // 👈 AJOUT IMPORT BIEN PRÉCIS

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
}