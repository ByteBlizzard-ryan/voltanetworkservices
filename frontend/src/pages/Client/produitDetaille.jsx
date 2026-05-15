import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, ShieldCheck, Lock, CheckCircle2, PlayCircle, Loader2, AlertCircle } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext'; // On importe le hook officiel

export default function ProduitDetaille() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // On récupère la fonction du contexte

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // États pour les actions
  const [isFavorite, setIsFavorite] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // Pour le feedback visuel

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        // 1. Récupérer le produit
        const response = await axios.get(`http://127.0.0.1:8000/api/produits/${id}`);
        const data = response.data;
        setProduct(data);
        setSelectedImage(0);

        // 2. Vérifier si le produit est en favoris (si connecté)
        if (token) {
          try {
            const favRes = await axios.get('http://127.0.0.1:8000/api/favoris', {
              headers: { Authorization: `Bearer ${token}` }
            });
            const isInFav = Array.isArray(favRes.data) && favRes.data.some(fav => fav.id_produit === data.id_produit);
            setIsFavorite(isInFav);
          } catch (e) {
            console.error("Erreur chargement favoris");
          }
        }

        // 3. Produits similaires
        const relatedRes = await axios.get(`http://127.0.0.1:8000/api/produits`);
        const filtered = relatedRes.data
          .filter(p => p.id_sous_cat_fk === data.id_sous_cat_fk && p.id_produit !== data.id_produit)
          .slice(0, 4);
        setRelatedProducts(filtered);

      } catch (err) {
        console.error("Erreur chargement produit:", err);
        setError("Produit introuvable ou erreur serveur.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
    window.scrollTo(0, 0);
  }, [id]);

  // --- LOGIQUE PANIER CORRIGÉE ---
  const handleAddToCart = () => {
    if (!product) return;
    
    setAddingToCart(true);
    
    // On utilise la fonction du Context qui gère déjà le localStorage 'volta_cart'
    addToCart(product);
    
    // Feedback visuel
    setTimeout(() => {
      setAddingToCart(false);
      setShowSuccess(true);
      // On cache le message de succès après 3 secondes
      setTimeout(() => setShowSuccess(false), 3000);
    }, 600);
  };

  // --- LOGIQUE FAVORIS (API) ---
  const toggleFavorite = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/favoris/toggle', 
        { id_produit: product.id_produit },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Erreur favoris:", error);
    }
  };

  const formatPrice = (price) => new Intl.NumberFormat('fr-FR').format(price) + " FCFA";

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-10 h-10 text-[#9ADE7B] animate-spin" />
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
      <p className="text-gray-500 mb-6">{error}</p>
      <Link to="/boutique" className="bg-[#9ADE7B] text-gray-900 px-8 py-3 rounded-xl font-bold uppercase text-sm">
        Retour à la boutique
      </Link>
    </div>
  );

  const gallery = [
    product.url_image_principale,
    ...(product.images_secondaires || []).map(img => img.url_image_secondaire)
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Toast de succès de l'ajout au panier */}
      {showSuccess && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-[#9ADE7B] px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-2xl z-50 animate-bounce">
          <CheckCircle2 className="w-4 h-4" /> Produit ajouté au panier
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          {/* Galerie d'images */}
          <div className="space-y-6">
            <div className="aspect-square rounded-3xl overflow-hidden bg-[#F6F7F9] border border-gray-100 shadow-sm">
              <img 
                src={gallery[selectedImage]} 
                alt={product.nom_produit} 
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <div className="grid grid-cols-5 gap-4">
              {gallery.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-[#9ADE7B] scale-95' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Infos produit */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#9ADE7B] text-[10px] font-bold tracking-[0.3em] uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-[#9ADE7B]"></div>
                BOUTIQUE / {product.sous_categorie?.nom_sous_categorie || "MATÉRIEL"}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-950 uppercase italic">
                {product.nom_produit}
              </h1>
              <p className="text-3xl font-black text-[#1A4301] tracking-tighter">
                {formatPrice(product.prix_unitaire_produit)}
              </p>
            </div>

            <p className="text-gray-500 leading-relaxed text-sm text-justify">
              {product.apropos}
            </p>

            <div className="flex gap-8 py-4 border-y border-gray-100">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-[#9ADE7B]" /> CERTIFIÉ VOLTA
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Lock className="w-4 h-4 text-[#9ADE7B]" /> SÉCURITÉ MAX
                </div>
            </div>

            {/* BOUTONS D'ACTION */}
            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex-1 bg-[#9ADE7B] hover:bg-black hover:text-white text-[#1A4301] font-bold py-5 rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-xs"
              >
                {addingToCart ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
                {addingToCart ? "CHARGEMENT..." : "Ajouter au panier"}
              </button>

              <button 
                onClick={toggleFavorite}
                className={`w-16 rounded-xl flex items-center justify-center transition-all border ${
                  isFavorite 
                  ? 'bg-red-50 border-red-100 text-red-500' 
                  : 'bg-[#F6F7F9] border-transparent text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* --- DESCRIPTION --- */}
        <div className="grid lg:grid-cols-3 gap-16 py-20 border-t border-gray-100">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter uppercase mb-4 text-gray-900">Description</h2>
            <div className="w-12 h-1 bg-[#9ADE7B]"></div>
          </div>
          <div className="lg:col-span-2">
            <p className="text-gray-500 leading-relaxed text-sm whitespace-pre-line text-justify">
              {product.description_produit || product.apropos}
            </p>
          </div>
        </div>

        {/* --- PRODUITS SIMILAIRES --- */}
        <div className="pt-20 border-t border-gray-100">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl font-bold tracking-tighter uppercase italic">Produits similaires</h2>
            <Link to="/boutique" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-1 hover:text-[#9ADE7B] transition-all">
              Parcourir la collection
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link to={`/produit/${item.id_produit}`} key={item.id_produit} className="bg-white border border-gray-50 rounded-2xl p-4 hover:shadow-xl transition-all group">
                <div className="aspect-square rounded-xl bg-[#F6F7F9] overflow-hidden mb-6">
                  <img src={item.url_image_principale} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-bold uppercase">
                    <span className="text-[#9ADE7B]">{item.sous_categorie?.nom_sous_categorie}</span>
                    <span className="text-gray-900">{formatPrice(item.prix_unitaire_produit)}</span>
                  </div>
                  <h4 className="font-bold text-sm line-clamp-1 uppercase tracking-tight">{item.nom_produit}</h4>
                  <div className="w-full mt-4 bg-gray-50 group-hover:bg-[#9ADE7B] group-hover:text-[#1A4301] py-2 rounded-lg text-[10px] font-bold uppercase text-center transition-colors">
                    Voir le produit
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}