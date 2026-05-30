import React, { useState, useMemo } from "react";
import { 
    UserPlus, FileChartColumn, ArrowUpRight, Banknote, ShoppingBag 
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    PieChart, Pie, Cell, Legend
} from "recharts";

// ==========================================
// 1. FONCTIONS UTILITAIRES & LOGIQUE
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
    if (etat === "En cours") return "rgba(255, 184, 77, 0.2)";
    if (etat === "Payé") return "rgba(154, 222, 123, 0.2)";
    if (etat === "Annulée") return "rgba(255, 0, 0, 0.1)";
    return "#f5f5f5";
}

function Text_Etat_commande(etat) {
    if (etat === "En cours") return "#b26a00";
    if (etat === "Payé") return "#1A4301";
    if (etat === "Annulée") return "#cc0000";
    return "#666";
}

// ==========================================
// 2. SOUS-COMPOSANT : RECAP TETE
// ==========================================
function Recap_tete() {
    const cards = [
        { title: "Commandes", value: "1,284", icon: <ShoppingBag size={20} />, taux: "+10%" },
        { title: "Chiffre d'affaires", value: "1,284,000 FCFA", icon: <Banknote size={20} />, taux: "+12.3%" },
        { title: "Clients", value: "1,284", icon: <UserPlus size={20} />, taux: "+8.4%" },
        { title: "Produits", value: "342", icon: <FileChartColumn size={20} />, taux: "+2%" }
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
// 3. SOUS-COMPOSANT : GRAPHIQUE CIRCULAIRE
// ==========================================
const COLORS = ["#9ADE7B", "#1A4301", "#64B5F6", "#FFB74D", "#BA68C8", "#EF9A9A"];

function JaugeProduits({ data }) {
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
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f3f4f6', shadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

// ==========================================
// 4. SOUS-COMPOSANT : COURBE EVOLUTION
// ==========================================
function CourbeVentes({ data = [], filtre = "jour" }) {
    const parseDate = (str) => {
        if (!str) return { jour: 1, mois: 1, an: 2026, heure: 0 };
        const [datePart, timePart] = str.split(" ");
        const [jour, mois, an] = datePart.split("/");
        const [heure] = timePart ? timePart.split(":") : ["0"];

        return {
            jour: parseInt(jour) || 1,
            mois: parseInt(mois) || 1,
            an: parseInt(an) || 2026,
            heure: parseInt(heure) || 0
        };
    };

    const formattedData = useMemo(() => {
        let result = {};
        data.forEach(item => {
            if (!item || !item.date) return;
            const d = parseDate(item.date);
            const rVente = Number(item.vente) || 0;

            let key = `${d.heure}h`;
            if (filtre === "semaine") {
                const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
                const jsDate = new Date(d.an, d.mois - 1, d.jour);
                key = jours[jsDate.getDay()] || "Lundi";
            }
            if (filtre === "mois") key = `${d.jour}`;
            if (filtre === "annee") {
                const moisLabels = ["Jan", "Fév", "Mars", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
                key = moisLabels[d.mois - 1] || "Jan";
            }

            if (!result[key]) result[key] = 0;
            result[key] += rVente;
        });

        return Object.keys(result).map(key => ({ label: key, ventes: result[key] }));
    }, [data, filtre]);

    return (
        <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9ADE7B" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#9ADE7B" stopOpacity={0.0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="label" stroke="#9ca3af" style={{ fontSize: '11px' }} tickLine={false} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} tickLine={false} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f3f4f6' }}
                    />
                    <Area type="monotone" dataKey="ventes" stroke="#9ADE7B" fillOpacity={1} fill="url(#colorVentes)" strokeWidth={3} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

// ==========================================
// 5. SOUS-COMPOSANT : SECTION COMPLETE DES GRAPHES
// ==========================================
function Graphe() {
    const [filtre, setFiltre] = useState("jour");

    const jauge = [
        { name: "Produit A", value: 400 }, { name: "Produit B", value: 300 },
        { name: "Produit C", value: 300 }, { name: "Produit D", value: 200 },
        { name: "Produit E", value: 300 }, { name: "Produit F", value: 200 }
    ];

    const dataVentes = [
        { id: "1",  date: "14/04/2026 08:12", vente: 90 }, { id: "2",  date: "14/04/2026 09:05", vente: 150 },
        { id: "3",  date: "14/04/2026 10:23", vente: 120 }, { id: "4",  date: "14/04/2026 10:47", vente: 200 },
        { id: "5",  date: "14/04/2026 11:10", vente: 300 }, { id: "6",  date: "14/04/2026 11:55", vente: 180 },
        { id: "7",  date: "14/04/2026 12:30", vente: 250 }, { id: "8",  date: "14/04/2026 13:15", vente: 320 },
        { id: "9",  date: "14/04/2026 14:02", vente: 210 }, { id: "10", date: "14/04/2026 15:20", vente: 400 },
        { id: "11", date: "14/04/2026 16:05", vente: 350 }, { id: "12", date: "14/04/2026 17:40", vente: 280 },
        { id: "13", date: "14/04/2026 18:10", vente: 500 }, { id: "14", date: "14/04/2026 19:25", vente: 420 },
        { id: "15", date: "14/04/2026 20:50", vente: 370 }, { id: "16", date: "15/05/2026 18:10", vente: 500 },
        { id: "17", date: "14/06/2026 19:25", vente: 420 }, { id: "18", date: "14/07/2026 20:50", vente: 370 }
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-8 w-full">
            {/* Courbe Évolution */}
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
                <CourbeVentes data={dataVentes} filtre={filtre} />
            </div>

            {/* Jauge Circulaire */}
            <div className="w-full lg:w-[340px] border border-gray-50 rounded-2xl bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-gray-900">Top Catégories</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Répartition de l'inventaire actuel</p>
                </div>
                <div className="mt-4 flex items-center justify-center">
                    <JaugeProduits data={jauge} />
                </div>
            </div>
        </div>
    );
}

// ==========================================
// 6. SOUS-COMPOSANT : TABLEAU DE COMMANDE
// ==========================================
function Table_commande() {
    const dataCommandes = [
        { id: 1, client: "Alice", date: "2026-05-28", montant: "45,000 FCFA", statut: "En cours", email: "alice@gmail.com" },
        { id: 2, client: "Bob", date: "2026-05-27", montant: "120,000 FCFA", statut: "Payé", email: "bob@gmail.com" },
        { id: 3, client: "Charlie", date: "2026-05-25", montant: "85,000 FCFA", statut: "Annulée", email: "charlie@gmail.com" },
    ];

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
                            {dataCommandes.map((user) => (
                                <tr 
                                    key={user.id} 
                                    className="hover:bg-[#9ADE7B]/5 transition-colors duration-200 cursor-pointer group"
                                >
                                    <td className="py-4 text-left">
                                        <div className="flex gap-3 items-center">
                                            <label 
                                                className="h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold text-white transition-transform group-hover:scale-105"
                                                style={{ backgroundColor: Couleur_Nom_Icon(user.email?.charAt(0).toUpperCase()) }}
                                            >
                                                {user.email?.charAt(0).toUpperCase() || ""}
                                            </label>
                                            <div className="flex flex-col">
                                                <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#1A4301] transition-colors">{user.client}</h3>
                                                <p className="text-gray-400 text-xs font-mono">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 text-left text-sm text-gray-500 font-mono">{user.date}</td>
                                    <td className="py-4 text-left text-sm font-black text-gray-900">{user.montant}</td>
                                    <td className="py-4 text-left">
                                        <label 
                                            className="px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wide inline-block"
                                            style={{ 
                                                backgroundColor: Etat_commande(user.statut), 
                                                color: Text_Etat_commande(user.statut) 
                                            }}
                                        >
                                            {user.statut}
                                        </label>
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

// ==========================================
// 7. COMPOSANT PRINCIPAL : DASHBOARD
// ==========================================
export default function Dashboard() {
    return (
        <div className="flex flex-col gap-8 py-12 pb-20 bg-white min-h-screen font-[Cambria,Cochin,Georgia,Times,'Times_New_Roman',serif]">
            <div className="px-4 md:px-8 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-gray-900">
                    Console de <span className="text-[#9ADE7B]">Supervision</span>
                </h1>
                <p className="text-gray-400 text-sm mt-1">Espace d'analyse commerciale Volta Network Services</p>
            </div>
            
            <Recap_tete />
            <Graphe />
            <Table_commande />
        </div>
    );
}