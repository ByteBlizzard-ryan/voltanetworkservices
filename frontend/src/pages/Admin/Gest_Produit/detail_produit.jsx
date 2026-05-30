import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2, Package, Video } from "lucide-react";

// 📦 DONNÉES DU PRODUIT INTÉGRÉES DIRECTEMENT
const product = {
  id: "PROD_001",
  category: "Sécurité",
  subcategory: "Caméras Connectées",
  name: "Caméra Sentinelle Pro X1",
  price: "85,000 CFA",
  shortDescriptions: [
    "La Sentinelle Pro X1 redéfinit la surveillance domestique grâce à son traitement d'image assisté par IA et son chiffrement de bout en bout.",
    "Bénéficiez d'une vision nocturne de qualité militaire et d'alertes instantanées envoyées directement sur vos appareils connectés en cas d'intrusion."
  ],
  badges: [
    { icon: "shield", label: "Garantie 2 ans" },
    { icon: "lock", label: "Données chiffrées" }
  ],
  gallery: [
    { id: "img1", src: "https://images.unsplash.com/photo-1557324268-ac4c78587dbe?q=80&w=600&auto=format&fit=crop", alt: "Vue principale Sentinelle Pro X1" },
    { id: "img2", src: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop", alt: "Détail objectif grand angle" },
    { id: "img3", src: "https://images.unsplash.com/photo-1590408595524-749e99214736?q=80&w=600&auto=format&fit=crop", alt: "Installation murale" },
    { id: "img4", src: "", alt: "Présentation vidéo" }
  ],
  about: {
    body: "Conçue pour résister aux conditions climatiques les plus extrêmes, la Sentinelle Pro X1 est le bouclier idéal pour votre propriété. Son boîtier certifié IP67 garantit un fonctionnement optimal sous la pluie, la poussière ou le soleil de plomb. Grâce à son intégration transparente aux protocoles de sécurité actuels, elle assure une réactivité sans faille.",
    features: [
      "Détection de mouvement intelligente par IA (distinction humains / animaux).",
      "Qualité vidéo Ultra HD 4K avec HDR automatique jour/nuit.",
      "Audio bidirectionnel avec réduction active des bruits ambiants.",
      "Autonomie renforcée et compatibilité avec alimentation solaire."
    ]
  }
};

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
  const [activeThumb, setActiveThumb] = useState(0);
  const navigate = useNavigate();

  const retourListe = () => {
    navigate("/admin/products");
  };

  return (
    <div className="min-h-screen bg-white font-[Cambria,Cochin,Georgia,Times,'Times_New_Roman',serif] px-4 md:px-8 py-12 pb-20 w-full box-border flex flex-col gap-10">
      
      {/* ── Header ── */}
      <header className="border-b border-gray-100 pb-6 flex items-start justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-gray-900 m-0">
            Détail produit
          </h1>
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-emerald-700 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 animate-pulse" />
            Live Security Protocol Active
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
            {product.gallery[activeThumb]?.src ? (
              <img
                src={product.gallery[activeThumb].src}
                alt={product.gallery[activeThumb].alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-300">
                <Package size={48} strokeWidth={1} />
                <span className="text-[10px] uppercase tracking-wider font-bold font-sans text-gray-400">Aperçu indisponible</span>
              </div>
            )}
          </div>

          {/* Vignettes */}
          <div className="grid grid-cols-4 gap-3">
            {product.gallery.map((thumb, idx) => (
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
            <span className="text-gray-900">{product.category}</span>
            {product.subcategory && (
              <>
                <span className="font-normal text-gray-300">/</span>
                <span>{product.subcategory}</span>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 tracking-tight m-0 leading-tight">
              {product.name}
            </h2>
            <p className="text-lg font-bold text-[#4CAF50] m-0 tracking-tight font-sans">
              {product.price}
            </p>
          </div>

          <div className="flex flex-col gap-3 border-l-2 border-gray-100 pl-4">
            {product.shortDescriptions.map((desc, i) => (
              <p key={i} className="text-sm leading-relaxed text-gray-600 m-0 text-justify">
                {desc}
              </p>
            ))}
          </div>

          {/* Badges horizontaux épurés */}
          <div className="flex gap-2 flex-wrap mt-2">
            {product.badges.map((badge, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-sans">
                {badgeIconMap[badge.icon] ?? <ShieldCheck size={14} className="text-emerald-700" />}
                {badge.label}
              </span>
            ))}
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
            {product.about.body}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 list-none p-0 m-0 font-sans">
            {product.about.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-3 text-xs leading-relaxed text-gray-600 text-justify">
                <CheckCircle2
                  size={16}
                  className="text-[#9ADE7B] shrink-0 mt-0.5"
                />
                <span className="font-medium">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}