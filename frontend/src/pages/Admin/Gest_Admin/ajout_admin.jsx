import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CornerUpLeft, Mail, User, LockKeyhole, RotateCcwKey, ShieldCog, UserPlus, Loader2 } from 'lucide-react';

export default function Ajout_Admin() {
  const naviguer = useNavigate();
  
  // États locaux des champs du formulaire
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // États pour la gestion de l'API
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const retourner = () => {
    naviguer('/admin/administrateur');
  };

  // Envoi des données vers Laravel
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // 1. Validation de sécurité basique côté Front-end
    if (!nom || !email || !role || !password) {
      setErrorMessage("Veuillez remplir tous les champs requis.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setLoading(true);

      // 2. Envoi de la requête HTTP
      const response = await fetch("http://localhost:8000/api/admin/administrateurs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          nom_complet: nom,
          email: email,
          role_utilisateur: role,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errorsArray = Object.values(data.errors).flat();
          throw new Error(errorsArray.join(" "));
        }
        throw new Error(data.message || "Impossible de créer le compte de sécurité.");
      }

      // 3. Succès
      setSuccessMessage("Le profil de sécurité a été créé avec succès.");
      
      // Réinitialisation du formulaire
      setNom('');
      setEmail('');
      setRole('');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        naviguer('/admin/administrateur');
      }, 1500);

    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 py-12 pb-20 bg-white min-h-screen font-sans px-4 md:px-8 text-slate-900 overflow-x-hidden">
      
      {/* ── En-tête / Titre d'accès ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
        <div>
          <span className="inline-block bg-[#9ADE7B]/20 text-slate-900 text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-2">
            Gestion des accès
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 m-0 leading-tight">
            Nouveau Profil de <span className="text-[#9ADE7B]">Sécurité</span>
          </h1>
        </div>
        <button  
          type="button"
          onClick={retourner}
          className="flex items-center gap-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer border-none active:scale-95 uppercase tracking-[0.2em]"
        >
          <CornerUpLeft size={16} /> Retour à la liste
        </button>
      </div>

      {/* ── Description ── */}
      <p className="text-slate-600 text-base max-w-3xl m-0 -mt-2 leading-relaxed">
        Configurer les privilèges et les identifiants pour un nouvel administrateur du réseau. 
        Chaque profil est audité en temps réel par le noyau Sentinel.
      </p>

      {/* ── Retours visuels de statut (Erreur / Succès) ── */}
      {errorMessage && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 max-w-4xl shadow-sm">
          ⚠️ {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="p-4 bg-[#9ADE7B]/20 text-slate-900 rounded-xl text-sm font-bold border border-slate-100 max-w-4xl shadow-sm">
          🛡️ {successMessage}
        </div>
      )}

      {/* ── Formulaire d'ajout ── */}
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-6 bg-white rounded-2xl p-6 md:p-8 w-full border border-slate-100 shadow-2xl max-w-4xl"
      >
        
        {/* Nom Complet */}
        <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            <User size={15} className="text-[#9ADE7B]" /> Nom complet
          </p>
          <input 
            type="text" 
            placeholder="Jean Paul" 
            value={nom} 
            onChange={(e) => setNom(e.target.value)} 
            disabled={loading}
            className="bg-slate-50/50 text-sm w-full p-3.5 rounded-xl border border-slate-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all disabled:opacity-50 text-slate-900 font-medium"
          />
        </label>

        {/* Email Professionnel */}
        <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            <Mail size={15} className="text-[#9ADE7B]" /> Email professionnel
          </p>
          <input 
            type="email" 
            placeholder="jean@gmail.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="bg-slate-50/50 text-sm w-full p-3.5 rounded-xl border border-slate-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all disabled:opacity-50 text-slate-900 font-medium"
          />
        </label>

        {/* Rôle et Privilèges */}
        <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            <ShieldCog size={15} className="text-[#9ADE7B]" /> Rôle & Privilèges
          </p>
          <div className="relative w-full">
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
              className="bg-slate-50/50 text-sm w-full p-3.5 rounded-xl border border-slate-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all appearance-none cursor-pointer disabled:opacity-50 text-slate-900 font-bold uppercase tracking-[0.1em]"
            >
              <option value="" className="normal-case tracking-normal text-slate-400 font-normal">Sélectionnez un rôle</option>
              <option value="ADMIN">Administrateur</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
              ▼
            </div>
          </div>
        </label>

        {/* Mot de passe */}
        <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            <LockKeyhole size={15} className="text-[#9ADE7B]" /> Mot de passe
          </p>
          <input 
            type="password" 
            placeholder="••••••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="bg-slate-50/50 text-sm w-full p-3.5 rounded-xl border border-slate-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all disabled:opacity-50 text-slate-900"
          />
        </label>

        {/* Confirmer le mot de passe */}
        <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            <RotateCcwKey size={15} className="text-[#9ADE7B]" /> Confirmer mot de passe
          </p>
          <input 
            type="password" 
            placeholder="••••••••••••"
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            className="bg-slate-50/50 text-sm w-full p-3.5 rounded-xl border border-slate-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all disabled:opacity-50 text-slate-900"
          />
        </label>

        {/* ── Actions de validation ── */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-4 gap-4">
          <button 
            type="button"
            onClick={retourner}
            disabled={loading}
            className="bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 px-6 py-3 rounded-xl cursor-pointer transition-colors border-none font-bold text-xs uppercase tracking-[0.2em] active:scale-95 disabled:opacity-50"
          >
            Annuler
          </button>
          
          <button 
            type="submit"
            disabled={loading}
            className="bg-slate-950 hover:bg-[#9ADE7B] text-white hover:text-slate-900 px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all border-none font-bold text-xs uppercase tracking-[0.2em] shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <UserPlus size={16} />
            )}
            {loading ? "Création..." : "Ajouter l'administrateur"}
          </button>
        </div>

      </form>
    </div>
  );
}