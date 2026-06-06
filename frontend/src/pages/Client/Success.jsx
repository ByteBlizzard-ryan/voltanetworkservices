import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

const Success = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans text-slate-900 px-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-md w-full bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-slate-100/80 border border-slate-100 text-center space-y-8"
            >
                {/* Icône de succès animée */}
                <div className="flex justify-center">
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                        className="w-20 h-20 bg-[#9ADE7B]/15 rounded-full flex items-center justify-center text-[#9ADE7B] shadow-inner"
                    >
                        <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
                    </motion.div>
                </div>

                {/* Textes principaux */}
                <div className="space-y-3">
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
                        Commande Confirmée !
                    </h1>
                    <div className="h-1 w-12 bg-[#9ADE7B] rounded-full mx-auto shadow-sm"></div>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed pt-2">
                        Merci pour votre confiance. <br />
                        Votre commande a été enregistrée avec succès chez <span className="font-extrabold text-slate-900">Volta Network Services</span>.
                    </p>
                </div>

                {/* Bouton d'action pro */}
                <div className="pt-2">
                    <motion.button 
                        onClick={() => navigate('/boutique')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[#9ADE7B] hover:bg-slate-900 text-slate-900 hover:text-[#9ADE7B] font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#9ADE7B]/10 uppercase tracking-widest text-xs cursor-pointer"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Retourner à la boutique
                        <ArrowRight className="w-4 h-4 ml-auto opacity-70 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Success;