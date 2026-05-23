<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str; // IMPORTANT pour l'UUID

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Configuration de la clé primaire personnalisée
    protected $primaryKey = 'id_utilisateur';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'nom_complet',
        'email',
        'password',
        'otp_code',
        'otp_expires_at',
        'role_utilisateur',
        'compte_est_actif',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'otp_expires_at' => 'datetime',
        ];
    }

    // Génération automatique de l'UUID lors de la création d'un utilisateur
    protected static function booted()
    {
        static::creating(function ($user) {
            if (empty($user->id_utilisateur)) {
                $user->id_utilisateur = (string) Str::uuid();
            }
        });
    }
}