import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, User, Loader2, AlertCircle, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.svg';

export default function Register() {
    const navigate = useNavigate();
    
    // États pour gérer le chargement, les erreurs de validation et la pop-up globale
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [globalError, setGlobalError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setGlobalError('');

        // Récupération des données du formulaire
        const formData = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            password_confirmation: e.target.password_confirmation.value,
        };

        try {
            // Envoi vers Laravel
            const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
            
            // Si succès, on navigue vers la page OTP en passant l'email
            navigate('/verify-email', { 
                state: { email: formData.email } 
            });

        } catch (err) {
            // Interception et affichage des erreurs renvoyées par Laravel en Français
            if (err.response && err.response.data.errors) {
                const apiErrors = err.response.data.errors;
                setErrors(apiErrors);
                
                // Si l'erreur concerne l'email déjà pris, on l'envoie UNIQUEMENT dans la Pop-up globale
                if (apiErrors.email) {
                    setGlobalError(apiErrors.email[0]);
                }
            } else {
                setGlobalError("Échec de la connexion avec l'infrastructure Volta Network.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start md:justify-center p-4 md:p-8 overflow-y-auto font-sans text-slate-900">
            
            {/* ── 1. HEADER UNIFORMISÉ ── */}
            <div className="text-center mt-4 mb-8 md:mb-10 flex flex-col items-center gap-4 w-full max-w-[90%]">
                <h2 className="text-[10px] font-extrabold tracking-[0.25em] text-slate-900 uppercase leading-tight">
                    Volta Network <br /> Services
                </h2>
                <img src={logo} alt="Volta Logo" className="w-12 md:w-14 object-contain" />
            </div>

            {/* ── 2. CARTE DE CRÉATION DE COMPTE ── */}
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm w-full max-w-md border border-slate-100 relative">
                
                {/* 🚨 POP-UP D'ALERTE GLOBALE UNIQUE */}
                {globalError && (
                    <div className="mb-6 flex items-start gap-3 bg-rose-50 border border-rose-100 rounded-xl p-3.5 text-rose-700 animate-fadeIn">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-[10px] font-extrabold uppercase tracking-wider">Erreur de Sécurité</p>
                            <p className="text-xs font-medium mt-0.5">{globalError}</p>
                        </div>
                        <button 
                            type="button" 
                            onClick={() => setGlobalError('')}
                            className="text-rose-400 hover:text-rose-700 transition-colors p-0.5"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-8 gap-4">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Créer un compte</h1>
                        <p className="text-xs font-medium text-slate-400 mt-1">Inscrivez-vous à nos services</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                        Live Security <span className="w-1.5 h-1.5 bg-[#9ADE7B] rounded-full animate-pulse shadow-[0_0_8px_rgba(154,222,123,0.5)]"></span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Champ Nom d'utilisateur */}
                    <div className="space-y-1.5">
                        <label htmlFor="username" className="text-[10px] md:text-[11px] font-extrabold text-slate-900 uppercase tracking-widest ml-1">
                            Nom d'utilisateur
                        </label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#9ADE7B] transition-colors" />
                            <input 
                                id="username" name="username" type="text" placeholder="Jean Dupont" required
                                className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-slate-900 focus:bg-white rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 transition-all outline-none"
                            />
                        </div>
                        {errors.username && (
                            <p className="text-rose-500 text-[10px] font-semibold mt-1 ml-1 tracking-wide uppercase">
                                {errors.username[0]}
                            </p>
                        )}
                    </div>

                    {/* Champ Email */}
                    <div className="space-y-1.5">
                        <label htmlFor="email" className="text-[10px] md:text-[11px] font-extrabold text-slate-900 uppercase tracking-widest ml-1">
                            Email
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#9ADE7B] transition-colors" />
                            <input 
                                id="email" name="email" type="email" placeholder="nom@voltanetwork.com" required
                                className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-slate-900 focus:bg-white rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 transition-all outline-none"
                            />
                        </div>
                    </div>

                    {/* Champ Mot de passe */}
                    <div className="space-y-1.5">
                        <label htmlFor="password" className="text-[10px] md:text-[11px] font-extrabold text-slate-900 uppercase tracking-widest ml-1">
                            Mot de passe
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#9ADE7B] transition-colors" />
                            <input 
                                id="password" name="password" type="password" placeholder="••••••••••••••••" required
                                className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-slate-900 focus:bg-white rounded-xl py-3.5 pl-11 pr-12 text-sm font-medium text-slate-900 transition-all outline-none"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-rose-500 text-[10px] font-semibold mt-1 ml-1 tracking-wide uppercase">
                                {errors.password[0]}
                            </p>
                        )}
                    </div>

                    {/* Champ Confirmation */}
                    <div className="space-y-1.5">
                        <label htmlFor="password_confirmation" className="text-[10px] md:text-[11px] font-extrabold text-slate-900 uppercase tracking-widest ml-1">
                            Confirmation
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#9ADE7B] transition-colors" />
                            <input 
                                id="password_confirmation" name="password_confirmation" type="password" placeholder="••••••••••••••••" required
                                className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-slate-900 focus:bg-white rounded-xl py-3.5 pl-11 pr-12 text-sm font-medium text-slate-900 transition-all outline-none"
                            />
                        </div>
                    </div>

                    {/* Bouton Créer un compte */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full h-12 ${
                            loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#9ADE7B] hover:bg-slate-900 text-slate-900 hover:text-[#9ADE7B]'
                        } font-extrabold text-[11px] uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm mt-4`}
                    >
                        {loading ? (
                            <>Création en cours... <Loader2 className="w-4 h-4 animate-spin" /></>
                        ) : (
                            <>Créer un compte <ArrowRight className="w-4 h-4" /></>
                        )}
                    </button>
                </form>

                <p className="text-center text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mt-8 w-full">
                    Vous avez déjà un compte ?{' '}
                    <Link to="/login" className="text-slate-950 font-black hover:underline ml-1 transition-all">
                        Se connecter
                    </Link>
                </p>
            </div>

            {/* ── 3. FOOTER UNIFORMISÉ ── */}
                <footer className="mt-12 md:mt-16 text-center w-full px-4 mb-4">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase mb-5 tracking-widest">
                        {/* Redirige vers la racine du frontend (Acceuil) */}
                        <Link to="/conditions-utilisation" className="hover:text-slate-900 transition-colors">Politique de Confidentialité</Link>
                        
                        {/* Redirige vers http://localhost:5173/politique-confidentialite */}
                        <Link to="/politique-confidentialite" className="hover:text-slate-900 transition-colors">Conditions d'utilisation</Link>
                        
                        <Link to="/contact" className="hover:text-slate-900 transition-colors">Support</Link>
                    </div>
                    <p className="text-[9px] md:text-[10px] text-slate-400 leading-relaxed uppercase tracking-widest">
                        © 2026 VOLTANETWORK SERVICES.<br/>
                        INFRASTRUCTURE DE SÉCURITÉ ET CONTRÔLE.
                    </p>
                </footer>
        
        </div>
    );
}