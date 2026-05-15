<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->uuid('id_commande')->primary();
            
            // Relation utilisateur (nullable car on peut commander sans compte)
            $table->foreignUuid('id_utilisateur_fk')
                  ->nullable()
                  ->constrained('users', 'id_utilisateur')
                  ->onDelete('set null'); // Si l'user est supprimé, on garde la commande pour la comptabilité

            $table->string('nom_destinataire', 100);
            $table->string('email_contact', 191);
            $table->string('telephone_contact', 20);
            $table->string('telephone_secondaire', 20)->nullable(); // Ajouté selon ton MCD
            $table->text('adresse_livraison')->nullable();
            
            $table->enum('canal_commande', ['FORMULAIRE', 'WHATSAPP']);
            $table->enum('statut_commande', ['EN COURS', 'PAYEE', 'ANNULEE'])->default('EN COURS');
            
            $table->timestamps(); // Gère le created_at (date_commande du MCD)
        }); 
    }

    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};