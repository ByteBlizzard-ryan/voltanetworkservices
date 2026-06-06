import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function ProductSlider({ products = [] }) {
  const scrollRef = useRef(null);
  const { addToCart, searchQuery } = useCart();

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = 480; 
    if (direction === 'left') {
      current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const stripAccents = (str) => {
    if (!str) return "";
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const highlightText = (text, highlight) => {
    if (!highlight || typeof highlight !== 'string' || !highlight.trim()) {
      return <span>{text}</span>;
    }
    const cleanHighlight = stripAccents(highlight).toLowerCase();
    const escapedHighlight = cleanHighlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const textChars = text.split("");
    const normalizedText = stripAccents(text).toLowerCase();
    const parts = [];
    let lastIndex = 0;
    const regex = new RegExp(escapedHighlight, 'g');
    let match;

    while ((match = regex.exec(normalizedText)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        parts.push({ text: textChars.slice(lastIndex, matchIndex).join(""), isMatch: false });
      }
      parts.push({ text: textChars.slice(matchIndex, matchIndex + cleanHighlight.length).join(""), isMatch: true });
      lastIndex = matchIndex + cleanHighlight.length;
    }
    if (lastIndex < textChars.length) {
      parts.push({ text: textChars.slice(lastIndex).join(""), isMatch: false });
    }
    if (parts.length === 0) return <span>{text}</span>;
    return (
      <span>
        {parts.map((part, index) => 
          part.isMatch ? (
            <mark key={index} className="bg-[#9ADE7B]/30 text-[#1A4301] px-0.5 rounded font-extrabold">{part.text}</mark>
          ) : (
            part.text
          )
        )}
      </span>
    );
  };

  const formatPrice = (price) => new Intl.NumberFormat('fr-FR').format(price) + " FCFA";

  return (
    <div className="relative group max-w-7xl mx-auto px-4 py-10 font-sans">
      <div className="flex justify-between items-end mb-8 px-2">
        <div>
          <h2 className="text-2xl font-black tracking-tighter text-gray-900 uppercase">Nos Best-Sellers</h2>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mt-1">Équipements les plus sollicités</p>
        </div>
        
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="p-2.5 border border-gray-100 rounded-full bg-white hover:bg-gray-50 hover:shadow-md transition-all active:scale-90 cursor-pointer">
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
          <button onClick={() => scroll('right')} className="p-2.5 border border-gray-100 rounded-full bg-white hover:bg-gray-50 hover:shadow-md transition-all active:scale-90 cursor-pointer">
            <ChevronRight size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex overflow-x-auto gap-4 pb-8 scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {products?.map((product) => (
          /* FIX: Remplacement de product.id par product.id_produit pour correspondre aux clés Laravel */
          <div key={product.id_produit} className="snap-start shrink-0 w-[245px] bg-white border border-gray-100 rounded-2xl p-3.5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
            <Link to={`/produit/${product.id_produit}`} className="flex-1 flex flex-col">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 p-4 mb-4 flex items-center justify-center">
                {product.quantite_stock <= 3 && (
                  <span className="absolute top-3 left-3 z-10 bg-black text-[#9ADE7B] text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-[0.15em]">Stock Limité</span>
                )}
                <img src={product.url_image_principale} alt={product.nom_produit} className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-700" onError={(e) => { e.target.src = "https://via.placeholder.com/240" }} />
              </div>

              <div className="px-1 space-y-2 flex-1 pb-2">
                <div className="flex justify-between items-center gap-1">
                  <span className="text-[9px] font-extrabold text-[#9ADE7B] bg-[#9ADE7B]/10 px-2 py-0.5 rounded tracking-wider uppercase truncate max-w-[120px]">
                    {product.sous_categorie?.nom_sous_categorie || "Matériel"}
                  </span>
                  <span className="text-[13px] font-black text-[#1A4301] whitespace-nowrap">{formatPrice(product.prix_unitaire_produit)}</span>
                </div>
                <h3 className="text-xs font-bold text-gray-800 tracking-tight leading-tight hover:text-[#9ADE7B] transition-colors line-clamp-1">
                  {highlightText(product.nom_produit, searchQuery)}
                </h3>
                <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-2 font-medium">{product.apropos}</p>
              </div>
            </Link>

            <div className="pt-2 mt-2 border-t border-gray-50">
              <button onClick={() => addToCart(product)} className="w-full bg-slate-50 hover:bg-[#9ADE7B] text-slate-900 font-bold py-2 rounded-xl flex items-center justify-center gap-2 text-[10px] transition-all active:scale-95 cursor-pointer">
                <ShoppingCart size={12} /> Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}