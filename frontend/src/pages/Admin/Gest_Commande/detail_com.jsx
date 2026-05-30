import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Clock, XCircle, ChevronLeft, ChevronRight, FileText } from "lucide-react";

// 📦 DONNÉES INTÉGRÉES DIRECTEMENT (Plus besoin d'import externe)
const data = [
  { id: "CMD001", nom: "Alice Mbarga", email: "alice@gmail.com", date: "14/04/2026", prix: 120000, statut: "payée" },
  { id: "CMD002", nom: "Jean Nkomo", email: "jean@yahoo.com", date: "15/04/2026", prix: 85000, statut: "encours" },
  { id: "CMD003", nom: "Paul Ndzi", email: "paul@gmail.com", date: "16/04/2026", prix: 45000, statut: "annulée" },
  { id: "CMD004", nom: "Clarisse Ndzi", email: "clarisse@yahoo.com", date: "17/04/2026", prix: 230000, statut: "payée" },
  { id: "CMD005", nom: "Marc Essono", email: "marc@gmail.com", date: "18/04/2026", prix: 99000, statut: "encours" },
  { id: "CMD006", nom: "Brice Tchoua", email: "brice@yahoo.com", date: "19/04/2026", prix: 150000, statut: "annulée" },
  { id: "CMD007", nom: "Nadine Ewane", email: "nadine@gmail.com", date: "20/04/2026", prix: 70000, statut: "payée" },
  { id: "CMD008", nom: "Serge Ndzi", email: "serge@yahoo.com", date: "21/04/2026", prix: 180000, statut: "encours" },
  { id: "CMD009", nom: "Yves Mbida", email: "yves@gmail.com", date: "22/04/2026", prix: 56000, statut: "annulée" },
  { id: "CMD010", nom: "Cynthia Ndzi", email: "cynthia@yahoo.com", date: "23/04/2026", prix: 134000, statut: "payée" },
  { id: "CMD011", nom: "Kevin Ndzi", email: "kevin@gmail.com", date: "24/04/2026", prix: 76000, statut: "encours" },
  { id: "CMD012", nom: "Mireille Ndzi", email: "mireille@yahoo.com", date: "25/04/2026", prix: 210000, statut: "annulée" },
  { id: "CMD013", nom: "Joel Ndzi", email: "joel@gmail.com", date: "26/04/2026", prix: 50000, statut: "payée" },
  { id: "CMD014", nom: "Sandra Ndzi", email: "sandra@yahoo.com", date: "27/04/2026", prix: 89000, statut: "encours" },
  { id: "CMD015", nom: "Patrick Ndzi", email: "patrick@gmail.com", date: "175000", statut: "annulée" }
];

const detaildata = [
  { id: 1, image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3", nom: "T-Shirt Oversize Noir", categorie: "Vêtements", quantite: 2, prix: 8500, sousTotal: 17000 },
  { id: 2, image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3", nom: "Sneakers Air Max", categorie: "Chaussures", quantite: 1, prix: 45000, sousTotal: 45000 },
  { id: 3, image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3", nom: "Chemise Premium", categorie: "Mode Homme", quantite: 3, prix: 12000, sousTotal: 36000 },
  { id: 4, image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3", nom: "Sac à Main Élégance", categorie: "Accessoires", quantite: 1, prix: 30000, sousTotal: 30000 },
  { id: 5, image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3", nom: "Casque Bluetooth", categorie: "Électronique", quantite: 2, prix: 15000, sousTotal: 30000 },
  { id: 6, image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3", nom: "Smartphone Galaxy", categorie: "Téléphone", quantite: 1, prix: 185000, sousTotal: 185000 },
  { id: 7, image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3", nom: "Chaussures Running", categorie: "Sport", quantite: 2, prix: 25000, sousTotal: 50000 },
  { id: 8, image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3", nom: "Montre Luxe Silver", categorie: "Montres", quantite: 1, prix: 78000, sousTotal: 78000 },
  { id: 9, image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3", nom: "Montre Connectée", categorie: "High-Tech", quantite: 1, prix: 65000, sousTotal: 65000 },
  { id: 10, image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3", nom: "Parfum Élixir", categorie: "Beauté", quantite: 4, prix: 9500, sousTotal: 38000 },
  { id: 11, image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3", nom: "Pull Hiver Premium", categorie: "Mode Femme", quantite: 2, prix: 18000, sousTotal: 36000 },
  { id: 12, image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3", nom: "Basket Streetwear", categorie: "Chaussures", quantite: 1, prix: 39000, sousTotal: 39000 },
  { id: 13, image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3", nom: "Ordinateur Portable", categorie: "Informatique", quantite: 1, prix: 350000, sousTotal: 350000 },
  { id: 14, image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3", nom: "MacBook Pro", categorie: "Apple", quantite: 1, prix: 950000, sousTotal: 950000 },
  { id: 15, image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3", nom: "Caméra Numérique", categorie: "Photographie", quantite: 2, prix: 120000, sousTotal: 240000 }
];

export default function Detail_com() {
  const { id_commande } = useParams(); 
  const naviguer = useNavigate();

  // 🔍 Trouver la commande principale
  const commandePrincipale = data.find((item) => item.id === id_commande);

  // 📝 Pagination locale pour les articles de la table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(detaildata.length / itemsPerPage);
  const indexLastItem = currentPage * itemsPerPage;
  const indexFirstItem = indexLastItem - itemsPerPage;
  const currentItems = detaildata.slice(indexFirstItem, indexLastItem);

  const retourCommande = () => {
    naviguer("/admin/commande");
  };

  // 🚨 Sécurité si l'ID dans l'URL n'existe pas
  if (!commandePrincipale) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center font-[Cambria,Cochin,Georgia,Times,'Times_New_Roman',serif]">
        <XCircle className="text-red-500 w-14 h-14 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-1">Commande introuvable</h2>
        <p className="text-xs font-sans text-gray-400 mb-6">L'identifiant "{id_commande}" ne correspond à aucune commande enregistrée.</p>
        <button 
          onClick={retourCommande}
          className="flex items-center gap-2 text-xs font-bold bg-gray-900 hover:bg-black text-white px-5 py-3 rounded-xl shadow-sm transition-colors border-none cursor-pointer uppercase tracking-wider"
        >
          <ArrowLeft size={14} /> Retour à la liste
        </button>
      </div>
    );
  }

  // 🏷️ Styles des statuts
  const configStatut = {
    payée: { bg: "bg-[#9ADE7B]/20 text-[#1A4301]", icone: <CheckCircle size={12} />, label: "Payée" },
    encours: { bg: "bg-amber-50 text-amber-700 border-none", icone: <Clock size={12} />, label: "En cours" },
    annulée: { bg: "bg-red-50 text-red-600 border-none", icone: <XCircle size={12} />, label: "Annulée" }
  };

  const statutActuel = configStatut[commandePrincipale.statut.toLowerCase()] || configStatut.encours;

  return (
    <div className="min-h-screen bg-white font-[Cambria,Cochin,Georgia,Times,'Times_New_Roman',serif] px-4 md:px-8 py-12 pb-20 w-full box-border flex flex-col gap-8">
      
      {/* ── En-tête de la page ── */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-gray-900 m-0">
            Commande <span className="text-[#9ADE7B]">#{commandePrincipale.id}</span>
          </h1>
          <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-gray-400">
            Détails complets de la transaction
          </span>
        </div>
        <button 
          className="flex items-center gap-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer border-none active:scale-95 uppercase tracking-wider" 
          onClick={retourCommande}
        >
          <ArrowLeft size={14} />
          Retour à la liste
        </button>
      </header>

      {/* ── Section Récapitulatif Client & Prix Dynamique ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-stretch">
        
        {/* Infos du Client */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 shadow-xl items-center">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Client</span>
            <h3 className="text-base font-bold m-0 text-gray-900">{commandePrincipale.nom}</h3>
            <p className="text-xs text-gray-400 m-0 font-sans mt-0.5">{commandePrincipale.email}</p>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Date de commande</span>
            <h3 className="text-base font-bold m-0 text-gray-900 font-sans">{commandePrincipale.date}</h3>
          </div>

          <div className="flex flex-col gap-1.5 items-start sm:items-end">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Statut Actuel</span>
            <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-xl text-[10px] font-bold tracking-wider uppercase ${statutActuel.bg}`}>
              {statutActuel.icone} {statutActuel.label}
            </span>
          </div>
        </div>

        {/* Bloc Prix Total */}
        <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl flex flex-col justify-between gap-4">
          <div>
            <span className="text-gray-400 text-[10px] font-sans font-bold tracking-wider uppercase">Total Général</span>
            <h2 className="text-2xl font-bold m-0 mt-1 font-sans">{commandePrincipale.prix.toLocaleString()} <span className="text-xs font-serif font-medium text-gray-400">FCFA</span></h2>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#9ADE7B] hover:bg-[#89cf6c] text-gray-900 border-none font-sans font-bold text-xs rounded-xl cursor-pointer transition-all uppercase tracking-wide active:scale-95 shadow-sm">
            <FileText size={14} />
            Facture PDF
          </button>
        </div>
      </div>

      {/* ── Actions de Modification du Statut ── */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xl">
        <div className="flex flex-col">
          <h3 className="text-sm font-bold m-0 text-gray-900">Modifier le statut de l'accès</h3>
          <p className="text-xs text-gray-400 m-0 mt-0.5 font-sans">Cette action mettra à jour l'inventaire et notifiera le client instantanément</p>
        </div>

        <div className="flex gap-2 flex-wrap font-sans">
          <button className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all border-none bg-amber-50 text-amber-700 hover:bg-amber-100/70">
            En cours
          </button>
          <button className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all border-none bg-[#9ADE7B]/20 text-[#1A4301] hover:bg-[#9ADE7B]/30">
            Payée
          </button>
          <button className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all border-none bg-red-50 text-red-600 hover:bg-red-100/70">
            Annulée
          </button>
        </div>
      </div>

      {/* ── Tableau des Articles Liés ── */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl flex flex-col">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">Produit</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-center">Quantité</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-right">Prix Unitaire</th>
                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase text-right">Sous-Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentItems.length > 0 ? (
                currentItems.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 flex items-center gap-4">
                      <img 
                        src={article.image} 
                        alt={article.nom} 
                        className="w-12 h-12 object-cover rounded-xl border border-gray-100 bg-gray-50 shrink-0" 
                      />
                      <div className="flex flex-col">
                        <h4 className="text-sm font-bold m-0 text-gray-900">{article.nom}</h4>
                        <p className="text-[10px] font-bold uppercase text-gray-400 m-0 font-sans mt-0.5">{article.categorie}</p>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-800 text-center font-sans">{article.quantite}</td>
                    <td className="p-4 text-sm font-bold text-gray-500 text-right font-sans">{article.prix.toLocaleString()} <span className="text-[10px] font-serif font-medium text-gray-400">CFA</span></td>
                    <td className="p-4 text-sm font-bold text-gray-900 text-right font-sans">{article.sousTotal.toLocaleString()} <span className="text-[10px] font-serif font-medium text-gray-400">CFA</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-sm font-medium text-gray-400">
                    Aucun article trouvé pour cette commande.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Structure de Pagination ── */}
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
                  ? "bg-gray-900 text-white shadow-md border-none" 
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