import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, CheckCircle2, Ban, Unlock } from "lucide-react";

// ── 1. DONNÉES LOCALES INTÉGRÉES ──────────────────────────────────────────────
const data = [
  { id: "U001", nom: "Alice Mbarga", email: "alice@gmail.com", role: "admin", statut: "actif", action: "bloquer" },
  { id: "U002", nom: "Jean Nkomo", email: "jean@yahoo.com", role: "superadmin", statut: "actif", action: "bloquer" },
  { id: "U003", nom: "Paul Ndzi", email: "paul@gmail.com", role: "admin", statut: "inactif", action: "debloquer" },
  { id: "U004", nom: "Clarisse Ndzi", email: "clarisse@yahoo.com", role: "admin", statut: "actif", action: "bloquer" },
  { id: "U005", nom: "Marc Essono", email: "marc@gmail.com", role: "superadmin", statut: "inactif", action: "debloquer" },
  { id: "U006", nom: "Brice Tchoua", email: "brice@yahoo.com", role: "admin", statut: "actif", action: "bloquer" },
  { id: "U007", nom: "Nadine Ewane", email: "nadine@gmail.com", role: "admin", statut: "inactif", action: "debloquer" },
  { id: "U008", nom: "Serge Ndzi", email: "serge@yahoo.com", role: "superadmin", statut: "actif", action: "bloquer" },
  { id: "U009", nom: "Yves Mbida", email: "yves@gmail.com", role: "admin", statut: "actif", action: "bloquer" },
  { id: "U010", nom: "Cynthia Ndzi", email: "cynthia@yahoo.com", role: "admin", statut: "inactif", action: "debloquer" },
  { id: "U011", nom: "Kevin Ndzi", email: "kevin@gmail.com", role: "superadmin", statut: "actif", action: "bloquer" },
  { id: "U012", nom: "Mireille Ndzi", email: "mireille@yahoo.com", role: "admin", statut: "actif", action: "bloquer" },
  { id: "U013", nom: "Joel Ndzi", email: "joel@gmail.com", role: "admin", statut: "inactif", action: "debloquer" },
  { id: "U014", nom: "Sandra Ndzi", email: "sandra@yahoo.com", role: "superadmin", statut: "actif", action: "bloquer" },
  { id: "U015", nom: "Patrick Ndzi", email: "patrick@gmail.com", role: "admin", statut: "inactif", action: "debloquer" }
];

const admin = {
  id: "ADM-2901-X",
  name: "Marc D.",
  email: "marc.d@voltanetwork.com",
  role: "Admin",
  status: "ACTIF", // "ACTIF" | "BLOQUÉ"
  createdAt: "12 Janvier 2024",
  avatar: null,
};

export { data, admin };

// Fonction de style utilitaire pour l'avatar par défaut
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

// ── 2. COMPOSANT PRINCIPAL (100% TAILWIND CSS) ──────────────────────────────────
export default function AdminDetail({ onBlock }) {
  const [blocked, setBlocked] = useState(admin.status === "BLOQUÉ");
  const navigate = useNavigate();
  const { id_admin } = useParams();

  function handleBlock() {
    const next = !blocked;
    setBlocked(next);
    onBlock?.({ ...admin, status: next ? "BLOQUÉ" : "ACTIF" });
  }

  const handlereturn = () => {
    navigate('/admin/administrateur');
  };

  // Configuration dynamique selon la charte graphique globale
  const statusBadgeClass = blocked 
    ? "bg-red-50 text-red-600 border-transparent" 
    : "bg-[#9ADE7B]/20 text-[#1A4301] border-transparent";

  const statusDotClass = blocked ? "bg-red-500" : "bg-[#9ADE7B]";
  const statusLabel = blocked ? "BLOQUÉ" : "ACTIF";

  return (
    <div className="flex flex-col bg-white min-h-screen font-[Cambria,Cochin,Georgia,Times,'Times_New_Roman',serif] px-4 md:px-8 py-12 pb-20 gap-8">
      
      {/* ── Header ── */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 m-0">
            Détail <span className="text-[#9ADE7B]">Administrateur</span>
          </h1>
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9ADE7B] shrink-0 animate-[pulseDot_2s_ease-in-out_infinite]" />
            Live Security Protocol Active
          </span>
        </div>
        <button 
          className="flex items-center gap-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer border-none active:scale-95 uppercase tracking-wider" 
          onClick={handlereturn}
        >
          <ArrowLeft size={15} />
          Retour à la liste
        </button>
      </header>

      {/* Animation native du point clignotant */}
      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>

      {/* ── Body Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start w-full">
        
        {/* Fiche Profil (Profile Card) */}
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-50">
            <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
              {admin.avatar ? (
                <img src={admin.avatar} alt={admin.name} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <div 
                  style={{ backgroundColor: Couleur_Nom_Icon(admin.name?.charAt(0).toUpperCase()) }}
                  className="w-full h-full rounded-2xl flex items-center justify-center font-bold text-white text-xl"
                >
                  {admin.name?.charAt(0).toUpperCase() || <User size={24} />}
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#9ADE7B] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <CheckCircle2 size={11} color="#fff" strokeWidth={3} />
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 m-0 tracking-tight">{admin.name}</h2>
              <p className="text-[10px] font-mono font-bold tracking-wider text-gray-400 mt-0.5">ID: {id_admin || admin.id}</p>
            </div>
          </div>

          {/* Liste des champs d'information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold tracking-wider uppercase text-gray-400">Email</span>
              <span className="text-sm font-medium text-gray-700">{admin.email}</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold tracking-wider uppercase text-gray-400">Rôle</span>
              <span className="text-sm font-bold text-gray-700 font-mono uppercase text-xs tracking-wider">{admin.role}</span>
            </div>

            <div className="flex flex-col gap-1.5 items-start">
              <span className="text-[10px] font-bold tracking-wider uppercase text-gray-400">Statut actuel</span>
              <span className={`inline-flex items-center gap-1.5 py-1 px-3 border-none rounded-xl text-[10px] font-bold tracking-wider uppercase ${statusBadgeClass}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusDotClass}`} />
                {statusLabel}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold tracking-wider uppercase text-gray-400">Date de création</span>
              <span className="text-sm font-medium text-gray-700">{admin.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Panneau d'Actions de Sécurité */}
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <h3 className="text-base font-bold text-gray-900 m-0 tracking-tight">Actions de sécurité</h3>
            <p className="text-xs leading-relaxed text-gray-400 m-0 mt-1 text-justify">
              Gérez les accès de cet administrateur à l'infrastructure Volta Network. Les changements de statut prennent effet immédiatement et sont consignés.
            </p>
          </div>
          
          <button
            className={`w-full flex items-center justify-center gap-2 p-3.5 rounded-xl text-xs font-bold tracking-wider uppercase cursor-pointer transition-all border-none shadow-sm active:scale-95 text-white ${
              blocked 
                ? "bg-[#9ADE7B] hover:bg-[#89cf6c]" 
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={handleBlock}
          >
            {blocked ? (
              <>
                <Unlock size={15} strokeWidth={2.5} />
                Débloquer l'administrateur
              </>
            ) : (
              <>
                <Ban size={15} strokeWidth={2.5} />
                Bloquer l'administrateur
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}