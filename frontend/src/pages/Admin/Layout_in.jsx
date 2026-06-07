// layouts/UseSidebar.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebarAdmin";
import { useSidebar } from "./Context_sider";

export default function UseSidebar() {
  const { isCollapsed, isMobile } = useSidebar();

  return (
    <div className="min-h-screen bg-white w-full box-border flex flex-col">
      <AdminSidebar />
      <main 
        className={`flex-1 w-full box-border p-6 md:p-8 transition-[padding,margin] duration-300
          ${isMobile ? "pl-0" : isCollapsed ? "lg:pl-20" : "lg:pl-64"}
        `}
      >
        <div className="max-w-[1600px] w-full mx-auto box-border">
          <Outlet />
        </div>
      </main>
    </div>
  );
}