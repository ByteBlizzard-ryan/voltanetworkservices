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
        Schema::create('recuperation_mps', function (Blueprint $table) {
            $table->uuid('id_recuperation')->primary(); // Ton UUID du MCD
            $table->foreignUuid('id_utilisateur_fk')->constrained('users', 'id_utilisateur')->onDelete('cascade');
            $table->string('code_jeton_securise', 100)->unique();
            $table->timestamp('date_expiration');
            $table->boolean('a_ete_utilise')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recuperation_mps');
    }
};