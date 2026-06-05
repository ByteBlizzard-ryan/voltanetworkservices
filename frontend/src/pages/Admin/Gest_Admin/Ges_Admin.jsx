import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CornerUpLeft, Mail, User, LockKeyhole, 
  RotateCcwKey, ShieldCog, UserPlus, Loader2
} from 'lucide-react';

// ── FONCTIONS DE STYLE UTILITAIRES ────────────────────────────────────────
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

// ── COMPOSANT FORMULAIRE D'AJOUT ─────────────────────────────────────────
export function Ajout_Admin() {
  const naviguer = useNavigate();
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAjouter = async (e) => {
    e.preventDefault();
    if (!nom || !email || !password) return alert("Veuillez remplir tous les champs obligatoires.");
    if (password !== confirmPassword) return alert("Les mots de passe ne correspondent pas.");

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/admin/administrateurs", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          nom_complet: nom,
          email: email,
          password: password,
          role_utilisateur: "ADMIN"
        })
      });

      const resData = await response.json();
      if (response.ok) {
        alert(resData.message);
        naviguer('/admin/administrateur');
      } else {
        alert(resData.message || "Une erreur est survenue lors de l'enregistrement.");
      }
    } catch (err) {
      alert("Impossible de joindre le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 py-12 pb-20 bg-white min-h-screen font-sans px-4 md:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
        <div>
          <p className="text-[#9ADE7B] font-bold text-xs tracking-[0.2em] uppercase">Gestion des accès</p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mt-1">Nouveau Profil de Sécurité</h1>
        </div>
        <button 
          onClick={() => naviguer('/admin/administrateur')} 
          className="flex items-center gap-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer border-none active:scale-95 uppercase tracking-[0.2em]"
        >
          <CornerUpLeft size={16} /> Retour à la liste
        </button>
      </div>

      <form onSubmit={handleAjouter} className="flex flex-col gap-5 bg-white rounded-2xl p-6 md:p-8 w-full border border-slate-100 shadow-xl max-w-4xl">
        <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]"><User size={15} /> Nom complet</p>
          <input 
            type="text" required placeholder="Jean Paul" value={nom} 
            onChange={(e) => setNom(e.target.value)} 
            className="bg-slate-50/50 text-sm w-full p-3.5 rounded-xl border border-slate-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all text-slate-900"
          />
        </label>

        <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]"><Mail size={15} /> Email professionnel</p>
          <input 
            type="email" required placeholder="jean@gmail.com" value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="bg-slate-50/50 text-sm w-full p-3.5 rounded-xl border border-slate-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all text-slate-900"
          />
        </label>

        {/* <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]"><ShieldCog size={15} /> Rôle & Privilèges</p>
          <select disabled className="bg-slate-100 text-sm w-full p-3.5 rounded-xl border border-slate-100 cursor-not-allowed appearance-none font-sans font-bold text-slate-700 uppercase tracking-[0.2em]">
            <option value="ADMIN">ADMINISTRATEUR</option>
          </select>
        </label> */}

        <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]"><LockKeyhole size={15} /> Mot de passe</p>
          <input 
            type="password" required placeholder="••••••••••••" value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="bg-slate-50/50 text-sm w-full p-3.5 rounded-xl border border-slate-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all text-slate-900"
          />
        </label>

        <label className="flex flex-col gap-2">
          <p className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]"><RotateCcwKey size={15} /> Confirmer mot de passe</p>
          <input 
            type="password" required placeholder="••••••••••••" value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-slate-50/50 text-sm w-full p-3.5 rounded-xl border border-slate-100 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9ADE7B] transition-all text-slate-900"
          />
        </label>

        <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-4 gap-4">
          <button type="button" onClick={() => naviguer('/admin/administrateur')} className="bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 px-6 py-3 rounded-xl cursor-pointer transition-colors border-none font-bold text-xs uppercase tracking-[0.2em] active:scale-95">
            Annuler
          </button>
          <button type="submit" disabled={loading} className="bg-slate-950 hover:bg-[#9ADE7B] text-white hover:text-slate-900 px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all border-none font-bold text-xs uppercase tracking-[0.2em] shadow-md active:scale-95">
            {loading ? <Loader2 className="animate-spin" size={16} /> : <UserPlus size={16} />} Ajouter l'administrateur
          </button>
        </div>
      </form>
    </div>
  );
}

// ── 4. COMPOSANT LISTE & FILTRES ─────────────────────────────────────────────
export function Con_gestion_admin() {
  const naviguer = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtreEtat, setFiltreEtat] = useState("tous");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 1. Charger les administrateurs depuis le serveur
  useEffect(() => {
    async function fetchAdmins() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/admin/administrateurs");
        if (response.ok) {
          const data = await response.json();
          setAdmins(data);
        }
      } catch (err) {
        console.error("Erreur de synchronisation :", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAdmins();
  }, []);

  // 2. Action d'activation / blocage en direct
  const toggleStatus = async (id, e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:8000/api/admin/administrateurs/${id}/toggle-status`, {
        method: "PATCH",
        headers: { "Accept": "application/json" }
      });
      if (response.ok) {
        const data = await response.json();
        setAdmins(prev => prev.map(adm => 
          adm.id_utilisateur === id ? { ...adm, compte_est_actif: data.compte_est_actif } : adm
        ));
      }
    } catch (err) {
      alert("Erreur réseau, modification impossible.");
    }
  };

  // 3. Filtrage dynamique calqué sur les booléens de Laravel (1 = actif, 0 = inactif)
  const filteredData = useMemo(() => {
    if (filtreEtat === "tous") return admins;
    const cibleBool = filtreEtat === "actif" ? 1 : 0;
    return admins.filter(item => Number(item.compte_est_actif) === cibleBool);
  }, [filtreEtat, admins]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexFirstItem, indexLastItem);

  const handleFilterChange = (statut) => {
    setFiltreEtat(statut);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="w-full flex py-16 items-center justify-center gap-2 text-slate-400 font-sans text-xs uppercase tracking-[0.2em] font-bold">
        <Loader2 className="animate-spin text-[#9ADE7B]" size={20} /> Synchronisation Sentinel...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="self-end">
        <button 
          onClick={() => naviguer('/admin/administrateur/ajouter_admin')}
          className="bg-[#9ADE7B] hover:bg-[#89cf6c] text-white font-bold text-xs py-3.5 px-6 rounded-xl cursor-pointer transition-all border-none shadow-sm active:scale-95 uppercase tracking-[0.2em]"
        >
          + Ajouter un administrateur
        </button>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        <div className="flex gap-2 flex-wrap">
          {["tous", "actif", "inactif"].map((type) => (
            <button 
              key={type}
              className={`py-2 px-5 text-xs rounded-xl font-bold uppercase tracking-[0.2em] cursor-pointer transition-all border-none active:scale-95 ${filtreEtat === type ? "bg-[#9ADE7B] text-white shadow-sm" : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50"}`}
              onClick={() => handleFilterChange(type)}
            >
              {type === "tous" ? "Tous" : type === "actif" ? "Actifs" : "Inactifs"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 items-center text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">
          <span>Filtrer du :</span>
          <input type="date" className="bg-white border border-slate-200 text-slate-800 p-2 px-3 rounded-xl cursor-pointer outline-none focus:ring-2 focus:ring-[#9ADE7B] font-sans font-normal normal-case" />
          <span>Au :</span>
          <input type="date" className="bg-white border border-slate-200 text-slate-800 p-2 px-3 rounded-xl cursor-pointer outline-none focus:ring-2 focus:ring-[#9ADE7B] font-sans font-normal normal-case" />
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
        <table className="w-full bg-white border-collapse text-left">
          <thead>
            <tr className="bg-slate-50/70 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-slate-100">
              <th className="p-4 pl-6">Nom de l'admin</th>
              {/* <th className="p-4">Rôle</th> */}
              <th className="p-4">Email</th>
              <th className="p-4">Statut</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {currentItems.length > 0 ? (
              currentItems.map((adminItem) => {
                const estActif = Number(adminItem.compte_est_actif) === 1;
                return (
                  <tr 
                    key={adminItem.id_utilisateur} 
                    onClick={() => naviguer(`/admin/administrateur/${adminItem.id_utilisateur}`)}
                    className="group transition-colors cursor-pointer hover:bg-slate-50/60"
                  >
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <label 
                          style={{ backgroundColor: Couleur_Nom_Icon(adminItem.email?.charAt(0).toUpperCase()) }}
                          className="h-8 w-8 rounded-xl flex items-center justify-center font-extrabold text-white shadow-sm text-xs transition-transform group-hover:scale-105 font-sans"
                        >
                          {adminItem.email?.charAt(0).toUpperCase() || ""}
                        </label>
                        <h3 className="m-0 text-sm font-extrabold text-slate-800 leading-tight">{adminItem.nom_complet}</h3>      
                      </div>
                    </td>
                    {/* <td className="p-4 text-slate-400 font-mono text-xs uppercase">{adminItem.role_utilisateur}</td> */}
                    <td className="p-4 text-slate-600 text-sm font-sans">{adminItem.email}</td>
                    <td className="p-4">
                      <span 
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-[0.2em] font-sans"
                        style={{ 
                          backgroundColor: estActif ? "rgba(154, 222, 123, 0.2)" : "rgba(239, 68, 68, 0.15)", 
                          color: estActif ? "#slate-900" : "#b91c1c" 
                        }}
                      >
                        {estActif ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right text-sm">
                      <button 
                        style={{ color: estActif ? "#b91c1c" : "#1A4301" }}
                        className="border-none bg-transparent cursor-pointer font-bold text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity active:scale-95"
                        onClick={(e) => toggleStatus(adminItem.id_utilisateur, e)}
                      >
                        {estActif ? "Bloquer" : "Débloquer"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="p-12 text-center text-slate-400 italic text-sm">Aucun administrateur trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="mt-2 flex justify-end gap-2 pr-1">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-2 border border-slate-200 rounded-xl cursor-pointer bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 text-xs active:scale-95 transition-all text-slate-600"
          >
            ⬅
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button 
              key={page} 
              onClick={() => setCurrentPage(page)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl cursor-pointer transition-all border ${currentPage === page ? "bg-[#9ADE7B] text-white border-transparent shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 active:scale-95"}`}
            >
              {page}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages || totalPages === 0} 
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-2 border border-slate-200 rounded-xl cursor-pointer bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 text-xs active:scale-95 transition-all text-slate-600"
          >
            ➡
          </button>
        </div>
      )}
    </div>
  );
}

// ── 5. COMPOSANT PRINCIPAL CONTENEUR ─────────────────────────────────────────
export default function Gest_Admin() {
  return (
    <div className="flex flex-col gap-8 py-12 pb-20 bg-white min-h-screen font-sans px-4 md:px-8 text-slate-900 overflow-x-hidden">
      <div>
        <span className="inline-block bg-[#9ADE7B]/20 text-slate-900 text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-3">
          Sentinel Monitoring
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 m-0 leading-tight">
          Gestion des <span className="text-[#9ADE7B]">Administrateurs</span>
        </h1>
        <p className="text-slate-600 text-sm mt-1 mb-0">Contrôle des privilèges et monitoring Volta Network Service</p>
      </div>
      
      <Con_gestion_admin />
    </div>
  );
}