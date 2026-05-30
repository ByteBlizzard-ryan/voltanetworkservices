// context/SidebarContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

// ── 1. CRÉATION DU CONTEXTE ─────────────────────────────────────────────────
export const SidebarContext = createContext(undefined);

// ── 2. PROVIDER DU CONTEXTE ──────────────────────────────────────────────────
export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // Gestion du redimensionnement (Resize) sécurisé
  useEffect(() => {
    // Exécuté uniquement côté client
    const checkMediaQuery = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (!mobile) {
        setIsOpenMobile(false); // Réinitialise le menu mobile si on passe sur grand écran
      }
    };

    // Initialisation au montage
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
        setIsOpenMobile // Exposé au cas où vous auriez besoin de fermer explicitement au clic sur un lien
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