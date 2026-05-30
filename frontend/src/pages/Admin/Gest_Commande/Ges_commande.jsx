import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Banknote, ShoppingBasket, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function Gest_commande() {
  const naviguer = useNavigate();

  // ── ÉTATS DYNAMIQUES ──
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // ── CHARGEMENT DES COMMANDES DEPUIS L'API ──
  useEffect(() => {
    async function fetchCommandes() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/admin/commandes");
        if (!response.ok) {
          throw new Error("Impossible de charger les commandes.");
        }
        const data = await response.json();
        setCommandes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCommandes();
  }, []);

  // ── CALCULS DES STATISTIQUES EN TEMPS RÉEL (UNIQUEMENT COMMANDES PAYÉES) ──
  const stats = useMemo(() => {
    // Filtrage strict sur le statut "PAYEE"
    const commandesPayees = commandes.filter(
      (c) => c.statut_commande?.toUpperCase() === "PAYEE"
    );

    const totalCA = commandesPayees.reduce((acc, curr) => acc + (curr.total_commande || 0), 0);
    const nbrCommandesPayees = commandesPayees.length;

    return { totalCA, nbrCommandesPayees };
  }, [commandes]);

  // 📌 États Filtrage & Pagination
  const [filtreEtat, setFiltreEtat] = useState("tous");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 📌 Filtrage des données du tableau (Synchronisé sur 'statut_commande' de ta BDD)
  const filteredData = useMemo(() => {
    if (filtreEtat === "tous") return commandes;
    return commandes.filter((item) => item.statut_commande?.toLowerCase() === filtreEtat.toLowerCase());
  }, [filtreEtat, commandes]);

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

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center gap-2 text-gray-500">
        <Loader2 className="animate-[spin_1.2s_linear_infinite] text-[#9ADE7B]" size={24} />
        <span className="font-sans text-xs uppercase tracking-wider font-bold">Chargement du registre des commandes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 text-gray-800">
        <p className="text-red-500 font-bold font-sans">Erreur Système : {error}</p>
      </div>
    );
  }

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
            <span className="bg-[#9ADE7B]/10 text-emerald-800 px-2.5 py-1 rounded-xl text-[9px] font-bold font-sans uppercase tracking-wider">
              Encaissé
            </span>
          </div>
          <div className="mt-4">
            <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase m-0 mb-1">Chiffre d'affaires (Payé)</p>
            <h2 className="text-2xl font-bold text-gray-900 m-0 font-sans">
              {Intl.NumberFormat('fr-FR').format(stats.totalCA)} <span className="text-xs text-gray-400 font-medium font-serif">CFA</span>
            </h2>
          </div>
        </section>

        {/* Carte Commandes Payées */}
        <section className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start w-full">
            <div className="p-3 bg-gray-100 rounded-xl text-gray-800">
              <ShoppingBasket size={22} />
            </div>
            <span className="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-xl text-[9px] font-bold font-sans uppercase">
              Total: {commandes.length}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase m-0 mb-1">Commandes Payées</p>
            <h2 className="text-2xl font-bold text-gray-900 m-0 font-sans">{stats.nbrCommandesPayees}</h2>
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
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#9ADE7B] rounded-full transition-all duration-1000 ease-linear" 
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* ── Zone des Filtres ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-4 pt-4">
        <div className="flex gap-2 flex-wrap">
          {["tous", "en cours", "payee", "annule"].map((type) => (
            <button
              key={type}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl border transition-all duration-200 cursor-pointer uppercase tracking-wider ${
                filtreEtat === type 
                  ? "bg-[#9ADE7B] text-white border-[#9ADE7B] shadow-md" 
                  : "bg-white text-gray-500 border-gray-100 hover:bg-gray-50 shadow-sm"
              }`}
              onClick={() => handleFilterChange(type)}
            >
              {type === "tous" ? "Tous" : type === "payee" ? "Payées" : type}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tableau des Commandes ── */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl flex flex-col">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">Numéro Commande</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">Destinataire / Contact</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">Canal</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-right">Montant Total</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr 
                    key={item.id_commande} 
                    onClick={() => detailCommande(item.id_commande)}
                    className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                  >
                    <td className="p-4 text-xs font-bold text-[#9ADE7B] tracking-wide">
                      {item.id_commande.substring(0, 8)}...
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <h3 className="font-bold m-0 text-sm text-gray-900">{item.nom_destinataire}</h3>
                        <p className="font-medium text-xs text-gray-400 m-0 font-sans mt-0.5">
                          {item.telephone_contact} {item.email_contact ? `| ${item.email_contact}` : ''}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-gray-500 text-xs font-bold uppercase tracking-wider">
                      {item.canal_commande}
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-800 text-right font-sans">
                      {Intl.NumberFormat('fr-FR').format(item.total_commande || 0)} <span className="text-[10px] font-serif font-medium text-gray-400">CFA</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-xl text-[10px] font-bold tracking-wider uppercase ${
                        item.statut_commande?.toUpperCase() === "EN COURS" 
                          ? "bg-amber-50 text-amber-600" 
                          : item.statut_commande?.toUpperCase() === "PAYEE"
                          ? "bg-[#9ADE7B]/20 text-[#1A4301]"
                          : "bg-red-50 text-red-600"
                      }`}>
                        {item.statut_commande}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-sm font-medium text-gray-400">
                    Aucune commande trouvée pour le moment
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