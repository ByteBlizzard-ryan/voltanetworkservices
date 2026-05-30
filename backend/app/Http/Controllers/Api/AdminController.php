<?php

namespace App\Http\Controllers\Api; // <-- Le bon namespace correspondant à ton dossier

use App\Http\Controllers\Controller; // <-- ICI : On importe le Controller de base de Laravel
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    // ── OBTENIR TOUS LES ADMINS
    public function index()
    {
        try {
            // Extraction des colonnes nécessaires (sans le password)
            $admins = User::select('id_utilisateur', 'nom_complet', 'email', 'role_utilisateur', 'compte_est_actif')
                          ->where('role_utilisateur', 'ADMIN')
                          ->orderBy('created_at', 'desc')
                          ->get();

            return response()->json($admins, 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la récupération des administrateurs',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // ── ENREGISTRER UN NOUVEL ADMIN
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom_complet' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role_utilisateur' => ['required', Rule::in(['ADMIN'])],
        ]);

        try {
            $admin = User::create([
                'nom_complet' => $validated['nom_complet'],
                'email' => $validated['email'],
                'password' => $validated['password'], 
                'role_utilisateur' => $validated['role_utilisateur'],
                'compte_est_actif' => true, 
            ]);

            return response()->json([
                'message' => 'Administrateur créé avec succès',
                'admin' => $admin
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la création de l\'administrateur',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    // ── ACTIVER / BLOQUER UN COMPTE ADMIN
    public function toggleStatus($id)
    {
        try {
            $admin = User::where('role_utilisateur', 'ADMIN')
                         ->where('id_utilisateur', $id)
                         ->firstOrFail();
            
            $admin->compte_est_actif = !$admin->compte_est_actif;
            $admin->save();

            return response()->json([
                'message' => 'Le statut du compte a été mis à jour avec succès.',
                'compte_est_actif' => $admin->compte_est_actif
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Impossible de modifier le statut de cet administrateur',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}