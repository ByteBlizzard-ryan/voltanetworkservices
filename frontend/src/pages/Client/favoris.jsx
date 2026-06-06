import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Heart, History, LogOut, Loader2,
  Eye, HeartOff 
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.svg';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // --- LOGIQUE DE DÉCONNEXION ---
  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion API", error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  // --- CHARGEMENT DES FAVORIS ---
  const fetchFavorites = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/favoris', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des favoris", error);
      if (error.response?.status === 401) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // --- SUPPRIMER UN FAVORI ---
  const toggleFavorite = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://127.0.0.1:8000/api/favoris/toggle', 
        { id_produit: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavorites(favorites.filter(fav => fav.id_produit !== productId));
    } catch (error) {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-12 pb-20 font-sans text-slate-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- HEADER UNIFORMISÉ --- */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 flex items-center gap-4">
            Mon Profil <span className="w-2.5 h-2.5 bg-[#9ADE7B] rounded-full shadow-sm shadow-[#9ADE7B]/50"></span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Gérez vos produits favoris et vos paramètres.</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          
          {/* --- SIDEBAR UNIFORMISÉE --- */}
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 space-y-1.5 lg:sticky lg:top-24">
            <div className="flex items-center gap-3 p-4 mb-4 bg-slate-50 rounded-lg border border-slate-100">
              <img src={logo} alt="Volta" className="w-6 h-6 object-contain" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-900 leading-tight">
                Volta Network <br /> Services
              </span>
            </div>

            <Link to="/profil" className="block">
              <SidebarItem icon={<User size={16} />} label="Informations" active={location.pathname === "/profil"} />
            </Link>
            <Link to="/favoris" className="block">
              <SidebarItem icon={<Heart size={16} />} label="Favoris" active={location.pathname === "/favoris"} />
            </Link>
            <Link to="/historique-commandes" className="block">
              <SidebarItem icon={<History size={16} />} label="Historique" active={location.pathname === "/historique-commandes"} />
            </Link>

            <button 
              onClick={handleLogout} 
              className="w-full flex items-center gap-4 px-5 py-3.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-all font-extrabold text-[10px] uppercase tracking-widest group text-left mt-8"
            >
              <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Déconnexion
            </button>
          </motion.aside>

          {/* --- CONTENU DES FAVORIS --- */}
          <main className="lg:col-span-3 space-y-6">
            <div className="border-b border-slate-100 pb-5">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Mes Favoris</h2>
              <p className="text-slate-500 text-xs mt-1 font-medium">
                {favorites.length} produit(s) enregistré(s) pour vos futurs déploiements.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-[#9ADE7B]" />
              </div>
            ) : favorites.length > 0 ? (
              <motion.div layout className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                  {favorites.map((product, index) => (
                    <FavoriteCard 
                      key={product.id_produit} 
                      product={product} 
                      index={index} 
                      onRemove={() => toggleFavorite(product.id_produit)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="bg-white p-16 md:p-20 rounded-xl border-2 border-dashed border-slate-200 text-center flex flex-col items-center shadow-sm">
                <Heart className="w-12 h-12 text-slate-200 mb-4" />
                <p className="text-slate-400 font-extrabold uppercase text-[10px] tracking-widest mb-5">Aucun favori pour le moment.</p>
                <Link to="/boutique" className="inline-flex items-center bg-slate-900 hover:bg-black text-[#9ADE7B] font-extrabold px-6 py-3.5 rounded-lg text-[11px] uppercase tracking-widest transition-all shadow-md shadow-slate-900/5">
                  Explorer la boutique
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// --- SOUS-COMPOSANTS RE-STYLISÉS ---

const SidebarItem = ({ icon, label, active = false }) => (
  <div className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-lg transition-all font-extrabold text-[11px] uppercase tracking-wider cursor-pointer ${
    active 
      ? 'bg-[#9ADE7B] text-slate-900 shadow-md shadow-[#9ADE7B]/10' 
      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
  }`}>
    {icon}
    <span>{label}</span>
  </div>
);

const FavoriteCard = ({ product, index, onRemove }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ delay: index * 0.04 }}
    className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm group hover:shadow-xl hover:border-[#9ADE7B]/30 transition-all duration-300 flex flex-col h-full"
  >
    <div className="relative h-48 overflow-hidden bg-slate-50 shrink-0 border-b border-slate-50">
      <img 
        src={product.url_image_principale} 
        alt={product.nom_produit} 
        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
      />
      <button 
        onClick={onRemove}
        className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all group/btn"
      >
        <HeartOff size={16} className="group-hover/btn:scale-105 transition-transform" />
      </button>
    </div>

    <div className="p-5 flex flex-col flex-grow justify-between gap-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center gap-2">
          <span className="inline-block bg-[#9ADE7B]/15 text-slate-900 text-[9px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-md">
            {product.sous_categorie?.nom_sous_categorie || "MATÉRIEL"}
          </span>
          <span className="text-xs font-extrabold text-slate-900 whitespace-nowrap">
            {Number(product.prix_unitaire_produit).toLocaleString()} FCFA
          </span>
        </div>
        
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-slate-900 tracking-tight line-clamp-1 group-hover:text-black transition-colors">{product.nom_produit}</h3>
          <p className="text-xs text-slate-400 font-medium line-clamp-2 leading-relaxed">
            {product.description_courte_produit}
          </p>
        </div>
      </div>

      <div className="pt-1">
        <Link 
          to={`/produit/${product.id_produit}`}
          className="w-full bg-slate-50 hover:bg-slate-900 text-slate-600 hover:text-[#9ADE7B] border border-slate-200/60 hover:border-slate-900 font-extrabold py-3 rounded-lg text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
        >
          <Eye size={14} /> Voir le produit
        </Link>
      </div>
    </div>
  </motion.div>
);