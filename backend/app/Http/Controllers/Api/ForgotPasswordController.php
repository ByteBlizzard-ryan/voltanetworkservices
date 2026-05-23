<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\OtpVerificationMail;

class ForgotPasswordController extends Controller
{
    // Étape 1 : Envoyer l'OTP pour la réinitialisation
    public function sendResetOtp(Request $request) {
        $request->validate(['email' => 'required|email']);
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé.'], 404);
        }

        $otp = rand(100000, 999999);
        $user->otp_code = $otp;
        $user->otp_expires_at = now()->addMinutes(15);
        $user->save();

        Mail::to($user->email)->send(new OtpVerificationMail($otp));

        return response()->json(['message' => 'Code de réinitialisation envoyé.']);
    }

    // Étape 2 : Changer le mot de passe
    public function resetPassword(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::where('email', $request->email)
                    ->where('otp_code', $request->otp)
                    ->where('otp_expires_at', '>', now())
                    ->first();

        if (!$user) {
            return response()->json(['message' => 'Code invalide ou expiré.'], 422);
        }

        $user->password = Hash::make($request->password);
        $user->otp_code = null;
        $user->otp_expires_at = null;
        $user->save();

        return response()->json(['message' => 'Mot de passe réinitialisé avec succès.']);
    }
}