<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProduitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('produits')->insert([
            'id_produit' => (string) Str::uuid(),
            'nom_produit' => 'LAXIHUB 3K/5MP Caméra Surveillance',
            'apropos' => 'LAXIHUB 3K/5MP Caméra Surveillance WiFi Intérieur, 2,4GHz/5GHz Caméras WiFi avec Vision Nocturne, 355° PTZ Caméra Maison, Suivi Automatique, Audio Bidirectionnel, Compatible Google Assistant et Alexa',
            'description_produit' => "【Résolution 5MP et Double Bande WiFi Renforcée】 La caméra fournit des images en direct ultra claires de 3K/5MP. Cette caméra WiFi fonctionne sur les bandes 2,4 GHz et 5 GHz, fournissant un signal plus fort et une connexion WiFi plus rapide.(Remarque : pour garantir une connexion réussie, la caméra doit être connectée au même réseau que votre appareil mobile)\n\n【Détection de Mouvement et de Son Réglables & Suivi Automatique】Lorsqu'un mouvement humain ou des sons anormaux sont détectés, des notifications push seront envoyées directement à votre smartphone. Si vous ne souhaitez pas recevoir de notifications, vous pouvez les désactiver. Il dispose de trois niveaux de sensibilité pour le réglage. Si un mouvement est détecté, la caméra suit automatiquement le mouvement.\n\n【Protection de la Vie Privée】Dans le même temps, le mode de cryptage vidéo avancé vous permet de visualiser facilement à distance la situation à la maison sans vous soucier des fuites de confidentialité.Étapes pour retourner l'écran : APP-Set Now-Réglage de l'image-Rotation de l'écran.\n\n【Audio Bidirectionnel, Compatible avec Alexa et Google Assistant】La caméra dispose d'un micro et d'un haut-parleur intégrés. Offrez-vous une conversation fluide via l'application téléphonique Arenti Mobile. La caméra prend en charge les commandes vocales pour Alexa et Google Assistant. Vous pouvez vous allonger confortablement sur votre canapé et accéder à votre caméra via Alexa/Google.\n\n【Accès au Navigateur Web & Partage & Stockage Facile & Enregistrement Continu 24/7】La caméra offre une accessibilité via un navigateur web et une application pour la surveillance de plusieurs caméras simultanément avec un partage facile des images en direct entre membres de la famille. Visionnez jusqu'à 4 vidéos en temps réel en toute simplicité.Vous pouvez stocker les vidéos sur la carte SD (jusqu'à 256G, non incluse) et sur un cloud crypté.",
            'prix_unitaire_produit' => 17000,
            'est_disponible' => true,
            'url_image_principale' => '/src/imagesProduit/camera1.jpg',
            'id_sous_cat_fk' => 'b54843cf-d4e5-4f2d-b850-d453541a2f54',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}