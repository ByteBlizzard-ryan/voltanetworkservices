<?php

namespace App\Http\Controllers\Api; // <-- Le bon namespace correspondant à ton dossier

use App\Http\Controllers\Controller; // <-- ICI : On importe le Controller de base de Laravel
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Permission; //

class AdminController extends Controller
{
    // ── OBTENIR TOUS LES ADMINS AVEC LEURS PERMISSIONS
    public function index()
    {
        try {
            // On charge l'admin ET sa ligne de permissions liée
            $admins = User::with('permission')
                ->where('role_utilisateur', 'ADMIN')
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($admin) {
                    return [
                        'id' => $admin->id_utilisateur,
                        'nom' => $admin->nom_complet,
                        'email' => $admin->email,
                        'role' => $admin->role_utilisateur,
                        'etat' => $admin->compte_est_actif ? 'actif' : 'inactif',
                        // Si aucune ligne de permission n'existe, on renvoie des valeurs par défaut
                        'dashboard' => $admin->permission ? (bool)$admin->permission->tableau_de_bord : false,
                        'clients' => $admin->permission ? (bool)$admin->permission->clients : false,
                        'produits' => $admin->permission ? (bool)$admin->permission->produits : false,
                        'commandes' => $admin->permission ? (bool)$admin->permission->commandes : false,
                        'administrateurs' => $admin->permission ? (bool)$admin->permission->administrateurs : false,
                        'droits_acces_admin' => $admin->permission ? (bool)$admin->permission->droits_acces_admin : false,
                    ];
                });

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

    public function updatePermissions(Request $request, $id)
    {
        $validated = $request->validate([
            'dashboard' => 'required|boolean',
            'clients' => 'required|boolean',
            'produits' => 'required|boolean',
            'commandes' => 'required|boolean',
            'administrateurs' => 'required|boolean',
        ]);

        try {
            // On cherche ou on crée la ligne de permission pour cet utilisateur
            $permission = Permission::updateOrCreate(
                ['id_utilisateur_permission' => $id],
                [
                    'tableau_de_bord' => $validated['dashboard'],
                    'clients' => $validated['clients'],
                    'produits' => $validated['produits'],
                    'commandes' => $validated['commandes'],
                    'administrateurs' => $validated['administrateurs'],
                ]
            );

            return response()->json([
                'message' => 'Permissions mises à jour avec succès !'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erreur lors de la mise à jour des permissions',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}