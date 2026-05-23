<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasUuid;

class Permission extends Model
{
    use HasUuid;

    protected $primaryKey = 'id_permission';
    protected $fillable = [
        'tableau_de_bord', 'clients', 'produits', 'commandes', 
        'administrateurs', 'droits_acces_admin', 'id_utilisateur_permission'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'id_utilisateur_permission', 'id_utilisateur');
    }
}