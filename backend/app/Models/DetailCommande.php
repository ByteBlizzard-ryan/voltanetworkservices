<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class DetailCommande extends Model
{
    use HasUuids;

    protected $primaryKey = 'id_detail_ligne';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id_detail_ligne',
        'id_commande_fk',
        'id_produit_fk',
        'quantite_commandee',
        'prix_global_scelle'
    ];

    // AJOUTE CETTE RELATION
    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit_fk', 'id_produit');
    }

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande_fk', 'id_commande');
    }
}