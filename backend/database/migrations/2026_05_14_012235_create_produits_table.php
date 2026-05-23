<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produits', function (Blueprint $table) {
            $table->uuid('id_produit')->primary();
            $table->string('nom_produit', 150);
            $table->text('apropos');
            $table->text('description_produit');
            $table->bigInteger('prix_unitaire_produit');
            $table->boolean('est_disponible')->default(true);
            $table->text('url_image_principale'); // Image à la une
            
            // Relation avec sous-catégories
            $table->foreignUuid('id_sous_cat_fk')
                  ->constrained('sous_categories', 'id_sous_categorie')
                  ->onDelete('restrict'); // On ne supprime pas un produit si la catégorie disparaît par erreur

            // On utilise les timestamps natifs de Laravel (created_at servira de date_enregistrement)
            $table->timestamps(); 
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};