import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.svg';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // On récupère l'email et l'otp (soit du state, soit des paramètres d'URL)
  const email = new URLSearchParams(location.search).get('email') || "";
  const otp = new URLSearchParams(location.search).get('otp') || "";

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target['new-password'].value;
    const password_confirmation = e.target['confirm-password'].value;

    if (password !== password_confirmation) {
        return setMessage({ type: "error", text: "Les mots de passe ne correspondent pas." });
    }

    setLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/reset-password', {
        email,
        otp,
        password,
        password_confirmation
      });
      
      setMessage({ type: "success", text: "Mot de passe mis à jour ! Redirection..." });
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Erreur lors de la réinitialisation." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start md:justify-center p-4 md:p-8 overflow-y-auto font-sans text-slate-900">
      
      {/* ── 1. HEADER UNIFORMISÉ ── */}
      <div className="text-center mt-6 mb-8 md:mb-10 flex flex-col items-center gap-4 w-full">
        <h2 className="text-[10px] font-extrabold tracking-[0.25em] text-slate-900 uppercase leading-tight px-2">
          Volta Network <br /> Services
        </h2>
        <img src={logo} alt="Volta Logo" className="w-12 md:w-14 object-contain" />
      </div>

      {/* ── 2. CARTE DE RÉINITIALISATION ── */}
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm w-full max-w-md border border-slate-100">
        
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-8 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Réinitialiser</h1>
            <p className="text-xs font-medium text-slate-400 mt-1">Saisissez votre nouveau code d'accès.</p>
          </div>
          <div className="flex items-center gap-2 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
            Secure Session <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          </div>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 border rounded-xl text-xs font-semibold tracking-wide uppercase ${
            message.type === 'success' 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
              : 'bg-rose-50 border-rose-100 text-rose-600'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nouveau mot de passe */}
          <div className="space-y-2">
            <label className="text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
              Nouveau mot de passe
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#9ADE7B] transition-colors" />
              <input 
                id="new-password" name="new-password" type={showPass ? "text" : "password"} required
                className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-slate-900 focus:bg-white rounded-xl py-3.5 pl-11 pr-12 text-sm font-medium text-slate-900 transition-all outline-none"
              />
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 px-2 text-slate-300 hover:text-slate-600 transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirmer le mot de passe */}
          <div className="space-y-2">
            <label className="text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
              Confirmer le mot de passe
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#9ADE7B] transition-colors" />
              <input 
                id="confirm-password" name="confirm-password" type={showPass ? "text" : "password"} required
                className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-slate-900 focus:bg-white rounded-xl py-3.5 pl-11 pr-12 text-sm font-medium text-slate-900 transition-all outline-none"
              />
            </div>
          </div>

          {/* Bouton de Validation */}
          <button 
            type="submit" disabled={loading}
            className={`w-full h-12 ${
                loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#9ADE7B] hover:bg-slate-900 text-slate-900 hover:text-[#9ADE7B]'
            } font-extrabold text-[11px] uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm pt-0.5`}
          >
            {loading ? (
              <>Mise à jour... <Loader2 className="w-4 h-4 animate-spin" /></>
            ) : (
              <>Réinitialiser <ShieldCheck className="w-4 h-4" /></>
            )}
          </button>
        </form>
      </div>

      {/* ── 3. FOOTER UNIFORMISÉ ── */}
      <p className="text-[9px] md:text-[10px] text-slate-400 text-center uppercase tracking-widest mt-12 leading-relaxed">
          © 2026 VOLTANETWORK SERVICES.<br/>
          POLITIQUES DE SÉCURITÉ ET CONTRÔLE DES ACCÈS.
      </p>

    </div>
  );
}