<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Favori extends Model
{
    protected $table = 'favoris';
    protected $primaryKey = 'id_favori';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id_favori',
        'id_utilisateur_fk',
        'id_produit_fk',
    ];

    protected static function booted()
    {
        static::creating(function ($favori) {
            if (empty($favori->id_favori)) {
                $favori->id_favori = (string) Str::uuid();
            }
        });
    }

    /**
     * Relation vers l'utilisateur qui possède ce favori
     */
    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_utilisateur_fk', 'id_utilisateur');
    }

    /**
     * Relation vers le produit mis en favori
     */
    public function produit(): BelongsTo
    {
        return $this->belongsTo(Produit::class, 'id_produit_fk', 'id_produit');
    }
}