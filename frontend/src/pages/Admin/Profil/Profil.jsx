import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCog, KeyIcon, LogOut, PencilLine, Eye, EyeOff, ShieldCheck, X, Loader2 } from 'lucide-react';
import axios from 'axios';

function Couleur_Nom_Icon(lettre = "") {
  const colorMap = {
    A: "#F4F1EA", B: "#EAE5D9", C: "#DFD9C8", D: "#D4CCB7",
    E: "#F5F5F7", F: "#EAEAEB", G: "#E1E1E3", H: "#D8D8DC",
    I: "#EAF2EC", J: "#D5E5DA", K: "#C0D9C8", L: "#ACCDB6",
    M: "#FBF3F2", N: "#F7E7E5", O: "#F2DCD9", P: "#EDD0CC",
    Q: "#F5F5F7", R: "#EAEAEB", S: "#E1E1E3", T: "#D8D8DC",
    U: "#F4F1EA", V: "#EAE5D9", W: "#DFD9C8", X: "#D4CCB7",
    Y: "#EAF2EC", Z: "#D5E5DA"
  };
  return colorMap[lettre.toUpperCase()] || "#F5F5F7";
}

export default function Profil() {
  const navigate = useNavigate();

  // --- ÉTATS UTILISATEUR ---
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { nom_complet: "Invité", email: "" };
  });

  // --- ÉTATS PARAMÈTRES & FORMULAIRES ---
  const [paramProfil, setParamProfil] = useState('personnelle');
  const [eye, setEye] = useState(false);
  const [eyeNew, setEyeNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // --- ÉTATS DE LA POP-UP (MODALE) ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nouveauNom, setNouveauNom] = useState(user.nom_complet);

  // --- ÉTATS CHANGEMENT MOT DE PASSE ---
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  const premiereLettre = user.email?.charAt(0).toUpperCase() || user.nom_complet?.charAt(0).toUpperCase() || "";

  // Configuration globale Axios avec le Bearer Token
  const apiConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };

  // --- FONCTION : MODIFIER LE NOM VIA POP-UP ---
  const handleUpdateName = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/update-profile', {
        nom_complet: nouveauNom
      }, apiConfig);

      if (response.data.success) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Synchro locale
        setIsModalOpen(false);
        setMessage({ type: 'success', text: 'Nom mis à jour avec succès.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Erreur lors de la modification.' });
    } finally {
      setLoading(false);
    }
  };

  // --- FONCTION : MODIFIER LE MOT DE PASSE ---
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/update-password', {
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
        new_password_confirmation: passwordForm.new_password_confirmation
      }, apiConfig);

      if (response.data.success) {
        setMessage({ type: 'success', text: 'Mot de passe mis à jour avec succès.' });
        setPasswordForm({ current_password: '', new_password: '', new_password_confirmation: '' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Vérifiez vos données de sécurité.' });
    } finally {
      setLoading(false);
    }
  };

  // --- FONCTION : DÉCONNEXION ---
  const handleLogout = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) return;

    try {
      await axios.post('http://127.0.0.1:8000/api/logout', {}, apiConfig);
    } catch (error) {
      console.error("Erreur lors de la notification de déconnexion au serveur", error);
    } finally {
      localStorage.clear(); // Nettoyage total
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans py-4 w-full box-border flex flex-col gap-8">
      
      <header className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-slate-900 m-0">Mon Profil</h1>
        <p className="text-xs font-medium text-slate-400 m-0">Consultez et gérez vos informations personnelles</p>
      </header>

      {/* Affichage des notifications */}
      {message.text && (
        <div className={`p-4 rounded-xl text-xs font-bold tracking-wide ${message.type === 'success' ? 'bg-[#9ADE7B]/20 text-slate-900' : 'bg-rose-50 text-rose-700'}`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-10 w-full items-start">
        
        {/* Navigation gauche */}
        <div className="w-full lg:w-[280px] bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col box-border">
          <div className="flex w-full gap-3 items-center pb-4 border-b border-slate-50">
            <div 
              style={{ backgroundColor: Couleur_Nom_Icon(premiereLettre) }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-800 font-bold text-sm border border-slate-100/50 uppercase"
            >
              {premiereLettre}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-900 m-0 leading-tight">{user.nom_complet}</span>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em] mt-0.5">Paramètres généraux</span>
            </div>
          </div>

          <div className="pt-4 w-full flex flex-col gap-1">
            <button 
              className={`flex items-center gap-3 text-xs p-3 w-full rounded-xl transition-all duration-200 border-none cursor-pointer font-bold tracking-wide text-left ${
                paramProfil === "personnelle" 
                  ? "bg-slate-900 text-white shadow-sm" 
                  : "bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
              onClick={() => { setParamProfil('personnelle'); setMessage({type:'',text:''}); }}
            >
              <UserCog size={16} /> 
              <span className="tracking-[0.15em]">INFOS PERSONNELLES</span>
            </button>
            
            <button 
              className={`flex items-center gap-3 text-xs p-3 w-full rounded-xl transition-all duration-200 border-none cursor-pointer font-bold tracking-wide text-left ${
                paramProfil === "modifier_pass" 
                  ? "bg-slate-900 text-white shadow-sm" 
                  : "bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
              onClick={() => { setParamProfil('modifier_pass'); setMessage({type:'',text:''}); }}
            >
              <KeyIcon size={16} /> 
              <span className="tracking-[0.15em]">MOT DE PASSE</span>
            </button>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 text-xs p-3 w-full rounded-xl transition-all duration-200 border-none cursor-pointer font-bold tracking-wide text-left bg-transparent text-slate-400 hover:text-rose-600 hover:bg-rose-50/40 mt-4"
            >
              <LogOut size={16} /> 
              <span className="tracking-[0.15em]">DÉCONNEXION</span>
            </button>
          </div>
        </div>

        {/* Panneau de droite : Informations Personnelles */}
        {paramProfil === 'personnelle' && (
          <div className="flex-1 w-full flex flex-col gap-6">
            <div className="flex items-center gap-4 w-full">
              <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-slate-900 m-0">
                Informations personnelles
              </h3>
              <div className="flex-1 h-[1px] bg-slate-100" />
            </div>
            
            <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Nom complet</span>
                  <span className="text-sm font-bold text-slate-800">{user.nom_complet}</span> 
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Adresse email</span>
                  <span className="text-sm font-bold text-slate-800">{user.email}</span>
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-50 pt-4 mt-2">
                <button 
                  onClick={() => { setNouveauNom(user.nom_complet); setIsModalOpen(true); }}
                  className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-white bg-slate-900 hover:bg-black px-5 py-2.5 rounded-xl cursor-pointer transition-all border-none shadow-md"
                >
                  <PencilLine size={14} /> Modifier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Panneau de droite : Modifier Mot de Passe */}
        {paramProfil === 'modifier_pass' && (
          <form onSubmit={handleUpdatePassword} className="flex-1 w-full flex flex-col gap-6">
            <div className="flex items-center gap-4 w-full">
              <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-slate-900 m-0">
                Sécurité du compte
              </h3>
              <div className="flex-1 h-[1px] bg-slate-100" /> 
            </div>
            
            <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col gap-5 max-w-xl w-full box-border">
              <div className="flex flex-col gap-2">
                <label className="flex items-center justify-between text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                  <span>Mot de passe actuel</span> 
                  <button 
                    type="button"
                    className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer p-0 uppercase tracking-wider" 
                    onClick={() => setEye(!eye)}
                  >
                    {eye ? <EyeOff size={14} /> : <Eye size={14} />}
                    <span className="ml-0.5">{eye ? "Masquer" : "Afficher"}</span>
                  </button>
                </label>
                <input 
                  type={eye ? 'text' : 'password'} 
                  required
                  value={passwordForm.current_password}
                  onChange={(e) => setPasswordForm({...passwordForm, current_password: e.target.value})}
                  className="w-full box-border p-3 text-sm bg-slate-50 rounded-xl border border-transparent focus:outline-none focus:border-slate-200 focus:bg-white transition-all text-slate-800 font-mono tracking-widest"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center justify-between text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                  <span>Nouveau mot de passe</span>
                  <button 
                    type="button"
                    className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer p-0 uppercase tracking-wider" 
                    onClick={() => setEyeNew(!eyeNew)}
                  >
                    {eyeNew ? <EyeOff size={14} /> : <Eye size={14} />}
                    <span className="ml-0.5">{eyeNew ? "Masquer" : "Afficher"}</span>
                  </button>
                </label>
                <input 
                  type={eyeNew ? 'text' : 'password'} 
                  required
                  value={passwordForm.new_password}
                  onChange={(e) => setPasswordForm({...passwordForm, new_password: e.target.value})}
                  className="w-full box-border p-3 text-sm bg-slate-50 rounded-xl border border-transparent focus:outline-none focus:border-slate-200 focus:bg-white transition-all text-slate-800 font-mono tracking-widest"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Confirmation du mot de passe</label>
                <input 
                  type={eyeNew ? 'text' : 'password'} 
                  required
                  value={passwordForm.new_password_confirmation}
                  onChange={(e) => setPasswordForm({...passwordForm, new_password_confirmation: e.target.value})}
                  className="w-full box-border p-3 text-sm bg-slate-50 rounded-xl border border-transparent focus:outline-none focus:border-slate-200 focus:bg-white transition-all text-slate-800 font-mono tracking-widest"
                />
              </div>
              
              <div className="flex justify-start border-t border-slate-50 pt-4 mt-2">
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl cursor-pointer border-none shadow-md transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 size={16} className="animate-spin text-[#9ADE7B]" /> : <ShieldCheck size={16} />} 
                  Mettre à jour
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* --- POP-UP MODALE : MODIFICATION DU NOM --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 box-border">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 flex flex-col gap-4 relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
            >
              <X size={18} />
            </button>
            
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-bold text-slate-900 m-0">Modifier mon nom</h4>
              <p className="text-[11px] text-slate-400 m-0">Ce nom sera affiché sur votre interface et vos factures.</p>
            </div>

            <form onSubmit={handleUpdateName} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Nouveau nom complet</label>
                <input 
                  type="text"
                  required
                  value={nouveauNom}
                  onChange={(e) => setNouveauNom(e.target.value)}
                  className="w-full box-border p-3 text-sm bg-slate-50 rounded-xl border border-transparent focus:outline-none focus:border-slate-200 focus:bg-white transition-all text-slate-800 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-50">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs font-bold tracking-wider uppercase text-slate-500 bg-transparent hover:bg-slate-50 px-4 py-2.5 rounded-xl cursor-pointer border-none transition-all"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-white bg-slate-900 hover:bg-black px-4 py-2.5 rounded-xl cursor-pointer border-none shadow-md transition-all disabled:opacity-50"
                >
                  {loading && <Loader2 size={12} className="animate-spin text-[#9ADE7B]" />}
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="flex w-full mt-auto pt-8 border-t border-slate-50 gap-2 items-center justify-end">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-slate-400 m-0">Session sécurisée par VOLTA NETWORK SERVICES</p>
      </footer>
    </div>
  );
}