// context/SidebarContext.jsx
import { createContext, useState, useEffect } from "react";

export const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  // gestion resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (!mobile) {
        setIsOpenMobile(false); // reset mobile
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpenMobile(prev => !prev);
      setIsCollapsed(false);
    } else {
      setIsCollapsed(prev => !prev);
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        isMobile,
        isOpenMobile,
        toggleSidebar
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}