import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Ban, Unlock, ExternalLink } from "lucide-react";

// ==========================================
// 1. DONNÉES LOCALES EMBARQUÉES
// ==========================================
const client = {
    id: "CLI-JP-001",
    firstName: "Jean-Pierre",
    lastName: "Dubois",
    email: "j.dubois@network-solutions.com",
    status: "ACTIF", // "ACTIF" | "BLOQUÉ"
    registeredAt: "14 Mars 2024",
    avatar: null, 
};

const orders = [
    { id: "#CMD-8892", date: "12 Oct 2024", amount: "1 240 FCFA", status: "PAYÉE" },
    { id: "#CMD-8741", date: "05 Sep 2024", amount: "890 FCFA", status: "PAYÉE" },
    { id: "#CMD-8622", date: "28 Juil 2024", amount: "2 100 FCFA", status: "EN COURS" },
    { id: "#CMD-8509", date: "14 Juin 2024", amount: "450 FCFA", status: "PAYÉE" },
];

// Mapping Tailwind pour le statut des commandes
const orderStatusTailwind = {
    PAYÉE: "bg-[#9ADE7B]/20 text-[#1A4301]",
    "EN COURS": "bg-yellow-50 text-yellow-700 border border-yellow-100",
    ANNULÉE: "bg-red-50 text-red-600 border border-red-100",
};

// Génère les initiales depuis prénom + nom
function getInitials(firstName, lastName) {
    const a = firstName?.[0] ?? "";
    const b = lastName?.[0] ?? "";
    return (a + b).toUpperCase();
}

// ==========================================
// 2. COMPOSANT PRINCIPAL
// ==========================================
export default function ClientDetail({ onBlock, onViewAll }) {
    const [blocked, setBlocked] = useState(client.status === "BLOQUÉ");
    const navigate = useNavigate();

    function handleBlock() {
        const next = !blocked;
        setBlocked(next);
        onBlock?.({ ...client, status: next ? "BLOQUÉ" : "ACTIF" });
    }

    const initials = getInitials(client.firstName, client.lastName);

    return (
        <div className="min-h-screen bg-white font-[Cambria,Cochin,Georgia,Times,'Times_New_Roman',serif] px-4 md:px-8 py-12 pb-20 w-full box-border flex flex-col gap-8">
            
            {/* ── Header ── */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 m-0">
                        Détail <span className="text-[#9ADE7B]">Client</span>
                    </h1>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#9ADE7B]">
                        <span className="w-2 h-2 rounded-full bg-[#9ADE7B] shrink-0 animate-pulse" />
                        Live Security Protocol Active
                    </span>
                </div>
                <button 
                    className="flex items-center gap-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer border-none active:scale-95 uppercase tracking-wider" 
                    onClick={() => navigate("/admin/users")}
                >
                    <ArrowLeft size={14} />
                    Retour à la liste
                </button>
            </header>

            {/* ── Top Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
                
                {/* Profile Card */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xl">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-base font-bold tracking-wide shrink-0 bg-[#9ADE7B]/20 text-[#1A4301] shadow-sm overflow-hidden">
                                {client.avatar ? (
                                    <img src={client.avatar} alt={`${client.firstName} ${client.lastName}`} className="w-full h-full object-cover" />
                                ) : (
                                    initials
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight m-0 mb-1">
                                    {client.firstName} {client.lastName}
                                </h2>
                                <p className="text-xs text-gray-400 flex items-center gap-1.5 font-sans font-medium m-0">
                                    <Calendar size={13} />
                                    Inscrit le {client.registeredAt}
                                </p>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-xl text-[10px] font-bold tracking-wider uppercase ${
                            blocked 
                                ? "bg-red-50 text-red-600" 
                                : "bg-[#9ADE7B]/20 text-[#1A4301]"
                        }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${blocked ? "bg-red-500" : "bg-[#9ADE7B]"}`} />
                            {blocked ? "BLOQUÉ" : "ACTIF"}
                        </span>
                    </div>

                    <div className="flex flex-col gap-1.5 pt-4 border-t border-gray-50">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-gray-400">Adresse email</span>
                        <span className="text-sm text-gray-700 font-sans font-medium">{client.email}</span>
                    </div>
                </div>

                {/* Security Panel */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 flex flex-col shadow-xl">
                    <h3 className="text-base font-bold text-gray-900 m-0 mb-2 tracking-tight">Actions de sécurité</h3>
                    <p className="text-xs leading-relaxed text-gray-400 m-0 mb-6">
                        Gérez les accès de ce client à l'infrastructure VOLTANETWORK. Les changements de statut sont audités en temps réel.
                    </p>
                    <button
                        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all border-none active:scale-95 text-white shadow-sm ${
                            blocked ? "bg-[#9ADE7B] hover:bg-[#89cf6c]" : "bg-red-500 hover:bg-red-600"
                        }`}
                        onClick={handleBlock}
                    >
                        {blocked ? (
                            <>
                                <Unlock size={14} />
                                Débloquer le client
                            </>
                        ) : (
                            <>
                                <Ban size={14} />
                                Bloquer le client
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* ── Order History ── */}
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl flex flex-col">
                <div className="flex items-center justify-between p-5 md:p-6 border-b border-gray-50 bg-gray-50/30">
                    <h3 className="text-base font-bold text-gray-900 m-0 tracking-tight">Historique des commandes</h3>
                    <button 
                        className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-[#9ADE7B] bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity" 
                        onClick={onViewAll}
                    >
                        Voir tout l'historique
                        <ExternalLink size={12} />
                    </button>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">ID Commande</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">Date</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">Montant</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-gray-400 uppercase">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 text-sm font-bold text-gray-900 tracking-wide">{order.id}</td>
                                    <td className="p-4 text-xs font-medium text-gray-500 font-sans">{order.date}</td>
                                    <td className="p-4 text-sm font-bold text-gray-800 font-sans">{order.amount}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-xl text-[10px] font-bold tracking-wider uppercase ${
                                            orderStatusTailwind[order.status] ?? "bg-gray-50 text-gray-600"
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}