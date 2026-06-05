import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.svg';
// 🛠️ Import du hook pour gérer l'état global des permissions de la Sidebar
import { useSidebar } from '../Admin/Context_sider';

export default function Login() {
    const navigate = useNavigate();
    const { setPermissions } = useSidebar(); // 👈 Récupération de la fonction de mise à jour des droits
    
    // États pour la gestion de l'interface et des données
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [remember, setRemember] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const loginData = {
            email: e.target.email.value,
            password: e.target.password.value,
            remember: remember
        };

        try {
            // Appel à ton contrôleur Laravel
            const response = await axios.post('http://127.0.0.1:8000/api/login', loginData);
            
            // 1. Stockage du token de sécurité
            localStorage.setItem('token', response.data.access_token);
            
            // 2. Stockage du rôle de l'utilisateur (ADMIN ou CLIENT)
            localStorage.setItem('user_role', response.data.role);
            
            // 3. Stockage des infos de profil utilisateur
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // 🔍 4. SCRIPT DE DIAGNOSTIC DE SÉCURITÉ INTÉGRÉ
            console.log("=========================================");
            console.log("🛠️ RUNNING DIAGNOSTIC: CONTENU DU LOCALSTORAGE 🛠️");
            const testUserJson = localStorage.getItem('user');
            console.log("Données brutes 'user' stockées :", testUserJson);
            
            try {
                const parsedUserTest = JSON.parse(testUserJson);
                console.log("Données 'user' décodées (JSON.parse) :", parsedUserTest);
                console.log("Objet 'permission' détecté :", parsedUserTest?.permission);
            } catch (jsonErr) {
                console.error("Échec critique lors du parsing du localStorage :", jsonErr);
            }
            console.log("=========================================");

            // 🛠️ 5. Injection dynamique des permissions dans l'état global React
            if (response.data.user && response.data.user.permission) {
                const userPerms = response.data.user.permission;
                
                // Synchronisé à 100% avec les colonnes de ta table SQL 'permissions'
                setPermissions({
                    tableau_de_bord: Boolean(userPerms.tableau_de_bord),
                    clients: Boolean(userPerms.clients),
                    produits: Boolean(userPerms.produits),
                    commandes: Boolean(userPerms.commandes),
                    administrateurs: Boolean(userPerms.administrateurs),
                    droits_acces_admin: Boolean(userPerms.droits_acces_admin), 
                });
            } else {
                console.warn("⚠️ Attention : Aucune permission reçue de Laravel pour cet utilisateur.");
                setPermissions({
                    tableau_de_bord: false,
                    clients: false,
                    produits: false,
                    commandes: false,
                    administrateurs: false,
                    droits_acces_admin: false,
                });
            }

            // 6. Redirection intelligente basée sur la réponse du serveur
            if (response.data.redirect_to) {
                navigate(response.data.redirect_to);
            } else {
                navigate('/');
            }
            
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || "Une erreur est survenue lors de la connexion.");
            } else {
                setError("Impossible de joindre le serveur d'authentification.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start md:justify-center p-4 md:p-8 overflow-y-auto font-sans text-slate-900">
            
            {/* ── 1. HEADER UNIFORMISÉ ── */}
            <div className="text-center mt-6 mb-8 md:mb-10 flex flex-col items-center gap-4 w-full px-2">
                <h2 className="text-[10px] font-extrabold tracking-[0.25em] text-slate-900 uppercase leading-tight">
                    Volta Network <br /> Services
                </h2>
                <img src={logo} alt="Volta Logo" className="w-12 md:w-14 object-contain" />
            </div>

            {/* ── 2. CARTE DE CONNEXION ── */}
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm w-full max-w-md border border-slate-100">
                
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-8 gap-4">
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Connexion</h1>
                        <p className="text-xs font-medium text-slate-400 mt-1">Accédez à votre espace sécurisé</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                        Live Security <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-medium rounded-xl">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Champ Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
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
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
                            Mot de passe
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#9ADE7B] transition-colors" />
                            <input 
                                id="password" name="password" 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••••••••••" required
                                className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-slate-900 focus:bg-white rounded-xl py-3.5 pl-11 pr-12 text-sm font-medium text-slate-900 transition-all outline-none"
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 px-2 text-slate-300 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Checkbox Rester connecté & Mot de passe oublié */}
                    <div className="flex items-center justify-between px-1 pt-1">
                        <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                            <input 
                                type="checkbox" 
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="w-4 h-4 rounded border-slate-300 text-[#9ADE7B] focus:ring-[#9ADE7B] focus:ring-offset-0 cursor-pointer transition-colors"
                            />
                            <span className="text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase tracking-wider group-hover:text-slate-600 transition-colors">
                                Rester connecté
                            </span>
                        </label>
                        
                        <Link to="/forgot-password" className="text-[#9ADE7B] text-[10px] md:text-[11px] font-extrabold hover:text-slate-900 uppercase tracking-wider transition-colors">
                            Mot de passe oublié ?
                        </Link>
                    </div>

                    {/* Bouton de Soumission */}
                    <button 
                        type="submit" disabled={loading}
                        className={`w-full h-12 ${
                            loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#9ADE7B] hover:bg-slate-900 text-slate-900 hover:text-[#9ADE7B]'
                        } font-extrabold text-[11px] uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm`}
                    >
                        {loading ? (
                            <>Vérification... <Loader2 className="w-4 h-4 animate-spin" /></>
                        ) : (
                            <>Se connecter <ArrowRight className="w-4 h-4" /></>
                        )}
                    </button>
                </form>

                <p className="text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mt-10 text-center w-full">
                    Nouveau sur VOLTANETWORK ?{' '}
                    <Link to="/register" className="text-slate-950 font-black hover:underline ml-1 transition-all">
                        Créer un compte
                    </Link>
                </p>
            </div>

            {/* ── 3. FOOTER UNIFORMISÉ ── */}
            <footer className="mt-12 md:mt-16 text-center w-full px-4 mb-4">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase mb-5 tracking-widest">
                    <Link to="/privacy" className="hover:text-slate-900 transition-colors">Politique de Confidentialité</Link>
                    <Link to="/terms" className="hover:text-slate-900 transition-colors">Conditions d'utilisation</Link>
                    <Link to="/support" className="hover:text-slate-900 transition-colors">Support</Link>
                </div>
                <p className="text-[9px] md:text-[10px] text-slate-400 leading-relaxed uppercase tracking-widest">
                    © 2026 VOLTANETWORK SERVICES.<br/>
                    INFRASTRUCTURE DE SÉCURITÉ ET CONTRÔLE.
                </p>
            </footer>
        </div>
    );
}