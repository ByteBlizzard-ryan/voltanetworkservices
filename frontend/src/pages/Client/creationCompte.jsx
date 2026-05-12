import { Mail, Lock, Eye, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export default function Register() {
  return (
    /* - overflow-y-auto : permet de scroller si le clavier du téléphone cache le bouton.
       - justify-start md:justify-center : Aligné en haut sur mobile, centré sur PC.
    */
    <div className="min-h-screen bg-[#F6F7F9] flex flex-col items-center justify-start md:justify-center p-4 md:p-8 overflow-y-auto font-sans">
      
      {/* 1. Header : Taille adaptative du texte et du logo */}
      <div className="text-center mt-4 mb-8 md:mb-12 flex flex-col items-center gap-4 w-full max-w-[90%]">
        <h2 className="text-sm md:text-xl font-bold tracking-[0.2em] text-gray-900 uppercase">
          VOLTA NETWORK SERVICES
        </h2>
        <img src={logo} alt="Volta Logo" className="w-16 md:w-24" />
      </div>

      {/* 2. Carte de Création de compte */}
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] w-full max-w-md border border-gray-100">
        
        {/* SECTION TITRE : Centrée sur mobile, Justifiée sur PC */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-8 md:mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-950 tracking-tighter">Créer un compte</h1>
            <p className="text-xs md:text-sm text-gray-400 mt-1">Inscrivez-vous à nos services</p>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
            Live Security <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.3)]"></span>
          </div>
        </div>

        <form className="space-y-4 md:space-y-5">
          {/* Champ Nom d'utilisateur */}
          <div className="space-y-1.5">
            <label htmlFor="username" className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
              Nom d'utilisateur
            </label>
            <div className="relative group">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-300 group-focus-within:text-volta-green transition-colors" />
              <input 
                id="username" name="username" type="text" placeholder="Jean Dupont" required
                className="w-full bg-[#EAECEF] border-none rounded-xl py-3 md:py-4 pl-11 pr-4 text-sm focus:ring-2 focus:ring-green-100 transition-all outline-none"
              />
            </div>
          </div>

          {/* Champ Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
              Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-300 group-focus-within:text-volta-green transition-colors" />
              <input 
                id="email" name="email" type="email" placeholder="nom@voltanetwork.com" required
                className="w-full bg-[#EAECEF] border-none rounded-xl py-3 md:py-4 pl-11 pr-4 text-sm focus:ring-2 focus:ring-green-100 transition-all outline-none"
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
              Mot de passe
            </label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-300 group-focus-within:text-volta-green transition-colors" />
              <input 
                id="password" name="password" type="password" placeholder="••••••••••••••••" required
                className="w-full bg-[#EAECEF] border-none rounded-xl py-3 md:py-4 pl-11 pr-12 text-sm focus:ring-2 focus:ring-green-100 transition-all outline-none"
              />
            </div>
          </div>

          {/* Champ Confirmation */}
          <div className="space-y-1.5">
            <label htmlFor="password_confirmation" className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">
              Confirmation
            </label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-300 group-focus-within:text-volta-green transition-colors" />
              <input 
                id="password_confirmation" name="password_confirmation" type="password" placeholder="••••••••••••••••" required
                className="w-full bg-[#EAECEF] border-none rounded-xl py-3 md:py-4 pl-11 pr-12 text-sm focus:ring-2 focus:ring-green-100 transition-all outline-none"
              />
            </div>
          </div>

       
    

          {/* Boutons d'action */}
          <button type="submit" className="w-full min-h-[48px] bg-[#9ADE7B] hover:bg-[#89cf6a] text-gray-900 font-bold py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-sm text-sm md:text-base mt-3">
            Créer un compte <ArrowRight className="w-5 h-5" />
          </button>

            {/* Séparateur */}
           <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-[10px] font-bold text-gray-300 uppercase">ou</span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          <button type="button" className="w-full min-h-[44px] bg-[#F1F3F5] hover:bg-gray-200 text-gray-700 font-semibold py-2.5 md:py-3 rounded-xl flex items-center justify-center gap-3 transition-all text-xs md:text-sm">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
            Continuer avec Google
          </button>
        </form>

        <p className="text-center text-xs md:text-sm text-gray-500 mt-8">
          Vous avez déjà un compte ?{' '}
          <Link to="/login" className="text-black font-bold hover:underline ml-1">
            Se connecter
          </Link>
        </p>
      </div>

      {/* 3. Footer Responsive */}
      <footer className="mt-10 md:mt-16 text-center w-full px-4 mb-4">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase mb-5 tracking-wide">
          <Link to="/privacy" className="hover:text-gray-600 transition-colors">Police de Confidentialité</Link>
          <Link to="/terms" className="hover:text-gray-600 transition-colors">Conditions d'utilisation</Link>
          <Link to="/support" className="hover:text-gray-600 transition-colors">Support</Link>
        </div>
        <p className="text-[9px] md:text-[10px] text-gray-400 leading-relaxed uppercase tracking-wider">
          © 2026 VOLTANETWORK SERVICES.<br/>
          INFRASTRUCTURE DE SECURITE.
        </p>
      </footer>
    </div>
  );
}