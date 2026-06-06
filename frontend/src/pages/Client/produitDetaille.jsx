import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, ShieldCheck, Lock, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';

export default function ProduitDetaille() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // --- NOUVEL ÉTAT POUR LE LOADER DU FAVORI ---
  const [favLoading, setFavLoading] = useState(false);

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

  const handleAddToCart = () => {
    if (!product) return;
    setAddingToCart(true);
    
    addToCart(product);
    
    setTimeout(() => {
      setAddingToCart(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 650);
  };

  // --- MODIFICATION DE LA GESTION DES FAVORIS ---
  const toggleFavorite = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setFavLoading(true);
      setTimeout(() => {
        setFavLoading(false);
        navigate('/login');
      }, 600);
      return;
    }

    setFavLoading(true);

    try {
      await axios.post('http://127.0.0.1:8000/api/favoris/toggle', 
        { id_produit: product.id_produit },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // On applique le petit délai agréable avant de mettre à jour l'icône
      setTimeout(() => {
        setIsFavorite(!isFavorite);
        setFavLoading(false);
      }, 400);

    } catch (error) {
      setFavLoading(false);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        console.error("Erreur favoris:", error);
      }
    }
  };

  const formatPrice = (price) => new Intl.NumberFormat('fr-FR').format(price) + " FCFA";

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-8 h-8 text-[#9ADE7B] animate-spin" />
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center font-sans bg-slate-50 text-slate-900">
      <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
      <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase mb-6">{error}</p>
      <Link to="/boutique" className="bg-[#9ADE7B] hover:bg-slate-900 text-slate-900 hover:text-[#9ADE7B] px-8 py-4 rounded-xl font-extrabold uppercase text-[11px] tracking-widest transition-all shadow-sm">
        Retour à la boutique
      </Link>
    </div>
  );

  const gallery = [
    product.url_image_principale,
    ...(product.images_secondaires || []).map(img => img.url_image_secondaire)
  ];

  return (
    <div className="min-h-screen bg-white pt-28 pb-20 font-sans text-slate-900">
      
      {/* ── TOAST NOTIFICATION FLOATING ── */}
      {showSuccess && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-950 text-[#9ADE7B] px-8 py-4 rounded-xl font-extrabold text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-xl z-50 animate-fade-in-up border border-slate-800">
          <CheckCircle2 className="w-4 h-4 text-[#9ADE7B]" /> Article enregistré dans le panier
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* ── SECTIONS CONTENU PRINCIPAL ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          
          {/* Galerie d'images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm group">
              <img 
                src={gallery[selectedImage]} 
                alt={product.nom_produit} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-5 gap-3">
              {gallery.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden bg-slate-50 border-2 transition-all ${
                    selectedImage === index ? 'border-[#9ADE7B] scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Fiche Technique & Informations */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#9ADE7B] text-[10px] font-extrabold tracking-[0.25em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9ADE7B]"></span>
                Infrastructure / {product.sous_categorie?.nom_sous_categorie || "MATÉRIEL"}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
                {product.nom_produit}
              </h1>
              <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight pt-1">
                {formatPrice(product.prix_unitaire_produit)}
              </p>
            </div>

            <p className="text-slate-500 leading-relaxed text-xs md:text-sm text-justify font-medium">
              {product.apropos}
            </p>

            {/* Badges de conformité technique */}
            <div className="flex gap-6 py-4 border-y border-slate-100">
                <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-[#9ADE7B]" /> Homologation Volta
                </div>
                <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                  <Lock className="w-4 h-4 text-[#9ADE7B]" /> Sécurisé de bout en bout
                </div>
            </div>

            {/* Actions d'achat */}
            <div className="flex gap-4 pt-2">
              <button 
                onClick={handleAddToCart}
                disabled={addingToCart}
                className={`flex-1 h-14 ${
                  addingToCart ? 'bg-slate-100 text-slate-400' : 'bg-[#9ADE7B] hover:bg-slate-900 text-slate-900 hover:text-[#9ADE7B]'
                } font-extrabold text-[11px] uppercase tracking-widest rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-sm pt-0.5`}
              >
                {addingToCart ? (
                  <>Chargement... <Loader2 className="w-4 h-4 animate-spin" /></>
                ) : (
                  <>Ajouter au panier <ShoppingCart className="w-4 h-4" /></>
                )}
              </button>

              {/* MODIFICATION DU BOUTON FAVORIS AVEC ÉTAT DE CHARGEMENT */}
              <button 
                onClick={toggleFavorite}
                disabled={favLoading}
                className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all border ${
                  isFavorite 
                  ? 'bg-rose-50 border-rose-100 text-rose-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200'
                } ${favLoading ? 'opacity-70' : 'active:scale-90'} cursor-pointer`}
              >
                {favLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Heart className={`w-5 h-5 transition-all ${isFavorite ? 'fill-current' : ''}`} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── SECTION CARACTÉRISTIQUES / DESCRIPTION ── */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 py-16 border-t border-slate-100">
          <div>
            <h2 className="text-lg font-extrabold tracking-widest uppercase text-slate-900 mb-3">Spécifications</h2>
            <div className="w-10 h-0.5 bg-[#9ADE7B]"></div>
          </div>
          <div className="lg:col-span-2">
            <p className="text-slate-500 leading-relaxed text-xs md:text-sm whitespace-pre-line text-justify font-medium">
              {product.description_produit || product.apropos}
            </p>
          </div>
        </div>

        {/* ── SECTION ARCHITECTURE SIMILAIRE ── */}
        <div className="pt-16 border-t border-slate-100">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-lg font-extrabold tracking-widest uppercase text-slate-900">Matériels similaires</h2>
            <Link to="/boutique" className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-transparent hover:border-slate-400 pb-1 hover:text-slate-900 transition-all">
              Voir toute la collection
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link to={`/produit/${item.id_produit}`} key={item.id_produit} className="bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-md transition-all group flex flex-col justify-between">
                <div>
                  <div className="aspect-square rounded-xl bg-slate-50 overflow-hidden mb-5 border border-slate-100">
                    <img src={item.url_image_principale} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[9px] font-extrabold uppercase tracking-wider">
                      <span className="text-[#9ADE7B]">{item.sous_categorie?.nom_sous_categorie || "SYSTEM"}</span>
                      <span className="text-slate-900">{formatPrice(item.prix_unitaire_produit)}</span>
                    </div>
                    <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1 uppercase tracking-tight">{item.nom_produit}</h4>
                  </div>
                </div>
                <div className="w-full mt-5 bg-slate-50 text-slate-900 group-hover:bg-slate-900 group-hover:text-[#9ADE7B] py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest text-center transition-colors pt-3.5">
                  Inspecter l'article
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}