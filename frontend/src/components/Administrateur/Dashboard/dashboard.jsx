import React from "react";
import AdminSidebar from "../header";
import "./style_dashboard.css";
import Recap_tete from "./recap_tete";
import Graphe from "./graphe";
import Table_commande from "./table_commande";




 
export default function Dashboard() {
  return (
    
        <div className="dashbord">
          <Recap_tete />
          <Graphe />
          <Table_commande />
        </div>
      
  );
}