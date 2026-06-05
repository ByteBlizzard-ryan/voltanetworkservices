import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Ban, Unlock, ExternalLink, Loader2 } from "lucide-react";

// Mapping Tailwind pour le statut des commandes (clés standardisées en minuscules)
const orderStatusTailwind = {
    "payee": "bg-[#9ADE7B]/20 text-[#1A4301]",
    "en_cours": "bg-yellow-50 text-yellow-700 border border-yellow-100",
    "annulee": "bg-red-50 text-red-600 border border-red-100",
};

// Génère les initiales depuis prénom + nom
function getInitials(firstName, lastName) {
    const a = firstName?.[0] ?? "";
    const b = lastName?.[0] ?? "";
    return (a + b).toUpperCase();
}

export default function ClientDetail({ onViewAll }) {
    // Récupère l'ID via la clé "id_client" définie dans App.jsx
    const { id_client } = useParams(); 
    const navigate = useNavigate();
    
    const [client, setClient] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // 1. Récupération des données réelles depuis Laravel
    useEffect(() => {
        async function fetchClientDetails() {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch(`http://localhost:8000/api/admin/clients/${id_client}`);
                
                if (!response.ok) {
                    throw new Error("Impossible de récupérer les détails du client.");
                }

                const data = await response.json();
                setClient(data.client);
                setOrders(data.orders || []); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (id_client) {
            fetchClientDetails();
        } else {
            setError("Aucun identifiant client trouvé dans l'URL.");
            setLoading(false);
        }
    }, [id_client]);

    // 2. Action Dynamique : Bloquer / Débloquer le client
    async function handleBlock() {
        if (submitting || !id_client) return;
        
        try {
            setSubmitting(true);
            const response = await fetch(`http://localhost:8000/api/admin/clients/${id_client}/toggle-statut`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la modification du statut.");
            }

            const data = await response.json();
            
            setClient(prev => ({
                ...prev,
                statut: data.statut
            }));

        } catch (err) {
            alert(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    // ── États visuels de chargement et d'erreur ──
    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center gap-2 text-slate-400 font-sans">
                <Loader2 className="animate-[spin_0.5s_linear_infinite] text-[#9ADE7B]" size={24} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Chargement des protocoles client...</span>
            </div>
        );
    }

    if (error || !client) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 text-slate-900 bg-white font-sans">
                <p className="text-red-500 font-bold text-sm">Erreur : {error || "Client introuvable"}</p>
                <button 
                    onClick={() => navigate("/admin/users")} 
                    className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-600 hover:bg-gray-100 transition-colors"
                >
                    Retour à la liste
                </button>
            </div>
        );
    }

    const isBlocked = client.statut === "bloqué" || client.statut === "BLOQUÉ";
    const initials = getInitials(client.prenom, client.nom);

    return (
        <div className="min-h-screen bg-white font-sans px-4 md:px-8 py-12 pb-20 w-full box-border flex flex-col gap-8">
            
            {/* ── Header ── */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-slate-900 m-0">
                        Détail <span className="text-[#9ADE7B]">Client</span>
                    </h1>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#9ADE7B]">
                        <span className="w-2 h-2 rounded-full bg-[#9ADE7B] shrink-0 animate-pulse" />
                        Live Security Protocol Active
                    </span>
                </div>
                <button 
                    className="flex items-center gap-2 text-xs font-bold bg-slate-50 border border-slate-100 hover:bg-gray-100 text-slate-600 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 uppercase tracking-wider shadow-sm" 
                    onClick={() => navigate("/admin/users")}
                >
                    <ArrowLeft size={14} className="text-slate-400" />
                    Retour à la liste
                </button>
            </header>

            {/* ── Top Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
                
                {/* Profile Card */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-lg">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-base font-extrabold tracking-wide shrink-0 bg-[#9ADE7B]/20 text-[#1A4301] shadow-sm overflow-hidden">
                                {client.avatar ? (
                                    <img src={client.avatar} alt={`${client.prenom} ${client.nom}`} className="w-full h-full object-cover" />
                                ) : (
                                    initials
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 tracking-tight m-0 mb-1">
                                    {client.prenom} {client.nom}
                                </h2>
                                <p className="text-xs text-slate-400 flex items-center gap-1.5 font-medium m-0">
                                    <Calendar size={13} className="text-slate-400" />
                                    Inscrit le {client.created_at ? new Date(client.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : "Inconnue"}
                                </p>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="bg-white/90 backdrop-blur border border-slate-100 rounded-xl px-2.5 py-1 flex flex-col shadow-sm">
                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Statut</span>
                            <span className={`text-sm font-bold flex items-center gap-1.5 ${isBlocked ? "text-red-600" : "text-[#1A4301]"}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isBlocked ? "bg-red-500" : "bg-[#9ADE7B]"}`} />
                                {isBlocked ? "BLOQUÉ" : "ACTIF"}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5 pt-4 border-t border-slate-100">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Adresse email</span>
                        <span className="text-slate-600 text-sm font-medium">{client.email}</span>
                    </div>
                </div>

                {/* Security Panel */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 flex flex-col shadow-lg">
                    <h3 className="text-base font-extrabold text-slate-900 m-0 mb-2 tracking-tight">Actions de sécurité</h3>
                    <p className="text-slate-600 text-xs leading-relaxed m-0 mb-6">
                        Gérez les accès de ce client à l'infrastructure VOLTANETWORK. Les changements de statut sont audités en temps réel.
                    </p>
                    <button
                        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-lg font-bold transition-all border-none active:scale-95 text-white shadow-lg ${
                            submitting ? "opacity-50 cursor-not-allowed" : ""
                        } ${
                            isBlocked ? "bg-[#9ADE7B] hover:bg-[#89cf6c]" : "bg-red-500 hover:bg-red-600"
                        }`}
                        onClick={handleBlock}
                        disabled={submitting}
                    >
                        {submitting ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : isBlocked ? (
                            <>
                                <Unlock size={18} />
                                Débloquer le client
                            </>
                        ) : (
                            <>
                                <Ban size={18} />
                                Bloquer le client
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* ── Order History ── */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100 bg-slate-50">
                    <h3 className="text-base font-extrabold text-slate-900 m-0 tracking-tight">Historique des commandes</h3>
                    <button 
                        className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#9ADE7B] bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity tracking-wider" 
                        onClick={onViewAll}
                    >
                        Voir tout l'historique
                        <ExternalLink size={14} className="text-[#9ADE7B]" />
                    </button>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase">ID Commande</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Date</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Montant</th>
                                <th className="p-4 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-xs text-slate-400 font-medium">
                                        Aucune commande passée par ce client pour le moment.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => {
                                    const statutCle = order.statut?.toLowerCase().replace(' ', '_');
                                    
                                    return (
                                        <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4 text-sm font-bold text-slate-900 tracking-wide">
                                                #{order.id ? `${order.id.substring(0, 8)}...` : "Inconnu"}
                                            </td>
                                            <td className="p-4 text-xs font-medium text-slate-600">
                                                {new Date(order.created_at).toLocaleDateString('fr-FR')}
                                            </td>
                                            <td className="p-4 text-sm font-bold text-slate-900">
                                                {Intl.NumberFormat('fr-FR').format(order.montant || 0)} FCFA
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-xl text-[10px] font-bold tracking-wider uppercase ${
                                                    orderStatusTailwind[statutCle] || "bg-slate-50 text-slate-600"
                                                }`}>
                                                    {order.statut || "Inconnu"}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}