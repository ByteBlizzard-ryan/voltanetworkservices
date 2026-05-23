import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./header";
import { SidebarContext } from "./Context_sider";
import "./style_header.css";



export default function UseSidebar() {

  const { isCollapsed, isMobile, isOpenMobile } = useContext(SidebarContext);

  return (
      <div className="admin-layout">
        <AdminSidebar />
        <main className={`admin-main
          ${isCollapsed ? "collapsed" : ""} 
          ${isMobile ? "mobile" : ""} 
          ${isOpenMobile ? "open" : ""}`}
        >
          <Outlet />   {/* ← la page active s'affiche ici */}
        </main>
      </div>

  );  

}
