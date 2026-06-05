import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, Heart, History, LogOut, ShieldCheck, 
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FavoritesEmpty() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- HEADER PROFIL --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 flex items-center gap-4 uppercase">
            Mon Profil <span className="w-3 h-3 bg-[#9ADE7B] rounded-full shadow-sm shadow-[#9ADE7B]/50"></span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Gérez vos informations personnelles et vos paramètres.</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          
          {/* --- SIDEBAR --- */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-1.5 sticky top-24"
          >
            <div className="flex items-center gap-3 p-4 mb-6 bg-slate-50 rounded-lg border border-slate-100">
              <div className="w-10 h-10 bg-[#9ADE7B]/15 rounded-lg flex items-center justify-center text-slate-900 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest leading-tight text-slate-900">
                Volta Network <br /> Services
              </span>
            </div>

            <SidebarItem icon={<User className="w-4 h-4" />} label="Informations personnelles" />
            <SidebarItem icon={<Heart className="w-4 h-4" />} label="Favoris" active />
            <SidebarItem icon={<History className="w-4 h-4" />} label="Historique commande" />
            
            <div className="pt-8">
              <button className="w-full flex items-center gap-4 px-5 py-3.5 text-red-600 hover:bg-red-50 rounded-lg transition-all font-extrabold text-xs uppercase tracking-widest text-left group">
                <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Déconnexion
              </button>
            </div>
          </motion.aside>

          {/* --- CONTENU VIDE (DROITE) --- */}
          <main className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">Mes Favoris</h2>
            </motion.div>

            {/* Zone d'état vide */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-xl border border-slate-100 shadow-sm"
            >
              
              {/* Icône Coeur Stylisée */}
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center shadow-inner">
                  <Heart className="w-12 h-12 text-slate-300" strokeWidth={1.5} />
                </div>
                {/* Petit point de notification vert */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#9ADE7B] border-4 border-white rounded-full shadow-sm shadow-[#9ADE7B]/50"></div>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight mb-4">
                Votre sélection est vide
              </h3>
              
              <p className="text-slate-500 text-sm md:text-base max-w-md leading-relaxed font-medium mb-10">
                Vous n’avez aucun produit en favoris pour le moment. Parcourez notre catalogue de solutions haute performance pour commencer.
              </p>

              <Link 
                to="/boutique" 
                className="bg-[#9ADE7B] hover:bg-slate-900 text-slate-900 hover:text-[#9ADE7B] font-extrabold py-4 px-8 rounded-lg text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#9ADE7B]/10 flex items-center gap-3 group"
              >
                <Search className="w-4 h-4 group-hover:scale-105 transition-transform duration-300" /> Découvrir les produits
              </Link>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, label, active = false }) => (
  <button className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-lg transition-all font-extrabold text-xs uppercase tracking-widest text-left ${
    active 
      ? 'bg-[#9ADE7B] text-slate-900 shadow-md shadow-[#9ADE7B]/10' 
      : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'
  }`}>
    {icon}
    <span>{label}</span>
  </button>
);