// components/header.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  KeyRound, Archive, ShoppingCart, Users, LayoutDashboard, 
  BrickWallShield, Menu, UserPen, Search 
} from "lucide-react";
// Import du hook useSidebar
import { useSidebar } from "./Context_sider"; 
import logo from "../../assets/logo.png";

export default function AdminSidebar() {
  const { isCollapsed, isMobile, isOpenMobile, toggleSidebar, permissions = {} } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  // ── TABLEAU DES NAVIGATION ITEMS DYNAMISÉ ──────────────────────────────────
  const navItems = [
    { 
      path: "/admin/dashboard", 
      label: "Tableau de bord", 
      icon: <LayoutDashboard size={18} />, 
      permissionKey: "tableau_de_bord" 
    },
    { 
      path: "/admin/users", 
      label: "Clients", 
      icon: <Users size={18} />, 
      permissionKey: "clients",
      // Allume l'onglet pour toutes les sous-routes clients
      exact: false 
    },
    { 
      path: "/admin/products", 
      label: "Produits", 
      icon: <Archive size={18} />, 
      permissionKey: "produits",
      exact: false,
      // Correspondance pour l'URL personnalisée de détail produit
      aliasPath: "/admin/detail_produits"
    },
    { 
      path: "/admin/commande", 
      label: "Commandes", 
      icon: <ShoppingCart size={18} />, 
      permissionKey: "commandes",
      // Allume l'onglet pour toutes les sous-routes de commandes
      exact: false 
    },
    { 
      path: "/admin/administrateur", 
      label: "Administrateurs", 
      icon: <BrickWallShield size={18} />, 
      permissionKey: "administrateurs",
      // 🛠️ MODIFIÉ : Allume aussi l'onglet pour les pages d'ajout/édition d'administrateurs
      exact: false 
    },
    { 
      path: "/admin/accesadmin", 
      label: "Droits d'accès", 
      icon: <KeyRound size={18} />, 
      permissionKey: "droits_acces_admin" 
    },
  ];

  // FILTRAGE SÉCURISÉ : basé sur les permissions de l'utilisateur
  const allowedNavItems = navItems.filter(item => permissions?.[item.permissionKey]);

  return (
    <>
      {/* ── SIDEBAR LATÉRALE ── */}
      <nav 
        className={`fixed top-0 left-0 h-screen bg-white border-r border-slate-100 z-50 flex flex-col transition-all duration-300 font-sans box-border
          ${isCollapsed ? "w-20" : "w-64"} 
          ${isMobile ? (isOpenMobile ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-50 shrink-0 overflow-hidden">
          <div className="flex items-center gap-3 min-w-0">
            <img src={logo} alt="Logo" className="w-8 h-8 object-contain shrink-0" />
            {!isCollapsed && (
              <span className="text-[10px] font-extrabold tracking-[0.2em] text-slate-900 uppercase truncate">
                Volta Network 
              </span>
            )}
          </div>
          {isMobile && (
            <button onClick={toggleSidebar} className="text-slate-400 hover:text-slate-900 bg-transparent border-none p-1 cursor-pointer">
              <Menu size={20} />
            </button>
          )}
        </div>

        <ul className="flex-1 list-none p-3 m-0 flex flex-col gap-1 overflow-y-auto box-border">
          {allowedNavItems.map((item) => {
            // RECONNAISSANCE DE LA ROUTE : Utilise startsWith si exact vaut false
            const isActive = item.exact === false 
              ? (location.pathname.startsWith(item.path) || (item.aliasPath && location.pathname.startsWith(item.aliasPath)))
              : location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => isMobile && toggleSidebar()}
                  className={`flex items-center gap-3.5 px-3 py-3 rounded-xl font-bold text-xs tracking-wide uppercase transition-all box-border no-underline ${
                    isActive 
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 font-extrabold" 
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50/80"
                  }`}
                >
                  <span className={`shrink-0 ${isActive ? "text-[#9ADE7B]" : "text-slate-400"}`}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span className="truncate tracking-[0.1em]">{item.label}</span>}
                </Link>
              </li>
            );
          })}
          
          {allowedNavItems.length === 0 && (
            <p className="text-[10px] text-center text-slate-400 font-bold p-4 italic uppercase tracking-[0.2em]">
              Aucun accès autorisé
            </p>
          )}
        </ul>
      </nav>

      {/* ── TOPBAR HORIZONTALE ── */}
      <div 
        className={`fixed top-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 z-40 transition-all duration-300 box-border
          ${isMobile ? "w-full" : isCollapsed ? "w-[calc(100%-80px)]" : "w-[calc(100%-256px)]"}
        `}
      >
        <div className="flex items-center gap-4 flex-1 max-w-md">
          {isMobile && (
            <button onClick={toggleSidebar} className="text-slate-500 hover:text-slate-900 bg-transparent border-none cursor-pointer p-1">
              <Menu size={22} />
            </button>
          )}
        </div>

        <div 
          onClick={() => navigate('/admin/profil')}
          className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all select-none box-border ml-4"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors shadow-sm">
            <UserPen size={16} />
          </div>
        </div>
      </div>

      <div className="h-16 w-full shrink-0" />

      {isMobile && isOpenMobile && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-30 transition-opacity" onClick={toggleSidebar} />
      )}
    </>
  );
}