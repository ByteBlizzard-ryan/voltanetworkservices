<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasUuid;

class Categorie extends Model
{
    use HasUuid;

    protected $primaryKey = 'id_categorie';
    protected $fillable = ['nom_categorie'];

    public function sousCategories() {
        return $this->hasMany(SousCategorie::class, 'id_categorie_parente', 'id_categorie');
    }
}