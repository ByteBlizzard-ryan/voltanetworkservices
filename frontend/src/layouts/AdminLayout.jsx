import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/Admin/sidebarAdmin";
import { SidebarProvider } from "../pages/Admin/Context_sider";
import UseSidebar from "../pages/Admin/Layout_in";



export default function AdminLayout() {

  return (
    <SidebarProvider>
      <UseSidebar />
    </SidebarProvider>
  );
}