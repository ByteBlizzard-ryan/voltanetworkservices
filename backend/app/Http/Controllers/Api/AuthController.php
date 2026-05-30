<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\OtpVerificationMail;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    /**
     * Inscription d'un nouvel utilisateur (Forcé en CLIENT par défaut)
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $otp = rand(100000, 999999);

        $user = User::create([
            'nom_complet' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'otp_code' => $otp,
            'otp_expires_at' => now()->addMinutes(10),
            'role_utilisateur' => 'CLIENT', // Tout compte créé via le formulaire est un client
            'compte_est_actif' => false,
        ]);

        Mail::to($user->email)->send(new OtpVerificationMail($otp));

        return response()->json([
            'message' => 'Utilisateur créé, OTP envoyé avec succès.',
            'email' => $user->email
        ], 201);
    }

    /**
     * Vérification du code OTP après inscription
     */
    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string|size:6',
        ]);

        $user = User::where('email', $request->email)
                    ->where('otp_code', $request->otp)
                    ->where('otp_expires_at', '>', now())
                    ->first();

        if (!$user) {
            return response()->json(['message' => 'Code OTP invalide ou expiré.'], 422);
        }

        $user->email_verified_at = now();
        $user->otp_code = null;
        $user->otp_expires_at = null;
        $user->compte_est_actif = true;
        $user->save();

        $token = $user->createToken('auth_token')->plainTextToken;
        
        $userRole = strtoupper($user->role_utilisateur);
        $redirectTo = $userRole === 'ADMIN' ? '/admin/dashboard' : '/client/dashboard';

        return response()->json([
            'message' => 'Email vérifié avec succès.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'role' => $userRole,
            'redirect_to' => $redirectTo
        ], 200);
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

        return response()->json([
            'message' => 'Connexion réussie.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'role' => $userRole,
            'user' => [
                'id' => $user->id_utilisateur,
                'nom_complet' => $user->nom_complet,
                'email' => $user->email
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
     * Déconnexion de l'utilisateur (Révocation du token Sanctum actuel)
     */
    public function logout(Request $request)
    {
        // Supprime le jeton d'accès utilisé pour cette requête sécurisée
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Déconnexion réussie.'
        ], 200);
    }
}