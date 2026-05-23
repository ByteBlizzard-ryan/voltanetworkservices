import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, SlidersHorizontal, Loader2, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext'; 

export default function Boutique() {
  // --- ÉTATS ---
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [favorites, setFavorites] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeCategory, setActiveCategory] = useState(null); 
  const [selectedSubCatId, setSelectedSubCatId] = useState(null); 
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); 
  const [favLoading, setFavLoading] = useState(null); 

  const { addToCart } = useCart();
  const navigate = useNavigate();

  // --- CHARGEMENT DES DONNÉES ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 1. Charger d'abord les données publiques (ne crash pas si le token est invalide)
        const [prodRes, catRes, subRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/produits'),
          axios.get('http://127.0.0.1:8000/api/categories'),
          axios.get('http://127.0.0.1:8000/api/sous-categories')
        ]);
        
        setProducts(prodRes.data);
        setCategories(catRes.data);
        setSubCategories(subRes.data);

        // 2. Charger les favoris séparément pour ne pas bloquer l'affichage global
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const favRes = await axios.get('http://127.0.0.1:8000/api/favoris', {
              headers: { Authorization: `Bearer ${token}` }
            });
            // On s'assure que favRes.data est bien un tableau d'IDs
            setFavorites(Array.isArray(favRes.data) ? favRes.data : []);
          } catch (favErr) {
            // Si le token est expiré (401), on le nettoie mais on laisse l'utilisateur voir les produits
            if (favErr.response?.status === 401) {
              localStorage.removeItem('token');
              setFavorites([]);
            }
          }
        }
      } catch (err) {
        console.error("Erreur API :", err);
        setError("Impossible de charger l'inventaire. Vérifiez votre connexion au serveur.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- GESTION DES FAVORIS ---
  const toggleFavorite = async (productId) => {
    const token = localStorage.getItem('token');
    
    // Redirection si non connecté avec petit feedback
    if (!token) {
      setFavLoading(productId);
      setTimeout(() => {
        setFavLoading(null);
        navigate('/login');
      }, 600);
      return;
    }

    setFavLoading(productId);

    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/favoris/toggle', 
        { id_produit: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Délai artificiel court pour une transition visuelle fluide
      setTimeout(() => {
        if (res.data.status === 'added') {
          setFavorites(prev => [...prev, productId]);
        } else {
          setFavorites(prev => prev.filter(id => id !== productId));
        }
        setFavLoading(null);
      }, 400);

    } catch (err) {
      setFavLoading(null);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        console.error("Erreur lors du toggle favori :", err);
      }
    }
  };

  // --- LOGIQUE DE CALCUL ET FILTRAGE ---
  const getTotalProducts = () => products.length;

  const getCountByCategory = (catId) => {
    const relatedSubCatIds = subCategories
      .filter(s => s.id_categorie_parente === catId)
      .map(s => s.id_sous_categorie);
    return products.filter(p => relatedSubCatIds.includes(p.id_sous_cat_fk)).length;
  };

  const getCountBySubCategory = (subCatId) => {
    return products.filter(p => p.id_sous_cat_fk === subCatId).length;
  };

  const filteredProducts = selectedSubCatId 
    ? products.filter(p => p.id_sous_cat_fk === selectedSubCatId)
    : products;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA";
  };

  // --- RENDU : ÉTATS DE CHARGEMENT ET ERREUR ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-[#9ADE7B] animate-spin mb-4" />
        <p className="text-gray-400 font-medium animate-pulse">Chargement de l'inventaire Volta...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Oups ! Une erreur est survenue</h2>
        <p className="text-gray-500 mb-6">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-[#9ADE7B] text-gray-900 px-8 py-3 rounded-xl font-bold uppercase text-sm">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-2 md:gap-8">
        
        {/* --- SIDEBAR FILTERS --- */}
        <aside className="w-full md:w-64">
          <div 
            className="flex items-center justify-between md:justify-start gap-2 mb-4 md:mb-6 text-gray-900 cursor-pointer md:cursor-default bg-gray-50 md:bg-transparent p-4 md:p-0 rounded-xl border border-gray-100"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#9ADE7B]" />
              <h3 className="font-bold text-sm uppercase tracking-widest">Catégories</h3>
            </div>
            <ChevronRight className={`w-4 h-4 md:hidden transition-transform ${isCategoryOpen ? 'rotate-90' : ''}`} />
          </div>

          <ul className={`${isCategoryOpen ? 'flex' : 'hidden'} md:flex flex-col gap-3 md:space-y-4`}>
            <li 
              onClick={() => { setSelectedSubCatId(null); setActiveCategory(null); }}
              className={`flex justify-between items-center text-sm cursor-pointer py-2 px-4 md:px-0 rounded-lg transition-all ${!selectedSubCatId ? 'text-[#9ADE7B] font-bold' : 'text-gray-500 hover:text-[#9ADE7B]'}`}
            >
              <span>Tous les produits</span>
              <span className="text-[10px] opacity-60 font-mono">({getTotalProducts()})</span>
            </li>

            {categories.map((cat) => (
              <li key={cat.id_categorie} className="flex flex-col">
                <div 
                  onClick={() => setActiveCategory(activeCategory === cat.id_categorie ? null : cat.id_categorie)}
                  className={`flex justify-between items-center text-sm cursor-pointer transition-colors px-4 md:px-0 py-2 rounded-lg ${activeCategory === cat.id_categorie ? 'text-[#9ADE7B] font-bold' : 'text-gray-500 hover:text-[#9ADE7B]'}`}
                >
                  <div className="flex items-center gap-2">
                    <span>{cat.nom_categorie}</span>
                    <span className="text-[10px] opacity-40 font-mono">({getCountByCategory(cat.id_categorie)})</span>
                  </div>
                  {activeCategory === cat.id_categorie ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </div>

                {activeCategory === cat.id_categorie && (
                  <ul className="ml-4 mt-1 space-y-1 border-l border-gray-100 pl-4">
                    {subCategories
                      .filter(sub => sub.id_categorie_parente === cat.id_categorie)
                      .map((sub) => (
                        <li 
                          key={sub.id_sous_categorie}
                          onClick={() => setSelectedSubCatId(sub.id_sous_categorie)}
                          className={`flex justify-between items-center text-xs py-1.5 cursor-pointer ${selectedSubCatId === sub.id_sous_categorie ? 'text-black font-bold' : 'text-gray-400 hover:text-[#9ADE7B]'}`}
                        >
                          <span>{sub.nom_sous_categorie}</span>
                          <span className="text-[9px] opacity-50">{getCountBySubCategory(sub.id_sous_categorie)}</span>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1">
          <div className="mb-10 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 mb-4 text-center md:text-left">
              Inventaire de <span className="text-[#9ADE7B]">Sécurité</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full py-20 text-center text-gray-400 italic">
                Aucun produit trouvé.
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id_produit} className="group bg-white border border-gray-50 rounded-2xl p-4 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                  
                  <Link to={`/produit/${product.id_produit}`} className="flex-1 flex flex-col">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-6 shrink-0">
                      <img 
                        src={product.url_image_principale} 
                        alt={product.nom_produit} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=No+Image" }}
                      />
                    </div>

                    <div className="space-y-3 flex-1">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-[#9ADE7B] tracking-widest uppercase">
                          {product.sous_categorie?.nom_sous_categorie || "Matériel"}
                        </span>
                        <span className="text-lg font-black text-[#1A4301] tracking-tighter">
                          {formatPrice(product.prix_unitaire_produit)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 tracking-tight line-clamp-1">{product.nom_produit}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 overflow-hidden">
                        {product.apropos}
                      </p>
                    </div>
                  </Link>

                  <div className="flex gap-2 mt-8">
                    <button 
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-[#F6F7F9] hover:bg-[#9ADE7B] hover:text-white text-gray-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all active:scale-95"
                    >
                      <ShoppingCart className="w-4 h-4" /> Ajouter au panier
                    </button>
                    
                    <button 
                      onClick={() => toggleFavorite(product.id_produit)}
                      disabled={favLoading === product.id_produit}
                      className={`w-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        favorites.includes(product.id_produit) 
                          ? 'bg-red-50 text-red-500' 
                          : 'bg-[#F6F7F9] text-gray-400 hover:text-red-500'
                      } ${favLoading === product.id_produit ? 'opacity-70' : 'active:scale-90'}`}
                    >
                      {favLoading === product.id_produit ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Heart 
                          className={`w-4 h-4 transition-all ${
                            favorites.includes(product.id_produit) ? 'fill-current' : ''
                          }`} 
                        />
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}