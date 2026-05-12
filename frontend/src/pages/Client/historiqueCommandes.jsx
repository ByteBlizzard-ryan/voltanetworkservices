import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Heart, History, LogOut, ShieldCheck, 
  ExternalLink, Package, CheckCircle2, Clock, XCircle 
} from 'lucide-react';
import { Link,useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export default function OrderHistory() {
  const [activeTab, setActiveTab] = useState('TOUTES');

  const orders = [
    {
      id: "VN-1025",
      date: "12 Mars 2024",
      status: "PAYÉE",
      total: "2,500 FCFA",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=200",
      color: "text-green-500"
    },
    {
      id: "VN-1018",
      date: "05 Mars 2024",
      status: "EN COURS",
      total: "5,000 FCFA",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=200",
      color: "text-orange-500"
    },
    {
      id: "VN-0998",
      date: "20 Fév 2024",
      status: "ANNULÉE",
      total: "10,000 FCFA",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=200",
      color: "text-red-500"
    }
  ];

  const filteredOrders = activeTab === 'TOUTES' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

    const location = useLocation(); // Récupère l'URL actuelle (ex: "/profil")
  return (
    <div className="min-h-screen bg-[#F6F7F9] pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* HEADER PROFIL */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-black tracking-tighter text-gray-900 flex items-center gap-4">
            MON PROFIL <span className="w-3 h-3 bg-[#9ADE7B] rounded-full"></span>
          </h1>
          <p className="text-gray-500 font-medium mt-2">Gérez vos informations personnelles et vos paramètres.</p>
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

          {/* --- CONTENU --- */}
          <main className="lg:col-span-3 space-y-8">
            
            {/* Onglets */}
            <div className="flex gap-8 border-b border-gray-200 pb-1 overflow-x-auto no-scrollbar">
              {['TOUTES', 'EN COURS', 'PAYÉE', 'ANNULÉE'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-[11px] font-black tracking-[0.2em] transition-all relative whitespace-nowrap ${
                    activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9ADE7B]" 
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Liste des Commandes */}
            <div className="space-y-4">
              <AnimatePresence mode='popLayout'>
                {filteredOrders.map((order) => (
                  <motion.div 
                    key={order.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="bg-white rounded-[0.5rem] p-6 border border-gray-50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-md hover:border-gray-200 transition-all duration-300"
                  >
                    {/* Image & ID */}
                    <div className="flex items-center gap-6 flex-1 w-full">
                      <div className="w-24 h-24 bg-[#F6F7F9] rounded-[0.5rem] overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <img src={order.image} alt="Produit" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Référence</p>
                        <h3 className="text-xl font-black text-gray-950 tracking-tight">{order.id}</h3>
                        <p className="text-xs font-medium text-gray-400">{order.date}</p>
                      </div>
                    </div>

                    {/* Statut */}
                    <div className="flex flex-col items-center md:items-start gap-1 min-w-[120px] w-full md:w-auto">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Statut</p>
                      <div className={`flex items-center gap-2 font-black text-[11px] uppercase tracking-tighter ${order.color}`}>
                        <div className={`w-2 h-2 rounded-full bg-current shadow-[0_0_8px_currentColor]`}></div>
                        {order.status}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex flex-col items-center md:items-start gap-1 min-w-[120px] w-full md:w-auto">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total</p>
                      <p className="text-xl font-black text-gray-950 tracking-tighter">{order.total}</p>
                    </div>

                    {/* Bouton Action */}
                    <button className="w-full md:w-auto px-8 py-4 bg-transparent border-2 border-gray-100 hover:border-[#9ADE7B] hover:text-[#1A4301] text-gray-400 font-black text-[10px] uppercase tracking-widest rounded-[0.5rem] transition-all flex items-center justify-center gap-2 whitespace-nowrap group/btn">
                      Détails <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
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