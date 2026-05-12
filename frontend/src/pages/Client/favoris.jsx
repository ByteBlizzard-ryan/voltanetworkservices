import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, Heart, History, LogOut, ShieldCheck, 
  ArrowLeft, ShoppingCart, Eye 
} from 'lucide-react';
import { Link,useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export default function Favorites() {
  const favoriteProducts = [
    {
      id: 1,
      name: "Pont du Périmètre Quantique",
      category: "DOMOTIQUE",
      price: "25,000 FCFA",
      description: "Dispositif d'inspection de paquets de prochaine génération utilisant une...",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=500"
    },
    {
      id: 2,
      name: "Pont du Périmètre Quantique",
      category: "DOMOTIQUE",
      price: "25,000 FCFA",
      description: "Dispositif d'inspection de paquets de prochaine génération utilisant une...",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=500"
    },
    {
      id: 3,
      name: "Pont du Périmètre Quantique",
      category: "DOMOTIQUE",
      price: "25,000 FCFA",
      description: "Dispositif d'inspection de paquets de prochaine génération utilisant une...",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=500"
    }
  ];

  const location = useLocation(); // Récupère l'URL actuelle (ex: "/profil")
  return (
    <div className="min-h-screen bg-[#F6F7F9] pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* En-tête */}
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
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-black tracking-tight text-gray-950 uppercase">Mes Favoris</h2>
                <p className="text-gray-400 text-sm mt-2 max-w-lg font-medium">
                  Retrouvez ici tous les produits enregistrés pour vos futurs déploiements.
                </p>
              </div>
            </div>

            <motion.div 
              layout
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 pt-6"
            >
              {favoriteProducts.map((product, index) => (
                <FavoriteCard key={product.id} product={product} index={index} />
              ))}
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

const FavoriteCard = ({ product, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white rounded-[0.5rem] overflow-hidden border border-gray-100 shadow-sm group hover:shadow-xl hover:border-[#9ADE7B]/30 transition-all duration-300"
  >
    <div className="relative h-48 overflow-hidden bg-gray-100">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-[0.5rem] flex items-center justify-center shadow-md hover:bg-red-50 transition-colors">
        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
      </button>
    </div>

    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <span className="text-[9px] font-black text-[#9ADE7B] uppercase tracking-[0.2em]">{product.category}</span>
        <span className="text-xs font-black text-gray-900">{product.price}</span>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-bold text-sm text-gray-950 leading-tight min-h-[2.5rem]">{product.name}</h3>
        <p className="text-[10px] text-gray-400 leading-relaxed font-medium line-clamp-2">
          {product.description}
        </p>
      </div>

      <div className="pt-2 space-y-2">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="w-full bg-[#9ADE7B] hover:bg-black hover:text-white text-[#1A4301] font-black py-3 rounded-[0.5rem] text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all"
        >
          <ShoppingCart className="w-3.5 h-3.5" /> Ajouter au panier
        </motion.button>
        <button className="w-full bg-transparent border border-gray-100 hover:bg-gray-50 text-gray-400 font-bold py-3 rounded-[0.5rem] text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all">
          <Eye className="w-3.5 h-3.5" /> Voir le produit
        </button>
      </div>
    </div>
  </motion.div>
);