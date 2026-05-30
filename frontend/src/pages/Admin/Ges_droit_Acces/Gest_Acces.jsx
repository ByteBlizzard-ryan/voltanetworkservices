import React, { useState } from "react";
import { ChevronDownCircle, ChevronUpCircle } from 'lucide-react';

// ── 1. DONNÉES INTÉGRÉES DIRECTEMENT ────────────────────────────────────────
const initialData = [
  { id: "1", nom: "Jean Paul", role: "RESPONSABLE LOGISTIQUE", etat: "actif", dashboard: true, clients: true, produits: false, commandes: true, administrateurs: false },
  { id: "2", nom: "Marie Claire", role: "ASSISTANTE ADMINISTRATIVE", etat: "inactif", dashboard: false, clients: false, produits: false, commandes: false, administrateurs: false },
  { id: "3", nom: "Patrick Ndzi", role: "CHEF DE PROJET", etat: "actif", dashboard: true, clients: true, produits: true, commandes: true, administrateurs: false },
  { id: "4", nom: "Sophie Kamga", role: "COMPTABLE", etat: "actif", dashboard: true, clients: false, produits: false, commandes: true, administrateurs: false },
  { id: "5", nom: "Armand Tchoua", role: "DÉVELOPPEUR WEB", etat: "inactif", dashboard: false, clients: false, produits: false, commandes: false, administrateurs: false },
  { id: "6", nom: "Linda Muna", role: "RESPONSABLE RH", etat: "actif", dashboard: true, clients: true, produits: true, commandes: true, administrateurs: true },
  { id: "7", nom: "Kevin Mbarga", role: "TECHNICIEN RÉSEAU", etat: "actif", dashboard: false, clients: false, produits: false, commandes: false, administrateurs: false },
  { id: "8", nom: "Estelle Ndzié", role: "SECRÉTAIRE", etat: "inactif", dashboard: false, clients: false, produits: false, commandes: false, administrateurs: false },
  { id: "9", nom: "Brice Fotso", role: "ANALYSTE DATA", etat: "actif", dashboard: true, clients: false, produits: false, commandes: true, administrateurs: false },
  { id: "10", nom: "Carine Ngo", role: "GESTIONNAIRE DE STOCK", etat: "actif", dashboard: true, clients: true, produits: true, commandes: true, administrateurs: true }
];

// Fonction API simulée pour l'enregistrement
const savePermissions = async (acces) => {
  try {
    const response = await fetch("http://localhost:3000/update-permissions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: acces.id,
        dashboard: acces.dashboard,
        clients: acces.clients,
        produits: acces.produits,
        commandes: acces.commandes,
        administrateurs: acces.administrateurs
      })
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      alert("Permissions mises à jour avec succès !");
    } else {
      alert("Erreur de mise à jour");
    }
  } catch (error) {
    console.log(error);
    alert("Erreur serveur");
  }
};

// ── 2. FONCTIONS DE STYLISATION LOGIQUE ─────────────────────────────────────
function Couleur_Nom_Icon(lettre = "") {
  const colorMap = {
    A: "#E57373", B: "#64B5F6", C: "#81C784", D: "#BA68C8",
    E: "#FFB74D", F: "#4DD0E1", G: "#F06292", H: "#7986CB",
    I: "#388E3C", J: "#FFD54F", K: "#1976D2", L: "#D32F2F",
    M: "#7B1FA2", N: "#F57C00", O: "#00ACC1", P: "#C2185B",
    Q: "#90A4AE", R: "#A5D6A7", S: "#4FC3F7", T: "#FFF176",
    U: "#CE93D8", V: "#FFCC80", W: "#546E7A", X: "#607D8B",
    Y: "#C5E1A5", Z: "#EF9A9A"
  };
  return colorMap[lettre] || "#9ca3af";
}

function Etat_acces(statut) {
  if (statut === "actif") {
    return { couleur: "#1A4301", arriere: "rgba(154, 222, 123, 0.2)" };
  }
  return { couleur: "#6b7280", arriere: "#f3f4f6" };
}

// ── 3. SOUS-COMPOSANT DE GESTION DES CONTENUS ───────────────────────────────
function Con_gest_acces() {
  const [ouvert, setOuvert] = useState({});
  const [accesData, setAccesData] = useState(initialData);

  const fonction_ouvert = (id) => {
    setOuvert((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePermission = (id, permission) => {
    setAccesData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [permission]: !item[permission] } : item
      )
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {accesData.length > 0 ? (
        accesData.map((acces) => (
          <div key={acces.id} className="bg-white rounded-2xl border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            
            {/* Ligne d'entête de l'utilisateur */}
            <div className="flex justify-between items-center p-4">
              <div className="flex gap-4 items-center">
                <label 
                  className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm transition-transform hover:scale-105"
                  style={{ backgroundColor: Couleur_Nom_Icon(acces.nom?.charAt(0).toUpperCase() || "") }}
                >
                  {acces.nom?.charAt(0).toUpperCase() || ""}
                </label>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{acces.nom}</h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">{acces.role}</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <label 
                  className="font-bold text-[10px] px-3 py-1 rounded-xl uppercase tracking-widest"
                  style={{ backgroundColor: Etat_acces(acces.etat).arriere, color: Etat_acces(acces.etat).couleur }}
                >
                  {acces.etat}
                </label>
                <button 
                  onClick={() => fonction_ouvert(acces.id)}
                  className="cursor-pointer bg-transparent border-none text-gray-400 hover:text-[#9ADE7B] p-0 flex items-center transition-colors active:scale-95"
                >
                  {ouvert[acces.id] ? <ChevronUpCircle size={22} className="text-[#9ADE7B]" /> : <ChevronDownCircle size={22} />}
                </button>
              </div>
            </div>

            {/* Section accordéon déroulante */}
            {ouvert[acces.id] && (
              <div className="flex flex-col p-5 bg-gray-50/50 border-t border-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  {/* Item Permission: Dashboard */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100/80 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Dashboard</p>
                    <button 
                      className={`relative border-none flex items-center cursor-pointer rounded-full h-5 w-9 p-0.5 transition-colors duration-300 outline-none ${acces.dashboard ? "bg-[#9ADE7B]" : "bg-red-500"}`}
                      onClick={() => togglePermission(acces.id, "dashboard")}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${acces.dashboard ? "transform translate-x-[16px]" : ""}`} />
                    </button>
                  </div>

                  {/* Item Permission: Clients */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100/80 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Gestion clients</p>
                    <button 
                      className={`relative border-none flex items-center cursor-pointer rounded-full h-5 w-9 p-0.5 transition-colors duration-300 outline-none ${acces.clients ? "bg-[#9ADE7B]" : "bg-red-500"}`}
                      onClick={() => togglePermission(acces.id, "clients")}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${acces.clients ? "transform translate-x-[16px]" : ""}`} />
                    </button>
                  </div>

                  {/* Item Permission: Produits */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100/80 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Gestion produits</p>
                    <button 
                      className={`relative border-none flex items-center cursor-pointer rounded-full h-5 w-9 p-0.5 transition-colors duration-300 outline-none ${acces.produits ? "bg-[#9ADE7B]" : "bg-red-500"}`}
                      onClick={() => togglePermission(acces.id, "produits")}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${acces.produits ? "transform translate-x-[16px]" : ""}`} />
                    </button>
                  </div>

                  {/* Item Permission: Commandes */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100/80 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Gestion commandes</p>
                    <button 
                      className={`relative border-none flex items-center cursor-pointer rounded-full h-5 w-9 p-0.5 transition-colors duration-300 outline-none ${acces.commandes ? "bg-[#9ADE7B]" : "bg-red-500"}`}
                      onClick={() => togglePermission(acces.id, "commandes")}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${acces.commandes ? "transform translate-x-[16px]" : ""}`} />
                    </button>
                  </div>

                  {/* Item Permission: Administrateurs */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100/80 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Gestion Admin</p>
                    <button 
                      className={`relative border-none flex items-center cursor-pointer rounded-full h-5 w-9 p-0.5 transition-colors duration-300 outline-none ${acces.administrateurs ? "bg-[#9ADE7B]" : "bg-red-500"}`}
                      onClick={() => togglePermission(acces.id, "administrateurs")}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${acces.administrateurs ? "transform translate-x-[16px]" : ""}`} />
                    </button>
                  </div>

                </div>

                <button 
                  className="bg-[#F6F7F9] hover:bg-[#9ADE7B] text-gray-900 hover:text-white font-bold text-xs p-3 px-6 rounded-xl cursor-pointer self-end mt-6 transition-all duration-300 shadow-sm active:scale-95 uppercase tracking-wider"
                  onClick={() => savePermissions(acces)}
                >
                  Enregistrer les modifications
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-400 font-medium text-center py-12 italic">Aucun droit d'accès disponible.</p>
      )}
    </div>
  );
}

// ── 4. COMPOSANT PRINCIPAL EXPORTÉ ──────────────────────────────────────────
export default function Gest_Acces() {
  return (
    <div className="flex flex-col gap-8 py-12 pb-20 bg-white min-h-screen font-[Cambria,Cochin,Georgia,Times,'Times_New_Roman',serif]">
      <div className="px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900">
          Gestion des droits d'<span className="text-[#9ADE7B]">Accès</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">Configuration de la sécurité et des rôles Volta Network Services</p>
      </div>
      
      <div className="w-full px-4 md:px-8">
        <Con_gest_acces />
      </div>
    </div>
  );
}