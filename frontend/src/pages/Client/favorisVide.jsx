import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, Heart, History, LogOut, ShieldCheck, 
  ArrowLeft, Search, Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FavoritesEmpty() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- HEADER PROFIL --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-black tracking-tighter text-gray-900 flex items-center gap-4 uppercase">
            Mon Profil <span className="w-3 h-3 bg-[#9ADE7B] rounded-full"></span>
          </h1>
          <p className="text-gray-500 font-medium mt-2">Gérez vos informations personnelles et vos paramètres.</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          
          {/* --- SIDEBAR --- */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[0.5rem] p-6 shadow-sm border border-gray-100 space-y-2"
          >
            <div className="flex items-center gap-3 p-4 mb-6 bg-[#F6F7F9] rounded-[0.5rem]">
              <div className="w-10 h-10 bg-[#9ADE7B] rounded-[0.5rem] flex items-center justify-center text-[#1A4301]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter leading-none text-gray-900">
                Volta Network <br /> Services
              </span>
            </div>

            <SidebarItem icon={<User className="w-5 h-5" />} label="Informations personnelles" />
            <SidebarItem icon={<Heart className="w-5 h-5" />} label="Favoris" active />
            <SidebarItem icon={<History className="w-5 h-5" />} label="Historique commande" />
            
            <div className="pt-10">
              <button className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 rounded-[0.5rem] transition-all font-bold text-xs uppercase tracking-widest text-left group">
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Déconnexion
              </button>
            </div>
          </motion.aside>

          {/* --- CONTENU VIDE (DROITE) --- */}
          <main className="lg:col-span-3">
            <div className="flex justify-between items-end mb-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-4xl font-black tracking-tight text-gray-950 uppercase">Mes Favoris</h2>
              </motion.div>
            </div>

            {/* Zone d'état vide */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-[0.5rem] border border-gray-100 shadow-sm"
            >
              
              {/* Icône Coeur Stylisée */}
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-[#F6F7F9] rounded-[0.5rem] flex items-center justify-center">
                  <Heart className="w-12 h-12 text-gray-200" strokeWidth={1.5} />
                </div>
                {/* Petit point de notification vert */}
                <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-[#9ADE7B] border-4 border-white rounded-full"></div>
              </div>

              <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tight mb-4">
                Votre sélection est vide
              </h3>
              
              <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed font-medium mb-12">
                Vous n’avez aucun produit en favoris pour le moment. Parcourez notre catalogue de solutions haute performance pour commencer.
              </p>

              <Link 
                to="/boutique" 
                className="bg-[#9ADE7B] hover:bg-black hover:text-white text-[#1A4301] font-black py-4 px-10 rounded-[0.5rem] text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-[#9ADE7B]/10 flex items-center gap-3 group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" /> Découvrir les produits
              </Link>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, label, active = false }) => (
  <button className={`w-full flex items-center gap-4 px-6 py-4 rounded-[0.5rem] transition-all font-bold text-xs uppercase tracking-widest text-left ${
    active ? 'bg-[#9ADE7B] text-[#1A4301] shadow-lg shadow-[#9ADE7B]/10' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
  }`}>
    {icon}
    <span>{label}</span>
  </button>
);