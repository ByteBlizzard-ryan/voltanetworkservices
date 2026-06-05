import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2, Package, Video, Loader2 } from "lucide-react";

const badgeIconMap = {
  shield: <ShieldCheck size={14} className="text-slate-900" />,
  lock: <Lock size={14} className="text-slate-900" />,
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

  // ── CHARGEMENT DU PRODUIT ──
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

  // ── CHARGEMENT VISUEL ──
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center gap-2 text-slate-400 bg-white font-sans">
        <Loader2 className="animate-[spin_1.2s_linear_infinite] text-[#9ADE7B]" size={24} />
        <span className="text-xs uppercase tracking-[0.2em] font-bold">Chargement de la fiche produit...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 text-slate-900 bg-white font-sans">
        <p className="text-rose-600 font-bold text-sm">Erreur Système : {error || "Produit introuvable"}</p>
        <button 
          onClick={retourListe} 
          className="px-5 py-3 bg-slate-900 hover:bg-black text-white transition-colors rounded-xl font-bold text-xs uppercase tracking-wider border-none cursor-pointer shadow-md"
        >
          Retour à la liste
        </button>
      </div>
    );
  }

  // ── GALERIE DYNAMIQUE ──
  const gallery = [
    { id: "main", src: product.url_image_principale, alt: product.nom_produit },
    ...(product.images_secondaires || []).map((img, index) => ({
      id: img.id_image_secondaire || index,
      src: img.url_image_secondaire,
      alt: `Vue secondaire ${index + 1}`
    }))
  ];

  const currentImage = gallery[activeThumb] || { src: "", alt: "" };

  return (
    <div className="min-h-screen bg-white font-sans px-4 md:px-8 py-12 pb-20 w-full box-border flex flex-col gap-10">
      
      {/* ── Header ── */}
      <header className="border-b border-slate-100 pb-6 flex items-start justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-slate-900 m-0">
            Détail produit
          </h1>
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-slate-900">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${Number(product.est_disponible) === 1 ? 'bg-[#9ADE7B] animate-pulse' : 'bg-rose-500'}`} />
            {Number(product.est_disponible) === 1 ? "Produit Actif / En Ligne" : "Produit Hors ligne"}
          </span>
        </div>
        <button 
          className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-400 bg-transparent border-none p-0 cursor-pointer transition-colors duration-150 hover:text-slate-900" 
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
          <div className="w-full aspect-[4/3] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg">
            {currentImage.src ? (
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-300">
                <Package size={48} strokeWidth={1} />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Aperçu indisponible</span>
              </div>
            )}
          </div>

          {/* Vignettes dynamiques */}
          <div className="grid grid-cols-4 gap-3">
            {gallery.map((thumb, idx) => (
              <button
                key={thumb.id}
                className={`aspect-square bg-slate-50 rounded-xl border-2 flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-150 text-slate-400 hover:border-slate-400 ${
                  idx === activeThumb ? "border-slate-900 bg-white shadow-sm" : "border-transparent"
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
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400">
            <span className="text-slate-900">Catalogue</span>
            {product.sous_categorie?.nom_sous_categorie && (
              <>
                <span className="font-normal text-slate-300">/</span>
                <span>{product.sous_categorie.nom_sous_categorie}</span>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight m-0 leading-tight">
              {product.nom_produit}
            </h2>
            <p className="text-lg font-bold text-[#9ADE7B] m-0 tracking-tight">
              {Intl.NumberFormat('fr-FR').format(product.prix_unitaire_produit || 0)} <span className="text-xs text-slate-400 font-medium ml-0.5">FCFA</span>
            </p>
          </div>

          <div className="flex flex-col gap-3 border-l-2 border-slate-100 pl-4">
            <p className="text-sm leading-relaxed text-slate-600 m-0 text-justify">
              {product.description_produit || "Aucune description courte disponible pour ce produit."}
            </p>
          </div>

          {/* Badges horizontaux fixes */}
          <div className="flex gap-2 flex-wrap mt-2">
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase bg-[#9ADE7B]/20 text-slate-900 px-3 py-1.5 rounded-lg">
              {badgeIconMap.shield}
              Garantie Volta Service
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase bg-[#9ADE7B]/20 text-slate-900 px-3 py-1.5 rounded-lg">
              {badgeIconMap.lock}
              Sécurisé
            </span>
          </div>
        </div>
      </div>

      {/* ── About Section ── */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start border-t border-slate-100 pt-10 w-full">
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-slate-900 m-0">
            À propos du produit
          </h3>
          <div className="w-6 h-[2px] bg-slate-900 rounded-full" />
        </div>
        
        <div className="flex flex-col gap-6 w-full">
          <p className="text-sm leading-relaxed text-slate-600 m-0 text-justify">
            {product.apropos || "Aucun détail complémentaire fourni pour le moment."}
          </p>
          
          {/* Caractéristiques techniques */}
          {product.caracteristiques && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 list-none p-0 m-0">
              {product.caracteristiques.split('\n').map((feat, i) => (
                feat.trim() && (
                  <li key={i} className="flex items-start gap-3 text-xs leading-relaxed text-slate-600 text-justify">
                    <CheckCircle2 size={16} className="text-[#9ADE7B] shrink-0 mt-0.5" />
                    <span className="font-bold text-slate-900">{feat}</span>
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