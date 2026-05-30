import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ToggleLeft, ToggleRight, Calendar, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function Gest_produit() {
    const navigate = useNavigate();
    
    // ── ÉTATS DU COMPOSANT ──
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filtreEtat, setFiltreEtat] = useState("tous");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // ── 1. CHARGEMENT DES PRODUITS DEPUIS L'API LARAVEL ──
    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch("http://localhost:8000/api/produits");
                
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
        }

        fetchProducts();
    }, []);

    // ── 2. FILTRAGE DYNAMIQUE ──
    const filteredData = useMemo(() => {
        if (filtreEtat === "tous") return products;
        if (filtreEtat === "disponible") {
            return products.filter(item => Number(item.est_disponible) === 1);
        }
        if (filtreEtat === "indisponible") {
            return products.filter(item => Number(item.est_disponible) === 0);
        }
        return products;
    }, [filtreEtat, products]);

    // ── 3. PAGINATION ──
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexLastItem = currentPage * itemsPerPage;
    const indexFirstItem = indexLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexFirstItem, indexLastItem);

    const handleFilterChange = (statut) => {
        setFiltreEtat(statut);
        setCurrentPage(1);
    };

    // Redirection vers le détail (Utilise l'ID dynamique de ton App.jsx: id_product)
    const detailProduit = (id) => {
        navigate(`/admin/detail_produits/${id}`);
    };

    // ── 4. ACTION INTERACTIVE : BASCULER LA DISPONIBILITÉ ──
    const statut_produit = async (id, currentStatus) => {
        const nvxStatut = Number(currentStatus) === 1 ? 0 : 1;

        // Optimisme de l'interface : mise à jour visuelle immédiate pour fluidifier l'expérience
        setProducts(prevProducts =>
            prevProducts.map(prod =>
                prod.id_produit === id ? { ...prod, est_disponible: nvxStatut } : prod
            )
        );

        try {
            // Requête PATCH pour synchroniser l'état en Base de données
            const response = await fetch(`http://localhost:8000/api/admin/products/${id}/toggle-disponibilite`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ est_disponible: nvxStatut })
            });

            if (!response.ok) {
                throw new Error("Impossible de synchroniser le nouvel état sur le serveur.");
            }
        } catch (err) {
            // Rollback en cas de panne réseau ou de bug serveur
            alert(err.message);
            setProducts(prevProducts =>
                prevProducts.map(prod =>
                    prod.id_produit === id ? { ...prod, est_disponible: currentStatus } : prod
                )
            );
        }
    };

    // ── GESTION DES ÉTATS VISUELS DE CHARGEMENT ──
    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center gap-2 text-gray-500">
                <Loader2 className="animate-[spin_1.2s_linear_infinite] text-[#9ADE7B]" size={24} />
                <span className="font-sans text-xs uppercase tracking-wider font-bold">Synchronisation du catalogue...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 text-gray-800">
                <p className="text-red-500 font-bold font-sans">Erreur Système : {error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl font-bold text-xs uppercase tracking-wider"
                >
                    Recharger la page
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-[Cambria,Cochin,Georgia,Times,'Times_New_Roman',serif] px-4 md:px-8 py-12 pb-20 w-full box-border flex flex-col gap-8">
            
            {/* Titre principal de la page */}
            <header className="flex flex-col gap-1.5 w-full">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-gray-900 m-0">Gestion des Produits</h1>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#9ADE7B]">VOLTA NETWORK SERVICE</span>
                </div>
            </header>

            {/* ── Entête & Filtres ── */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 w-full bg-white p-1 border-b border-gray-100 pb-6">
                
                {/* Onglets Filtres d'état */}
                <div className="flex gap-1.5 bg-gray-50 p-1.5 rounded-xl border border-gray-100 w-full sm:w-auto">
                    {["tous", "disponible", "indisponible"].map((etat) => (
                        <button 
                            key={etat}
                            className={`flex-1 sm:flex-none px-5 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all border-none uppercase tracking-wider ${
                                filtreEtat === etat 
                                    ? "bg-gray-900 text-white shadow-sm" 
                                    : "text-gray-500 hover:text-gray-900 bg-transparent"
                            }`}
                            onClick={() => handleFilterChange(etat)}
                        >
                            {etat === "tous" ? "Tous" : etat}
                        </button>
                    ))}
                </div>

                {/* Filtres par Date */}
                <div className="flex flex-wrap gap-3 items-center font-sans text-xs text-gray-500 w-full sm:w-auto">
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-full sm:w-auto">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-gray-400">Du :</span>
                        <input type="date" className="bg-transparent text-gray-800 font-medium border-none outline-none cursor-pointer p-0 text-xs font-sans" />
                    </div>
                    <span className="hidden sm:inline font-medium text-gray-400">au</span>
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-full sm:w-auto">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-gray-400">Au :</span>
                        <input type="date" className="bg-transparent text-gray-800 font-medium border-none outline-none cursor-pointer p-0 text-xs font-sans" />
                    </div>
                </div>
            </div>

            {/* ── Tableau des produits ── */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl flex flex-col w-full font-sans">
                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse text-left m-0">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-center w-[80px]">Aperçu</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">Désignation du produit</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-center w-[160px]">Catégorie</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-right w-[160px]">Prix unitaire</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-center w-[130px]">État</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-center w-[100px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentItems.length > 0 ? (
                                currentItems.map((produit) => {
                                    const isAvailable = Number(produit.est_disponible) === 1;
                                    
                                    return (
                                        <tr key={produit.id_produit} className="hover:bg-gray-50/60 transition-colors group">
                                            <td className="p-4 text-center align-middle">
                                                <img 
                                                    src={produit.url_image_principale || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&auto=format&fit=crop&q=80"} 
                                                    alt={produit.nom_produit} 
                                                    onClick={() => detailProduit(produit.id_produit)}
                                                    className="w-12 h-12 object-cover rounded-xl border border-gray-100 bg-gray-50 shadow-sm cursor-pointer transition-transform duration-200 hover:scale-105" 
                                                />
                                            </td>
                                            <td className="p-4 align-middle">
                                                <div className="flex flex-col cursor-pointer" onClick={() => detailProduit(produit.id_produit)}>
                                                    <h4 className="font-serif font-bold text-gray-900 text-sm m-0 group-hover:text-[#88cb6d] transition-colors">
                                                        {produit.nom_produit}
                                                    </h4>
                                                    <p className="text-xs text-gray-400 m-0 mt-0.5 font-sans font-medium line-clamp-1">
                                                        {produit.apropos || produit.description_produit || "Aucune description fournie"}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center align-middle">
                                                <span className="inline-block bg-gray-100 text-gray-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                                                    {produit.sous_categorie?.nom_sous_categorie || "Général"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right align-middle text-gray-900 font-bold text-sm tracking-tight font-sans">
                                                {Intl.NumberFormat('fr-FR').format(produit.prix_unitaire_produit || 0)} <span className="text-[10px] font-serif font-medium text-gray-400 ml-0.5">FCFA</span>
                                            </td>
                                            <td className="p-4 text-center align-middle">
                                                <span className={`inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-xl w-[105px] text-center ${
                                                    isAvailable 
                                                        ? "bg-emerald-50 text-emerald-700" 
                                                        : "bg-rose-50 text-rose-600"
                                                }`}>
                                                    {isAvailable ? "Disponible" : "Indisponible"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center align-middle">
                                                <button 
                                                    className={`p-1 bg-transparent border-none cursor-pointer transition-all active:scale-90 inline-flex items-center justify-center ${
                                                        isAvailable ? "text-[#9ADE7B]" : "text-gray-300"
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
                                    <td colSpan="6" className="p-12 text-center text-sm font-medium text-gray-400">
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
                <div className="flex justify-end items-center gap-1.5 mt-2 font-sans">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="p-2 cursor-pointer rounded-xl border border-gray-100 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm text-gray-600 flex items-center justify-center"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 cursor-pointer rounded-xl text-xs font-bold transition-all duration-200 ${
                                currentPage === page 
                                    ? "bg-gray-900 text-white shadow-md border-none" 
                                    : "bg-white border border-gray-100 text-gray-500 hover:bg-gray-50 shadow-sm"
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="p-2 cursor-pointer rounded-xl border border-gray-100 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm text-gray-600 flex items-center justify-center"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}