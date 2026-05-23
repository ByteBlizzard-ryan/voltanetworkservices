<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ImageProduitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $id_produit = '7e27e37a-d088-4601-8ae1-b5e7f209cd6e';

        $images = [
            '/src/imagesProduit/camera2.jpg',
            '/src/imagesProduit/camera3.jpg',
            '/src/imagesProduit/camera4.jpg',
        ];

        foreach ($images as $url) {
            DB::table('image_produits')->insert([
                'id_image_secondaire' => (string) Str::uuid(), // Génère un UUID unique pour chaque image
                'id_produit_fk' => $id_produit,
                'url_image_secondaire' => $url,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}