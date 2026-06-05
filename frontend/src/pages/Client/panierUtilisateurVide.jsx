import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartEmpty() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 font-sans text-slate-900 overflow-x-hidden">
      {/* --- ICON CONTAINER --- */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#9ADE7B]/10 blur-3xl rounded-full scale-150"></div>
        <div className="relative w-32 h-32 bg-white rounded-full shadow-2xl shadow-slate-100 flex items-center justify-center border border-slate-50">
          <ShoppingBag className="w-12 h-12 text-slate-300" strokeWidth={1.5} />
          {/* Petit badge zéro flottant */}
          <div className="absolute top-6 right-6 w-6 h-6 bg-[#9ADE7B] rounded-full border-4 border-white flex items-center justify-center text-[10px] font-extrabold text-slate-900">
            0
          </div>
        </div>
      </div>

      {/* --- TEXT CONTENT --- */}
      <div className="space-y-4 max-w-sm mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Votre panier est <span className="text-[#9ADE7B]">vide</span>
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed font-medium">
          Il semble que vous n'ayez pas encore ajouté d'équipement de sécurité à votre inventaire. Protégez votre infrastructure dès maintenant.
        </p>
      </div>

      {/* --- ACTION BUTTON --- */}
      <Link 
        to="/boutique" 
        className="group bg-slate-900 hover:bg-[#9ADE7B] text-white hover:text-slate-900 font-extrabold py-5 px-10 rounded-xl flex items-center gap-4 transition-all shadow-xl hover:shadow-[#9ADE7B]/10 uppercase tracking-widest text-xs"
      >
        Explorer la boutique
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
      </Link>

      {/* --- SUBTLE BACKGROUND ELEMENTS --- */}
      <div className="mt-20 flex justify-center gap-3 opacity-20">
         <div className="w-12 h-1 bg-slate-300 rounded-full"></div>
         <div className="w-12 h-1 bg-[#9ADE7B] rounded-full"></div>
         <div className="w-12 h-1 bg-slate-300 rounded-full"></div>
      </div>
    </div>
  );
}