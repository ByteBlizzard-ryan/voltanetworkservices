import React, { useState, useEffect, useMemo } from "react";
import { 
    UserPlus, FileChartColumn, ArrowUpRight, Banknote, ShoppingBag, Loader2 
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    PieChart, Pie, Cell, Legend
} from "recharts";

// ==========================================
// 1. UTILITAIRES DE RENDU GRAPHIQUE
// ==========================================
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
    return colorMap[lettre] || "#ccc";
}

function Etat_commande(etat) {
    const upperStr = String(etat).toUpperCase();
    if (upperStr === "EN COURS" || upperStr === "PENDING") return "rgba(255, 184, 77, 0.2)";
    if (upperStr === "PAYÉ" || upperStr === "PAYE" || upperStr === "PAID") return "rgba(154, 222, 123, 0.2)";
    if (upperStr === "ANNULÉE" || upperStr === "ANNULEE" || upperStr === "CANCELLED") return "rgba(255, 0, 0, 0.1)";
    return "#f5f5f5";
}

function Text_Etat_commande(etat) {
    const upperStr = String(etat).toUpperCase();
    if (upperStr === "EN COURS" || upperStr === "PENDING") return "#b26a00";
    if (upperStr === "PAYÉ" || upperStr === "PAYE" || upperStr === "PAID") return "#1A4301";
    if (upperStr === "ANNULÉE" || upperStr === "ANNULEE" || upperStr === "CANCELLED") return "#cc0000";
    return "#666";
}

// ==========================================
// 2. RECAP TETE
// ==========================================
function Recap_tete({ stats }) {
    const cards = [
        { title: "Commandes", value: stats?.total_commandes ?? "0", icon: <ShoppingBag size={20} />, taux: stats?.taux_commandes ?? "+0%" },
        { title: "Chiffre d'affaires", value: `${Number(stats?.chiffre_affaires ?? 0).toLocaleString()} FCFA`, icon: <Banknote size={20} />, taux: stats?.taux_ca ?? "+0%" },
        { title: "Clients", value: stats?.total_clients ?? "0", icon: <UserPlus size={20} />, taux: stats?.taux_clients ?? "+0%" },
        { title: "Produits", value: stats?.total_produits ?? "0", icon: <FileChartColumn size={20} />, taux: stats?.taux_produits ?? "+0%" }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8">
            {cards.map((card, idx) => (
                <section key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-[#1A4301] bg-[#9ADE7B]/20 p-2.5 rounded-xl">
                            {card.icon}
                        </span>
                        <div className="flex items-center gap-0.5 text-[#9ADE7B] font-bold bg-[#9ADE7B]/10 px-2 py-0.5 rounded-lg">
                            <ArrowUpRight size={16} />
                            <p className="text-xs font-mono">{card.taux}</p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{card.title}</p>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-1">{card.value}</h1>
                    </div>
                </section>
            ))}
        </div>
    );
}

// ==========================================
// 3. GRAPHIQUE CIRCULAIRE
// ==========================================
const COLORS = ["#9ADE7B", "#1A4301", "#64B5F6", "#FFB74D", "#BA68C8", "#EF9A9A"];

function JaugeProduits({ data = [] }) {
    return (
        <div className="w-full h-[320px] flex flex-col justify-between">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        label={({ percent }) => percent > 0 ? `${(percent * 100).toFixed(0)}%` : ""}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f3f4f6' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

// ==========================================
// 4. COURBE EVOLUTION
// ==========================================
function CourbeVentes({ data = [], filtre = "jour" }) {
    const formattedData = useMemo(() => {
        let result = {};

        data.forEach(item => {
            if (!item || !item.date) return;
            const dateObj = new Date(item.date);
            if (isNaN(dateObj.getTime())) return;

            const rVente = Number(item.vente) || 0;
            let key = `${dateObj.getHours()}h`;

            if (filtre === "semaine") {
                const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
                key = jours[dateObj.getDay()];
            }
            if (filtre === "mois") {
                key = `${dateObj.getDate()}`;
            }
            if (filtre === "annee") {
                const moisLabels = ["Jan", "Fév", "Mars", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
                key = moisLabels[dateObj.getMonth()];
            }

            if (!result[key]) result[key] = 0;
            result[key] += rVente;
        });

        return Object.keys(result).map(key => ({ label: key, ventes: result[key] }));
    }, [data, filtre]);

    return (
        <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9ADE7B" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#9ADE7B" stopOpacity={0.0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="label" stroke="#9ca3af" style={{ fontSize: '11px' }} tickLine={false} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f3f4f6' }} />
                    <Area type="monotone" dataKey="ventes" stroke="#9ADE7B" fillOpacity={1} fill="url(#colorVentes)" strokeWidth={3} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

// ==========================================
// 5. SECTION DES GRAPHES
// ==========================================
function Graphe({ transactions, categories }) {
    const [filtre, setFiltre] = useState("jour");

    return (
        <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-8 w-full">
            <div className="flex-1 border border-gray-50 rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-gray-900">Évolution des ventes</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Suivi en temps réel des transactions</p>
                    </div>
                    <label className="px-2.5 py-1 rounded-md bg-[#9ADE7B]/20 text-[#1A4301] text-xs font-bold uppercase tracking-wider animate-pulse">
                        Direct Live
                    </label>
                </div>
                
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 md:pb-0">
                    {["jour", "semaine", "mois", "annee"].map((type) => (
                        <button 
                            key={type}
                            className={`px-4 py-2 text-xs font-bold border-none cursor-pointer rounded-xl transition-all duration-300 whitespace-nowrap shadow-sm ${
                                filtre === type 
                                ? "bg-[#9ADE7B] text-gray-900" 
                                : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                            }`}
                            onClick={() => setFiltre(type)}
                        >
                            {type === "jour" ? "Aujourd’hui" : type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
                <CourbeVentes data={transactions} filtre={filtre} />
            </div>

            <div className="w-full lg:w-[340px] border border-gray-50 rounded-2xl bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-gray-900">Top Ventes</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Distribution des volumes par article</p>
                </div>
                <div className="mt-4 flex items-center justify-center">
                    <JaugeProduits data={categories} />
                </div>
            </div>
        </div>
    );
}

// ==========================================
// 6. TABLEAU DE COMMANDE
// ==========================================
function Table_commande({ commandes }) {
    return (
        <div className="p-5 px-4 md:px-8">
            <div className="w-full bg-white border border-gray-50 shadow-sm rounded-2xl p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Dernières Commandes</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Liste complète des activités récentes des clients</p>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="pb-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">Client</th>
                                <th className="pb-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">Date</th>
                                <th className="pb-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">Montant</th>
                                <th className="pb-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {commandes.map((order) => (
                                <tr key={order.id} className="hover:bg-[#9ADE7B]/5 transition-colors duration-200 cursor-pointer group">
                                    <td className="py-4 text-left">
                                        <div className="flex gap-3 items-center">
                                            <label 
                                                className="h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                                                style={{ backgroundColor: Couleur_Nom_Icon(order.client?.charAt(0).toUpperCase()) }}
                                            >
                                                {order.client?.charAt(0).toUpperCase() || ""}
                                            </label>
                                            <div className="flex flex-col">
                                                <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#1A4301] transition-colors">{order.client}</h3>
                                                <p className="text-gray-400 text-xs font-mono">{order.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 text-left text-sm text-gray-500 font-mono">{order.date}</td>
                                    <td className="py-4 text-left text-sm font-black text-gray-900">{Number(order.montant).toLocaleString()} FCFA</td>
                                    <td className="py-4 text-left">
                                        <label 
                                            className="px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wide inline-block"
                                            style={{ 
                                                backgroundColor: Etat_commande(order.statut), 
                                                color: Text_Etat_commande(order.statut) 
                                            }}
                                        >
                                            {order.statut}
                                        </label>
                                    </td>
                                </tr>
                            ))}
                            {commandes.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="py-6 text-center text-sm text-gray-400">Aucune transaction enregistrée.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>  
            </div>
        </div>
    );
}

// ==========================================
// 7. COMPOSANT PRINCIPAL : DASHBOARD
// ==========================================
export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Remplace par l'URL de ton serveur de développement ou de production si nécessaire
        fetch("http://localhost:8000/api/admin/dashboard-stats")
            .then((res) => {
                if (!res.ok) throw new Error("Erreur de communication avec l'API Laravel.");
                return res.json();
            })
            .then((data) => {
                setDashboardData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-3">
                <Loader2 className="w-9 h-9 animate-spin text-[#9ADE7B]" />
                <p className="text-xs font-bold text-gray-400 tracking-widest uppercase">Calcul des indicateurs en cours...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-3 text-center px-4">
                <span className="text-red-500 text-3xl font-bold">⚠️</span>
                <h3 className="text-lg font-bold text-gray-900">Échec du chargement de la console</h3>
                <p className="text-xs text-gray-400 max-w-xs">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 py-12 pb-20 bg-white min-h-screen font-[Cambria,Cochin,Georgia,Times,'Times_New_Roman',serif]">
            <div className="px-4 md:px-8 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900">
                    Console de <span className="text-[#9ADE7B]">Supervision</span>
                </h1>
                <p className="text-gray-400 text-sm mt-1">Espace d'analyse commerciale Volta Network Services</p>
            </div>
            
            <Recap_tete stats={dashboardData?.stats} />
            <Graphe transactions={dashboardData?.transactions} categories={dashboardData?.categories} />
            <Table_commande commandes={dashboardData?.commandes} />
        </div>
    );
}