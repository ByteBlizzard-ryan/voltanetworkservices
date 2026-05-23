<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasUuid;

class ImageProduit extends Model
{
    use HasUuid;

    protected $primaryKey = 'id_image_secondaire';
    protected $fillable = ['id_produit_fk', 'url_image_secondaire'];

    public function produit() {
        return $this->belongsTo(Produit::class, 'id_produit_fk', 'id_produit');
    }
}