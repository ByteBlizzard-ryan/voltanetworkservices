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
        Schema::create('permissions', function (Blueprint $table) {
            $table->uuid('id_permission')->primary();
            $table->boolean('tableau_de_bord')->default(false);
            $table->boolean('clients')->default(false);
            $table->boolean('produits')->default(false);
            $table->boolean('commandes')->default(false);
            $table->boolean('administrateurs')->default(false);
            $table->boolean('droits_acces_admin')->default(false);
            $table->foreignUuid('id_utilisateur_permission')->constrained('users', 'id_utilisateur')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permissions');
    }
};
