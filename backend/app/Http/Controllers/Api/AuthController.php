<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache; // Importation essentielle pour le cache
use App\Mail\OtpVerificationMail;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    /**
     * Inscription d'un nouvel utilisateur (Données mises en cache + Envoi OTP)
     */
    public function register(Request $request)
    {
        // Définition des règles de validation
        $rules = [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ];

        // Traduction personnalisée des messages d'erreur en Français
        $messages = [
            'username.required' => 'Le nom d’utilisateur est obligatoire.',
            'email.required' => 'L’adresse email est obligatoire.',
            'email.email' => 'L’adresse email doit être valide.',
            'email.unique' => 'Cette adresse email est déjà associée à un compte Volta Network.',
            'password.required' => 'Le mot de passe est obligatoire.',
            'password.min' => 'Le mot de passe doit contenir au moins 8 caractères.',
            'password.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $otp = rand(100000, 999999);

        // 🚨 MODIFICATION : On ne fait plus de User::create() ici.
        // On stocke temporairement les données d'inscription dans le Cache pour 10 minutes.
        $registrationData = [
            'nom_complet' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Sécurisé immédiatement
            'otp_code' => $otp,
            'role_utilisateur' => 'CLIENT'
        ];

        Cache::put('temp_user_' . $request->email, $registrationData, now()->addMinutes(10));

        try {
            // Envoi du mail
            Mail::to($request->email)->send(new OtpVerificationMail($otp));
        } catch (\Exception $e) {
            // Sécurité : Si le mail n'arrive pas à partir, on nettoie le cache
            Cache::forget('temp_user_' . $request->email);
            return response()->json(['message' => "Échec de l'envoi du mail de validation."], 500);
        }

        return response()->json([
            'message' => 'Données validées, OTP envoyé avec succès.',
            'email' => $request->email
        ], 200); // Code 200 car l'entité n'est pas encore créée en BDD
    }

    /**
     * Vérification du code OTP après inscription & Création RÉELLE de l'utilisateur
     */
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string|size:6',
        ]);

        // 1. Récupération des données en attente dans le Cache
        $tempUser = Cache::get('temp_user_' . $request->email);

        if (!$tempUser) {
            return response()->json(['message' => 'Le code a expiré ou la session d’inscription est introuvable. Veuillez recommencer.'], 422);
        }

        // 2. Vérification du code OTP stocké dans le cache
        if ($tempUser['otp_code'] != $request->otp) {
            return response()->json(['message' => 'Code OTP invalide.'], 422);
        }

        // 3. LE CODE EST BON : On crée enfin l'utilisateur dans la base de données SQL
        $user = User::create([
            'nom_complet' => $tempUser['nom_complet'],
            'email' => $tempUser['email'],
            'password' => $tempUser['password'], // Déjà hashé à l'étape du register
            'email_verified_at' => now(),
            'otp_code' => null,
            'otp_expires_at' => null,
            'role_utilisateur' => $tempUser['role_utilisateur'],
            'compte_est_actif' => true, // Devient actif immédiatement
        ]);

        // 4. Nettoyage du Cache de sécurité
        Cache::forget('temp_user_' . $request->email);

        // 5. Génération du token de connexion
        $token = $user->createToken('auth_token')->plainTextToken;
        
        $userRole = strtoupper($user->role_utilisateur);
        $redirectTo = $userRole === 'ADMIN' ? '/admin/dashboard' : '/client/dashboard';

        return response()->json([
            'message' => 'Email vérifié et compte créé avec succès.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'role' => $userRole,
            'redirect_to' => $redirectTo
        ], 201); // 201 Created
    }

    /**
     * Connexion de l'utilisateur (Admin ou Client)
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Identifiants incorrects.'], 401);
        }

        if (!$user->compte_est_actif) {
            return response()->json(['message' => 'Votre compte n\'est pas encore actif. Vérifiez votre code OTP.'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        
        $userRole = strtoupper($user->role_utilisateur);
        $redirectTo = $userRole === 'ADMIN' ? '/admin/dashboard' : '/client/dashboard';

        $permissionData = null;
        if ($userRole === 'ADMIN') {
            $user->load('permission'); 
            $permissionData = $user->permission;
        }

        return response()->json([
            'message' => 'Connexion réussie.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'role' => $userRole,
            'user' => [
                'id' => $user->id_utilisateur,
                'nom_complet' => $user->nom_complet,
                'email' => $user->email,
                'permission' => $permissionData
            ],
            'redirect_to' => $redirectTo
        ], 200);
    }

    /**
     * Mise à jour des informations du profil (Nom uniquement)
     */
    public function updateProfile(Request $request)
    {
        $request->validate([
            'nom_complet' => 'required|string|max:255',
        ]);

        $user = $request->user();
        $user->nom_complet = $request->nom_complet;
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Profil mis à jour avec succès.',
            'user' => [
                'id' => $user->id_utilisateur,
                'nom_complet' => $user->nom_complet,
                'email' => $user->email
            ]
        ], 200);
    }

    /**
     * Mise à jour du mot de passe
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => ['required', 'confirmed', Password::min(8)],
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Le mot de passe actuel est incorrect.'], 422);
        }

        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Mot de passe mis à jour avec succès.'
        ], 200);
    }

    /**
     * Déconnexion de l'utilisateur
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Déconnexion réussie.'
        ], 200);
    }
}