import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ToggleLeft, ToggleRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

// ==========================================
// 1. DONNÉES LOCALES EMBARQUÉES (data.jsx)
// ==========================================
const initialData = [
    { 
        id: 1,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&auto=format&fit=crop&q=80",
        nom: "MacBook Pro 14",
        designation: "Ordinateur portable Apple M2 Pro",
        categorie: "Informatique",
        prix: "1200000",
        etat: "disponible"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=150&auto=format&fit=crop&q=80",
        nom: "Dell XPS 13",
        designation: "Ultrabook haute performance",
        categorie: "Informatique",
        prix: "950000",
        etat: "disponible"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=150&auto=format&fit=crop&q=80",
        nom: "iPhone 14 Pro",
        designation: "Smartphone Apple 128GB",
        categorie: "Téléphonie",
        prix: "850000",
        etat: "indisponible"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=80",
        nom: "Samsung Galaxy S23",
        designation: "Smartphone Android haut de gamme",
        categorie: "Téléphonie",
        prix: "780000",
        etat: "disponible"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=150&auto=format&fit=crop&q=80",
        nom: "Casque Sony WH-1000XM5",
        designation: "Casque audio à réduction de bruit",
        categorie: "Audio",
        prix: "180000",
        etat: "disponible"
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=150&auto=format&fit=crop&q=80",
        nom: "Clavier mécanique RGB",
        designation: "Clavier gaming rétroéclairé",
        categorie: "Gaming",
        prix: "45000",
        etat: "indisponible"
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=80",
        nom: "Chaussures Nike Air Max",
        designation: "Sneakers sport lifestyle",
        categorie: "Mode",
        prix: "60000",
        etat: "disponible"
    },
    {
        id: 8,
        image: "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?w=150&auto=format&fit=crop&q=80",
        nom: "Montre Apple Watch",
        designation: "Montre connectée série 8",
        categorie: "Wearable",
        prix: "250000",
        etat: "disponible"
    },
    {
        id: 9,
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=150&auto=format&fit=crop&q=80",
        nom: "Canon EOS R",
        designation: "Appareil photo professionnel",
        categorie: "Photographie",
        prix: "1500000",
        etat: "indisponible"
    },
    {
        id: 10,
        image: "https://images.unsplash.com/photo-1512499617640-c2f999098c2f?w=150&auto=format&fit=crop&q=80",
        nom: "Tablette iPad Air",
        designation: "Tablette Apple polyvalente",
        categorie: "Informatique",
        prix: "500000",
        etat: "disponible"
    }
];

// ==========================================
// 2. COMPOSANT PRINCIPAL
// ==========================================
export default function Gest_produit() {
    const navigate = useNavigate();
    
    // États
    const [products, setProducts] = useState(initialData);
    const [filtreEtat, setFiltreEtat] = useState("tous");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filtrage
    const filteredData = useMemo(() => {
        if (filtreEtat === "tous") return products;
        return products.filter(item => item.etat === filtreEtat);
    }, [filtreEtat, products]);

    // Pagination
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

    const statut_produit = (id) => {
        setProducts(prevProducts =>
            prevProducts.map(prod =>
                prod.id === id
                    ? { ...prod, etat: prod.etat === "disponible" ? "indisponible" : "disponible" }
                    : prod
            )
        );
    };

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
                                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-center w-[140px]">Catégorie</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-right w-[160px]">Prix unitaire</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-center w-[130px]">État</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-center w-[100px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {currentItems.length > 0 ? (
                                currentItems.map((produit) => (
                                    <tr key={produit.id} className="hover:bg-gray-50/60 transition-colors group">
                                        <td className="p-4 text-center align-middle">
                                            <img 
                                                src={produit.image} 
                                                alt={produit.nom} 
                                                onClick={() => detailProduit(produit.id)}
                                                className="w-12 h-12 object-cover rounded-xl border border-gray-100 bg-gray-50 shadow-sm cursor-pointer transition-transform duration-200 hover:scale-105" 
                                            />
                                        </td>
                                        <td className="p-4 align-middle">
                                            <div className="flex flex-col cursor-pointer" onClick={() => detailProduit(produit.id)}>
                                                <h4 className="font-serif font-bold text-gray-900 text-sm m-0 group-hover:text-[#88cb6d] transition-colors">{produit.nom}</h4>
                                                <p className="text-xs text-gray-400 m-0 mt-0.5 font-sans font-medium">{produit.designation}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center align-middle">
                                            <span className="inline-block bg-gray-100 text-gray-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                                                {produit.categorie}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right align-middle text-gray-900 font-bold text-sm tracking-tight font-sans">
                                            {Number(produit.prix).toLocaleString()} <span className="text-[10px] font-serif font-medium text-gray-400 ml-0.5">CFA</span>
                                        </td>
                                        <td className="p-4 text-center align-middle">
                                            <span className={`inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-xl w-[95px] text-center ${
                                                produit.etat === "disponible" 
                                                    ? "bg-emerald-50 text-emerald-700" 
                                                    : "bg-rose-50 text-rose-600"
                                            }`}>
                                                {produit.etat}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center align-middle">
                                            <button 
                                                className={`p-1 bg-transparent border-none cursor-pointer transition-all active:scale-90 inline-flex items-center justify-center ${
                                                    produit.etat === "disponible" ? "text-[#9ADE7B]" : "text-gray-300"
                                                }`}
                                                onClick={() => statut_produit(produit.id)}
                                                title={produit.etat === "disponible" ? "Désactiver le produit" : "Activer le produit"}
                                            >
                                                {produit.etat === "disponible" ? (
                                                    <ToggleRight size={28} className="stroke-[1.5]" />
                                                ) : (
                                                    <ToggleLeft size={28} className="stroke-[1.5]" />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))
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