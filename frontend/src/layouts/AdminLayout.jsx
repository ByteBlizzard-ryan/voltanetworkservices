import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Administrateur/header";
import { SidebarProvider } from "../components/Administrateur/Context_sider";
import UseSidebar from "../components/Administrateur/Layout_in";



export default function AdminLayout() {

  return (
    <SidebarProvider>
      <UseSidebar />
    </SidebarProvider>
  );
}