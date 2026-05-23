import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartEmpty() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      {/* --- ICON CONTAINER --- */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#9ADE7B]/10 blur-3xl rounded-full scale-150"></div>
        <div className="relative w-32 h-32 bg-white rounded-full shadow-2xl shadow-gray-100 flex items-center justify-center border border-gray-50">
          <ShoppingBag className="w-12 h-12 text-gray-200" strokeWidth={1.5} />
          {/* Petit badge zéro flottant */}
          <div className="absolute top-6 right-6 w-6 h-6 bg-[#9ADE7B] rounded-full border-4 border-white flex items-center justify-center text-[10px] font-black text-[#1A4301]">
            0
          </div>
        </div>
      </div>

      {/* --- TEXT CONTENT --- */}
      <div className="space-y-4 max-w-sm mb-10">
        <h2 className="text-3xl font-bold tracking-tighter text-gray-900">
          Votre panier est <span className="text-[#9ADE7B]">vide</span>
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Il semble que vous n'ayez pas encore ajouté d'équipement de sécurité à votre inventaire. Protégez votre infrastructure dès maintenant.
        </p>
      </div>

      {/* --- ACTION BUTTON --- */}
      <Link 
        to="/boutique" 
        className="group bg-gray-900 hover:bg-[#9ADE7B] text-white hover:text-[#1A4301] font-black py-5 px-10 rounded-2xl flex items-center gap-4 transition-all shadow-xl hover:shadow-[#9ADE7B]/20 uppercase tracking-widest text-xs"
      >
        Explorer la boutique
        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
      </Link>

      {/* --- SUBTLE BACKGROUND ELEMENTS --- */}
      <div className="mt-20 grid grid-cols-3 gap-8 opacity-20 grayscale">
         <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
         <div className="w-12 h-1 bg-[#9ADE7B] rounded-full"></div>
         <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}