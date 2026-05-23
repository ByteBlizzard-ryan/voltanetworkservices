<?php

namespace App\Http\Controllers\Api; // Vérifie bien que le namespace est correct (Api)

use App\Http\Controllers\Controller;
use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    public function index()
    {
        // On utilise sousCategorie tel que défini dans le modèle
        return response()->json(Produit::with('sousCategorie')->get());
    }

    public function show($id)
    {
        // Correction ici aussi : sousCategorie
        // Et attention : dans ton modèle SousCategorie, la relation vers le parent 
        // s'appelle probablement 'categorieParente' ou 'categorie'
        $produit = Produit::with(['sousCategorie', 'imagesSecondaires'])->find($id);

        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        return response()->json($produit);
    }

}