import { NavLink } from 'react-router-dom';
import {Mail} from 'lucide-react';
import Facebook from '../logo/facebook.svg'

import logo from '../assets/logo.svg';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- GRILLE PRINCIPALE --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Section 1 : Logo & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Volta" className="w-10 h-10 object-contain" />
              <div className="flex flex-col">
                <span className="text-volta-green font-black text-sm uppercase leading-none">VOLTA</span>
                <span className="text-volta-green font-bold text-[9px] uppercase leading-none">NETWORK SERVICES</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Elite en solutions de surveillance et protection de données. Sécurisez votre avenir avec nos technologies de pointe.
            </p>
          </div>

          {/* Section 2 : Liens Rapides */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-gray-900 font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4 text-sm">
              <li><NavLink to="/" className="text-gray-500 hover:text-volta-green transition-colors">Accueil</NavLink></li>
              <li><NavLink to="/boutique" className="text-gray-500 hover:text-volta-green transition-colors">Boutique</NavLink></li>
              <li><NavLink to="/services" className="text-gray-500 hover:text-volta-green transition-colors">Services</NavLink></li>
              <li><NavLink to="/contact" className="text-gray-500 hover:text-volta-green transition-colors">Contact</NavLink></li>
            </ul>
          </div>

          {/* Section 3 : Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-gray-900 font-bold mb-6 uppercase tracking-widest text-xs">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-volta-green" />
                <span>Douala, Cameroun</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-volta-green" />
                <span>+237 6XX XXX XXX</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-volta-green" />
                <span>contact@volta.cm</span>
              </li>
            </ul>
          </div>

          {/* Section 4 : Newsletter & Socials */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-gray-900 font-bold mb-6 uppercase tracking-widest text-xs">Suivez-nous</h4>
  <div className="flex gap-4 mb-6">
    
    {/* 1. Ton icône Facebook personnalisée (Fichier local) */}
    <a href="#" className="p-2 bg-white rounded-lg border border-gray-100 text-gray-400 hover:text-volta-green hover:shadow-md transition-all flex items-center justify-center">
      <img src={Facebook} alt="Facebook" className="w-5 h-5" />
    </a>

    {/* 2. Tes autres icônes Lucide (Mail, etc.) */}
    {[Mail, Mail, Mail].map((Icon, idx) => (
      <a key={idx} href="#" className="p-2 bg-white rounded-lg border border-gray-100 text-gray-400 hover:text-volta-green hover:shadow-md transition-all">
        <Icon className="w-5 h-5" />
      </a>
    ))}

  </div>
          </div>

        </div>

        {/* --- BARRE DE COPYRIGHT --- */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-gray-400 text-[10px] uppercase tracking-widest">
            © {currentYear} VOLTA NETWORK SERVICES. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
            <a href="#" className="hover:text-volta-green">Mentions légales</a>
            <a href="#" className="hover:text-volta-green">Confidentialité</a>
          </div>
        </div>

      </div>
    </footer>
  );
}