<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\ProduitController;
use App\Models\Produit;
use App\Models\Category;
use App\Models\SousCategorie;
use App\Http\Controllers\API\CommandeController;
use App\Models\Favori;
// Vérifie bien cette ligne (attention au "API" en majuscules)
use App\Http\Controllers\API\FavoriController;
/*
|--------------------------------------------------------------------------
| API Routes - VOLTA NETWORK
|--------------------------------------------------------------------------
*/

// --- ROUTES PUBLIQUES (Ouvertes au Front-end React) ---

//Route pour l'inscription et la vérification OTP
Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);

// Route pour la connexion 
Route::post('/login', [LoginController::class, 'login']);

// Routes pour la réinitialisation de mot de passe
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetOtp']);
Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);

// Route pour récupérer les produits disponibles
// Route::get('/produits', function () {
//     // Utilisation de 'sousCategorie' (sans l'underscore) pour correspondre au modèle
//     return Produit::with('sousCategorie')->where('est_disponible', true)->get();
// });

// Route récupérer toutes les sous-catégories
Route::get('/sous-categories', function () {
    return SousCategorie::all();
});

// Route pour récupérer les catégories
Route::get('/categories', function () {
    // Assure-toi que ton modèle s'appelle bien Category ou Categorie 
    // selon ce que tu as en base (ton modèle précédent utilisait Categorie)
    return App\Models\Categorie::all(); 
});

// Route pour la liste complète des produits qui seront affichés dans les details des produits dans la boutique
Route::get('/produits', [ProduitController::class, 'index']);

// Route pour le détail d'un produit (utilisée par la page ProduitDetaille)
Route::get('/produits/{id}', [ProduitController::class, 'show']);

// Route pour enregistrer une commande
Route::post('/commandes', [CommandeController::class, 'store']);

// --- ROUTES PROTÉGÉES (auth:sanctum) ---
Route::middleware('auth:sanctum')->group(function () {
    
    // Utilisateur
    Route::get('/user', function (Request $request) { return $request->user(); });
    Route::post('/user/update-password', [AuthController::class, 'updatePassword']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Favoris
    Route::get('/favoris', [FavoriController::class, 'index']);
    Route::post('/favoris/toggle', [FavoriController::class, 'toggle']);

    // Commandes
    Route::get('/commandes/historique', [CommandeController::class, 'index']);
    Route::post('/commandes', [CommandeController::class, 'store']);
});

// Route de test Santé de l'API
Route::get('/ping', function () {
    return response()->json([
        'status' => 'online',
        'message' => 'L\'API de Volta Network répond parfaitement.',
        'timestamp' => now()
    ]);
});



// --- ROUTES PROTÉGÉES (Nécessitent un Bearer Token) ---

Route::middleware('auth:sanctum')->group(function () {
    
    // Récupérer les infos de l'utilisateur connecté
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Déconnexion
    Route::post('/logout', [AuthController::class, 'logout']);

    // Ici on ajoutera plus tard les routes pour :
    // - Passer une commande
    // - Ajouter aux favoris
});