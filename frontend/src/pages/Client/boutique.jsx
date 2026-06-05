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
        
        // 1. Charger d'abord les données publiques
        const [prodRes, catRes, subRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/produits'),
          axios.get('http://127.0.0.1:8000/api/categories'),
          axios.get('http://127.0.0.1:8000/api/sous-categories')
        ]);
        
        setProducts(prodRes.data);
        setCategories(catRes.data);
        setSubCategories(subRes.data);

        // 2. Charger les favoris séparément
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const favRes = await axios.get('http://127.0.0.1:8000/api/favoris', {
              headers: { Authorization: `Bearer ${token}` }
            });
            setFavorites(Array.isArray(favRes.data) ? favRes.data : []);
          } catch (favErr) {
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans">
        <Loader2 className="w-12 h-12 text-[#9ADE7B] animate-spin mb-4" />
        <p className="text-gray-400 text-sm font-medium animate-pulse">Chargement de l'inventaire Volta...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white font-sans">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Oups ! Une erreur est survenue</h2>
        <p className="text-sm text-slate-500 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-[#9ADE7B] hover:bg-slate-900 text-slate-900 hover:text-[#9ADE7B] px-8 py-3 rounded-xl font-bold uppercase text-xs transition-colors shadow-lg cursor-pointer"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-4 md:gap-8">
        
        {/* --- SIDEBAR FILTERS --- */}
        <aside className="w-full md:w-64 shrink-0">
          <div 
            className="flex items-center justify-between md:justify-start gap-2 mb-4 md:mb-6 text-slate-900 cursor-pointer md:cursor-default bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-xl border border-slate-100"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#9ADE7B]" />
              <h3 className="font-bold text-xs uppercase tracking-[0.2em]">Catégories</h3>
            </div>
            <ChevronRight className={`w-4 h-4 md:hidden transition-transform ${isCategoryOpen ? 'rotate-90' : ''}`} />
          </div>

          <ul className={`${isCategoryOpen ? 'flex' : 'hidden'} md:flex flex-col gap-2`}>
            <li 
              onClick={() => { setSelectedSubCatId(null); setActiveCategory(null); }}
              className={`flex justify-between items-center text-sm cursor-pointer py-2.5 px-4 md:px-0 rounded-lg transition-all ${!selectedSubCatId ? 'text-[#9ADE7B] font-bold' : 'text-slate-500 hover:text-[#9ADE7B]'}`}
            >
              <span>Tous les produits</span>
              <span className="text-xs font-semibold opacity-60">({getTotalProducts()})</span>
            </li>

            {categories.map((cat) => (
              <li key={cat.id_categorie} className="flex flex-col">
                <div 
                  onClick={() => setActiveCategory(activeCategory === cat.id_categorie ? null : cat.id_categorie)}
                  className={`flex justify-between items-center text-sm cursor-pointer transition-colors px-4 md:px-0 py-2.5 rounded-lg ${activeCategory === cat.id_categorie ? 'text-[#9ADE7B] font-bold' : 'text-slate-500 hover:text-[#9ADE7B]'}`}
                >
                  <div className="flex items-center gap-2">
                    <span>{cat.nom_categorie}</span>
                    <span className="text-xs font-semibold opacity-40">({getCountByCategory(cat.id_categorie)})</span>
                  </div>
                  {activeCategory === cat.id_categorie ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </div>

                {activeCategory === cat.id_categorie && (
                  <ul className="ml-4 mt-1 space-y-1 border-l border-slate-100 pl-4">
                    {subCategories
                      .filter(sub => sub.id_categorie_parente === cat.id_categorie)
                      .map((sub) => (
                        <li 
                          key={sub.id_sous_categorie}
                          onClick={() => setSelectedSubCatId(sub.id_sous_categorie)}
                          className={`flex justify-between items-center text-xs py-2 cursor-pointer transition-colors ${selectedSubCatId === sub.id_sous_categorie ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-[#9ADE7B]'}`}
                        >
                          <span>{sub.nom_sous_categorie}</span>
                          <span className="text-xs opacity-50">{getCountBySubCategory(sub.id_sous_categorie)}</span>
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
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4 text-center md:text-left">
              Inventaire de <span className="text-[#9ADE7B]">Sécurité</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full py-20 text-center text-slate-400 italic text-sm">
                Aucun produit trouvé dans cette catégorie.
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id_produit} className="group bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full relative">
                  
                  <Link to={`/produit/${product.id_produit}`} className="flex-1 flex flex-col">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-50 mb-6 shrink-0">
                      <img 
                        src={product.url_image_principale} 
                        alt={product.nom_produit} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Image+Non+Disponible" }}
                      />
                    </div>

                    <div className="space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="inline-block bg-[#9ADE7B]/20 text-slate-900 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2">
                          {product.sous_categorie?.nom_sous_categorie || "Matériel"}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight line-clamp-1 group-hover:text-[#9ADE7B] transition-colors">
                          {product.nom_produit}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-2">
                          {product.apropos}
                        </p>
                      </div>
                      
                      <div className="pt-4 border-t border-slate-50 mt-4">
                        <span className="text-xl font-extrabold text-[#9ADE7B]">
                          {formatPrice(product.prix_unitaire_produit)}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="flex gap-2 mt-6">
                    <button 
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-slate-50 hover:bg-[#9ADE7B] text-slate-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs transition-all active:scale-95 shadow-sm cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4" /> Ajouter au panier
                    </button>
                    
                    <button 
                      onClick={() => toggleFavorite(product.id_produit)}
                      disabled={favLoading === product.id_produit}
                      className={`w-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        favorites.includes(product.id_produit) 
                          ? 'bg-red-50 text-red-500' 
                          : 'bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50/50'
                      } ${favLoading === product.id_produit ? 'opacity-70' : 'active:scale-90'} cursor-pointer`}
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