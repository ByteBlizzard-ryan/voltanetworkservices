<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\ProduitController;
use App\Http\Controllers\API\CommandeController;
use App\Http\Controllers\API\FavoriController;
use App\Http\Controllers\Api\ClientController;
use App\Models\SousCategorie;
use App\Models\Categorie;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\DashboardAdminController;

Route::get('/admin/dashboard-stats', [DashboardAdminController::class, 'getStats']);

/*
|--------------------------------------------------------------------------
| API Routes - VOLTA NETWORK
|--------------------------------------------------------------------------
*/

// --- ROUTES PUBLIQUES (Ouvertes au Front-end React) ---

Route::prefix('admin/administrateurs')->group(function () {
    Route::get('/', [AdminController::class, 'index']);
    Route::post('/', [AdminController::class, 'store']);
    Route::patch('{id}/toggle-status', [AdminController::class, 'toggleStatus']);
});

// Route pour l'inscription et la vérification OTP
Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);

// Route pour la connexion 
Route::post('/login', [AuthController::class, 'login']);

// Routes pour la réinitialisation de mot de passe
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetOtp']);
Route::post('/reset-password', [ForgotPasswordController::class, 'resetPassword']);

// Route récupérer toutes les sous-catégories
Route::get('/sous-categories', function () {
    return SousCategorie::all();
});

// Route pour récupérer les catégories
Route::get('/categories', function () {
    return Categorie::all(); 
});

// Route pour la liste complète des produits
Route::get('/produits', [ProduitController::class, 'index']);

// Route pour le détail d'un produit
Route::get('/produits/{id}', [ProduitController::class, 'show']);

// Route pour enregistrer une commande
Route::post('/commandes', [CommandeController::class, 'store']);

// Route de test Santé de l'API
Route::get('/ping', function () {
    return response()->json([
        'status' => 'online',
        'message' => 'L\'API de Volta Network répond parfaitement.',
        'timestamp' => now()
    ]);
});


// 🧪 ROUTES DE GESTION CLIENTS (Sorties temporairement du middleware pour le test)
Route::get('/admin/clients', [ClientController::class, 'index']);
Route::get('/admin/clients/{id}', [ClientController::class, 'show']);
Route::patch('/admin/clients/{id}/toggle-statut', [ClientController::class, 'toggleStatut']);
// 👈 AJOUTE CETTE LIGNE ICI POUR LES PRODUITS :
Route::patch('/admin/products/{id}/toggle-disponibilite', [ProduitController::class, 'toggleDisponibilite']);

// 👈 AJOUTE CETTE ROUTE ICI :
Route::get('/admin/commandes', function() {
    return response()->json(
        \App\Models\Commande::with(['details'])->orderBy('created_at', 'desc')->get()->map(function ($commande) {
            $commande->total_commande = $commande->details->sum('prix_global_scelle');
            return $commande;
        })
    );
});

// Route pour récupérer le détail complet d'une commande spécifique
Route::get('/admin/commandes/{id}', function($id) {
    $commande = \App\Models\Commande::with(['details.produit'])->find($id);

    if (!$commande) {
        return response()->json(['message' => 'Commande introuvable'], 404);
    }

    // Calcul du total en temps réel sur la ligne de commande
    $commande->total_commande = $commande->details->sum('prix_global_scelle');

    return response()->json($commande);
});

// Route pour mettre à jour le statut d'une commande
Route::patch('/admin/commandes/{id}/statut', function(Request $request, $id) {
    $commande = \App\Models\Commande::find($id);
    if (!$commande) return response()->json(['message' => 'Commande introuvable'], 404);

    $request->validate(['statut_commande' => 'required|string']);
    $commande->update(['statut_commande' => $request->statut_commande]);

    return response()->json(['message' => 'Statut mis à jour avec succès', 'commande' => $commande]);
});

// --- ROUTES PROTÉGÉES (auth:sanctum) ---
Route::middleware('auth:sanctum')->group(function () {
    
    // Utilisateur Connecté
    Route::get('/user', function (Request $request) { 
        return $request->user(); 
    });
    Route::post('/user/update-password', [AuthController::class, 'updatePassword']);
    Route::post('/user/update-profile', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Favoris
    Route::get('/favoris', [FavoriController::class, 'index']);
    Route::post('/favoris/toggle', [FavoriController::class, 'toggle']);

    // Historique Commandes
    Route::get('/commandes/historique', [CommandeController::class, 'index']);

});