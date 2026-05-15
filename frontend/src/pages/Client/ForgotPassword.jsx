import React, { useState } from 'react';
import { Mail, ArrowRight, ChevronLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-[#F6F7F9] flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <Link to="/login" className="flex items-center gap-2 text-gray-400 hover:text-gray-600 mb-8 transition-colors text-sm font-bold uppercase tracking-widest">
          <ChevronLeft size={16} /> Retour
        </Link>
        
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
          <img src={logo} alt="Logo" className="w-16 mb-8 mx-auto sm:mx-0" />
          
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-950 tracking-tighter mb-2">Mot de passe oublié ?</h1>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">
            Entrez votre adresse email. Nous vous enverrons un code de récupération pour sécuriser votre accès.
          </p>

          {error && <div className="mb-6 p-3 bg-red-50 text-red-600 text-xs rounded border border-red-100 italic">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Adresse Email réseau</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#9ADE7B] transition-colors" />
                <input 
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="nom@voltanetwork.com"
                  className="w-full bg-[#EAECEF] border-none rounded-xl py-4 pl-11 pr-4 text-sm focus:ring-2 focus:ring-green-100 outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-[#9ADE7B] hover:bg-[#89cf6a] disabled:bg-gray-300 text-gray-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all uppercase text-sm shadow-sm"
            >
              {loading ? "Envoi en cours..." : "Envoyer le code"} <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}