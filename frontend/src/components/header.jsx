import { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, ArrowLeft, Loader2 } from 'lucide-react';
import logo from '../assets/logo.svg';
import { useCart } from '../context/CartContext'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // ── RÉCUPÉRATION DE LA RECHERCHE GLOBALE VIA LE CONTEXTE ──
  const { cartCount, searchQuery, setSearchQuery } = useCart();

  // On vérifie si on est actuellement sur la page boutique
  const isAtBoutique = location.pathname === '/boutique';

  const handleProfileClick = (e) => {
    const token = localStorage.getItem('token');
    if (!token) {
      e.preventDefault();
      setIsRedirecting(true);
      setTimeout(() => {
        setIsRedirecting(false);
        navigate('/login');
      }, 800);
    }
  };

  const linkClass = ({ isActive, to }) => {
    const isBoutiqueSubPage = to === '/boutique' && location.pathname.startsWith('/produit');
    const computedActive = isActive || isBoutiqueSubPage;
    return `font-sans transition-colors ${computedActive ? 'text-[#9ADE7B] font-semibold' : 'text-gray-500 hover:text-[#9ADE7B]'}`;
  };

  return (
    <header className="font-sans sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          .font-sans { font-family: 'Inter', sans-serif !important; }
        `}
      </style>
      
      {/* --- OVERLAY DE REDIRECTION --- */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-[100] flex items-center justify-center animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-[#9ADE7B] animate-spin" />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-0.5 h-14 md:h-16">
        
        {/* --- BARRE DE RECHERCHE MOBILE --- */}
        {isSearchOpen ? (
          <div className="flex items-center w-full gap-3 animate-in fade-in slide-in-from-right duration-300">
            <button onClick={() => setIsSearchOpen(false)} className="text-gray-500">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="relative flex-1">
              <input 
                autoFocus
                type="text" 
                disabled={!isAtBoutique}
                value={isAtBoutique ? searchQuery : ''}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAtBoutique ? "Rechercher un produit..." : "Recherche disponible sur la boutique"} 
                className="w-full bg-gray-100 py-2 px-4 pr-10 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#9ADE7B] disabled:opacity-50"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
        ) : (
          <>
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center gap-2 max-w-[60%] sm:max-w-none">
              <div className="w-9 h-9 md:w-12 md:h-12 flex items-center justify-center shrink-0">
                <img src={logo} alt="Volta" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#1A4301] font-extrabold text-xs md:text-base tracking-tight uppercase leading-none">VOLTA</span>
                <span className="text-[#9ADE7B] font-bold text-[8px] md:text-xs tracking-wider uppercase leading-none mt-0.5">NETWORK SERVICES</span>
              </div>
            </Link>

            {/* Nav Links - Desktop */}
            <nav className="hidden md:flex gap-8 text-sm tracking-wide">
              <NavLink to="/" className={(props) => linkClass({ ...props, to: '/' })}>Accueil</NavLink>
              <NavLink to="/boutique" className={(props) => linkClass({ ...props, to: '/boutique' })}>Boutique</NavLink>
              <NavLink to="/services" className={(props) => linkClass({ ...props, to: '/services' })}>Services</NavLink>
              <NavLink to="/a-propos" className={(props) => linkClass({ ...props, to: '/a-propos' })}>A propos</NavLink>
              <NavLink to="/contact" className={(props) => linkClass({ ...props, to: '/contact' })}>Contact</NavLink>
            </nav>

            {/* Search & Icons */}
            <div className="flex items-center gap-2 md:gap-6">
              
              {/* Barre Desktop grisée si hors boutique */}
              <div className="relative group hidden md:block">
                <input 
                  type="text" 
                  disabled={!isAtBoutique}
                  value={isAtBoutique ? searchQuery : ''}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isAtBoutique ? "Rechercher..." : "Allez dans la boutique pour chercher"} 
                  className="bg-gray-100 py-1.5 px-4 pr-10 rounded-md text-sm outline-none focus:ring-1 focus:ring-[#9ADE7B] w-44 lg:w-56 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <Search className="absolute right-3 top-2 w-4 h-4 text-gray-400" />
              </div>
              
              <div className="flex items-center gap-2 md:gap-4 text-[#1A4301]">
                {/* On n'affiche la loupe mobile que si on est sur la boutique */}
                {isAtBoutique && (
                  <button onClick={() => setIsSearchOpen(true)} className="md:hidden p-1">
                    <Search className="w-5 h-5" />
                  </button>
                )}

                {/* PANIER */}
                <Link to="/panier" className="relative p-1">
                  <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-[#9ADE7B] transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-[#9ADE7B] text-[9px] font-bold min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center border border-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
          
                {/* PROFIL */}
                <Link to="/profil" onClick={handleProfileClick} className="p-1">
                  <User className="w-5 h-5 cursor-pointer hover:text-[#9ADE7B] transition-colors hidden sm:block" />
                </Link>
              
                <button className="md:hidden p-1 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navigation Mobile */}
      {!isSearchOpen && isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col py-2">
            {["Accueil", "Boutique", "Services", "A propos", "Contact"].map((item) => {
              const itemTo = item === "Accueil" ? "/" : `/${item.toLowerCase().replace(" ", "-").replace("a-propos", "a-propos")}`;
              const isBoutiqueActiveMobile = itemTo === '/boutique' && location.pathname.startsWith('/produit');
              return (
                <NavLink 
                  key={item}
                  to={itemTo}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `px-6 py-3 text-base font-medium border-b border-gray-50 transition-colors ${(isActive || isBoutiqueActiveMobile) ? 'text-[#9ADE7B] bg-green-50' : 'text-gray-600'}`}
                >
                  {item}
                </NavLink>
              );
            })}
            <NavLink to="/profil" onClick={(e) => { setIsOpen(false); handleProfileClick(e); }} className="px-6 py-3 text-base font-medium text-gray-600 flex items-center gap-3">
              <User className="w-5 h-5" /> Mon Profil
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}