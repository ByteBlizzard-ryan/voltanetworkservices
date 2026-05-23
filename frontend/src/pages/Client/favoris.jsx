import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Heart, History, LogOut, Loader2,
  ShoppingCart, Eye, HeartOff 
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
    <div className="min-h-screen bg-[#F6F7F9] pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* En-tête */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter text-gray-900 flex items-center gap-4 uppercase">
            MON PROFIL <span className="w-3 h-3 bg-[#9ADE7B] rounded-full"></span>
          </h1>
          <p className="text-gray-500 font-medium mt-2 italic">Gérez vos produits favoris et vos paramètres.</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          
          {/* SIDEBAR */}
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[0.5rem] p-6 shadow-sm border border-gray-100 space-y-2 sticky top-10">
            <div className="flex items-center gap-3 p-4 mb-6 bg-[#F6F7F9] rounded-[0.5rem]">
               <img src={logo} alt="Volta" className="w-8 h-8" />
              <span className="text-[10px] font-black uppercase tracking-tighter leading-none text-gray-900">
                Volta Network <br /> Services
              </span>
            </div>

            <Link to="/profil" className="block"><SidebarItem icon={<User className="w-5 h-5" />} label="Informations" active={location.pathname === "/profil"} /></Link>
            <Link to="/favoris" className="block"><SidebarItem icon={<Heart className="w-5 h-5" />} label="Favoris" active={location.pathname === "/favoris"} /></Link>
            <Link to="/historique-commandes" className="block"><SidebarItem icon={<History className="w-5 h-5" />} label="Historique" active={location.pathname === "/historique-commandes"} /></Link>

            <div className="pt-10">
              <button 
                onClick={handleLogout} 
                className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 rounded-[0.5rem] transition-all font-bold text-xs uppercase tracking-widest text-left group"
              >
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Déconnexion
              </button>
            </div>
          </motion.aside>

          {/* CONTENU DES FAVORIS */}
          <main className="lg:col-span-3 space-y-8">
            <div>
              <h2 className="text-4xl font-black tracking-tight text-gray-950 uppercase italic">Mes Favoris</h2>
              <p className="text-gray-400 text-sm mt-2 max-w-lg font-medium">
                {favorites.length} produit(s) enregistré(s) pour vos futurs déploiements.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-[#9ADE7B]" /></div>
            ) : favorites.length > 0 ? (
              <motion.div layout className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 pt-6">
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
              <div className="bg-white p-20 rounded-[0.5rem] border-2 border-dashed border-gray-100 text-center flex flex-col items-center">
                <Heart className="w-12 h-12 text-gray-100 mb-4" />
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-4">Aucun favori pour le moment.</p>
                <Link to="/boutique" className="text-[#9ADE7B] font-black uppercase text-[11px] hover:underline transition-all">Explorer la boutique</Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// --- SOUS-COMPOSANTS ---

const SidebarItem = ({ icon, label, active = false }) => (
  <div className={`w-full flex items-center gap-4 px-6 py-4 rounded-[0.5rem] transition-all font-bold text-xs uppercase tracking-widest ${
    active ? 'bg-[#9ADE7B] text-[#1A4301] shadow-lg shadow-[#9ADE7B]/10' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
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
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ delay: index * 0.05 }}
    className="bg-white rounded-[0.5rem] overflow-hidden border border-gray-100 shadow-sm group hover:shadow-xl hover:border-[#9ADE7B]/30 transition-all duration-300"
  >
    <div className="relative h-48 overflow-hidden bg-gray-100">
      <img 
        src={product.url_image_principale} 
        alt={product.nom_produit} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
      />
      <button 
        onClick={onRemove}
        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-[0.5rem] flex items-center justify-center shadow-md hover:bg-red-50 text-red-500 transition-all group/btn"
      >
        <HeartOff className="w-5 h-5 group-hover/btn:scale-110" />
      </button>
    </div>

    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <span className="text-[9px] font-black text-[#9ADE7B] uppercase tracking-[0.2em]">
          {product.sous_categorie?.nom_sous_categorie || "MATÉRIEL"}
        </span>
        <span className="text-xs font-black text-gray-900">
          {Number(product.prix_unitaire_produit).toLocaleString()} FCFA
        </span>
      </div>
      
      <div className="space-y-1">
        <h3 className="font-bold text-sm text-gray-950 uppercase italic leading-tight min-h-[2.5rem] line-clamp-2">{product.nom_produit}</h3>
        <p className="text-[10px] text-gray-400 leading-relaxed font-medium line-clamp-2">
          {product.description_courte_produit}
        </p>
      </div>

      <div className="pt-2">
        <Link 
          to={`/produit/${product.id_produit}`}
          className="w-full bg-transparent border border-gray-100 hover:border-[#9ADE7B] hover:text-black text-gray-400 font-bold py-3 rounded-[0.5rem] text-[10px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all"
        >
          <Eye className="w-3.5 h-3.5" /> Voir le produit
        </Link>
      </div>
    </div>
  </motion.div>
);