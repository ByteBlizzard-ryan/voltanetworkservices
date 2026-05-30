// components/header.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  KeyRound, Archive, ShoppingCart, Users, LayoutDashboard, 
  BrickWallShield, Menu, UserPen, Search 
} from "lucide-react";
import { useSidebar } from "./Context_sider"; 
import logo from "../../assets/logo.png";

export default function AdminSidebar() {
  const { isCollapsed, isMobile, isOpenMobile, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/admin/dashboard", label: "Tableau de bord", icon: <LayoutDashboard size={18} /> },
    { path: "/admin/users", label: "Clients", icon: <Users size={18} /> },
    { path: "/admin/products", label: "Produits", icon: <Archive size={18} /> },
    { path: "/admin/commande", label: "Commandes", icon: <ShoppingCart size={18} /> },
    { path: "/admin/administrateur", label: "Administrateurs", icon: <BrickWallShield size={18} /> },
    { path: "/admin/accesadmin", label: "Droits d'accès", icon: <KeyRound size={18} /> },
  ];

  return (
    <>
      {/* ── SIDEBAR LATÉRALE ── */}
      <nav 
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-100 z-50 flex flex-col transition-all duration-300 font-sans box-border
          ${isCollapsed ? "w-20" : "w-64"} 
          ${isMobile ? (isOpenMobile ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-50 shrink-0 overflow-hidden">
          <div className="flex items-center gap-3 min-w-0">
            <img src={logo} alt="Logo" className="w-8 h-8 object-contain shrink-0" />
            {!isCollapsed && (
              <span className="text-[10px] font-extrabold tracking-widest text-gray-900 uppercase truncate">
                Volta Network
              </span>
            )}
          </div>
          {isMobile && (
            <button onClick={toggleSidebar} className="text-gray-400 hover:text-gray-900 bg-transparent border-none p-1 cursor-pointer">
              <Menu size={20} />
            </button>
          )}
        </div>

        <ul className="flex-1 list-none p-3 m-0 flex flex-col gap-1 overflow-y-auto box-border">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3.5 px-3 py-3 rounded-xl font-medium text-xs tracking-wide uppercase transition-all box-border no-underline ${
                    isActive 
                      ? "bg-gray-900 text-white shadow-md font-bold" 
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50/80"
                  }`}
                >
                  <span className={`shrink-0 ${isActive ? "text-white" : "text-gray-400"}`}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── TOPBAR HORIZONTALE ── */}
      <div 
        className={`fixed top-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 z-40 transition-all duration-300 box-border
          ${isMobile ? "w-full" : isCollapsed ? "w-[calc(100%-80px)]" : "w-[calc(100%-256px)]"}
        `}
      >
        <div className="flex items-center gap-4 flex-1 max-w-md">
          {isMobile && (
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-900 bg-transparent border-none cursor-pointer p-1">
              <Menu size={22} />
            </button>
          )}
          <div className="flex items-center gap-2 bg-gray-50 border border-transparent focus-within:border-gray-200 focus-within:bg-white rounded-xl px-3 py-2 w-full transition-all box-border">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full bg-transparent border-none text-xs text-gray-800 focus:outline-none font-sans font-medium"
            />
          </div>
        </div>

        <div 
          onClick={() => navigate('/admin/profil')}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-all select-none box-border ml-4"
        >
          <div className="flex flex-col text-right hidden sm:flex font-sans">
            <span className="text-xs font-bold text-gray-800 leading-tight">Nom et prénom</span>
            <span className="flex items-center justify-end gap-1.5 text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-0.5">
              <span className="w-1 h-1 bg-emerald-600 rounded-full" />
              En ligne
            </span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors shadow-sm">
            <UserPen size={16} />
          </div>
        </div>
      </div>

      <div className="h-16 w-full shrink-0" />

      {isMobile && isOpenMobile && (
        <div className="fixed inset-0 bg-gray-900/10 backdrop-blur-sm z-30 transition-opacity" onClick={toggleSidebar} />
      )}
    </>
  );
}