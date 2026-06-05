import React, { useState, useEffect } from "react";
import { ChevronDownCircle, ChevronUpCircle } from 'lucide-react';

// ── 1. FONCTION API REELLE DE SAUVEGARDE (VERS LARAVEL) ───────────────────────
const savePermissions = async (acces) => {
  try {
    const response = await fetch(`http://localhost:8000/api/update-permissions/${acces.id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        dashboard: acces.dashboard,
        clients: acces.clients,
        produits: acces.produits,
        commandes: acces.commandes,
        administrateurs: acces.administrateurs
      })
    });

    if (response.ok) {
      alert(`Permissions de ${acces.nom} mises à jour avec succès !`);
    } else {
      alert("Erreur lors de la mise à jour des privilèges sur le serveur.");
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
    alert("Erreur de connexion avec le serveur Laravel");
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
  return colorMap[lettre] || "#94a3b8";
}

function Etat_acces(statut) {
  if (statut === "actif") {
    return { couleur: "#slate-900", arriere: "rgba(154, 222, 123, 0.2)" };
  }
  return { couleur: "#475569", arriere: "#f8fafc" };
}

// ── 3. SOUS-COMPOSANT DE GESTION DES CONTENUS ───────────────────────────────
function Con_gest_acces() {
  const [ouvert, setOuvert] = useState({});
  const [accesData, setAccesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🛠️ CHARGEMENT DYNAMIQUE DES ADMINS ET PERMISSIONS DEPUIS LARAVEL
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/admin/administrateurs", {
          headers: { 
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setAccesData(data);
        } else {
          console.error("Erreur serveur lors de la récupération des admins");
        }
      } catch (error) {
        console.error("Erreur réseau lors du chargement des admins :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

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

  if (loading) {
    return <p className="text-center text-slate-400 font-sans font-bold text-xs uppercase tracking-[0.2em] py-12">Chargement des administrateurs...</p>;
  }

  return (
    <div className="flex flex-col gap-4 font-sans">
      {accesData.length > 0 ? (
        accesData.map((acces) => (
          <div key={acces.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#9ADE7B]/40 transition-all duration-300 overflow-hidden">
            
            {/* Ligne d'entête de l'utilisateur */}
            <div className="flex justify-between items-center p-5">
              <div className="flex gap-4 items-center">
                <label 
                  className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-extrabold text-base shadow-sm transition-transform hover:scale-105"
                  style={{ backgroundColor: Couleur_Nom_Icon(acces.nom?.charAt(0).toUpperCase() || "") }}
                >
                  {acces.nom?.charAt(0).toUpperCase() || ""}
                </label>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 leading-tight">{acces.nom}</h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">{acces.role}</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <label 
                  className="font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-[0.2em] text-slate-900"
                  style={{ backgroundColor: Etat_acces(acces.etat).arriere }}
                >
                  {acces.etat}
                </label>
                <button 
                  onClick={() => fonction_ouvert(acces.id)}
                  className="cursor-pointer bg-transparent border-none text-slate-400 hover:text-[#9ADE7B] p-0 flex items-center transition-colors active:scale-95 layout-none outline-none"
                >
                  {ouvert[acces.id] ? <ChevronUpCircle size={22} className="text-[#9ADE7B]" /> : <ChevronDownCircle size={22} />}
                </button>
              </div>
            </div>

            {/* Section accordéon déroulante */}
            {ouvert[acces.id] && (
              <div className="flex flex-col p-6 bg-slate-50/50 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  {/* Item Permission: Dashboard */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">Dashboard</p>
                    <button 
                      className={`relative border-none flex items-center cursor-pointer rounded-full h-5 w-9 p-0.5 transition-colors duration-300 outline-none ${acces.dashboard ? "bg-[#9ADE7B]" : "bg-slate-300"}`}
                      onClick={() => togglePermission(acces.id, "dashboard")}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${acces.dashboard ? "transform translate-x-[16px]" : ""}`} />
                    </button>
                  </div>

                  {/* Item Permission: Clients */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">Gestion clients</p>
                    <button 
                      className={`relative border-none flex items-center cursor-pointer rounded-full h-5 w-9 p-0.5 transition-colors duration-300 outline-none ${acces.clients ? "bg-[#9ADE7B]" : "bg-slate-300"}`}
                      onClick={() => togglePermission(acces.id, "clients")}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${acces.clients ? "transform translate-x-[16px]" : ""}`} />
                    </button>
                  </div>

                  {/* Item Permission: Produits */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">Gestion produits</p>
                    <button 
                      className={`relative border-none flex items-center cursor-pointer rounded-full h-5 w-9 p-0.5 transition-colors duration-300 outline-none ${acces.produits ? "bg-[#9ADE7B]" : "bg-slate-300"}`}
                      onClick={() => togglePermission(acces.id, "produits")}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${acces.produits ? "transform translate-x-[16px]" : ""}`} />
                    </button>
                  </div>

                  {/* Item Permission: Commandes */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">Gestion commandes</p>
                    <button 
                      className={`relative border-none flex items-center cursor-pointer rounded-full h-5 w-9 p-0.5 transition-colors duration-300 outline-none ${acces.commandes ? "bg-[#9ADE7B]" : "bg-slate-300"}`}
                      onClick={() => togglePermission(acces.id, "commandes")}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${acces.commandes ? "transform translate-x-[16px]" : ""}`} />
                    </button>
                  </div>

                  {/* Item Permission: Administrateurs */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">Gestion Admin</p>
                    <button 
                      className={`relative border-none flex items-center cursor-pointer rounded-full h-5 w-9 p-0.5 transition-colors duration-300 outline-none ${acces.administrateurs ? "bg-[#9ADE7B]" : "bg-slate-300"}`}
                      onClick={() => togglePermission(acces.id, "administrateurs")}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${acces.administrateurs ? "transform translate-x-[16px]" : ""}`} />
                    </button>
                  </div>

                </div>

                <button 
                  className="bg-slate-950 hover:bg-[#9ADE7B] text-white hover:text-slate-900 font-bold text-xs p-3 px-6 rounded-xl cursor-pointer self-end mt-6 transition-all duration-300 shadow-md active:scale-95 uppercase tracking-[0.2em]"
                  onClick={() => savePermissions(acces)}
                >
                  Enregistrer les modifications
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-slate-400 font-medium text-center py-12 italic">Aucun administrateur trouvé en base de données.</p>
      )}
    </div>
  );
}

// ── 4. COMPOSANT PRINCIPAL EXPORTÉ ──────────────────────────────────────────
export default function Gest_Acces() {
  return (
    <div className="flex flex-col gap-8 py-12 pb-20 bg-white min-h-screen font-sans text-slate-900 overflow-x-hidden">
      <div className="px-4 md:px-8">
        <span className="inline-block bg-[#9ADE7B]/20 text-slate-900 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-3">
          Sécurité & Habilitations
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
          Gestion des droits d'<span className="text-[#9ADE7B]">Accès</span>
        </h1>
        <p className="text-slate-600 text-sm mt-1">Configuration de la sécurité et des rôles Volta Network Services</p>
      </div>
      
      <div className="w-full px-4 md:px-8">
        <Con_gest_acces />
      </div>
    </div>
  );
}