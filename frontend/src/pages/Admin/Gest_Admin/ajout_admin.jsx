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
    e.preventDefault(); // Empêche le rechargement de la page
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
          role_utilisateur: role, // Doit correspondre à la validation Laravel (ex: 'ADMIN')
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Capture des erreurs de validation de Laravel (ex: email déjà pris)
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

      // Redirection après 1.5 seconde pour laisser le temps de lire le message de succès
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
    <div className="flex flex-col gap-8 py-12 pb-20 bg-white min-h-screen font-[Cambria,Cochin,Georgia,Times,'Times_New_Roman',serif] px-4 md:px-8">
      
      {/* ── En-tête / Titre d'accès ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
        <div>
          <p className="text-[#9ADE7B] font-bold text-xs tracking-widest uppercase">Gestion des accès</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 mt-1">Nouveau Profil de Sécurité</h1>
        </div>
        <button 
          type="button"
          onClick={retourner}
          className="flex items-center gap-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer border-none active:scale-95 uppercase tracking-wider"
        >
          <CornerUpLeft size={16} /> Retour à la liste
        </button>
      </div>

      {/* ── Description ── */}
      <p className="text-gray-400 text-sm max-w-3xl -mt-4">
        Configurer les privilèges et les identifiants pour un nouvel administrateur du réseau. 
        Chaque profil est audité en temps réel par le noyau Sentinel.
      </p>

      {/* ── Retours visuels de statut (Erreur / Succès) ── */}
      {errorMessage && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 max-w-4xl">
          ⚠️ {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="p-4 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-100 max-w-4xl">
          🛡️ {successMessage}
        </div>
      )}

      {/* ── Formulaire d'ajout ── */}
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-5 bg-white rounded-2xl p-6 md:p-8 w-full border border-gray-100 shadow-xl max-w-4xl"
      >
        
        {/* Nom Complet */}
        <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <User size={15} /> Nom complet
          </p>
          <input 
            type="text" 
            placeholder="Jean Paul" 
            value={nom} 
            onChange={(e) => setNom(e.target.value)} 
            disabled={loading}
            className="bg-gray-50/50 text-sm w-full p-3.5 rounded-xl border border-gray-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all disabled:opacity-50"
          />
        </label>

        {/* Email Professionnel */}
        <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Mail size={15} /> Email professionnel
          </p>
          <input 
            type="email" 
            placeholder="jean@gmail.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="bg-gray-50/50 text-sm w-full p-3.5 rounded-xl border border-gray-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all disabled:opacity-50"
          />
        </label>

        {/* Rôle et Privilèges */}
        <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <ShieldCog size={15} /> Rôle & Privilèges
          </p>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
            className="bg-gray-50/50 text-sm w-full p-3.5 rounded-xl border border-gray-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all appearance-none cursor-pointer disabled:opacity-50"
          >
            <option value="">Sélectionnez un rôle</option>
            <option value="ADMIN">Administrateur</option>
            {/* Attention : ton contrôleur Laravel n'accepte pour l'instant QUE 'ADMIN' via Rule::in(['ADMIN']) */}
          </select>
        </label>

        {/* Mot de passe */}
        <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <LockKeyhole size={15} /> Mot de passe
          </p>
          <input 
            type="password" 
            placeholder="••••••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="bg-gray-50/50 text-sm w-full p-3.5 rounded-xl border border-gray-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all disabled:opacity-50"
          />
        </label>

        {/* Confirmer le mot de passe */}
        <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <RotateCcwKey size={15} /> Confirmer mot de passe
          </p>
          <input 
            type="password" 
            placeholder="••••••••••••"
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            className="bg-gray-50/50 text-sm w-full p-3.5 rounded-xl border border-gray-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all disabled:opacity-50"
          />
        </label>

        {/* ── Actions de validation ── */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-50 mt-4 gap-4">
          <button 
            type="button"
            onClick={retourner}
            disabled={loading}
            className="bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 px-6 py-3 rounded-xl cursor-pointer transition-colors border-none font-bold text-xs uppercase tracking-wider active:scale-95 disabled:opacity-50"
          >
            Annuler
          </button>
          
          <button 
            type="submit"
            disabled={loading}
            className="bg-[#F6F7F9] hover:bg-[#9ADE7B] text-gray-900 hover:text-white px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all border-none font-bold text-xs uppercase tracking-wider shadow-sm active:scale-95 disabled:opacity-50"
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