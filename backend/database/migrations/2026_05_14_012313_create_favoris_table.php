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
        Schema::create('favoris', function (Blueprint $table) {
            // Dans ton MCD, c'est une table de liaison pure
            $table->uuid('id_favori')->primary(); // Optionnel, ou utilise une clé composée

            $table->foreignUuid('id_utilisateur_fk')
                  ->constrained('users', 'id_utilisateur')
                  ->onDelete('cascade');

            $table->foreignUuid('id_produit_fk')
                  ->constrained('produits', 'id_produit')
                  ->onDelete('cascade');

            $table->timestamps();

            // Sécurité : Un utilisateur ne peut pas mettre le même produit deux fois en favori
            $table->unique(['id_utilisateur_fk', 'id_produit_fk']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favoris');
    }
};