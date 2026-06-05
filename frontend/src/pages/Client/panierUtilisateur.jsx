import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext'; 

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12"
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Mon Panier</h1>
            <p className="text-slate-500 text-sm font-medium">Consultez et modifiez les produits que vous souhaitez acheter.</p>
          </div>
          <Link to="/boutique" className="inline-flex items-center gap-2 bg-slate-200/60 hover:bg-slate-900 text-slate-700 hover:text-[#9ADE7B] px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Retour à la boutique
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* --- LISTE DES PRODUITS (GAUCHE) --- */}
          <div className="lg:col-span-2 space-y-4">
            <div className="hidden md:grid grid-cols-12 px-6 py-4 text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              <div className="col-span-6">Produit</div>
              <div className="col-span-2 text-center">Prix Unitaire</div>
              <div className="col-span-2 text-center">Quantité</div>
              <div className="col-span-2 text-right">Sous-total</div>
            </div>

            <AnimatePresence mode='popLayout'>
              {cart && cart.length > 0 ? (
                cart.map((item, index) => (
                  <motion.div 
                    key={item.id_produit || index}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-[#9ADE7B]/40 transition-all duration-300 group"
                  >
                    <div className="grid grid-cols-12 items-center gap-6">
                      <div className="col-span-12 md:col-span-6 flex items-center gap-6">
                        <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                          <img 
                            src={item.url_image_principale} 
                            alt={item.nom_produit} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg tracking-tight mb-1">{item.nom_produit}</h3>
                          <span className="inline-block bg-[#9ADE7B]/15 text-slate-900 text-[10px] font-extrabold tracking-widest uppercase px-2 py-1 rounded-md">
                            {item.sous_categorie?.nom_sous_categorie || "MATÉRIEL"}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-4 md:col-span-2 text-center font-bold text-slate-900 text-sm">
                        {Number(item.prix_unitaire_produit).toLocaleString()} FCFA
                      </div>

                      <div className="col-span-4 md:col-span-2 flex justify-center">
                        <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-200">
                          <button 
                            onClick={() => updateQuantity(item.id_produit, item.quantity - 1)} 
                            className="p-1.5 hover:text-[#9ADE7B] hover:bg-slate-200/50 rounded-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-bold text-sm text-slate-900">
                            {item.quantity.toString().padStart(2, '0')}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id_produit, item.quantity + 1)} 
                            className="p-1.5 hover:text-[#9ADE7B] hover:bg-slate-200/50 rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-4 md:col-span-2 flex flex-col items-end gap-3">
                        <span className="font-extrabold text-slate-900 text-base">
                          {(item.prix_unitaire_produit * item.quantity).toLocaleString()} FCFA
                        </span>
                        <button 
                          onClick={() => removeFromCart(item.id_produit)} 
                          className="text-slate-300 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl p-20 text-center border-2 border-dashed border-slate-200"
                >
                  <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                  <p className="text-slate-500 font-medium text-lg mb-8">Votre panier est actuellement vide.</p>
                  <Link to="/boutique" className="inline-flex items-center bg-[#9ADE7B] hover:bg-slate-900 text-slate-900 hover:text-[#9ADE7B] font-extrabold px-10 py-4 rounded-lg text-xs uppercase tracking-widest transition-all shadow-lg shadow-[#9ADE7B]/10">
                    Commencer mes achats
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- RÉCAPITULATIF (DROITE) --- */}
          <aside className="lg:sticky lg:top-24">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-100/50 border border-slate-100"
            >
              <h2 className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-400 mb-8">Récapitulatif</h2>
              
              <div className="space-y-4 mb-8 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                {cart && cart.map((item, index) => (
                  <div key={item.id_produit || `recap-${index}`} className="flex justify-between items-start gap-4 text-sm">
                    <span className="text-slate-500 font-medium">{item.nom_produit} <span className="text-slate-400 font-bold text-xs">x{item.quantity}</span></span>
                    <span className="font-bold text-slate-900 shrink-0">{(item.prix_unitaire_produit * item.quantity).toLocaleString()} FCFA</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-dashed border-slate-200 flex justify-between items-baseline mb-10">
                <span className="text-xl font-bold tracking-tight text-slate-950">Total</span>
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {cartTotal.toLocaleString()} <span className="text-lg font-bold">FCFA</span>
                </span>
              </div>

              <motion.button 
                whileHover={cart && cart.length > 0 ? { scale: 1.01 } : {}}
                whileTap={cart && cart.length > 0 ? { scale: 0.99 } : {}}
                disabled={!cart || cart.length === 0}
                onClick={() => navigate('/checkout')} 
                className={`w-full font-extrabold py-5 rounded-lg flex items-center justify-center gap-3 transition-all shadow-xl uppercase tracking-widest text-xs group ${
                  (!cart || cart.length === 0)
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                  : 'bg-[#9ADE7B] hover:bg-slate-900 text-slate-900 hover:text-[#9ADE7B] shadow-[#9ADE7B]/10'
                }`}
              >
                Passer à la commande 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}