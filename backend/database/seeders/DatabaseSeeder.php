<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
{
    // Commente ou supprime l'ancien code d'exemple qui utilise 'name'
    // \App\Models\User::factory(10)->create();

    // Crée ton utilisateur de test avec tes propres colonnes
    \App\Models\User::create([
        'id_utilisateur' => (string) \Illuminate\Support\Str::uuid(),
        'nom_complet' => 'Test User', // Remplace 'name' par 'nom_complet'
        'email' => 'test@example.com',
        'password' => \Illuminate\Support\Facades\Hash::make('password'),
        'role_utilisateur' => 'CLIENT',
        'compte_est_actif' => true,
        'email_verified_at' => now(),
    ]);

    // Appelle tes autres seeders
    $this->call([
        CategorySeeder::class,
        SubCategorySeeder::class,
        // ProductSeeder::class,
    ]);
}
}
