<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            'id_categorie' => (string) Str::uuid(),
            'nom_categorie' => 'Sécurité physique',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}