import { NavLink } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';
import logo from '../assets/logo.svg';
import react from '../assets/react.svg';
export default function Navbar() {
  const linkClass = ({ isActive }) => 
    `transition-colors ${isActive ? 'text-volta-green font-semibold' : 'text-volta-gray hover:text-volta-green'}`;

  return (
    <header className="flex items-center justify-between px-8 py-0.5 bg-white border-b border-gray-100 shadow-sm">
      {/* Logo & Brand */}
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded flex items-center justify-center">
          <img src={logo} alt="Volta" className="w-20 h-20 object-contain" />
        </div>
        <span className="text-volta-green font-bold text-lg">VOLTA NETWORK SERVICES</span>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex gap-8">
        <NavLink to="/" className={linkClass}>Accueil</NavLink>
        <NavLink to="/boutique" className={linkClass}>Boutique</NavLink>
        <NavLink to="/services" className={linkClass}>Services</NavLink>
        <NavLink to="/a-propos" className={linkClass}>A propos</NavLink>
        <NavLink to="/contact" className={linkClass}>Contact</NavLink>
      </nav>

      {/* Search & Icons */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Rechercher un produit..." 
            className="bg-gray-100 py-2 px-4 pr-10 rounded-md text-sm outline-none focus:ring-1 focus:ring-volta-green w-48 lg:w-64 transition-all"
          />
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
        
        <div className="flex gap-4 text-volta-green">
          <ShoppingCart className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
          <User className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </div>
    </header>
  );
}