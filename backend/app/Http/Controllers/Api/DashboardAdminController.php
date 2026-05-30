<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use App\Models\User;
use App\Models\Produit;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class DashboardAdminController extends Controller
{
    public function getStats(): JsonResponse
    {
        try {
            // ==========================================
            // 1. CALCULS DES BLOCS DE RÉCAPITULATION (TÊTE)
            // ==========================================
            
            $totalCommandes = Commande::count();
            $totalClients = User::where('role_utilisateur', 'CLIENT')->count();
            $totalProduits = Produit::count();

            // 🛠️ MODIFICATION : Chiffre d'affaires total uniquement pour les produits payés
            $chiffreAffaires = DB::table('detail_commandes')
                ->join('commandes', 'detail_commandes.id_commande_fk', '=', 'commandes.id_commande')
                ->where('commandes.statut_commande', '=', 'PAYEE')
                ->sum('detail_commandes.prix_global_scelle') ?? 0;

            // Périodes pour le calcul des taux d'évolution
            $debutMoisDernier = Carbon::now()->subMonth()->startOfMonth();
            $finMoisDernier = Carbon::now()->subMonth()->endOfMonth();

            // Commandes le mois dernier
            $commandesMoisDernier = Commande::whereBetween('created_at', [$debutMoisDernier, $finMoisDernier])->count();
            $tauxCommandes = $this->calculerTauxEvolution($totalCommandes, $commandesMoisDernier);

            // Clients inscrits le mois dernier
            $clientsMoisDernier = User::where('role_utilisateur', 'CLIENT')
                ->whereBetween('created_at', [$debutMoisDernier, $finMoisDernier])
                ->count();
            $tauxClients = $this->calculerTauxEvolution($totalClients, $clientsMoisDernier);

            // 🛠️ MODIFICATION : Chiffre d'affaires du mois dernier uniquement pour les produits payés
            $caMoisDernier = DB::table('detail_commandes')
                ->join('commandes', 'detail_commandes.id_commande_fk', '=', 'commandes.id_commande')
                ->where('commandes.statut_commande', '=', 'PAYEE')
                ->whereBetween('commandes.created_at', [$debutMoisDernier, $finMoisDernier])
                ->sum('detail_commandes.prix_global_scelle') ?? 0;
            $tauxCa = $this->calculerTauxEvolution($chiffreAffaires, $caMoisDernier);

            // Produits créés le mois dernier
            $produitsMoisDernier = Produit::whereBetween('created_at', [$debutMoisDernier, $finMoisDernier])->count();
            $tauxProduits = $this->calculerTauxEvolution($totalProduits, $produitsMoisDernier);


            // ==========================================
            // 2. COURBE D'ÉVOLUTION DES VENTES (TRANSACTIONS)
            // ==========================================
            $transactions = DB::table('detail_commandes')
                ->join('commandes', 'detail_commandes.id_commande_fk', '=', 'commandes.id_commande')
                ->select(
                    'commandes.created_at as date_commande', 
                    'detail_commandes.prix_global_scelle as vente'
                )
                ->orderBy('commandes.created_at', 'asc')
                ->get()
                ->map(function($item) {
                    // Sécurisation de la conversion de la date pour Recharts (React)
                    try {
                        $dateFormatee = $item->date_commande 
                            ? Carbon::parse($item->date_commande)->toIso8601String() 
                            : Carbon::now()->toIso8601String();
                    } catch (\Exception $e) {
                        Log::warning("Format de date invalide pour le tableau de bord : " . $item->date_commande);
                        $dateFormatee = Carbon::now()->toIso8601String();
                    }

                    return [
                        'date' => $dateFormatee,
                        'vente' => (int) ($item->vente ?? 0)
                    ];
                });



            // ==========================================
            // 3. GRAPHIQUE CIRCULAIRE (TOP PRODUITS)
            // ==========================================
            $categories = DB::table('detail_commandes')
                ->join('produits', 'detail_commandes.id_produit_fk', '=', 'produits.id_produit')
                ->select('produits.nom_produit as name', DB::raw('SUM(detail_commandes.quantite_commandee) as value'))
                ->groupBy('produits.id_produit', 'produits.nom_produit')
                ->orderBy('value', 'desc')
                ->take(6)
                ->get();

            $categories = $categories->map(function ($item) {
                return [
                    'name' => $item->name,
                    'value' => (int) $item->value,
                ];
            });


            // ==========================================
            // 4. TABLEAU DES DERNIÈRES COMMANDES RÉCENTES
            // ==========================================
            $commandesRecentes = Commande::with(['details'])
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get()
                ->map(function($com) {
                    // Récupération de l'utilisateur lié s'il existe via son ID (évite les conflits SQL bruts)
                    $user = $com->id_utilisateur_fk ? User::find($com->id_utilisateur_fk) : null;

                    return [
                        'id' => $com->id_commande,
                        'client' => $user ? $user->nom_complet : $com->nom_destinataire,
                        'email' => $user ? $user->email : ($com->email_contact ?? 'Non renseigné'),
                        'date' => $com->created_at ? $com->created_at->toDateString() : Carbon::now()->toDateString(),
                        'montant' => (int) $com->details->sum('prix_global_scelle'),
                        'statut' => $com->statut_commande ?? 'INCONNU'
                    ];
                });


            // Construction de la réponse JSON unifiée pour le Front-End
            return response()->json([
                'stats' => [
                    'total_commandes'  => (int) $totalCommandes,
                    'taux_commandes'   => $tauxCommandes,
                    'chiffre_affaires' => (int) $chiffreAffaires,
                    'taux_ca'          => $tauxCa,
                    'total_clients'    => (int) $totalClients,
                    'taux_clients'     => $tauxClients,
                    'total_produits'   => (int) $totalProduits,
                    'taux_produits'    => $tauxProduits
                ],
                'categories'   => $categories,
                'transactions' => $transactions,
                'commandes'    => $commandesRecentes
            ], 200);

        } catch (\Exception $e) {
            Log::error("Erreur critique DashboardAdminController : " . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors du calcul des statistiques de la console.',
                'error'   => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Calcule le pourcentage d'évolution entre deux périodes sans division par zéro.
     */
    private function calculerTauxEvolution($valeurActuelle, $valeurPrecedente): string
    {
        if ($valeurPrecedente == 0) {
            return $valeurActuelle > 0 ? '+100%' : '+0%';
        }
        $evolution = (($valeurActuelle - $valeurPrecedente) / $valeurPrecedente) * 100;
        return ($evolution >= 0 ? '+' : '') . round($evolution, 1) . '%';
    }
}