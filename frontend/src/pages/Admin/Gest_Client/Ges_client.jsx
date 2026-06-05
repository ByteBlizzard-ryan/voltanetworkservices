import React, { useState, useEffect, useCallback } from "react";
import { CircleOff, OctagonMinus, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ==========================================
// 1. FONCTIONS DE LOGIQUE VISUELLE
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
    return colorMap[lettre] || "#9ca3af";
}

// ==========================================
// 2. SOUS-COMPOSANT : CON_GESTION_CLIENT
// ==========================================
function Con_gestion_client() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtreEtat, setFiltreEtat] = useState("tous");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    
    const [currentPage, setCurrentPage] = useState(1);
    const [opendeploque, setOpenDeploque] = useState(false); 
    const [openbloquer, setOpenbloquer] = useState(false);   
    const [selectedUser, setSelectedUser] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);

    const itemsPerPage = 10;
    const navigate = useNavigate();

    // Récupération des données depuis Laravel API
    const fetchClients = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("auth_token"); 
            
            const params = new URLSearchParams({
                statut: filtreEtat,
                date_debut: dateDebut,
                date_fin: dateFin
            });

            const response = await fetch(`http://localhost:8000/api/admin/clients?${params.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setClients(data);
            } else {
                console.error("Erreur lors de la récupération des clients");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        } finally {
            setLoading(false);
        }
    }, [filtreEtat, dateDebut, dateFin]);

    useEffect(() => {
        fetchClients();
        setCurrentPage(1);
    }, [fetchClients]);

    // Action de Blocage / Déblocage en BDD
    const handleToggleStatut = async () => {
        if (!selectedUser) return;
        setBtnLoading(true);
        try {
            const token = localStorage.getItem("auth_token");
            const response = await fetch(`http://localhost:8000/api/admin/clients/${selectedUser.id}/toggle-statut`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                setOpenDeploque(false);
                setOpenbloquer(false);
                fetchClients(); 
            } else {
                alert("Impossible de modifier le statut du client.");
            }
        } catch (error) {
            console.error("Erreur lors de la modification :", error);
        } finally {
            setBtnLoading(false);
        }
    };

    // Pagination interne
    const totalPages = Math.ceil(clients.length / itemsPerPage);
    const indexLastItem = currentPage * itemsPerPage;
    const indexFirstItem = indexLastItem - itemsPerPage;
    const currentItems = clients.slice(indexFirstItem, indexLastItem);

    const openModal = (user, e) => {
        e.stopPropagation(); 
        setSelectedUser(user);
        if (user.statut === "débloqué") {
            setOpenDeploque(true);
        } else if (user.statut === "bloqué") {
            setOpenbloquer(true);
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full text-slate-900">
            {/* Barre de Filtres */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between w-full gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mr-2">Statut :</span>
                    {["tous", "débloqué", "bloqué"].map((type) => (
                        <button 
                            key={type}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] rounded-xl cursor-pointer border-none transition-all active:scale-95 ${
                                filtreEtat === type 
                                    ? "bg-[#9ADE7B] text-slate-900 shadow-sm" 
                                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                            }`}
                            onClick={() => setFiltreEtat(type)}
                        >
                            {type === "tous" ? "Tous" : type === "débloqué" ? "Débloqués" : "Bloqués"}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Filtrer du :</span>
                    <input 
                        type="date" 
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                        className="bg-white border border-slate-100 text-slate-900 p-2 text-xs rounded-xl outline-none font-sans font-bold focus:ring-2 focus:ring-[#9ADE7B] focus:border-transparent transition-all" 
                    />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">au :</span>
                    <input 
                        type="date" 
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                        className="bg-white border border-slate-100 text-slate-900 p-2 text-xs rounded-xl outline-none font-sans font-bold focus:ring-2 focus:ring-[#9ADE7B] focus:border-transparent transition-all" 
                    />
                </div>
            </div>

            {/* Tableau des Clients */}
            <div className="w-full overflow-x-auto rounded-2xl border border-slate-100 shadow-xl bg-white relative">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="p-4 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">Nom complet</th>
                            <th className="p-4 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">Email</th>
                            <th className="p-4 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">Statut</th>
                            <th className="p-4 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="p-12 text-center text-slate-600 text-sm font-bold">
                                    <div className="flex flex-col items-center gap-2 justify-center">
                                        <Loader2 className="animate-spin text-[#9ADE7B]" size={24} />
                                        <span>Chargement des clients de Volta Network...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : currentItems.length > 0 ? (
                            currentItems.map((user) => (
                                <tr 
                                    key={user.id} 
                                    onClick={() => navigate(`/admin/users/${user.id}`)}
                                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                                originals>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div 
                                                style={{ backgroundColor: Couleur_Nom_Icon(user.nom?.charAt(0).toUpperCase() || "") }}
                                                className="h-9 w-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-sm shrink-0" 
                                            >
                                                {user.nom?.charAt(0).toUpperCase() || ""}
                                            </div>
                                            <h3 className="font-extrabold text-base text-slate-900 m-0 group-hover:text-slate-900 transition-colors">{user.nom}</h3>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm font-bold text-slate-600">{user.email}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-xl text-xs font-bold tracking-[0.1em] uppercase ${
                                            user.statut === "débloqué" 
                                                ? "bg-[#9ADE7B]/20 text-slate-900" 
                                                : "bg-red-50 text-red-600"
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.statut === "débloqué" ? "bg-[#9ADE7B]" : "bg-red-500"}`} />
                                            {user.statut}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button 
                                            className={`px-3 py-1.5 border-none rounded-xl text-xs font-bold uppercase tracking-[0.2em] cursor-pointer transition-all active:scale-95 text-white ${
                                                user.statut === "débloqué"
                                                    ? "bg-red-500 hover:bg-red-600 shadow-sm"
                                                    : "bg-[#9ADE7B] hover:bg-[#89cf6c] !text-slate-900 shadow-sm"
                                            }`}
                                            onClick={(e) => openModal(user, e)}
                                        >
                                            {user.statut === "débloqué" ? "Bloquer" : "Débloquer"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-slate-400 text-sm font-bold">
                                    Aucun client trouvé
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-end items-center gap-1.5 mt-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="p-2 cursor-pointer bg-white rounded-xl border border-slate-100 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors active:scale-95"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            className={`w-9 h-9 flex items-center justify-center text-xs font-bold rounded-xl cursor-pointer transition-all active:scale-95 ${
                                currentPage === page 
                                    ? "bg-[#9ADE7B] text-slate-900 shadow-lg border-none" 
                                    : "bg-white border border-slate-100 text-slate-600 hover:bg-slate-50"
                            }`}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="p-2 cursor-pointer bg-white rounded-xl border border-slate-100 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors active:scale-95"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}

            {/* MODAL : CONFIRMER LE BLOCAGE */}
            {opendeploque && selectedUser && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[999] p-4" onClick={() => setOpenDeploque(false)}>
                    <div className="bg-white p-6 md:p-8 rounded-2xl max-w-[440px] w-full shadow-2xl border border-slate-100" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-50 text-red-500 flex items-center justify-center rounded-xl shrink-0">
                                <CircleOff size={20}/>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 m-0 tracking-tight">Bloquer le client ?</h2>
                        </div>

                        <div className="mt-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] block">Cible</span>
                            <span className="text-sm font-bold text-slate-900">{selectedUser.nom}</span>
                        </div>
                        
                        <p className="mt-4 text-slate-600 text-sm leading-relaxed text-justify font-sans">
                            Êtes-vous sûr de vouloir bloquer ce client ? Cette action restreindra instantanément ses accès sur l'ensemble du réseau de <span className="font-extrabold text-slate-900">VOLTA NETWORK SERVICES</span>.
                        </p>

                        <div className="mt-4 bg-red-50 p-3.5 rounded-xl border border-red-100">
                            <h3 className="text-red-700 m-0 flex gap-1.5 items-center font-bold text-xs uppercase tracking-[0.2em]">
                                <OctagonMinus size={14}/> <span>Impact critique</span>
                            </h3>
                            <p className="text-xs text-red-600 font-bold mt-1 mb-0">Tous les nœuds de communication actifs seront coupés immédiatement.</p>
                        </div>

                        <div className="mt-6 flex justify-between gap-3">
                            <button disabled={btnLoading} className="flex-1 py-3 text-xs uppercase tracking-[0.2em] font-bold cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl transition-all border-none active:scale-95" onClick={() => setOpenDeploque(false)}>Annuler</button>
                            <button disabled={btnLoading} onClick={handleToggleStatut} className="flex-1 py-3 text-xs uppercase tracking-[0.2em] font-bold cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all border-none shadow-lg active:scale-95 flex items-center justify-center">
                                {btnLoading ? <Loader2 className="animate-spin" size={16} /> : "Confirmer"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL : CONFIRMER LE DÉBLOCAGE */}
            {openbloquer && selectedUser && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[999] p-4" onClick={() => setOpenbloquer(false)}>
                    <div className="bg-white p-6 md:p-8 rounded-2xl max-w-[440px] w-full shadow-2xl border border-slate-100" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#9ADE7B]/20 text-slate-900 flex items-center justify-center rounded-xl shrink-0">
                                <CheckCircle2 size={20} className="text-[#9ADE7B]"/>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 m-0 tracking-tight">Débloquer le client ?</h2>
                        </div>

                        <div className="mt-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] block">Cible</span>
                            <span className="text-sm font-bold text-slate-900">{selectedUser.nom}</span>
                        </div>
                        
                        <p className="mt-4 text-slate-600 text-sm leading-relaxed text-justify font-sans">
                            Êtes-vous sûr de vouloir réactiver ce client ? Ses permissions de transit et de connexion réseau seront immédiatement rétablies sur la plateforme.
                        </p>

                        <div className="mt-6 flex justify-between gap-3">
                            <button disabled={btnLoading} className="flex-1 py-3 text-xs uppercase tracking-[0.2em] font-bold cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl transition-all border-none active:scale-95" onClick={() => setOpenbloquer(false)}>Annuler</button>
                            <button disabled={btnLoading} onClick={handleToggleStatut} className="flex-1 py-3 text-xs uppercase tracking-[0.2em] font-bold cursor-pointer bg-slate-950 hover:bg-[#9ADE7B] text-white hover:text-slate-900 rounded-xl transition-all border-none shadow-lg active:scale-95 flex items-center justify-center">
                                {btnLoading ? <Loader2 className="animate-spin" size={16} /> : "Rétablir les accès"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ==========================================
// 3. COMPOSANT PRINCIPAL
// ==========================================
export default function Gest_client() {
    return (
        <div className="flex flex-col gap-8 py-12 pb-20 bg-white min-h-screen font-sans px-4 md:px-8 w-full box-border text-slate-900 overflow-x-hidden">
            <div>
                <span className="inline-block bg-[#9ADE7B]/20 text-slate-900 text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-2">
                    Volta Network Services Panel
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 m-0 leading-tight">
                    Gestion des <span className="text-[#9ADE7B]">Clients</span>
                </h1>
            </div>
            <Con_gestion_client />
        </div>
    );
}