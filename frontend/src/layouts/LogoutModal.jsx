import React from 'react';
import { LogOut, X } from 'lucide-react';

export default function LogoutModal({ isOpen, onClose, onLogout }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay sombre avec flou */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Carte Modale */}
      <div className="relative bg-white w-full max-w-[480px] rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-white animate-in fade-in zoom-in duration-300">
        
        {/* Bouton Fermer (X) */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-gray-950 transition-colors"
        >
          <X className="w-6 h-6" strokeWidth={1.5} />
        </button>

        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Icône Sortie Stylisée */}
          <div className="w-20 h-20 bg-[#F6F7F9] rounded-2xl flex items-center justify-center text-[#1A4301]">
            <LogOut className="w-8 h-8" strokeWidth={1.5} />
          </div>

          {/* Textes */}
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-gray-950 tracking-tight">
              Confirmer la déconnexion
            </h2>
            <p className="text-gray-500 font-medium text-lg">
              Êtes-vous sûr de vouloir vous déconnecter ?
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="w-full space-y-4 pt-4">
            <button 
              onClick={onLogout}
              className="w-full bg-[#C11F1F] hover:bg-[#a31a1a] text-white font-black py-5 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all shadow-lg shadow-red-500/20"
            >
              Se déconnecter
            </button>
            
            <button 
              onClick={onClose}
              className="w-full bg-[#E5E9EB] hover:bg-[#d8dee1] text-[#4A5568] font-black py-5 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}