import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const linkClass = ({ isActive }) => 
    `transition-colors ${isActive ? 'text-volta-green font-semibold' : 'text-volta-gray hover:text-volta-green'}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-0.5 h-16 md:h-20">
        
        {/* --- ÉTAT 1 : BARRE DE RECHERCHE MOBILE ACTIVE --- */}
        {isSearchOpen ? (
          <div className="flex items-center w-full gap-3 animate-in fade-in slide-in-from-right duration-300">
            <button onClick={() => setIsSearchOpen(false)} className="text-gray-500">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="relative flex-1">
              <input 
                autoFocus
                type="text" 
                placeholder="Rechercher un produit..." 
                className="w-full bg-gray-100 py-2.5 px-4 pr-10 rounded-xl text-sm outline-none focus:ring-1 focus:ring-volta-green"
              />
              <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
            </div>
          </div>
        ) : (
          /* --- ÉTAT 2 : AFFICHAGE NORMAL --- */
          <>
            {/* Logo & Brand - Adapté pour Mobile */}
            <div className="flex items-center gap-2 max-w-[60%] sm:max-w-none">
              <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center shrink-0">
                <img src={logo} alt="Volta" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-volta-green font-black text-sm md:text-lg tracking-tighter uppercase leading-none">
                  VOLTA
                </span>
                {/* Affichage du nom complet avec taille réduite sur mobile */}
                <span className="text-volta-green font-bold text-[9px] md:text-lg tracking-tighter uppercase leading-none">
                  NETWORK SERVICES
                </span>
              </div>
            </div>

            {/* Nav Links - Desktop */}
            <nav className="hidden md:flex gap-8">
              <NavLink to="/" className={linkClass}>Accueil</NavLink>
              <NavLink to="/boutique" className={linkClass}>Boutique</NavLink>
              <NavLink to="/services" className={linkClass}>Services</NavLink>
              <NavLink to="/a-propos" className={linkClass}>A propos</NavLink>
              <NavLink to="/contact" className={linkClass}>Contact</NavLink>
            </nav>

            {/* Search & Icons */}
            <div className="flex items-center gap-2 md:gap-6">
              {/* Recherche Desktop */}
              <div className="relative group hidden md:block">
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="bg-gray-100 py-2 px-4 pr-10 rounded-md text-sm outline-none focus:ring-1 focus:ring-volta-green w-48 lg:w-64 transition-all"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
              
              <div className="flex items-center gap-2 md:gap-4 text-volta-green">
                <button 
                  onClick={() => setIsSearchOpen(true)} 
                  className="md:hidden p-1"
                >
                  <Search className="w-5 h-5" />
                </button>
                <Link to="/panier">
                   <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:scale-110 transition-transform" />
                </Link>
          
              <Link to="/profil">
                  <User className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:scale-110 transition-transform hidden sm:block" />
              </Link>
              
                <button 
                  className="md:hidden p-1 text-gray-600"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigation Mobile (Menu Burger) */}
      {!isSearchOpen && isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <nav className="flex flex-col py-4">
            {["Accueil", "Boutique", "Services", "A propos", "Contact"].map((item) => (
              <NavLink 
                key={item}
                to={item === "Accueil" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  `px-8 py-4 text-lg font-bold border-b border-gray-50 ${isActive ? 'text-volta-green bg-green-50' : 'text-gray-600'}`
                }
              >
                {item}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}