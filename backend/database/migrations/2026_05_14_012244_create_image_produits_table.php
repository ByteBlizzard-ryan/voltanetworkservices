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
        Schema::create('image_produits', function (Blueprint $table) {
            $table->uuid('id_image_secondaire')->primary(); // Ton UUID du MCD
            $table->foreignUuid('id_produit_fk')
                  ->constrained('produits', 'id_produit')
                  ->onDelete('cascade'); // Si on supprime le produit, on supprime ses images
            $table->string('url_image_secondaire', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('image_produits');
    }
};