<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasUuid;

class SousCategorie extends Model
{
    use HasUuid;

    protected $primaryKey = 'id_sous_categorie';
    protected $fillable = ['nom_sous_categorie', 'id_categorie_parente'];

    public function categorie() {
        return $this->belongsTo(Categorie::class, 'id_categorie_parente', 'id_categorie');
    }

    public function produits() {
        return $this->hasMany(Produit::class, 'id_sous_cat_fk', 'id_sous_categorie');
    }
}