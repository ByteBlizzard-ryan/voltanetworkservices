<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detail_commandes', function (Blueprint $table) {
            $table->uuid('id_detail_ligne')->primary();
            
            // Relation avec la commande
            $table->foreignUuid('id_commande_fk')
                  ->constrained('commandes', 'id_commande')
                  ->onDelete('cascade'); // Si on supprime la commande, on supprime les lignes

            // Relation avec le produit
            $table->foreignUuid('id_produit_fk')
                  ->constrained('produits', 'id_produit')
                  ->onDelete('restrict'); // Sécurité : on ne supprime pas un produit qui a été vendu

            $table->integer('quantite_commandee');
            
            // TRÈS IMPORTANT : On stocke le prix au moment de l'achat
            $table->bigInteger('prix_global_scelle'); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_commandes');
    }
};