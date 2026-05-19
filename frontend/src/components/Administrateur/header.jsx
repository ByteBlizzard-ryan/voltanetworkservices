import React, { useContext } from "react";
import { SidebarContext } from "./Context_sider";
import "./style_header.css";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {KeyRound, Archive, ShoppingCart, UserKey, Users, LayoutDashboard, BrickWallShield, Menu, UserPen, Search } from "lucide-react";


export default function AdminSidebar() {
  const { isCollapsed, isMobile, isOpenMobile, toggleSidebar } = useContext(SidebarContext);
  const location = useLocation()
  const navigation = useNavigate()

  const profil=()=>{

    navigation('/admin/profil')

  }




  return (
    <>
      <nav className={`bar_verticale 
        ${isCollapsed ? "collapsed" : ""} 
        ${isMobile ? "mobile" : ""} 
        ${isOpenMobile ? "open" : ""}`}
      >
        <div className="header">
          <div className="header_logo"></div>
          
          <img src={logo} alt="Logo" className="logo"/>
          <span>VOLTA NETWORK SERVICES</span>
          
          <Menu className="menu-icon" size={30} onClick={toggleSidebar}/>
        </div>

        <ul>
          <li>
            <Link to="/admin/dashboard" className={location.pathname === "/admin/dashboard" ? "nav-link active": "nav-link"}>
              <LayoutDashboard size={20} /> 
              {!isCollapsed && <span className="nav-text">Tableau de bord</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className={location.pathname === "/admin/users" ? "nav-link active": "nav-link"}>
              <Users size={20} />
              {!isCollapsed && <span className="nav-text">Client</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className={location.pathname === "/admin/products" ? "nav-link active": "nav-link"}>
              <Archive size={20} />
              {!isCollapsed && <span className="nav-text">Produit</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/commande" className={location.pathname === "/admin/commande" ? "nav-link active": "nav-link"}>
              <ShoppingCart size={20} />
              {!isCollapsed && <span className="nav-text">Commandes</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/administrateur" className={location.pathname === "/admin/administrateur" ? "nav-link active": "nav-link"}>
              <BrickWallShield size={20} />
              {!isCollapsed && <span className="nav-text">Administrateurs</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/accesadmin" className={location.pathname === "/admin/accesadmin" ? "nav-link active": "nav-link"}>
              <KeyRound size={20} />
              {!isCollapsed && <span className="nav-text">Droits Accès administrateur</span>}
            </Link>
          </li>
        </ul>
      </nav>

      <div className={`bar_horizonale ${isCollapsed ? "collapsed" : ""}`}>
        <div className="bar_recherche">
          <input type="text" placeholder="Rechercher..." />
          <button className="search-icon">
            <Search size={24} />
          </button>
        </div>

        <div className="profile" onClick={profil}>
          {/*<img src={logo} alt="Profile" />    remplacer par icon profile */}
          <div className="profile-info">
            <span className="nom_prenom">Nom et prenom</span>
            <span className="etat">En ligne</span>
          </div>
          <UserPen size={30} className="profile-icon" />

        </div>

      </div>

      {isMobile && isOpenMobile && (
        <div className="overlayheader" onClick={toggleSidebar}></div>
      )}

    </>
  );
}