import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Mail, ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] pt-24 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-end mb-12"
        >
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tighter text-gray-900">Finaliser la commande</h1>
            <p className="text-gray-500 text-sm">Veuillez renseigner vos informations pour valider votre commande.</p>
          </div>
          <Link to="/panier" className="hidden md:flex items-center gap-2 bg-gray-200/50 hover:bg-gray-200 text-gray-600 px-6 py-2 rounded-[0.5rem] text-xs font-bold transition-all">
            <ArrowLeft className="w-3 h-3" /> Retour
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* --- FORMULAIRE (GAUCHE) --- */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Section 1: Informations */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#9ADE7B] rounded-full"></div>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Informations de livraison</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <InputGroup label="Nom" placeholder="Dupont" />
                <InputGroup label="Prénom" placeholder="Jean" />
                <InputGroup label="Numéro de téléphone" placeholder="+237 000000000" />
                <InputGroup label="Email (Optionnel)" placeholder="jean@entreprise.com" />
                <InputGroup label="Numéro WhatsApp" placeholder="+237 000000000" />
                <InputGroup label="Numéro Additionnel (Optionnel)" placeholder="Jean" />
                <div className="md:col-span-2">
                  <InputGroup label="Adresse de livraison (Optionnel)" placeholder="123 Avenue des Sentinelles" />
                </div>
              </div>
            </motion.section>

            {/* Section 2: Méthode de finalisation */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#9ADE7B] rounded-full"></div>
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Méthode de finalisation</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <button className="flex items-center gap-4 p-6 bg-white border-2 border-[#9ADE7B] rounded-[0.5rem] shadow-sm text-left group">
                  <div className="w-12 h-12 bg-[#9ADE7B]/10 rounded-[0.5rem] flex items-center justify-center text-[#1A4301]">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Confirmer par WhatsApp</p>
                    <p className="text-[10px] text-[#9ADE7B] uppercase tracking-wider font-bold">Réponse instantanée</p>
                  </div>
                </button>

                <button className="flex items-center gap-4 p-6 bg-gray-100/50 border-2 border-transparent rounded-[0.5rem] hover:bg-white hover:border-gray-200 transition-all text-left group">
                  <div className="w-12 h-12 bg-white rounded-[0.5rem] flex items-center justify-center text-gray-400 group-hover:text-[#9ADE7B]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-500">Confirmer par mail</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Envoi automatique</p>
                  </div>
                </button>
              </div>
            </motion.section>
          </div>

          {/* --- RÉSUMÉ (DROITE) --- */}
          <aside className="lg:sticky lg:top-32 h-fit">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[0.5rem] p-8 shadow-xl border border-gray-50"
            >
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Résumé de la commande</h3>
              
              <div className="space-y-6 mb-8">
                <OrderItem name="Sentinel V-Series MK.2" category="Advanced Firewall" price="25,000 FCFA" img="https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=100" />
                <OrderItem name="Bio-Lock Pro" category="Biometric Point" price="10,000 FCFA" img="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=100" />
              </div>

              <div className="pt-6 border-t border-dashed border-gray-100 flex justify-between items-end mb-10">
                <span className="text-2xl font-bold tracking-tighter text-gray-950">TOTAL</span>
                <span className="text-3xl font-black text-[#1A4301] tracking-tighter">35,000 FCFA</span>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#9ADE7B] hover:bg-black hover:text-white text-[#1A4301] font-black py-5 rounded-[0.5rem] flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#9ADE7B]/10 uppercase tracking-widest text-xs group"
              >
                Valider la commande 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  <ShieldCheck className="w-3 h-3 text-[#9ADE7B]" /> Paiement sécurisé
                </div>
                <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  <Lock className="w-3 h-3 text-[#9ADE7B]" /> Infrastructure chiffrée
                </div>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}

const InputGroup = ({ label, placeholder }) => (
  <motion.div whileTap={{ scale: 0.995 }} className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</label>
    <input 
      type="text" 
      placeholder={placeholder}
      className="w-full bg-gray-200/50 border-none rounded-[0.5rem] p-4 text-sm font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-[#9ADE7B] transition-all outline-none"
    />
  </motion.div>
);

const OrderItem = ({ name, category, price, img }) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex items-center gap-4">
      <img src={img} alt="" className="w-12 h-12 rounded-[0.5rem] object-cover bg-gray-100" />
      <div>
        <h4 className="font-bold text-xs text-gray-900 leading-tight">{name}</h4>
        <p className="text-[9px] text-gray-400 uppercase font-medium">{category}</p>
      </div>
    </div>
    <span className="text-[11px] font-black text-[#1A4301]">{price}</span>
  </div>
);