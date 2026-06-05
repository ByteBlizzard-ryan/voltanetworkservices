import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Clock, XCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export default function Detail_com() {
  const { id_commande } = useParams(); 
  const naviguer = useNavigate();

  // ── ÉTATS DYNAMIQUES ──
  const [commande, setCommande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // ── Pagination locale pour les articles de la table ──
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ── CHARGEMENT DE LA COMMANDE DEPUIS L'API ──
  const fetchCommandeDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/admin/commandes/${id_commande}`);
      if (!response.ok) {
        throw new Error("Impossible de récupérer les informations de cette commande.");
      }
      const data = await response.json();
      setCommande(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id_commande) {
      fetchCommandeDetails();
    }
  }, [id_commande]);

  // ── MISE À JOUR DU STATUT EN BDD ──
  const handleChangerStatut = async (nouveauStatut) => {
    try {
      setUpdating(true);
      const response = await fetch(`http://localhost:8000/api/admin/commandes/${id_commande}/statut`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut_commande: nouveauStatut })
      });

      if (response.ok) {
        setCommande(prev => ({ ...prev, statut_commande: nouveauStatut }));
      } else {
        alert("Erreur lors de la modification du statut.");
      }
    } catch (err) {
      console.error("Erreur système :", err);
    } finally {
      setUpdating(false);
    }
  };

  const retourCommande = () => {
    naviguer("/admin/commande");
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center gap-2 text-slate-400 bg-white font-sans">
        <Loader2 className="animate-[spin_1.2s_linear_infinite] text-[#9ADE7B]" size={24} />
        <span className="text-xs font-bold uppercase tracking-[0.2em]">Extraction des données de transaction...</span>
      </div>
    );
  }

  if (error || !commande) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center font-sans">
        <XCircle className="text-red-500 w-14 h-14 mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-1">Commande introuvable</h2>
        <p className="text-xs text-slate-400 mb-6">{error || "Aucun enregistrement trouvé."}</p>
        <button 
          onClick={retourCommande}
          className="flex items-center gap-2 text-xs font-bold bg-[#9ADE7B] hover:bg-[#89cf6c] text-slate-900 px-5 py-3 rounded-xl shadow-lg transition-all border-none cursor-pointer uppercase tracking-wider active:scale-95"
        >
          <ArrowLeft size={14} /> Retour à la liste
        </button>
      </div>
    );
  }

  const articles = commande.details || [];
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentItems = articles.slice(indexFirstItem, indexLastItem);

  const configStatut = {
    PAYEE: { bg: "bg-[#9ADE7B]/20 text-[#1A4301]", icone: <CheckCircle size={12} />, label: "Payée" },
    "EN COURS": { bg: "bg-amber-50 text-amber-700 border-none", icone: <Clock size={12} />, label: "En cours" },
    ANNULE: { bg: "bg-red-50 text-red-600 border-none", icone: <XCircle size={12} />, label: "Annulée" }
  };

  const statutActuel = configStatut[commande.statut_commande?.toUpperCase()] || {
    bg: "bg-slate-50 text-slate-600",
    icone: <Clock size={12} />,
    label: commande.statut_commande
  };

  return (
    <div className="min-h-screen bg-white font-sans px-4 md:px-8 py-12 pb-20 w-full box-border flex flex-col gap-8">
      
      {/* ── En-tête de la page ── */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-slate-900 m-0 break-all">
            Commande <span className="text-[#9ADE7B]">#{commande.id_commande}</span>
          </h1>
          <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-slate-400">
            Détails complets de la transaction Volta Network
          </span>
        </div>
        <button 
          className="flex items-center gap-2 text-xs font-bold bg-slate-50 border border-slate-100 hover:bg-slate-100 text-slate-600 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 uppercase tracking-wider shrink-0 shadow-sm" 
          onClick={retourCommande}
        >
          <ArrowLeft size={14} />
          Retour à la liste
        </button>
      </header>

      {/* ── Section Récapitulatif Client & Prix Dynamique ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-stretch">
        <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 shadow-xl items-center">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Client & Destinataire</span>
            <h3 className="text-base font-extrabold m-0 text-slate-900">{commande.nom_destinataire}</h3>
            <p className="text-xs text-slate-400 m-0 mt-0.5">{commande.email_contact || "Aucun email fourni"}</p>
            <p className="text-[11px] text-slate-600 m-0">{commande.telephone_contact}</p>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Adresse de Livraison</span>
            <h3 className="text-sm font-bold m-0 text-slate-900">{commande.adresse_livraison || "Non spécifiée"}</h3>
            <p className="text-[10px] text-slate-400 m-0 uppercase font-bold tracking-wide mt-1">Canal: {commande.canal_commande}</p>
          </div>

          <div className="flex flex-col gap-1.5 items-start sm:items-end">
            <div className="bg-white/90 backdrop-blur border border-slate-100 px-3 py-1.5 rounded-xl shadow-sm flex flex-col sm:items-end">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Statut</span>
              <span className={`inline-flex items-center gap-1.5 py-0.5 px-2 mt-1 rounded-xl text-[10px] font-bold tracking-wider uppercase ${statutActuel.bg}`}>
                {statutActuel.icone} {statutActuel.label}
              </span>
            </div>
          </div>
        </div>

        {/* Bloc Total Général avec dégradé premium sombre */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-2xl flex flex-col justify-center gap-1">
          <span className="text-slate-400 text-[10px] font-bold tracking-wider uppercase">Total Général</span>
          <h2 className="text-2xl font-bold m-0 mt-1">
            {Intl.NumberFormat('fr-FR').format(commande.total_commande || 0)} <span className="text-xs font-medium text-slate-300">FCFA</span>
          </h2>
        </div>
      </div>

      {/* ── Actions de Modification du Statut ── */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div className="flex flex-col">
          <h3 className="text-sm font-bold m-0 text-slate-900">
            Modifier le statut de l'accès {updating && <span className="text-xs text-slate-400 font-normal">(Mise à jour...)</span>}
          </h3>
          <p className="text-xs text-slate-600 m-0 mt-0.5">Cette action mettra à jour l'état de la commande et le calcul du chiffre d'affaires.</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button 
            disabled={updating}
            onClick={() => handleChangerStatut("EN COURS")}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all border-none active:scale-95 ${commande.statut_commande?.toUpperCase() === "EN COURS" ? "bg-amber-500 text-white shadow-md" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}
          >
            En cours
          </button>
          <button 
            disabled={updating}
            onClick={() => handleChangerStatut("PAYEE")}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all border-none active:scale-95 ${commande.statut_commande?.toUpperCase() === "PAYEE" ? "bg-[#1A4301] text-white shadow-md" : "bg-[#9ADE7B]/20 text-[#1A4301] hover:bg-[#9ADE7B]/30"}`}
          >
            Payée
          </button>
          <button 
            disabled={updating}
            onClick={() => handleChangerStatut("ANNULE")}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all border-none active:scale-95 ${commande.statut_commande?.toUpperCase() === "ANNULE" ? "bg-red-600 text-white shadow-md" : "bg-red-50 text-red-600 hover:bg-red-100"}`}
          >
            Annulée
          </button>
        </div>
      </div>

      {/* ── Tableau des Articles Liés ── */}
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-b-slate-100">
                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Produit</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase text-center">Quantité</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase text-right">Prix Unitaire</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase text-right">Sous-Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.length > 0 ? (
                currentItems.map((detail) => {
                  const imageCible = detail.produit?.url_image_principale || detail.url_image_principale || detail.image;
                  const imageSource = imageCible || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&auto=format&fit=crop&q=80";

                  const nomProduit = detail.produit?.nom_produit || detail.nom_produit || "Produit";
                  const descriptionProduit = detail.produit?.apropos || detail.nom_produit || "Article lié à la commande";
                  const prixUnitaireBrut = detail.quantite_commandee > 0 ? (detail.prix_global_scelle / detail.quantite_commandee) : 0;

                  return (
                    <tr key={detail.id_detail_ligne} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 flex items-center gap-4">
                        <img 
                          src={imageSource} 
                          alt={nomProduit} 
                          className="w-12 h-12 object-cover rounded-xl border border-slate-100 bg-slate-50 shrink-0 shadow-sm"
                        />
                        <div className="flex flex-col">
                          <h4 className="text-sm font-bold m-0 text-slate-900">{nomProduit}</h4>
                          <p className="text-[10px] font-bold uppercase text-slate-400 m-0 mt-0.5">
                            {descriptionProduit}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-bold text-slate-900 text-center">{detail.quantite_commandee}</td>
                      <td className="p-4 text-sm font-bold text-slate-600 text-right">
                        {Intl.NumberFormat('fr-FR').format(prixUnitaireBrut)} <span className="text-[10px] font-medium text-slate-400">FCFA</span>
                      </td>
                      <td className="p-4 text-sm font-bold text-slate-900 text-right">
                        {Intl.NumberFormat('fr-FR').format(detail.prix_global_scelle || 0)} <span className="text-[10px] font-medium text-slate-400">FCFA</span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-sm font-medium text-slate-400">
                    Aucun article lié trouvé pour cette commande en base de données.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Structure de Pagination des Articles ── */}
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
                  ? "bg-slate-900 text-white shadow-md border-none font-extrabold" 
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