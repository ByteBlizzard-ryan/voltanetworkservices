<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasUuid;

class Produit extends Model
{
    use HasUuid;

    protected $primaryKey = 'id_produit';
    protected $fillable = [
        'nom_produit', 'apropos', 'description_produit', 
        'prix_unitaire_produit', 'est_disponible', 'url_image_principale', 'id_sous_cat_fk'
    ];

    public function sousCategorie() {
        return $this->belongsTo(SousCategorie::class, 'id_sous_cat_fk', 'id_sous_categorie');
    }

    
    public function imagesSecondaires() {
        return $this->hasMany(ImageProduit::class, 'id_produit_fk', 'id_produit');
    }
    
}