import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2, Package, Video, Loader2 } from "lucide-react";

const badgeIconMap = {
  shield: <ShieldCheck size={14} className="text-emerald-700" />,
  lock: <Lock size={14} className="text-emerald-700" />,
};

const thumbIcons = [
  <Package size={20} />,
  <Package size={20} />,
  <Package size={20} />,
  <Video size={20} />,
];

export default function ProductDetail() {
  const { id_product } = useParams(); 
  const navigate = useNavigate();

  // ── ÉTATS DYNAMIQUES ──
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeThumb, setActiveThumb] = useState(0);

  // ── CHARGEMENT DU PRODUIT DEPUIS L'API LARAVEL ──
  useEffect(() => {
    async function fetchProductDetail() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:8000/api/produits/${id_product}`);
        
        if (!response.ok) {
          throw new Error("Impossible de récupérer les détails de ce produit.");
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id_product) {
      fetchProductDetail();
    }
  }, [id_product]);

  const retourListe = () => {
    navigate("/admin/products");
  };

  // ── GESTION DES ÉTATS VISUELS DE CHARGEMENT ──
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center gap-2 text-gray-500">
        <Loader2 className="animate-[spin_1.2s_linear_infinite] text-[#9ADE7B]" size={24} />
        <span className="font-sans text-xs uppercase tracking-wider font-bold">Chargement de la fiche produit...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 text-gray-800">
        <p className="text-red-500 font-bold font-sans">Erreur Système : {error || "Produit introuvable"}</p>
        <button 
          onClick={retourListe} 
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-xl font-bold text-xs uppercase tracking-wider border-none cursor-pointer"
        >
          Retour à la liste
        </button>
      </div>
    );
  }

  // ── PRÉPARATION DE LA GALERIE DYNAMIQUE ──
  const gallery = [
    { id: "main", src: product.url_image_principale, alt: product.nom_produit },
    // ✅ CORRECTION ICI : Remplacement par la clé 'images_secondaires' générée par le JSON de Laravel
    ...(product.images_secondaires || []).map((img, index) => ({
      id: img.id_image_secondaire || index,   // Attrapé depuis le modèle ImageProduit
      src: img.url_image_secondaire,         // Attrapé depuis le modèle ImageProduit
      alt: `Vue secondaire ${index + 1}`
    }))
  ];

  // Sécurité pour éviter un index hors limites si la galerie est vide
  const currentImage = gallery[activeThumb] || { src: "", alt: "" };

  return (
    <div className="min-h-screen bg-white font-[Cambria,Cochin,Georgia,Times,'Times_New_Roman',serif] px-4 md:px-8 py-12 pb-20 w-full box-border flex flex-col gap-10">
      
      {/* ── Header ── */}
      <header className="border-b border-gray-100 pb-6 flex items-start justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-gray-900 m-0">
            Détail produit
          </h1>
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-emerald-700 font-sans">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${Number(product.est_disponible) === 1 ? 'bg-emerald-600 animate-pulse' : 'bg-rose-500'}`} />
            {Number(product.est_disponible) === 1 ? "Produit Actif / En Ligne" : "Produit Hors ligne"}
          </span>
        </div>
        <button 
          className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-gray-500 bg-transparent border-none p-0 cursor-pointer transition-colors duration-150 hover:text-gray-900 font-sans" 
          onClick={retourListe}
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          Retour à la liste
        </button>
      </header>

      {/* ── Body (Main Grid) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start w-full">
        
        {/* Colonne Gauche : Gallery */}
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full aspect-[4/3] bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-sm">
            {currentImage.src ? (
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-300">
                <Package size={48} strokeWidth={1} />
                <span className="text-[10px] uppercase tracking-wider font-bold font-sans text-gray-400">Aperçu indisponible</span>
              </div>
            )}
          </div>

          {/* Vignettes dynamiques */}
          <div className="grid grid-cols-4 gap-3">
            {gallery.map((thumb, idx) => (
              <button
                key={thumb.id}
                className={`aspect-square bg-gray-50 rounded-xl border-2 flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-150 text-gray-400 hover:border-gray-300 ${
                  idx === activeThumb ? "border-gray-900 bg-white shadow-sm" : "border-transparent"
                }`}
                onClick={() => setActiveThumb(idx)}
                aria-label={thumb.alt}
              >
                {thumb.src ? (
                  <img src={thumb.src} alt={thumb.alt} className="w-full h-full object-cover" />
                ) : (
                  thumbIcons[idx] ?? <Package size={20} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Colonne Droite : Info */}
        <div className="flex flex-col gap-6 w-full">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-gray-400 font-sans">
            <span className="text-gray-900">Catalogue</span>
            {product.sous_categorie?.nom_sous_categorie && (
              <>
                <span className="font-normal text-gray-300">/</span>
                <span>{product.sous_categorie.nom_sous_categorie}</span>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 tracking-tight m-0 leading-tight">
              {product.nom_produit}
            </h2>
            <p className="text-lg font-bold text-[#4CAF50] m-0 tracking-tight font-sans">
              {Intl.NumberFormat('fr-FR').format(product.prix_unitaire_produit || 0)} FCFA
            </p>
          </div>

          <div className="flex flex-col gap-3 border-l-2 border-gray-100 pl-4">
            <p className="text-sm leading-relaxed text-gray-600 m-0 text-justify">
              {product.description_produit || "Aucune description courte disponible pour ce produit."}
            </p>
          </div>

          {/* Badges horizontaux fixes */}
          <div className="flex gap-2 flex-wrap mt-2">
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-sans">
              {badgeIconMap.shield}
              Garantie Volta Service
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-sans">
              {badgeIconMap.lock}
              Sécurisé
            </span>
          </div>
        </div>
      </div>

      {/* ── About Section ── */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start border-t border-gray-100 pt-10 w-full">
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold tracking-widest uppercase text-gray-900 m-0 font-sans">
            À propos du produit
          </h3>
          <div className="w-6 h-[2px] bg-gray-900 rounded-full" />
        </div>
        
        <div className="flex flex-col gap-6 w-full">
          <p className="text-sm leading-relaxed text-gray-600 m-0 text-justify">
            {product.apropos || "Aucun détail complémentaire fourni pour le moment."}
          </p>
          
          {/* Caractéristiques techniques */}
          {product.caracteristiques && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 list-none p-0 m-0 font-sans">
              {product.caracteristiques.split('\n').map((feat, i) => (
                feat.trim() && (
                  <li key={i} className="flex items-start gap-3 text-xs leading-relaxed text-gray-600 text-justify">
                    <CheckCircle2 size={16} className="text-[#9ADE7B] shrink-0 mt-0.5" />
                    <span className="font-medium">{feat}</span>
                  </li>
                )
              ))}
            </ul>
          )}
        </div>
      </div>

    </div>
  );
}