<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

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

    protected static function booted()
    {
        static::creating(function ($user) {
            if (empty($user->id_utilisateur)) {
                $user->id_utilisateur = (string) Str::uuid();
            }
        });
    }

    /**
     * Récupérer toutes les commandes passées par cet utilisateur.
     */
    public function commandes()
    {
        // Un utilisateur possède plusieurs (hasMany) commandes
        return $this->hasMany(
            Commande::class, 
            'id_utilisateur_fk', // La clé étrangère dans la table commandes
            'id_utilisateur'     // La clé locale/primaire dans la table users
        );
    }
}