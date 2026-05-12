import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Bio-Lock Pro",
      category: "SECURITE PHYSIQUE",
      price: 2500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=200"
    },
    {
      id: 2,
      name: "Bio-Lock Pro 2",
      category: "SECURITE PHYSIQUE",
      price: 2500,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=200"
    }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(items => items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-[#F6F7F9] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-end mb-12"
        >
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tighter text-gray-900">Mon Panier</h1>
            <p className="text-gray-500 text-sm font-medium">Consultez et modifiez les produits que vous souhaitez acheter.</p>
          </div>
          <Link to="/boutique" className="hidden md:flex items-center gap-2 bg-gray-200/50 hover:bg-gray-200 text-gray-600 px-6 py-2 rounded-[0.5rem] text-xs font-bold transition-all">
            <ArrowLeft className="w-3 h-3" /> Retour
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* --- LISTE DES PRODUITS (GAUCHE) --- */}
          <div className="lg:col-span-2 space-y-4">
            <div className="hidden md:grid grid-cols-12 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <div className="col-span-6">Produit</div>
              <div className="col-span-2 text-center">Prix Unitaire</div>
              <div className="col-span-2 text-center">Quantité</div>
              <div className="col-span-2 text-right">Sous-total</div>
            </div>

            <AnimatePresence mode='popLayout'>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-[0.5rem] p-6 shadow-sm border border-white hover:border-gray-100 transition-all group"
                  >
                    <div className="grid grid-cols-12 items-center gap-4">
                      {/* Image & Info */}
                      <div className="col-span-12 md:col-span-6 flex items-center gap-6">
                        <div className="w-20 h-20 bg-[#F6F7F9] rounded-[0.5rem] overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg tracking-tight">{item.name}</h3>
                          <p className="text-[10px] font-bold text-[#9ADE7B] tracking-widest uppercase">{item.category}</p>
                        </div>
                      </div>

                      {/* Prix Unitaire */}
                      <div className="col-span-4 md:col-span-2 text-center font-bold text-gray-900">
                        {item.price.toLocaleString()} FCFA
                      </div>

                      {/* Sélecteur de Quantité */}
                      <div className="col-span-4 md:col-span-2 flex justify-center">
                        <div className="flex items-center bg-[#F6F7F9] rounded-[0.5rem] p-1 border border-gray-100">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-[#9ADE7B] transition-colors"><Minus className="w-4 h-4" /></button>
                          <span className="w-8 text-center font-bold text-xs">{item.quantity.toString().padStart(2, '0')}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-[#9ADE7B] transition-colors"><Plus className="w-4 h-4" /></button>
                        </div>
                      </div>

                      {/* Sous-total & Supprimer */}
                      <div className="col-span-4 md:col-span-2 flex flex-col items-end gap-2">
                        <span className="font-black text-gray-900">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                        <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
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
                  className="bg-white rounded-[0.5rem] p-20 text-center border border-dashed border-gray-200"
                >
                  <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                  <p className="text-gray-400 font-medium mb-8">Votre panier est actuellement vide.</p>
                  <Link to="/boutique" className="inline-block bg-[#9ADE7B] text-[#1A4301] font-black px-10 py-4 rounded-[0.5rem] text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all">
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
              className="bg-white rounded-[0.5rem] p-8 shadow-xl border border-gray-50"
            >
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Récapitulatif</h2>
              
              <div className="space-y-4 mb-8">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">{item.name} (x{item.quantity})</span>
                    <span className="font-bold text-gray-900">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-dashed border-gray-200 flex justify-between items-end mb-10">
                <span className="text-2xl font-bold tracking-tighter text-gray-950">Total</span>
                <span className="text-3xl font-black text-[#1A4301] tracking-tighter">
                  {subtotal.toLocaleString()} FCFA
                </span>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#9ADE7B] hover:bg-black hover:text-white text-[#1A4301] font-black py-5 rounded-[0.5rem] flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#9ADE7B]/20 uppercase tracking-widest text-xs group"
              >
                Passer à la commande 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </aside>

        </div>
      </div>
    </div>
  );
}