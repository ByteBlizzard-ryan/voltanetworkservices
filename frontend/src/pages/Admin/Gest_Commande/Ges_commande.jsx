import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Banknote, ShoppingBasket, ChevronLeft, ChevronRight, Loader2, Search, Sparkles } from "lucide-react";

// 🌟 Fonction pour surligner les caractères correspondants dans l'ID de la commande
function SurlignerTexte(texte = "", recherche = "") {
  if (!recherche.trim()) return <span>{texte}</span>;

  const motifSecurise = recherche.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`(${motifSecurise})`, "gi");
  const morceaux = texte.split(regex);

  return (
    <span>
      {morceaux.map((morceau, index) => 
        regex.test(morceau) ? (
          <mark key={index} className="bg-[#9ADE7B]/40 text-slate-900 font-black rounded-sm px-0.5 transition-all">
            {morceau}
          </mark>
        ) : (
          morceau
        )
      )}
    </span>
  );
}

export default function Gest_commande() {
  const naviguer = useNavigate();

  // ── ÉTATS DYNAMIQUES ──
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 📌 États Filtrage (Statut & Dates) & Pagination
  const [filtreEtat, setFiltreEtat] = useState("tous");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🌟 NOUVEAUX ÉTATS : Recherche et animation du scanneur
  const [rechercheCommande, setRechercheCommande] = useState("");
  const [estEnTrainDeFiltrer, setEstEnTrainDeFiltrer] = useState(false);

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

  // 🌟 NOUVEL EFFET : Gestion du témoin de scan temporaire à la saisie de l'ID commande
  useEffect(() => {
    setCurrentPage(1);
    if (rechercheCommande.trim().length > 0) {
      setEstEnTrainDeFiltrer(true);
      const timer = setTimeout(() => setEstEnTrainDeFiltrer(false), 300);
      return () => clearTimeout(timer);
    } else {
      setEstEnTrainDeFiltrer(false);
    }
  }, [rechercheCommande]);

  // ── CALCULS DES STATISTIQUES EN TEMPS RÉEL (UNIQUEMENT COMMANDES PAYÉES) ──
  const stats = useMemo(() => {
    if (!Array.isArray(commandes)) return { totalCA: 0, nbrCommandesPayees: 0 };
    
    const commandesPayees = commandes.filter(
      (c) => c.statut_commande?.toUpperCase() === "PAYEE"
    );

    const totalCA = commandesPayees.reduce((acc, curr) => acc + (curr.total_commande || 0), 0);
    const nbrCommandesPayees = commandesPayees.length;

    return { totalCA, nbrCommandesPayees };
  }, [commandes]);

  // 📌 Filtrage combiné des données (Statut + Plage de dates + ID Commande)
  const filteredData = useMemo(() => {
    if (!Array.isArray(commandes)) return [];

    return commandes.filter((item) => {
      // 1. Filtrage par statut de commande
      const matchStatut = filtreEtat === "tous" || item.statut_commande?.toLowerCase() === filtreEtat.toLowerCase();

      // 2. Filtrage par plage de dates
      let matchDate = true;
      if (item.created_at) {
        const dateCreation = new Date(item.created_at).setHours(0, 0, 0, 0);

        if (dateDebut) {
          const debut = new Date(dateDebut).setHours(0, 0, 0, 0);
          if (dateCreation < debut) matchDate = false;
        }
        if (dateFin) {
          const fin = new Date(dateFin).setHours(23, 59, 59, 999);
          if (dateCreation > fin) matchDate = false;
        }
      }

      // 3. Filtrage par ID Commande (Barre de recherche)
      let matchRecherche = true;
      if (rechercheCommande.trim() && item.id_commande) {
        matchRecherche = item.id_commande.toLowerCase().includes(rechercheCommande.toLowerCase());
      }

      return matchStatut && matchDate && matchRecherche;
    });
  }, [filtreEtat, commandes, dateDebut, dateFin, rechercheCommande]);

  // 📌 Calcul de la pagination basé sur les données filtrées
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
      <div className="min-h-screen w-full flex items-center justify-center gap-2 text-slate-400 font-sans">
        <Loader2 className="animate-[spin_1.2s_linear_infinite] text-[#9ADE7B]" size={24} />
        <span className="text-xs font-bold uppercase tracking-[0.2em]">Chargement du registre des commandes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 text-slate-900 bg-white font-sans">
        <p className="text-red-500 font-bold text-sm">Erreur Système : {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans px-4 md:px-8 py-12 pb-20 w-full box-border flex flex-col gap-8">
      
      {/* ── En-tête Principal ── */}
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-slate-900 m-0">
          Gestion des <span className="text-[#9ADE7B]">Commandes</span>
        </h1>
        <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#9ADE7B]">
          VOLTA NETWORK SERVICE
        </span>
      </header>

      {/* ── Section Récapitulatif / Cartes ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Carte Chiffre d'affaires */}
        <section className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start w-full">
            <div className="p-3 bg-[#9ADE7B]/20 rounded-xl text-[#1A4301]">
              <Banknote size={22} />
            </div>
            <span className="bg-[#9ADE7B]/20 text-[#1A4301] px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider">
              Encaissé
            </span>
          </div>
          <div className="mt-4">
            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase m-0 mb-1">Chiffre d'affaires (Payé)</p>
            <h2 className="text-2xl font-bold text-slate-900 m-0">
              {Intl.NumberFormat('fr-FR').format(stats.totalCA)} <span className="text-xs text-slate-400 font-medium">CFA</span>
            </h2>
          </div>
        </section>

        {/* Carte Commandes Payées */}
        <section className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start w-full">
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-600">
              <ShoppingBasket size={22} />
            </div>
            <div className="bg-white/90 backdrop-blur border border-slate-100 px-2.5 py-1 rounded-xl shadow-sm flex flex-col">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Statut</span>
              <span className="text-sm font-bold text-slate-600">Total: {commandes.length}</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase m-0 mb-1">Commandes Payées</p>
            <h2 className="text-2xl font-bold text-slate-900 m-0">{stats.nbrCommandesPayees}</h2>
          </div>
        </section>

        {/* Carte Sentinel Live */}
        <section className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9ADE7B] animate-pulse" />
            <p className="font-bold text-[#9ADE7B] text-[10px] tracking-wider uppercase m-0">Sentinel Live</p>
          </div>
          <div className="mt-4 w-full">
            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase m-0 mb-1">Dernière mise à jour</p>
            <h2 className="text-sm font-bold text-slate-600 m-0 mb-3">Il y a quelques secondes</h2>
            <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#9ADE7B] rounded-full transition-all duration-1000 ease-linear" 
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* 🌟 NOUVELLE BARRE DE RECHERCHE DYNAMIQUE (Par Identifiant de commande) */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 box-border">
        <div className="flex items-center gap-2 bg-white border border-slate-200 focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-[#9ADE7B]/20 rounded-xl px-3 py-2.5 w-full max-w-md transition-all box-border shadow-xs">
          <Search size={16} className={`transition-colors ${estEnTrainDeFiltrer ? "text-[#9ADE7B]" : "text-slate-400"}`} />
          <input 
            type="text" 
            placeholder="Rechercher une commande par son identifiant..." 
            value={rechercheCommande}
            onChange={(e) => setRechercheCommande(e.target.value)}
            className="w-full bg-transparent border-none text-xs text-slate-800 focus:outline-none font-sans font-semibold placeholder-slate-400"
          />
          {rechercheCommande && (
            <button 
              onClick={() => setRechercheCommande("")}
              className="text-[10px] font-bold text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-md cursor-pointer border-none transition-colors"
            >
              Effacer
            </button>
          )}
        </div>

        {/* Scanneur de réseau visuel */}
        {rechercheCommande && (
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
            estEnTrainDeFiltrer 
              ? "bg-[#9ADE7B]/20 text-slate-900 animate-pulse scale-105" 
              : "bg-slate-100 text-slate-500"
          }`}>
            <Sparkles size={12} className={estEnTrainDeFiltrer ? "animate-spin text-[#9ADE7B]" : ""} />
            <span>{estEnTrainDeFiltrer ? "Scan du registre..." : `${filteredData.length} trouvé(s)`}</span>
          </div>
        )}
      </div>

      {/* ── Zone des Filtres Existante (Statuts + Dates) ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        {/* Filtres par Statut */}
        <div className="flex gap-2 flex-wrap">
          {["tous", "en cours", "payee", "annule"].map((type) => (
            <button
              key={type}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl border transition-all duration-200 cursor-pointer uppercase tracking-wider active:scale-95 ${
                filtreEtat === type 
                  ? "bg-[#9ADE7B] text-slate-900 border-[#9ADE7B] shadow-md font-extrabold" 
                  : "bg-white text-slate-600 border-slate-100 hover:bg-slate-50 shadow-sm"
              }`}
              onClick={() => handleFilterChange(type)}
            >
              {type === "tous" ? "Tous" : type === "payee" ? "Payées" : type}
            </button>
          ))}
        </div>

        {/* Filtres par Plage de Dates */}
        <div className="flex flex-wrap gap-3 items-center text-xs text-slate-500 font-bold uppercase tracking-wider">
          <span>Période du :</span>
          <input 
            type="date" 
            value={dateDebut}
            onChange={(e) => { setDateDebut(e.target.value); setCurrentPage(1); }}
            className="bg-white border border-slate-200 text-slate-800 p-2 px-3 rounded-xl cursor-pointer outline-none focus:ring-2 focus:ring-[#9ADE7B] font-sans font-normal normal-case text-sm" 
          />
          <span>Au :</span>
          <input 
            type="date" 
            value={dateFin}
            onChange={(e) => { setDateFin(e.target.value); setCurrentPage(1); }}
            className="bg-white border border-slate-200 text-slate-800 p-2 px-3 rounded-xl cursor-pointer outline-none focus:ring-2 focus:ring-[#9ADE7B] font-sans font-normal normal-case text-sm" 
          />
          {(dateDebut || dateFin) && (
            <button 
              onClick={() => { setDateDebut(""); setDateFin(""); setCurrentPage(1); }}
              className="text-red-500 hover:text-red-700 bg-transparent border-none cursor-pointer font-bold uppercase tracking-wider ml-1 active:scale-95 transition-transform"
            >
              REINITIALISER
            </button>
          )}
        </div>
      </div>

      {/* ── Tableau des Commandes ── */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Numéro Commande</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Destinataire / Contact</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Canal</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase text-right">Montant Total</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase text-center">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr 
                    key={item.id_commande} 
                    onClick={() => detailCommande(item.id_commande)}
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                  >
                    {/* 🌟 MODIFIÉ : Application du surlignage dynamique sur l'identifiant */}
                    <td className="p-4 text-xs font-bold text-[#9ADE7B] tracking-wide">
                      #{SurlignerTexte(item.id_commande.substring(0, 8), rechercheCommande)}...
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <h3 className="font-extrabold m-0 text-base text-slate-900">{item.nom_destinataire}</h3>
                        <p className="font-medium text-xs text-slate-400 m-0 mt-0.5">
                          {item.telephone_contact} {item.email_contact ? `| ${item.email_contact}` : ''}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 text-xs font-bold uppercase tracking-wider">
                      {item.canal_commande}
                    </td>
                    <td className="p-4 text-sm font-bold text-slate-900 text-right">
                      {Intl.NumberFormat('fr-FR').format(item.total_commande || 0)} <span className="text-[10px] font-medium text-slate-400">CFA</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-xl text-[10px] font-bold tracking-wider uppercase ${
                        item.statut_commande?.toUpperCase() === "EN COURS" 
                          ? "bg-amber-50 text-amber-600 border border-amber-100" 
                          : item.statut_commande?.toUpperCase() === "PAYEE"
                          ? "bg-[#9ADE7B]/20 text-[#1A4301]"
                          : "bg-red-50 text-red-600 border border-red-100"
                      }`}>
                        {item.statut_commande}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-sm font-medium text-slate-400">
                    Aucune commande trouvée pour les critères sélectionnés.
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
            className="p-2 cursor-pointer rounded-xl border border-slate-100 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm text-slate-600 flex items-center justify-center"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 cursor-pointer rounded-xl text-xs font-bold transition-all duration-200 ${
                currentPage === page 
                  ? "bg-[#9ADE7B] text-slate-900 shadow-lg border-none font-extrabold" 
                  : "bg-white border border-slate-100 text-slate-400 hover:bg-slate-50 shadow-sm"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-2 cursor-pointer rounded-xl border border-slate-100 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm text-slate-600 flex items-center justify-center"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

    </div>
  );
}