import { Mail, Lock, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export default function Login() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] flex flex-col items-center justify-start md:justify-center p-4 md:p-8 overflow-y-auto font-sans">
      
      {/* 1. Header */}
      <div className="text-center mt-6 mb-8 md:mb-12 flex flex-col items-center gap-4 md:gap-6 w-full px-2">
        <h2 className="text-base md:text-xl font-bold tracking-[0.2em] text-gray-950 uppercase">
          VOLTA NETWORK SERVICES
        </h2>
        <img src={logo} alt="Volta Logo" className="w-16 md:w-24" />
      </div>

      {/* 2. Carte de Connexion */}
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] w-full max-w-md border border-gray-100">
        
        {/* SECTION MODIFIÉE : Centrée sur mobile, Justifiée sur PC */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-8 md:mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-950 tracking-tighter">Connexion</h1>
            <p className="text-xs md:text-sm text-gray-400 mt-1.5">Accédez à votre compte</p>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
            Live Security <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>
        </div>

        <form className="space-y-5 md:space-y-6">
          {/* Champ Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
              Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-300 group-focus-within:text-volta-green transition-colors" />
              <input 
                id="email"
                name="email"
                type="email" 
                placeholder="nom@voltanetwork.com"
                required
                className="w-full bg-[#EAECEF] border-none rounded-xl py-3 md:py-4 pl-11 pr-4 text-sm focus:ring-2 focus:ring-green-100 transition-all outline-none"
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
              Mot de passe
            </label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-300 group-focus-within:text-volta-green transition-colors" />
              <input 
                id="password"
                name="password"
                type="password" 
                placeholder="*************************"
                required
                className="w-full bg-[#EAECEF] border-none rounded-xl py-3 md:py-4 pl-11 pr-12 text-sm focus:ring-2 focus:ring-green-100 transition-all outline-none"
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 px-1">
                <Eye className="w-4 md:w-5 h-4 md:h-5 text-gray-300 hover:text-gray-500 transition-colors" />
              </button>
            </div>
            <div className="text-right">
              <Link to="/forgot" className="text-volta-green text-[11px] md:text-xs font-bold hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full min-h-[48px] bg-[#9ADE7B] hover:bg-[#89cf6a] text-gray-900 font-bold py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] mt-6 shadow-sm text-sm md:text-base"
          >
            Se connecter <ArrowRight className="w-5 h-5" />
          </button>
        </form>

       <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-10 text-center w-full">
        Nouveau sur VOLTANETWORK ?{' '}
        <Link to="/register" className="text-black font-black hover:underline ml-1 transition-all">
          Créer un compte
        </Link>
      </p>
      </div>

      {/* 3. Footer */}
      <footer className="mt-10 md:mt-14 text-center w-full px-4 mb-6">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase mb-5 tracking-wide">
          <Link to="/privacy" className="hover:text-gray-600">Police de Confidentialité</Link>
          <Link to="/terms" className="hover:text-gray-600">Conditions d'utilisation</Link>
          <Link to="/support" className="hover:text-gray-600">Support</Link>
        </div>
        <p className="text-[9px] md:text-[10px] text-gray-400 leading-relaxed uppercase tracking-wider">
          © 2026 VOLTANETWORK SERVICES.<br/>
          INFRASTRUCTURE DE SECURITE.
        </p>
      </footer>
    </div>
  );
}