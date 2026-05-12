import React, { useState } from 'react';
import { ShoppingCart, Heart, ShieldCheck, Lock, CheckCircle2, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProduitDetaille() {
  const [selectedImage, setSelectedImage] = useState(0);

  // Données simulées du produit basées sur ta maquette
  const product = {
    name: "Terminal d'accès Bio-Lock Pro",
    price: "25,000 FCFA",
    category: "BOUTIQUE / SÉCURITÉ PHYSIQUE",
    shortDesc: "Scanner biométrique haute précision pour l'entrée sécurisée des entreprises. S'intègre parfaitement au réseau Kinetic Sentinel pour la surveillance des menaces en temps réel et l'enregistrement automatisé des entrées.",
    specs: [
      { icon: <ShieldCheck className="w-4 h-4" />, text: "SUB-0.2S AUTH" },
      { icon: <Lock className="w-4 h-4" />, text: "AES-256 ENCRYPTION" }
    ],
    longDesc: "Le Bio-Lock Pro représente le summum de la défense autonome du périmètre. Conçu avec un capteur biométrique en réseau neuronal propriétaire, il élimine les faux positifs tout en maintenant des vitesses d'authentification parmi les meilleures du secteur. En tant que nœud central de l'écosystème Voltanetwork, ce terminal ne se contente pas d'ouvrir les portes — il agit comme un sentinelle intelligent, recoupant chaque demande d'entrée avec les protocoles de sécurité mondiaux et les algorithmes locaux de détection d'anomalies.",
    features: [
      "Le capteur optique multi-spectral détecte le pouls et la température de la peau.",
      "Prise en charge transparente du protocole OSDP pour l'intégration.",
      "Le stockage interne de sécurité maintient les journaux d'accès même hors ligne.",
      "Résistance aux intempéries IP67 et indice de résistance aux chocs IK10."
    ],
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800"
    ]
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- SECTION 1: ACHAT --- */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          
          {/* Galerie d'images */}
          <div className="space-y-6">
            <div className="aspect-square rounded-3xl overflow-hidden bg-[#F6F7F9] border border-gray-100 shadow-sm">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-[#9ADE7B]' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img src={img} alt="Miniature" className="w-full h-full object-cover" />
                </button>
              ))}
              <div className="aspect-square rounded-xl bg-[#F6F7F9] flex flex-col items-center justify-center text-[#9ADE7B] cursor-pointer hover:bg-[#9ADE7B]/10 transition-colors">
                <PlayCircle className="w-8 h-8 mb-1" />
                <span className="text-[8px] font-bold uppercase">Vidéo</span>
              </div>
            </div>
          </div>

          {/* Informations d'achat */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#9ADE7B] text-[10px] font-bold tracking-[0.3em] uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-[#9ADE7B]"></div>
                {product.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-950">
                {product.name}
              </h1>
              <p className="text-3xl font-black text-[#1A4301] tracking-tighter">{product.price}</p>
            </div>

            <p className="text-gray-500 leading-relaxed text-sm">
              {product.shortDesc}
            </p>

            <div className="flex gap-8 py-4 border-y border-gray-100">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span className="text-[#9ADE7B]">{spec.icon}</span>
                  {spec.text}
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-[#9ADE7B] hover:bg-[#89cf6a] text-[#1A4301] font-bold py-5 rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-xs">
                <ShoppingCart className="w-5 h-5" /> Ajouter au panier
              </button>
              <button className="w-16 bg-[#F6F7F9] hover:bg-gray-100 text-gray-400 hover:text-red-500 rounded-xl flex items-center justify-center transition-all">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: DESCRIPTION DÉTAILLÉE --- */}
        <div className="grid lg:grid-cols-3 gap-16 py-20 border-t border-gray-100">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter uppercase mb-4">À propos du produit</h2>
            <div className="w-12 h-1 bg-[#9ADE7B]"></div>
          </div>
          <div className="lg:col-span-2 space-y-12">
            <p className="text-gray-500 leading-relaxed text-lg italic">
              {product.longDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#9ADE7B] shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 leading-snug font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- SECTION 3: COMPLÉMENTS ESSENTIELS --- */}
        <div className="pt-20 border-t border-gray-100">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl font-bold tracking-tighter">Compléments essentiels</h2>
            <Link to="/boutique" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-1 hover:text-[#9ADE7B] hover:border-[#9ADE7B] transition-all">
              Parcourir la collection
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white border border-gray-50 rounded-2xl p-4 hover:shadow-xl transition-all group">
                <div className="aspect-square rounded-xl bg-[#F6F7F9] overflow-hidden mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    alt="Related product"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-bold">
                    <span className="text-[#9ADE7B] uppercase">DOMOTIQUE</span>
                    <span className="text-gray-900">25,000 FCFA</span>
                  </div>
                  <h4 className="font-bold text-sm">Disque NAS chiffré</h4>
                  <button className="w-full mt-4 bg-gray-50 group-hover:bg-[#9ADE7B] group-hover:text-white py-2 rounded-lg text-[10px] font-bold uppercase transition-colors">
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}