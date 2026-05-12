import React from 'react';
import { motion } from 'framer-motion';
import { User, Heart, History, LogOut, ShieldCheck, Edit3, Lock, Mail } from 'lucide-react';
import logo from '../../assets/logo.svg';
import { useLocation, Link } from 'react-router-dom';

export default function Profile() {
  const location = useLocation(); // Récupère l'URL actuelle (ex: "/profil")
  return (
    
    <div className="min-h-screen bg-[#F6F7F9] pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-black tracking-tighter text-gray-900 flex items-center gap-4">
            MON PROFIL <span className="w-3 h-3 bg-[#9ADE7B] rounded-full"></span>
          </h1>
          <p className="text-gray-500 font-medium mt-2">Gérez vos informations personnelles et vos paramètres d'accès.</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          
          {/* --- SIDEBAR (GAUCHE) --- */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[0.5rem] p-6 shadow-sm border border-gray-100 space-y-2"
          >
            <div className="flex items-center gap-3 p-4 mb-6 bg-[#F6F7F9] rounded-[0.5rem]">
              <div className="w-12 h-10 rounded-[0.5rem] flex items-center justify-center text-[#1A4301]">
                <img src={logo} alt="Volta" className="w-full h-full object-contain" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter leading-none text-gray-900">
                Volta Network <br /> Services
              </span>
            </div>

            {/* On compare location.pathname avec le lien de destination */}
            <Link to="/profil" className="block">
              <SidebarItem 
                icon={<User className="w-5 h-5" />} 
                label="Informations" 
                active={location.pathname === "/profil"} 
              />
            </Link>

            <Link to="/favoris" className="block">
              <SidebarItem 
                icon={<Heart className="w-5 h-5" />} 
                label="Favoris" 
                active={location.pathname === "/favoris" || location.pathname === "/favoris-vide"} 
              />
            </Link>

            <Link to="/historique-commandes" className="block">
              <SidebarItem 
                icon={<History className="w-5 h-5" />} 
                label="Historique" 
                active={location.pathname === "/historique-commandes"} 
              />
            </Link>

            <div className="pt-10">
              <button className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 rounded-[0.5rem] transition-all font-bold text-xs uppercase tracking-widest group text-left">
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Déconnexion
              </button>
            </div>
          </motion.aside>

          {/* --- CONTENU PRINCIPAL (DROITE) --- */}
          <main className="lg:col-span-3 space-y-8">
            
            {/* Section 1: Données d'opérateur */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[0.5rem] p-10 shadow-sm border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#9ADE7B]/5 to-transparent blur-3xl opacity-50"></div>
              
              <div className="flex justify-between items-center mb-10 relative z-10">
                <h2 className="text-2xl font-black tracking-tight text-gray-950 uppercase">Données d'opérateur</h2>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#9ADE7B] hover:text-[#1A4301] transition-colors group">
                  <Edit3 className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Modifier
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-12 relative z-10">
                <InfoDisplay label="Nom Complet" value="Alexandre Voltan" />
                <InfoDisplay label="Email Réseau" value="operator@voltanetwork.com" />
              </div>
            </motion.section>

            {/* Section 2: Protocoles de sécurité */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[0.5rem] p-10 shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-black tracking-tight text-gray-950 uppercase mb-10">Protocoles de sécurité</h2>
              
              <div className="space-y-8">
                <div className="max-w-md">
                  <InputProfile label="Mot de passe actuel" placeholder="••••••••••••" type="password" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <InputProfile label="Nouveau mot de passe" placeholder="••••••••••••" type="password" />
                  <InputProfile label="Confirmer" placeholder="••••••••••••" type="password" />
                </div>

                <div className="pt-4">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#9ADE7B] hover:bg-black hover:text-white text-[#1A4301] font-black py-4 px-10 rounded-[0.5rem] text-xs uppercase tracking-[0.2em] transition-all shadow-lg shadow-[#9ADE7B]/10"
                  >
                    Mettre à jour les accès
                  </motion.button>
                </div>
              </div>
            </motion.section>

          </main>
        </div>
      </div>
    </div>
  );
}

// --- SOUS-COMPOSANTS ---

const SidebarItem = ({ icon, label, active = false }) => (
  <button className={`w-full flex items-center gap-4 px-6 py-4 rounded-[0.5rem] transition-all font-bold text-xs uppercase tracking-widest ${
    active ? 'bg-[#9ADE7B] text-[#1A4301] shadow-lg shadow-[#9ADE7B]/10' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
  }`}>
    {icon}
    <span>{label}</span>
  </button>
);

const InfoDisplay = ({ label, value }) => (
  <div className="space-y-2">
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{label}</span>
    <p className="text-lg font-bold text-gray-900 tracking-tight">{value}</p>
  </div>
);

const InputProfile = ({ label, placeholder, type = "text" }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full bg-[#F6F7F9] border-none rounded-[0.5rem] p-5 text-sm font-bold placeholder:text-gray-300 focus:ring-2 focus:ring-[#9ADE7B] transition-all outline-none"
    />
  </div>
);