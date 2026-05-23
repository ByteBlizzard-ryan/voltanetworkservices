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
        // 1. Table UTILISATEURS adaptée à ton MCD
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id_utilisateur')->primary(); // UUID au lieu de ID()
            $table->string('nom_complet', 100);
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->text('password')->nullable(); // Nullable pour les comptes Google
            $table->string('google_id')->nullable()->unique();
            $table->enum('role_utilisateur', ['CLIENT', 'ADMIN'])->default('CLIENT');
            $table->boolean('compte_est_actif')->default(true);
            $table->rememberToken();
            $table->timestamps(); // Gère date_creation (created_at)
        });

        // 2. Table pour la récupération de mot de passe (standard Laravel)
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // 3. Table des SESSIONS (adaptée pour l'UUID)
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            // On change foreignId par uuid pour correspondre à id_utilisateur
            $table->uuid('user_id')->nullable()->index(); 
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};