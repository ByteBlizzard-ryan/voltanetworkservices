import React, { useRef } from 'react';
import { Plus, Heart, ChevronLeft, ChevronRight,ShoppingCart } from 'lucide-react';

export default function ProductSlider({ products }) {
  const scrollRef = useRef(null);

  // Fonction de défilement fluide
  const scroll = (direction) => {
    const { current } = scrollRef;
    // On définit le saut de scroll à la largeur d'environ 2 cartes pour plus de rapidité
    const scrollAmount = 480; 
    if (direction === 'left') {
      current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group max-w-7xl mx-auto px-4 py-10">
      
      {/* En-tête du Slider (Optionnel mais pro) */}
      <div className="flex justify-between items-end mb-8 px-2">
        <div>
          <h2 className="text-2xl font-black tracking-tighter text-gray-900 uppercase">Nos Best-Sellers</h2>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">Équipements les plus sollicités</p>
        </div>
        
        {/* Boutons de Navigation Styles */}
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2.5 border border-gray-100 rounded-full bg-white hover:bg-gray-50 hover:shadow-md transition-all active:scale-90"
          >
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2.5 border border-gray-100 rounded-full bg-white hover:bg-gray-50 hover:shadow-md transition-all active:scale-90"
          >
            <ChevronRight size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Conteneur de défilement Horizontal */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 pb-8 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <div 
            key={product.id} 
            className="snap-start shrink-0 w-[235px] group bg-white border border-gray-100 rounded-[0.5rem] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col"
          >
            
            {/* Image Wrapper (Fond gris doux) */}
            <div className="relative aspect-square rounded-[1rem] overflow-hidden bg-[#F9FAFB] p-4 mb-4">
              {product.badge && (
                <span className="absolute top-3 left-3 z-10 bg-black text-white text-[7px] font-black px-2 py-1 rounded-md uppercase tracking-[0.15em]">
                  {product.badge}
                </span>
              )}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
              />
            </div>

            {/* Infos Produits (Textes réduits pour l'esthétique) */}
            <div className="px-2 space-y-1.5 flex-1">
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-bold text-volta-green tracking-widest uppercase opacity-70">
                  {product.category}
                </span>
                <span className="text-[13px] font-black text-[#1A4301]">
                  {product.price}
                </span>
              </div>
              
              <h3 className="text-xs font-bold text-gray-800 tracking-tight leading-tight transition-colors">
                {product.name}
              </h3>
              
              <p className="text-gray-400 text-[9px] leading-relaxed line-clamp-2 font-medium">
                {product.desc}
              </p>
            </div>

            {/* Actions (Boutons plus compacts) */}
            <div className="flex gap-2 mt-8 px-1">
            <button className="flex-1 bg-[#F6F7F9] hover:bg-[#9ADE7B] hover:text-white text-gray-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all active:scale-95 group/btn">
                <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" /> 
                Panier
            </button>
            <button className="w-12 bg-[#F6F7F9] hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl flex items-center justify-center transition-all active:scale-95 border border-transparent hover:border-red-100">
                <Heart className="w-4 h-4" />
            </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}