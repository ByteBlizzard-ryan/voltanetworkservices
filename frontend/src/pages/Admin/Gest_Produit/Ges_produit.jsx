import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ToggleLeft, ToggleRight, Calendar, ChevronLeft, ChevronRight, Loader2, Search, Sparkles } from "lucide-react";

// 🌟 NOUVEAU : Fonction pour surligner les lettres correspondantes dans la désignation
function SurlignerTexte(texte = "", recherche = "") {
    if (!recherche.trim()) return <span>{texte}</span>;

    // Protection contre les caractères spéciaux Regex
    const motifSecurise = recherche.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(${motifSecurise})`, "gi");
    const morceaux = texte.split(regex);

    return (
        <span>
            {morceaux.map((morceau, index) => 
                regex.test(morceau) ? (
                    <mark key={index} className="bg-[#9ADE7B]/40 text-slate-900 font-black rounded-sm px-0.5 transition-all">
                        {morceau}
                    </mark>
                ) : (
                    morceau
                )
            )}
        </span>
    );
}

export default function Gest_produit() {
    const navigate = useNavigate();
    
    // ── ÉTATS DU COMPOSANT ──
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtreEtat, setFiltreEtat] = useState("tous");
    
    // Nouveaux états pour le filtrage par date
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");

    // 🌟 NOUVEAUX ÉTATS : Recherche et animation du scanneur
    const [rechercheProduit, setRechercheProduit] = useState("");
    const [estEnTrainDeFiltrer, setEstEnTrainDeFiltrer] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // ── CHARGEMENT DES PRODUITS (Mémorisé pour éviter les boucles) ──
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Construction dynamique des paramètres de requête pour l'API
            const params = new URLSearchParams({
                date_debut: dateDebut,
                date_fin: dateFin
            });

            const response = await fetch(`http://localhost:8000/api/produits?${params.toString()}`);
            
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération de la liste des produits.");
            }
            
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [dateDebut, dateFin]);

    // Déclenchement automatique de la recherche au changement des filtres ou des dates
    useEffect(() => {
        // Sécurité : empêche l'envoi de requêtes incomplètes si l'utilisateur tape au clavier
        if ((dateDebut && dateDebut.length < 10) || (dateFin && dateFin.length < 10)) {
            return;
        }
        fetchProducts();
        setCurrentPage(1);
    }, [fetchProducts, dateDebut, dateFin]);

    // 🌟 NOUVEL EFFET : Gestion du témoin de scan temporaire à la saisie clavier
    useEffect(() => {
        setCurrentPage(1);
        if (rechercheProduit.trim().length > 0) {
            setEstEnTrainDeFiltrer(true);
            const timer = setTimeout(() => setEstEnTrainDeFiltrer(false), 300);
            return () => clearTimeout(timer);
        } else {
            setEstEnTrainDeFiltrer(false);
        }
    }, [rechercheProduit]);

    // ── FILTRAGE DYNAMIQUE MIXTE (Statut + Barre de recherche) ──
    const filteredData = useMemo(() => {
        let resultat = products;

        // 1. Filtrage par statut de disponibilité
        if (filtreEtat === "disponible") {
            resultat = resultat.filter(item => Number(item.est_disponible) === 1);
        } else if (filtreEtat === "indisponible") {
            resultat = resultat.filter(item => Number(item.est_disponible) === 0);
        }

        // 2. Filtrage textuel en temps réel (Désignation du produit)
        if (rechercheProduit.trim()) {
            resultat = resultat.filter(item => 
                item.nom_produit?.toLowerCase().includes(rechercheProduit.toLowerCase())
            );
        }

        return resultat;
    }, [filtreEtat, products, rechercheProduit]);

    // ── PAGINATION ──
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexLastItem = currentPage * itemsPerPage;
    const indexFirstItem = indexLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexFirstItem, indexLastItem);

    const handleFilterChange = (statut) => {
        setFiltreEtat(statut);
        setCurrentPage(1);
    };

    const detailProduit = (id) => {
        navigate(`/admin/detail_produits/${id}`);
    };

    const handleResetDates = () => {
        setDateDebut("");
        setDateFin("");
    };

    // ── BASCULER LA DISPONIBILITÉ ──
    const statut_produit = async (id, currentStatus) => {
        const nvxStatut = Number(currentStatus) === 1 ? 0 : 1;

        setProducts(prevProducts =>
            prevProducts.map(prod =>
                prod.id_produit === id ? { ...prod, est_disponible: nvxStatut } : prod
            )
        );

        try {
            const response = await fetch(`http://localhost:8000/api/admin/products/${id}/toggle-disponibilite`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Impossible de synchroniser le nouvel état sur le serveur.");
            }
        } catch (err) {
            alert(err.message);
            setProducts(prevProducts =>
                prevProducts.map(prod =>
                    prod.id_produit === id ? { ...prod, est_disponible: currentStatus } : prod
                )
            );
        }
    };

    // ── ÉTATS VISUELS DE CHARGEMENT & ERREUR ──
    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center gap-2 text-slate-400 bg-white font-sans">
                <Loader2 className="animate-[spin_1.2s_linear_infinite] text-[#9ADE7B]" size={24} />
                <span className="text-xs uppercase tracking-[0.2em] font-bold">Synchronisation du catalogue...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 text-slate-900 bg-white font-sans">
                <p className="text-rose-600 font-bold text-sm">Erreur Système : {error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="px-5 py-3 bg-slate-900 hover:bg-black text-white transition-colors rounded-xl font-bold text-xs uppercase tracking-wider shadow-md border-none cursor-pointer"
                >
                    Recharger la page
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans px-4 md:px-8 py-12 pb-20 w-full box-border flex flex-col gap-8">
            
            {/* Titre principal de la page */}
            <header className="flex flex-col gap-1.5 w-full">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-slate-900 m-0">
                    Gestion des Produits
                </h1>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#9ADE7B]">
                        VOLTA NETWORK SERVICE
                    </span>
                </div>
            </header>

            {/* 🌟 NOUVELLE BARRE DE RECHERCHE DYNAMIQUE (Identique à celle des clients) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 box-border">
                <div className="flex items-center gap-2 bg-white border border-slate-200 focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-[#9ADE7B]/20 rounded-xl px-3 py-2.5 w-full max-w-md transition-all box-border shadow-xs">
                    <Search size={16} className={`transition-colors ${estEnTrainDeFiltrer ? "text-[#9ADE7B]" : "text-slate-400"}`} />
                    <input 
                        type="text" 
                        placeholder="Rechercher un produit par sa désignation..." 
                        value={rechercheProduit}
                        onChange={(e) => setRechercheProduit(e.target.value)}
                        className="w-full bg-transparent border-none text-xs text-slate-800 focus:outline-none font-sans font-semibold placeholder-slate-400"
                    />
                    {rechercheProduit && (
                        <button 
                            onClick={() => setRechercheProduit("")}
                            className="text-[10px] font-bold text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-md cursor-pointer border-none transition-colors"
                        >
                            Effacer
                        </button>
                    )}
                </div>

                {/* Scanneur de réseau visuel */}
                {rechercheProduit && (
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                        estEnTrainDeFiltrer 
                            ? "bg-[#9ADE7B]/20 text-slate-900 animate-pulse scale-105" 
                            : "bg-slate-100 text-slate-500"
                    }`}>
                        <Sparkles size={12} className={estEnTrainDeFiltrer ? "animate-spin text-[#9ADE7B]" : ""} />
                        <span>{estEnTrainDeFiltrer ? "Scan du catalogue..." : `${filteredData.length} trouvé(s)`}</span>
                    </div>
                )}
            </div>

            {/* ── Entête & Filtres existants ── */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 w-full bg-white border-b border-slate-100 pb-6">
                
                {/* Onglets Filtres d'état */}
                <div className="flex gap-1.5 bg-slate-50 p-1.5 rounded-xl border border-slate-100 w-full sm:w-auto">
                    {["tous", "disponible", "indisponible"].map((etat) => (
                        <button 
                            key={etat}
                            className={`flex-1 sm:flex-none px-5 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all border-none uppercase tracking-wider ${
                                filtreEtat === etat 
                                    ? "bg-slate-900 text-white shadow-sm" 
                                    : "text-slate-600 hover:text-slate-900 bg-transparent"
                            }`}
                            onClick={() => handleFilterChange(etat)}
                        >
                            {etat === "tous" ? "Tous" : etat}
                        </button>
                    ))}
                </div>

                {/* Filtres par Date */}
                <div className="flex flex-wrap gap-3 items-center text-xs text-slate-600 w-full sm:w-auto">
                    <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl px-3 py-2 shadow-sm w-full sm:w-auto">
                        <Calendar size={14} className="text-slate-400" />
                        <span className="text-slate-400">Du :</span>
                        <input 
                            type="date" 
                            value={dateDebut}
                            onChange={(e) => setDateDebut(e.target.value)}
                            className="bg-transparent text-slate-900 font-bold border-none outline-none cursor-pointer p-0 text-xs font-sans" 
                        />
                    </div>
                    
                    <span className="hidden sm:inline font-bold text-slate-400 uppercase text-[10px] tracking-wider">au</span>
                    
                    <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl px-3 py-2 shadow-sm w-full sm:w-auto">
                        <Calendar size={14} className="text-slate-400" />
                        <span className="text-slate-400">Au :</span>
                        <input 
                            type="date" 
                            value={dateFin}
                            onChange={(e) => setDateFin(e.target.value)}
                            className="bg-transparent text-slate-900 font-bold border-none outline-none cursor-pointer p-0 text-xs font-sans" 
                        />
                    </div>

                    {/* Bouton pour réinitialiser les filtres de date */}
                    {(dateDebut || dateFin) && (
                        <button 
                            onClick={handleResetDates}
                            className="text-[10px] font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl transition-colors border-none cursor-pointer uppercase tracking-wider"
                        >
                            Réinitialiser
                        </button>
                    )}
                </div>
            </div>

            {/* ── Tableau des produits ── */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xl flex flex-col w-full">
                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse text-left m-0">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase text-center w-[80px]">Aperçu</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Désignation du produit</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase text-center w-[160px]">Catégorie</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase text-right w-[160px]">Prix unitaire</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase text-center w-[130px]">État</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase text-center w-[100px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {currentItems.length > 0 ? (
                                currentItems.map((produit) => {
                                    const isAvailable = Number(produit.est_disponible) === 1;
                                    
                                    return (
                                        <tr key={produit.id_produit} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="p-4 text-center align-middle">
                                                <img 
                                                    src={produit.url_image_principale || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&auto=format&fit=crop&q=80"} 
                                                    alt={produit.nom_produit} 
                                                    onClick={() => detailProduit(produit.id_produit)}
                                                    className="w-12 h-12 object-cover rounded-xl border border-slate-100 bg-slate-50 shadow-sm cursor-pointer transition-transform duration-200 hover:scale-105" 
                                                />
                                            </td>
                                            <td className="p-4 align-middle">
                                                <div className="flex flex-col cursor-pointer" onClick={() => detailProduit(produit.id_produit)}>
                                                    {/* 🌟 MODIFIÉ : Utilisation de la fonction de surlignage sur la désignation */}
                                                    <h4 className="font-bold text-slate-900 text-sm m-0 group-hover:text-slate-600 transition-colors">
                                                        {SurlignerTexte(produit.nom_produit, rechercheProduit)}
                                                    </h4>
                                                    <p className="text-xs text-slate-600 m-0 mt-0.5 line-clamp-1">
                                                        {produit.apropos || produit.description_produit || "Aucune description fournie"}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center align-middle">
                                                <span className="inline-block bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                                                    {produit.sous_categorie?.nom_sous_categorie || "Général"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right align-middle text-slate-900 font-bold text-sm tracking-tight">
                                                {Intl.NumberFormat('fr-FR').format(produit.prix_unitaire_produit || 0)} <span className="text-[10px] font-medium text-slate-400 ml-0.5">FCFA</span>
                                            </td>
                                            <td className="p-4 text-center align-middle">
                                                <span className={`inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-xl w-[105px] text-center ${
                                                    isAvailable 
                                                        ? "bg-[#9ADE7B]/20 text-slate-900" 
                                                        : "bg-rose-50 text-rose-600"
                                                }`}>
                                                    {isAvailable ? "Disponible" : "Indisponible"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center align-middle">
                                                <button 
                                                    className={`p-1 bg-transparent border-none cursor-pointer transition-all active:scale-90 inline-flex items-center justify-center ${
                                                        isAvailable ? "text-[#9ADE7B]" : "text-slate-300 hover:text-slate-400"
                                                    }`}
                                                    onClick={() => statut_produit(produit.id_produit, produit.est_disponible)}
                                                    title={isAvailable ? "Désactiver le produit" : "Activer le produit"}
                                                >
                                                    {isAvailable ? (
                                                        <ToggleRight size={28} className="stroke-[1.5]" />
                                                    ) : (
                                                        <ToggleLeft size={28} className="stroke-[1.5]" />
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center text-sm font-medium text-slate-400">
                                        Aucun produit trouvé dans cette sélection
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Structure de Pagination ── */}
            {totalPages > 1 && (
                <div className="flex justify-end items-center gap-1.5 mt-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="p-2 cursor-pointer rounded-xl border border-slate-100 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm text-slate-600 flex items-center justify-center"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 cursor-pointer rounded-xl text-xs font-bold transition-all duration-200 ${
                                currentPage === page 
                                    ? "bg-slate-900 text-white shadow-lg border-none font-extrabold" 
                                    : "bg-white border border-slate-100 text-slate-400 hover:bg-slate-50 shadow-sm"
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="p-2 cursor-pointer rounded-xl border border-slate-100 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm text-slate-600 flex items-center justify-center"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}