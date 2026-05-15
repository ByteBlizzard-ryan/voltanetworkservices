<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // 1. Validation des entrées
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'remember' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 2. Chercher l'utilisateur
        $user = User::where('email', $request->email)->first();

        // 3. Vérifier identifiants
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Les identifiants fournis sont incorrects.'
            ], 401);
        }

        // 4. Vérifier si le compte est activé (OTP déjà fait)
        if (!$user->compte_est_actif) {
            return response()->json([
                'message' => 'Votre compte n\'est pas encore activé. Veuillez vérifier votre boîte mail.'
            ], 403);
        }

        // 5. Gérer le "Se souvenir de moi"
        // Note: Avec Sanctum, on peut gérer l'expiration du token. 
        // Si 'remember' est true, le token n'expire pas (ou expire très tard).
        $tokenName = $request->remember ? 'remember_token' : 'auth_token';
        $token = $user->createToken($tokenName)->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id_utilisateur,
                'nom' => $user->nom_complet,
                'email' => $user->email,
                'role' => $user->role_utilisateur
            ]
        ], 200);
    }

    public function logout(Request $request)
    {
        // Supprime le token actuel de l'utilisateur
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie'
        ]);
    }
}