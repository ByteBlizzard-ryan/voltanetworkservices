import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CornerUpLeft, Mail, User, LockKeyhole, RotateCcwKey, ShieldCog, UserPlus } from 'lucide-react';

export default function Ajout_Admin() {
  const naviguer = useNavigate();
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const retourner = () => {
    naviguer('/admin/administrateur');
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

      {/* ── Formulaire d'ajout ── */}
      <div className="flex flex-col gap-5 bg-white rounded-2xl p-6 md:p-8 w-full border border-gray-100 shadow-xl max-w-4xl">
        
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
            className="bg-gray-50/50 text-sm w-full p-3.5 rounded-xl border border-gray-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all"
          />
        </label>

        {/* Email Professionnel */}
        <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Mail size={15} /> Email professionnel
          </p>
          <input 
            type="text" 
            placeholder="jean@gmail.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50/50 text-sm w-full p-3.5 rounded-xl border border-gray-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all"
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
            className="bg-gray-50/50 text-sm w-full p-3.5 rounded-xl border border-gray-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all appearance-none cursor-pointer"
          >
            <option value="">Sélectionnez un rôle</option>
            <option value="ADMIN">Administrateur</option>
            <option value="USER">Utilisateur</option>
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
            className="bg-gray-50/50 text-sm w-full p-3.5 rounded-xl border border-gray-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all"
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
            className="bg-gray-50/50 text-sm w-full p-3.5 rounded-xl border border-gray-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all"
          />
        </label>

        {/* ── Actions de validation ── */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-50 mt-4 gap-4">
          <button className="bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 px-6 py-3 rounded-xl cursor-pointer transition-colors border-none font-bold text-xs uppercase tracking-wider active:scale-95">
            Annuler
          </button>
          
          <button className="bg-[#F6F7F9] hover:bg-[#9ADE7B] text-gray-900 hover:text-white px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all border-none font-bold text-xs uppercase tracking-wider shadow-sm active:scale-95">
            <UserPlus size={16} /> Ajouter l'administrateur
          </button>
        </div>

      </div>
    </div>
  );
}