// pages/Profil.jsx
import React, { useState } from "react";
import { UserCog, KeyIcon, LogOut, PencilLine, Eye, EyeOff, ShieldCheck } from 'lucide-react';

// Fonction couleur d'avatar adoucie (Gamme Lin / Silex / Taupe)
function Couleur_Nom_Icon(lettre = "") {
  const colorMap = {
    A: "#F4F1EA", B: "#EAE5D9", C: "#DFD9C8", D: "#D4CCB7",
    E: "#F5F5F7", F: "#EAEAEB", G: "#E1E1E3", D: "#D8D8DC",
    I: "#EAF2EC", J: "#D5E5DA", K: "#C0D9C8", L: "#ACCDB6",
    M: "#FBF3F2", N: "#F7E7E5", O: "#F2DCD9", P: "#EDD0CC",
    Q: "#F5F5F7", R: "#EAEAEB", S: "#E1E1E3", T: "#D8D8DC",
    U: "#F4F1EA", V: "#EAE5D9", W: "#DFD9C8", X: "#D4CCB7",
    Y: "#EAF2EC", Z: "#D5E5DA"
  };
  return colorMap[lettre.toUpperCase()] || "#F5F5F7";
}

export default function Profil() {
  const email = "mouga@gmail.com";
  const nom = "Mouga";
  const password = "Azerty@46+c";
  
  const [paramProfil, setParamProfil] = useState('personnelle');
  const [eye, setEye] = useState(false);
  const premiereLettre = email?.charAt(0).toUpperCase() || "";

  return (
    <div className="min-h-screen bg-white font-[Cambria,Cochin,Georgia,Times,'Times_New_Roman',serif] py-4 w-full box-border flex flex-col gap-8">
      
      <header className="flex flex-col gap-1 w-full">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-gray-900 m-0">Mon Profil</h1>
        <p className="text-xs font-medium text-gray-400 font-sans m-0">Consultez et gérez vos informations personnelles</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-10 w-full items-start">
        
        {/* Navigation gauche */}
        <div className="w-full lg:w-[280px] bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col font-sans box-border">
          <div className="flex w-full gap-3 items-center pb-4 border-b border-gray-50">
            <div 
              style={{ backgroundColor: Couleur_Nom_Icon(premiereLettre) }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-800 font-bold text-sm border border-gray-100/50"
            >
              {premiereLettre}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 m-0 leading-tight">Mon compte</span>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">Paramètres généraux</span>
            </div>
          </div>

          <div className="pt-4 w-full flex flex-col gap-1">
            <button 
              className={`flex items-center gap-3 text-xs p-3 w-full rounded-xl transition-all duration-200 border-none cursor-pointer font-bold tracking-wide text-left ${
                paramProfil === "personnelle" 
                  ? "bg-gray-900 text-white shadow-sm" 
                  : "bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => setParamProfil('personnelle')}
            >
              <UserCog size={16} /> 
              <span>INFOS PERSONNELLES</span>
            </button>
            
            <button 
              className={`flex items-center gap-3 text-xs p-3 w-full rounded-xl transition-all duration-200 border-none cursor-pointer font-bold tracking-wide text-left ${
                paramProfil === "modifier_pass" 
                  ? "bg-gray-900 text-white shadow-sm" 
                  : "bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => setParamProfil('modifier_pass')}
            >
              <KeyIcon size={16} /> 
              <span>MOT DE PASSE</span>
            </button>
            
            <button className="flex items-center gap-3 text-xs p-3 w-full rounded-xl transition-all duration-200 border-none cursor-pointer font-bold tracking-wide text-left bg-transparent text-gray-400 hover:text-rose-600 hover:bg-rose-50/40 mt-4">
              <LogOut size={16} /> 
              <span>DÉCONNEXION</span>
            </button>
          </div>
        </div>

        {/* Panneau de droite : Informations Personnelles */}
        {paramProfil === 'personnelle' && (
          <div className="flex-1 w-full flex flex-col gap-6">
            <div className="flex items-center gap-4 w-full">
              <h3 className="text-xs font-bold tracking-widest uppercase text-gray-900 m-0 font-sans">
                Informations personnelles
              </h3>
              <div className="flex-1 h-[1px] bg-gray-100" />
            </div>
            
            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-6 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Nom complet</span>
                  <span className="text-sm font-bold text-gray-800 font-serif">{nom}</span> 
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Adresse email</span>
                  <span className="text-sm font-bold text-gray-800">{email}</span>
                </div>
              </div>

              <div className="flex justify-end border-t border-gray-50 pt-4 mt-2">
                <button className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-white bg-gray-900 hover:bg-gray-800 px-5 py-2.5 rounded-xl cursor-pointer transition-all border-none shadow-sm">
                  <PencilLine size={14} /> Modifier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Panneau de droite : Modifier Mot de Passe */}
        {paramProfil === 'modifier_pass' && (
          <div className="flex-1 w-full flex flex-col gap-6 font-sans">
            <div className="flex items-center gap-4 w-full">
              <h3 className="text-xs font-bold tracking-widest uppercase text-gray-900 m-0">
                Sécurité du compte
              </h3>
              <div className="flex-1 h-[1px] bg-gray-100" /> 
            </div>
            
            <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col gap-5 max-w-xl w-full box-border">
              <div className="flex flex-col gap-2">
                <label className="flex items-center justify-between text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  <span>Mot de passe actuel</span> 
                  <button 
                    type="button"
                    className="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0 uppercase tracking-wider" 
                    onClick={() => setEye(!eye)}
                  >
                    {eye ? <EyeOff size={14} /> : <Eye size={14} />}
                    <span className="ml-0.5">{eye ? "Masquer" : "Afficher"}</span>
                  </button>
                </label>
                <input 
                  type={eye ? 'text' : 'password'} 
                  disabled={true} 
                  value={password}
                  className="w-full box-border p-3 text-sm bg-gray-50 rounded-xl border border-transparent text-gray-400 font-mono tracking-widest"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Nouveau mot de passe</label>
                <input 
                  type="password" 
                  className="w-full box-border p-3 text-sm bg-gray-50 rounded-xl border border-transparent focus:outline-none focus:border-gray-200 focus:bg-white transition-all text-gray-800"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Confirmation du mot de passe</label>
                <input 
                  type="password" 
                  className="w-full box-border p-3 text-sm bg-gray-50 rounded-xl border border-transparent focus:outline-none focus:border-gray-200 focus:bg-white transition-all text-gray-800"
                />
              </div>
              
              <div className="flex justify-start border-t border-gray-50 pt-4 mt-2">
                <button className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl cursor-pointer border-none shadow-sm transition-all">
                  <ShieldCheck size={16} /> Mettre à jour
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="flex w-full mt-auto pt-8 border-t border-gray-50 gap-2 items-center justify-end font-sans">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        <p className="text-[10px] tracking-wider uppercase font-bold text-gray-400 m-0">Session sécurisée par VOLTA NETWORK SERVICES</p>
      </footer>
    </div>
  );
}