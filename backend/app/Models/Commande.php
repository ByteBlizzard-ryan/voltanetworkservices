<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Commande extends Model
{
    use HasUuids;

    protected $primaryKey = 'id_commande';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id_commande',
        'id_utilisateur_fk',
        'nom_destinataire',
        'email_contact',
        'telephone_contact',
        'telephone_secondaire',
        'adresse_livraison',
        'canal_commande',
        'statut_commande'
    ];

    public function details()
    {
        return $this->hasMany(DetailCommande::class, 'id_commande_fk', 'id_commande');
    }

    // app/Models/Commande.php
    public function produits()
    {
        // On lie la commande aux produits VIA la table de détails (DetailCommande)
        return $this->belongsToMany(
            Produit::class, 
            'detail_commandes', // <-- METS ICI LE NOM EXACT DE TA TABLE EN BDD (vérifie si c'est detail_commandes ou details_commandes)
            'id_commande_fk', 
            'id_produit_fk'
        )->withPivot('quantite_commandee', 'prix_global_scelle');
    }
}