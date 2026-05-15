<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sous_categories')->insert([
            'id_sous_categorie' => (string) Str::uuid(),
            'nom_sous_categorie' => 'Caméras de Surveillance', // Nom d'exemple professionnel
            'id_categorie_parente' => '05b7d755-48f0-4629-af4c-10569d38052e',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}