<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Favori;
use App\Models\Produit; // Assure-toi d'importer le modèle Produit
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriController extends Controller
{
    /**
     * Récupérer les PRODUITS complets en favoris (pour la page Profil/Favoris)
     */
        public function index()
    {
        $user = Auth::user();
        if (!$user) return response()->json([], 200);

        $favorisIds = Favori::where('id_utilisateur_fk', $user->id_utilisateur)
                            ->pluck('id_produit_fk');

        // On utilise sousCategorie (comme dans ton modèle)
        $produits = Produit::whereIn('id_produit', $favorisIds)
                            ->with('sousCategorie') 
                            ->get();

        return response()->json($produits);
    }
    /**
     * NOUVELLE MÉTHODE : Récupérer uniquement les IDs 
     * (Utile pour l'état des icônes coeur dans la liste générale des produits)
     */
    public function getIds()
    {
        $user = Auth::user();
        if (!$user) return response()->json([]);

        $ids = Favori::where('id_utilisateur_fk', $user->id_utilisateur)
                     ->pluck('id_produit_fk');

        return response()->json($ids);
    }

    /**
     * Ajouter ou retirer un produit des favoris (Toggle) - Inchangé mais propre
     */
    public function toggle(Request $request)
    {
        $request->validate([
            'id_produit' => 'required|exists:produits,id_produit'
        ]);

        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Vous devez être connecté'], 401);
        }

        $productId = $request->id_produit;

        $favori = Favori::where('id_utilisateur_fk', $user->id_utilisateur)
                        ->where('id_produit_fk', $productId)
                        ->first();

        if ($favori) {
            $favori->delete();
            return response()->json([
                'status' => 'removed',
                'message' => 'Produit retiré des favoris'
            ]);
        }

        Favori::create([
            'id_utilisateur_fk' => $user->id_utilisateur,
            'id_produit_fk' => $productId
        ]);

        return response()->json([
            'status' => 'added',
            'message' => 'Produit ajouté aux favoris'
        ]);
    }
}