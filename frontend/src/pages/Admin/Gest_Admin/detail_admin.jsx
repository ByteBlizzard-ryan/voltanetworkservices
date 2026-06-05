import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User, CheckCircle2, Ban, Unlock, Loader2 } from "lucide-react";

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
  return colorMap[lettre] || "#94a3b8";
}

export default function AdminDetail() {
  const navigate = useNavigate();
  const { id_admin } = useParams();

  // États dynamiques
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // ── 1. CHARGEMENT DE L'ADMINISTRATEUR DEPUIS L'API
  useEffect(() => {
    const fetchAdminDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/admin/administrateurs");
        if (!response.ok) throw new Error("Impossible de récupérer les administrateurs.");
        
        const data = await response.json();
        const currentAdmin = data.find(item => item.id_utilisateur === id_admin);

        if (!currentAdmin) {
          throw new Error("Cet administrateur n'existe pas ou a été supprimé.");
        }

        setAdmin(currentAdmin);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id_admin) {
      fetchAdminDetail();
    }
  }, [id_admin]);

  // ── 2. MODIFICATION DU STATUT (TOGGLE-STATUS SUR LARAVEL)
  const handleToggleStatus = async () => {
    if (!admin || actionLoading) return;

    try {
      setActionLoading(true);
      const response = await fetch(`http://localhost:8000/api/admin/administrateurs/${admin.id_utilisateur}/toggle-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      });

      if (!response.ok) throw new Error("Une erreur est survenue lors de la mise à jour.");

      const result = await response.json();
      
      setAdmin(prev => ({
        ...prev,
        compte_est_actif: result.compte_est_actif
      }));

    } catch (err) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handlereturn = () => {
    navigate('/admin/administrateur');
  };

  // ── ÉTATS D'AFFICHAGE PRIMAIRES (CHARGEMENT & ERREUR)
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-3 font-sans">
        <Loader2 className="w-10 h-10 animate-spin text-[#9ADE7B]" />
        <p className="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase">Chargement du protocole de sécurité...</p>
      </div>
    );
  }

  if (error || !admin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-5 px-4 text-center font-sans">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 font-extrabold text-xl shadow-sm border border-slate-100">!</div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Accès impossible</h2>
        <p className="text-sm text-slate-600 max-w-sm">{error || "Impossible de charger le profil."}</p>
        <button onClick={handlereturn} className="flex items-center gap-2 text-xs font-bold bg-slate-950 text-white px-5 py-3 rounded-xl shadow-md transition-all active:scale-95 uppercase tracking-[0.2em]">
          <ArrowLeft size={14} /> Retour à la liste
        </button>
      </div>
    );
  }

  // Configuration graphique dynamique selon le statut venant de Laravel
  const isBlocked = !admin.compte_est_actif;
  const statusBadgeClass = isBlocked 
    ? "bg-red-50 text-red-600 border-transparent" 
    : "bg-[#9ADE7B]/20 text-slate-900 border-transparent";

  const statusDotClass = isBlocked ? "bg-red-500" : "bg-[#9ADE7B]";
  const statusLabel = isBlocked ? "BLOQUÉ" : "ACTIF";

  return (
    <div className="flex flex-col bg-white min-h-screen font-sans px-4 md:px-8 py-12 pb-20 gap-8 text-slate-900 overflow-x-hidden">
      
      {/* ── Header ── */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
        <div className="flex flex-col gap-1">
          <span className="inline-block bg-[#9ADE7B]/20 text-slate-900 text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full self-start">
            Fiche de sécurité
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 m-0 mt-1 leading-tight">
            Détail <span className="text-[#9ADE7B]">Administrateur</span>
          </h1>
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9ADE7B] shrink-0 animate-[pulseDot_2s_ease-in-out_infinite]" />
            Live Security Protocol Active
          </span>
        </div>
        <button 
          className="flex items-center gap-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer border-none active:scale-95 uppercase tracking-[0.2em]" 
          onClick={handlereturn}
        >
          <ArrowLeft size={15} />
          Retour à la liste
        </button>
      </header>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>

      {/* ── Body Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start w-full">
        
        {/* Fiche Profil */}
        <div className="bg-white border border-slate-100 shadow-xl rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-5 mb-6 pb-6 border-b border-slate-100">
            <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
              <div 
                style={{ backgroundColor: Couleur_Nom_Icon(admin.nom_complet?.charAt(0).toUpperCase()) }}
                className="w-full h-full rounded-2xl flex items-center justify-center font-extrabold text-white text-xl"
              >
                {admin.nom_complet?.charAt(0).toUpperCase() || <User size={24} />}
              </div>
              {!isBlocked && (
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#9ADE7B] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <CheckCircle2 size={11} color="#fff" strokeWidth={3} />
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 m-0 tracking-tight leading-tight">{admin.nom_complet}</h2>
              <p className="text-[10px] font-mono font-bold tracking-wider text-slate-400 mt-1">UUID: {admin.id_utilisateur}</p>
            </div>
          </div>

          {/* Données de profil issues de Laravel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">Email</span>
              <span className="text-sm font-medium text-slate-700 select-all">{admin.email}</span>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">Rôle</span>
              <span className="text-xs font-bold text-slate-700 font-mono uppercase tracking-[0.2em] bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg self-start">{admin.role_utilisateur}</span>
            </div>

            <div className="flex flex-col gap-2 items-start">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">Statut actuel</span>
              <span className={`inline-flex items-center gap-1.5 py-1 px-3 border-none rounded-full text-[10px] font-bold tracking-[0.2em] uppercase ${statusBadgeClass}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusDotClass}`} />
                {statusLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Panneau d'Actions de Sécurité */}
        <div className="bg-white border border-slate-100 shadow-xl rounded-2xl p-6 flex flex-col gap-5">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 m-0 tracking-tight">Actions de sécurité</h3>
            <p className="text-xs leading-relaxed text-slate-600 m-0 mt-2 text-justify">
              Gérez les accès de cet administrateur à l'infrastructure Volta Network. Les changements de statut prennent effet immédiatement en base de données.
            </p>
          </div>
          
          <button
            disabled={actionLoading}
            className={`w-full flex items-center justify-center gap-2 p-3.5 rounded-xl text-xs font-bold tracking-[0.2em] uppercase cursor-pointer transition-all border-none shadow-md active:scale-95 text-white disabled:opacity-50 ${
              isBlocked 
                ? "bg-[#9ADE7B] hover:bg-[#89cf6c] !text-slate-900" 
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={handleToggleStatus}
          >
            {actionLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isBlocked ? (
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