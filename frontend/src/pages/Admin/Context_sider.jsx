// context/SidebarContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

// ── 1. CRÉATION DU CONTEXTE ─────────────────────────────────────────────────
export const SidebarContext = createContext(undefined);

// ── 2. PROVIDER DU CONTEXTE ──────────────────────────────────────────────────
export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  
  // 🛠️ ÉTAT INITIALISE : Mappe directement les données de la table 'permissions'
  const [permissions, setPermissions] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Si l'utilisateur possède l'objet relationnel 'permission' renvoyé par Laravel
        if (parsedUser && parsedUser.permission) {
          const p = parsedUser.permission;
          return {
            tableau_de_bord: Boolean(p.tableau_de_bord),
            clients: Boolean(p.clients),
            produits: Boolean(p.produits),
            commandes: Boolean(p.commandes),
            administrateurs: Boolean(p.administrateurs),
            droits_acces_admin: Boolean(p.droits_acces_admin),
          };
        }
      } catch (error) {
        console.error("Erreur lors de la lecture des permissions stockées :", error);
      }
    }

    // Valeurs par défaut si personne n'est connecté ou si c'est un client standard
    return {
      tableau_de_bord: false,
      clients: false,
      produits: false,
      commandes: false,
      administrateurs: false,
      droits_acces_admin: false,
    };
  });

  // Gestion du redimensionnement (Resize) sécurisé
  useEffect(() => {
    const checkMediaQuery = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (!mobile) {
        setIsOpenMobile(false);
      }
    };

    checkMediaQuery();
    window.addEventListener("resize", checkMediaQuery);
    return () => window.removeEventListener("resize", checkMediaQuery);
  }, []);

  // Fonction de bascule de l'état de la Sidebar
  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpenMobile((prev) => !prev);
      setIsCollapsed(false);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        isMobile,
        isOpenMobile,
        toggleSidebar,
        setIsOpenMobile,
        permissions,    
        setPermissions, 
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// ── 3. HOOK PERSONNALISÉ POUR UNE UTILISATION SIMPLIFIÉE ─────────────────────
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar doit être utilisé à l'intérieur d'un SidebarProvider");
  }
  return context;
}