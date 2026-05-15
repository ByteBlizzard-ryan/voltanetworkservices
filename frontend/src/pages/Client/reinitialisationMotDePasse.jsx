import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
    <div className="min-h-screen bg-[#F6F7F9] flex flex-col items-center justify-start md:justify-center p-4 md:p-8 overflow-y-auto font-sans">
      
      <div className="text-center mt-6 mb-8 md:mb-12 flex flex-col items-center gap-4 md:gap-6 w-full">
        <h2 className="text-base md:text-xl font-bold tracking-[0.2em] text-gray-950 uppercase px-2">
          VOLTA NETWORK SERVICES
        </h2>
        <img src={logo} alt="Volta Logo" className="w-16 md:w-24" />
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] w-full max-w-md border border-gray-100">
        
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-8 md:mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-950 tracking-tighter">Réinitialiser</h1>
            <p className="text-xs md:text-sm text-gray-400 mt-1.5">Saisissez votre nouveau code d'accès.</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            Secure Session <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>
        </div>

        {message.text && (
          <div className={`mb-6 p-3 rounded text-xs font-bold uppercase ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Nouveau mot de passe</label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 text-gray-300 group-focus-within:text-[#9ADE7B] transition-colors" />
              <input 
                id="new-password" name="new-password" type={showPass ? "text" : "password"} required
                className="w-full bg-[#EAECEF] border-none rounded-xl py-3.5 pl-11 pr-12 text-sm focus:ring-2 focus:ring-green-100 outline-none"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
                {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Confirmer le mot de passe</label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 text-gray-300 group-focus-within:text-[#9ADE7B] transition-colors" />
              <input 
                id="confirm-password" name="confirm-password" type={showPass ? "text" : "password"} required
                className="w-full bg-[#EAECEF] border-none rounded-xl py-3.5 pl-11 pr-12 text-sm focus:ring-2 focus:ring-green-100 outline-none"
              />
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full min-h-[48px] bg-[#9ADE7B] hover:bg-[#89cf6a] disabled:bg-gray-300 text-gray-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-sm text-sm uppercase"
          >
            {loading ? "Mise à jour..." : "Réinitialiser"} <ShieldCheck className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}