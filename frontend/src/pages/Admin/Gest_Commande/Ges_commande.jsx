import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Banknote, ShoppingBasket, ChevronLeft, ChevronRight } from "lucide-react";

// ── 1. DONNÉES INTEGRÉES DIRECTEMENT ────────────────────────────────────────
const data = [
  { id: "U001", nom: "Alice Mbarga", email: "alice@gmail.com", role: "admin", statut: "actif", action: "bloquer", date: "24 Mai 2026", prix: 45000 },
  { id: "U002", nom: "Jean Nkomo", email: "jean@yahoo.com", role: "superadmin", statut: "actif", action: "bloquer", date: "24 Mai 2026", prix: 120000 },
  { id: "U003", nom: "Paul Ndzi", email: "paul@gmail.com", role: "admin", statut: "inactif", action: "debloquer", date: "23 Mai 2026", prix: 75000 },
  { id: "U004", nom: "Clarisse Ndzi", email: "clarisse@yahoo.com", role: "admin", statut: "actif", action: "bloquer", date: "22 Mai 2026", prix: 30000 },
  { id: "U005", nom: "Marc Essono", email: "marc@gmail.com", role: "superadmin", statut: "inactif", action: "debloquer", date: "21 Mai 2026", prix: 150000 },
  { id: "U006", nom: "Brice Tchoua", email: "brice@yahoo.com", role: "admin", statut: "actif", action: "bloquer", date: "20 Mai 2026", prix: 65000 },
  { id: "U007", nom: "Nadine Ewane", email: "nadine@gmail.com", role: "admin", statut: "inactif", action: "debloquer", date: "20 Mai 2026", prix: 95000 },
  { id: "U008", nom: "Serge Ndzi", email: "serge@yahoo.com", role: "superadmin", statut: "actif", action: "bloquer", date: "19 Mai 2026", prix: 210000 },
  { id: "U009", nom: "Yves Mbida", email: "yves@gmail.com", role: "admin", statut: "actif", action: "bloquer", date: "18 Mai 2026", prix: 40000 },
  { id: "U010", nom: "Cynthia Ndzi", email: "cynthia@yahoo.com", role: "admin", statut: "inactif", action: "debloquer", date: "17 Mai 2026", prix: 85000 },
  { id: "U011", nom: "Kevin Ndzi", email: "kevin@gmail.com", role: "superadmin", statut: "actif", action: "bloquer", date: "16 Mai 2026", prix: 110000 },
  { id: "U012", nom: "Mireille Ndzi", email: "mireille@yahoo.com", role: "admin", statut: "actif", action: "bloquer", date: "15 Mai 2026", prix: 55000 },
  { id: "U013", nom: "Joel Ndzi", email: "joel@gmail.com", role: "admin", statut: "inactif", action: "debloquer", date: "15 Mai 2026", prix: 130000 },
  { id: "U014", nom: "Sandra Ndzi", email: "sandra@yahoo.com", role: "superadmin", statut: "actif", action: "bloquer", date: "14 Mai 2026", prix: 320000 },
  { id: "U015", nom: "Patrick Ndzi", email: "patrick@gmail.com", role: "admin", statut: "inactif", action: "debloquer", date: "12 Mai 2026", prix: 60000 }
];

const admin = {
  id: "ADM-2901-X",
  name: "Marc D.",
  email: "marc.d@voltanetwork.com",
  role: "Admin",
  status: "ACTIF",
  createdAt: "12 Janvier 2024",
  avatar: null,
};

export { data, admin };

// ── 2. COMPOSANT PRINCIPAL ───────────────────────────────────────────────────
export default function Gest_commande() {
  const naviguer = useNavigate();

  // 📌 Timer / Jauge Sentinel
  const duration = 300; 
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev >= duration) {
          clearInterval(interval);
          return duration;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const percent = (time / duration) * 100;

  // 📌 États Filtrage & Pagination
  const [filtreEtat, setFiltreEtat] = useState("tous");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 📌 Filtrage des données
  const filteredData = useMemo(() => {
    if (filtreEtat === "tous") return data;
    return data.filter((item) => item.statut === filtreEtat);
  }, [filtreEtat]);

  // 📌 Calcul de la pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexFirstItem, indexLastItem);

  const handleFilterChange = (statut) => {
    setFiltreEtat(statut);
    setCurrentPage(1);
  };

  const detailCommande = (id) => {
    naviguer(`/admin/commande/${id}`);
  };

  return (
    <div className="min-h-screen bg-white font-[Cambria,Cochin,Georgia,Times,'Times_New_Roman',serif] px-4 md:px-8 py-12 pb-20 w-full box-border flex flex-col gap-8">
      
      {/* ── En-tête Principal ── */}
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 m-0">
          Gestion des <span className="text-[#9ADE7B]">Commandes</span>
        </h1>
        <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#9ADE7B]">
          VOLTA NETWORK SERVICE
        </span>
      </header>

      {/* ── Section Récapitulatif / Cartes ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Carte Chiffre d'affaires */}
        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start w-full">
            <div className="p-3 bg-[#9ADE7B]/20 rounded-xl text-[#1A4301]">
              <Banknote size={22} />
            </div>
            <span className="bg-[#9ADE7B]/20 text-[#1A4301] px-2.5 py-1 rounded-xl text-[10px] font-bold font-sans">
              +12%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase m-0 mb-1">Chiffre d'affaires</p>
            <h2 className="text-2xl font-bold text-gray-900 m-0 font-sans">14.000.000 <span className="text-xs text-gray-400 font-medium font-serif">CFA</span></h2>
          </div>
        </section>

        {/* Carte Commandes Payées */}
        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start w-full">
            <div className="p-3 bg-gray-100 rounded-xl text-gray-800">
              <ShoppingBasket size={22} />
            </div>
            <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-xl text-[10px] font-bold font-sans">
              +12%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase m-0 mb-1">Commandes Payées</p>
            <h2 className="text-2xl font-bold text-gray-900 m-0 font-sans">549</h2>
          </div>
        </section>

        {/* Carte Sentinel Live */}
        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9ADE7B] animate-pulse" />
            <p className="font-bold text-[#9ADE7B] text-[10px] tracking-wider uppercase m-0">Sentinel Live</p>
          </div>
          <div className="mt-4 w-full">
            <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase m-0 mb-1">Dernière mise à jour</p>
            <h2 className="text-sm font-bold text-gray-800 m-0 mb-3">Il y a quelques secondes</h2>
            {/* Jauge de progression */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#9ADE7B] rounded-full transition-all duration-1000 ease-linear" 
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* ── Zone des Filtres & Recherche ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-4 pt-4">
        <div className="flex gap-2 flex-wrap">
          {["tous", "actif", "inactif"].map((type) => (
            <button
              key={type}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl border transition-all duration-200 cursor-pointer uppercase tracking-wider ${
                filtreEtat === type 
                  ? "bg-[#9ADE7B] text-white border-[#9ADE7B] shadow-md" 
                  : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50 shadow-sm"
              }`}
              onClick={() => handleFilterChange(type)}
            >
              {type === "tous" ? "Tous" : type === "actif" ? "Actifs" : "Inactifs"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 items-center text-xs font-bold text-gray-400 uppercase tracking-wide">
          <div className="flex items-center gap-2">
            <label>Du :</label>
            <input 
              type="date" 
              className="bg-gray-50 text-gray-700 px-3 py-2.5 rounded-xl outline-none border border-gray-100 font-sans cursor-pointer focus:border-[#9ADE7B] transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Au :</label>
            <input 
              type="date" 
              className="bg-gray-50 text-gray-700 px-3 py-2.5 rounded-xl outline-none border border-gray-100 font-sans cursor-pointer focus:border-[#9ADE7B] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ── Tableau des Commandes ── */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl flex flex-col">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">ID Utili.</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">Client / Contact</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">Rôle</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-right">Montant Souhaité</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-center">Statut Accès</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr 
                    key={item.id} 
                    onClick={() => detailCommande(item.id)}
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                  >
                    <td className="p-4 text-sm font-bold text-[#9ADE7B] tracking-wide">
                      #{item.id}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <h3 className="font-bold m-0 text-sm text-gray-900">{item.nom}</h3>
                        <p className="font-medium text-xs text-gray-400 m-0 font-sans mt-0.5">{item.email}</p>
                      </div>
                    </td>
                    <td className="p-4 text-gray-500 text-xs font-bold uppercase tracking-wider">{item.role}</td>
                    <td className="p-4 text-sm font-bold text-gray-800 text-right font-sans">
                      {item.prix.toLocaleString()} <span className="text-[10px] font-serif font-medium text-gray-400">CFA</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-xl text-[10px] font-bold tracking-wider uppercase ${
                        item.statut === "actif" 
                          ? "bg-[#9ADE7B]/20 text-[#1A4301]" 
                          : "bg-red-50 text-red-600"
                      }`}>
                        {item.statut}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-sm font-medium text-gray-400">
                    Aucun élément trouvé pour ce filtre
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-1.5 mt-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-2 cursor-pointer rounded-xl border border-gray-100 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm text-gray-600 flex items-center justify-center"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 cursor-pointer rounded-xl font-sans text-xs font-bold transition-all duration-200 ${
                currentPage === page 
                  ? "bg-[#9ADE7B] text-white shadow-md border-none" 
                  : "bg-white border border-gray-100 text-gray-500 hover:bg-gray-50 shadow-sm"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-2 cursor-pointer rounded-xl border border-gray-100 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm text-gray-600 flex items-center justify-center"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

    </div>
  );
}