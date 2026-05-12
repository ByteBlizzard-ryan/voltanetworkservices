import React, { useState } from 'react';
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import ProductGrid from '../../components/ProductGrid';

const mesProduits = [
  {
    id: 1,
    name: "Caméra Sentinelle X1",
    category: "Surveillance",
    price: "85.000 FCFA",
    desc: "Vision nocturne ultra-précise et détection thermique intégrée.",
    image:"https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
    badge: "Populaire"
  },
  // ... ajoute autant de produits que tu veux
];

const categories = [
  { name: "Matériel électrique", count: 88 },
  { name: "Sécurité physique", count: 24 },
  { name: "IoT", count: 15 },
  { name: "Domotique", count: 12 },
  { name: "Sonorisation", count: 12 },
];

const products = [
  {
    id: 1,
    name: "Camera de surveillance",
    category: "SECURITE PHYSIQUE",
    price: "25,000 FCFA",
    desc: "Optique 4K de qualité militaire avec vision nocturne thermique et...",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=500",
    badge: "SECURITE"
  },
  {
    id: 2,
    name: "Controleur d'accès",
    category: "SECURITE PHYSIQUE",
    price: "20,000 FCFA",
    desc: "Hub d'authentification par iris et empreinte digitale cryptés avec en...",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=500",
    badge: "IOT"
  },
  {
    id: 3,
    name: "Pare-feu d'entreprise",
    category: "SECURITE PHYSIQUE",
    price: "15,000 FCFA",
    desc: "Chiffrement au niveau matériel avec architecture zero-trust et 10 Gbps...",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=500",
    badge: "SONO"
  },
  {
    id: 4,
    name: "Disque NAS chiffré",
    category: "DOMOTIQUE",
    price: "25,000 FCFA",
    desc: "Stockage cloud local avec chiffrement matériel AES-256 bits et auto-...",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=500",
    badge: null
  },
  {
    id: 5,
    name: "Pont du Périmètre Quantique",
    category: "DOMOTIQUE",
    price: "25,000 FCFA",
    desc: "Dispositif d'inspection de paquets de prochaine génération utilisant une...",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=500",
    badge: null
  },
  {
    id: 6,
    name: "Nœud WiFi Cinétique",
    category: "DOMOTIQUE",
    price: "25,000 FCFA",
    desc: "Point d'accès sans fil renforcé avec formation de faisceau localisée et...",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=500",
    badge: null
  }
];

export default function Boutique() {
  const [activeCategory, setActiveCategory] = useState("Sécurité physique");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white pt-12 pb-20">
      {/* Modification : gap-6 sur mobile et gap-12 sur desktop pour réduire l'espace sous les catégories */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-2 md:gap-8">
        
        {/* --- SIDEBAR FILTERS --- */}
        <aside className="w-full md:w-64">
          <div 
            className="flex items-center justify-between md:justify-start gap-2 mb-4 md:mb-6 text-gray-900 cursor-pointer md:cursor-default bg-gray-50 md:bg-transparent p-4 md:p-0 rounded-xl border border-gray-100 md:border-none"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-volta-green" />
              <h3 className="font-bold text-sm uppercase tracking-widest">Catégories</h3>
            </div>
            <ChevronRight className={`w-4 h-4 md:hidden transition-transform ${isCategoryOpen ? 'rotate-90' : ''}`} />
          </div>

          <ul className={`${isCategoryOpen ? 'flex' : 'hidden'} md:flex flex-col gap-3 md:space-y-4 mb-4 md:mb-0`}>
            {categories.map((cat) => (
              <li 
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.name);
                  setIsCategoryOpen(false);
                }}
                className={`flex justify-between items-center text-sm cursor-pointer transition-colors px-4 md:px-0 py-2 md:py-0 rounded-lg md:rounded-none ${activeCategory === cat.name ? 'text-volta-green font-bold bg-green-50 md:bg-transparent' : 'text-gray-500 hover:text-volta-green'}`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] text-gray-300 font-mono">{cat.count.toString().padStart(2, '0')}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1">
          {/* Header Boutique */}
          <div className="mb-10 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 mb-4 text-center md:text-left">
              Inventaire de <span className="text-volta-green">Sécurité</span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-center md:text-left">
              <p className="text-gray-500 text-sm max-w-xl mx-auto md:mx-0">
                Parcourez notre matériel de surveillance et de protection des données de niveau élite conçu pour assurer une protection optimale.
              </p>
              <select className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-xs font-bold outline-none focus:ring-1 focus:ring-volta-green transition-all w-fit mx-auto md:mx-0">
                <option>Trier par : prix</option>
                <option>Plus récents</option>
              </select>
            </div>
          </div>




            {/* Grille de Produits - justify-items-center est la clé ici */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white border border-gray-50 rounded-2xl p-4 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full 
                          /* Centrage Mobile */
                          w-[100%] mx-auto 
                          /* Reset Desktop */
                          sm:w-full sm:mx-0 max-w-[350px] md:max-w-none"
              >
                
                {/* Image Wrapper */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-6 shrink-0">
                  {product.badge && (
                    <span className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-[9px] font-black px-3 py-1 rounded-full text-gray-900 uppercase tracking-widest">
                      {product.badge}
                    </span>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>

                {/* Infos */}
                <div className="space-y-3 flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-volta-green tracking-widest uppercase">{product.category}</span>
                    <span className="text-lg font-black text-[#1A4301] tracking-tighter">{product.price}</span>
                  </div>
                  {/* Tu peux ajouter 'text-center md:text-left' ici si tu veux tester le centrage du texte */}
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">{product.name}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {product.desc}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-8">
                  <button className="flex-1 bg-[#F6F7F9] hover:bg-volta-green hover:text-white text-gray-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all active:scale-95">
                    <ShoppingCart className="w-4 h-4" /> Panier
                  </button>
                  <button className="w-12 bg-[#F6F7F9] hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl flex items-center justify-center transition-all active:scale-95">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center items-center gap-4">
            <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-10 h-10 bg-volta-green text-white font-bold rounded-lg shadow-lg shadow-volta-green/20">1</button>
            <button className="w-10 h-10 hover:bg-gray-50 text-gray-400 font-bold rounded-lg transition-colors">2</button>
            <button className="w-10 h-10 hover:bg-gray-50 text-gray-400 font-bold rounded-lg transition-colors">3</button>
            <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </main>
      </div>
    </div>
  );
}