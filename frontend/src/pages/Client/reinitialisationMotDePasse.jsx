import { Lock, Eye, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-[#F6F7F9] flex flex-col items-center justify-start md:justify-center p-4 md:p-8 overflow-y-auto font-sans">
      
      {/* 1. Header (Logo & Titre) */}
      <div className="text-center mt-6 mb-8 md:mb-12 flex flex-col items-center gap-4 md:gap-6 w-full">
        <h2 className="text-base md:text-xl font-bold tracking-[0.2em] text-gray-950 uppercase px-2">
          VOLTA NETWORK SERVICES
        </h2>
        <img src={logo} alt="Volta Logo" className="w-16 md:w-24" />
      </div>

      {/* 2. Carte de Réinitialisation */}
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] w-full max-w-md border border-gray-100">
{/*         
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-10 gap-6 w-full">
        
        <div className="text-center sm:text-left space-y-1">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-950 tracking-tighter">
            Réinitialiser le mot de passe
          </h1>
          <p className="text-xs text-gray-400 max-w-[240px] sm:max-w-xs leading-relaxed font-medium">
            Sécurisez votre accès réseau avec un nouveau code.
          </p>
        </div>
         <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-5 py-1.5 rounded-full border border-gray-100 shadow-sm">
            Live Security <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>
      </div> */}

        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-8 md:mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-950 tracking-tighter">Réinitialiser le mot de passe</h1>
            <p className="text-xs md:text-sm text-gray-400 mt-1.5">Sécurisez votre accès réseau avec un nouveau code.</p>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
            Live Security <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>
        </div>


        <form className="space-y-6">
          {/* Nouveau Mot de passe */}
          <div className="space-y-2">
            <label htmlFor="new-password" className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
              Nouveau mot de passe
            </label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-300 group-focus-within:text-volta-green transition-colors" />
              <input 
                id="new-password"
                name="new-password"
                type="password" 
                placeholder="••••••••••••"
                required
                className="w-full bg-[#EAECEF] border-none rounded-xl py-3.5 pl-11 pr-12 text-sm focus:ring-2 focus:ring-green-100 transition-all outline-none"
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
              </button>
            </div>
            
            {/* Barre de force du mot de passe (Comme sur ton image) */}
            <div className="pt-2">
              <div className="flex gap-1 h-1">
                <div className="flex-1 bg-green-500 rounded-full"></div>
                <div className="flex-1 bg-green-500 rounded-full"></div>
                <div className="flex-1 bg-green-500 rounded-full"></div>
                <div className="flex-1 bg-gray-200 rounded-full"></div>
              </div>
              <p className="text-[9px] font-bold text-green-600 uppercase mt-2 text-right tracking-widest">Sécurisé</p>
            </div>
          </div>

          {/* Confirmer le Mot de passe */}
          <div className="space-y-2">
            <label htmlFor="confirm-password" className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
              Confirmer le mot de passe
            </label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-300 group-focus-within:text-volta-green transition-colors" />
              <input 
                id="confirm-password"
                name="confirm-password"
                type="password" 
                placeholder="••••••••••••"
                required
                className="w-full bg-[#EAECEF] border-none rounded-xl py-3.5 pl-11 pr-12 text-sm focus:ring-2 focus:ring-green-100 transition-all outline-none"
              />
            </div>
          </div>

          {/* Bouton de validation */}
          <button 
            type="submit"
            className="w-full min-h-[48px] bg-[#9ADE7B] hover:bg-[#89cf6a] text-gray-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-sm text-sm uppercase tracking-wide"
          >
            Réinitialiser le mot de passe <ShieldCheck className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <div className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Besoin d'aide ? 
          <Link to="/support" >
           <span className="text-volta-green">Contactez le support</span>
          </Link>
          </div >
        </div>
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