import React, { useState } from 'react';
import { Mail, ArrowRight, ChevronLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.svg';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Appel au ForgotPasswordController créé précédemment
      await axios.post('http://127.0.0.1:8000/api/forgot-password', { email });
      
      // On redirige vers la vérification en passant l'email dans le state
      navigate('/verify-reset-otp', { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-900">
      <div className="w-full max-w-md">
        
        {/* ── BOUTON RETOUR UNIFORMISÉ ── */}
        <Link to="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-6 transition-colors text-[10px] md:text-[11px] font-extrabold uppercase tracking-widest">
          <ChevronLeft className="w-4 h-4" /> Retour à la connexion
        </Link>
        
        {/* ── CARTE DE RÉCUPÉRATION ── */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-8">
            <img src={logo} alt="Volta Logo" className="w-12 h-12 object-contain" />
            <div className="flex items-center gap-2 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                Recovery Password
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Mot de passe oublié ?</h1>
          <p className="text-xs font-medium text-slate-400 mb-8 leading-relaxed">
            Entrez votre adresse email réseau. Un code de récupération OTP vous sera envoyé pour sécuriser et réinitialiser votre accès.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-medium rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Champ Email */}
            <div className="space-y-2">
              <label className="text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
                Adresse Email réseau
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#9ADE7B] transition-colors" />
                <input 
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@voltanetwork.com"
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-slate-900 focus:bg-white rounded-xl py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 transition-all outline-none"
                />
              </div>
            </div>

            {/* Bouton de Soumission */}
            <button 
              type="submit" disabled={loading}
              className={`w-full h-12 ${
                loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#9ADE7B] hover:bg-slate-900 text-slate-900 hover:text-[#9ADE7B]'
              } font-extrabold text-[11px] uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm pt-0.5`}
            >
              {loading ? (
                <>Envoi en cours... <Loader2 className="w-4 h-4 animate-spin" /></>
              ) : (
                <>Envoyer le code <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>

        {/* ── PIED DE PAGE UNIFORMISÉ ── */}
        <p className="text-[9px] md:text-[10px] text-slate-400 text-center uppercase tracking-widest mt-12 leading-relaxed">
            © 2026 VOLTANETWORK SERVICES.<br/>
            SÉCURISATION DES ACCÈS AUX INFRASTRUCTURES.
        </p>

      </div>
    </div>
  );
}