import React, {useState, useMemo, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {Banknote, ArrowUpRight, ShoppingBasket} from "lucide-react"
//import {Couleur_Nom_Icon, Etat_produit, Action_produit} from "./function";
import {data} from "./data"
import "./style_con_gest_commande.css"



export default function Con_gestion_commande() {
    const naviguer = useNavigate();


    const duration = 300; // 5 minutes (en secondes)
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => {
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
    
    

    // 📌 États
    const [filtreEtat, setFiltreEtat] = useState("tous");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    

    // 📌 Filtrage
    const filteredData = useMemo(() => {
        if (filtreEtat === "tous") return data;
        return data.filter(item => item.statut === filtreEtat);
    }, [filtreEtat, data]);

    // 📌 Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const indexLastItem = currentPage * itemsPerPage;
    const indexFirstItem = indexLastItem - itemsPerPage;

    const currentItems = filteredData.slice(indexFirstItem, indexLastItem);

    // 📌 Reset page si filtre change
    const handleFilterChange = (statut) => {
        setFiltreEtat(statut);
        setCurrentPage(1);
    };


    const detailCommande = (id) => {
        // Rediriger vers la page de détail de la commande
        naviguer(`/admin/commande/${id}`);
    }



    return (
        <div className="con_gestion_commande">
            <div className="recap_commande">
                <section className="section_recap">
                    <div className="tete_recap_sec_com">
                        <Banknote size={30} className="banknote"/>
                        <p className="taux">+12%</p>
                    </div>
                    <p>CHIFFRE D'AFFAIRES</p>
                    <h2>14.000.000</h2>
                </section>

                <section className="section_recap">
                    <div className="tete_recap_sec_com">
                        <ShoppingBasket size={30} className="shoppingbasket"/>
                        <p className="etat">+12%</p>
                    </div>
                    <p>COMMANDES PAYEES</p>
                    <h2>549</h2>
                </section>

                <section className="sentinel">
                    <div className="tete_sentinel">
                        <label></label>
                        <p>SENTINEL LIVE</p>
                    </div>
                    <p>DERNIERE MISE A JOUR</p>
                    <h2>Il ya  </h2>
                    <div className="jauge_bar">
                        <div className="jauge_fill" style={{ width: `${percent}%` }}>

                        </div>
                    </div>
                </section>
            </div>

            <div className="entete_filtre">
                <div className="filtre_etat">
                    <button className={filtreEtat === "tous"  ? "active" : ""}
                         onClick={() => handleFilterChange("tous")}>
                        Tous
                    </button>
                    <button className={filtreEtat=== "encours"  ? "active" : ""}
                         onClick={() => handleFilterChange("encours")}>
                        En cours
                    </button>
                    <button className={filtreEtat=== "annulée"  ? "active" : ""}
                         onClick={() => handleFilterChange("annulée")}>
                        Annulée
                    </button>
                    <button className={filtreEtat=== "payée"  ? "active" : ""}
                         onClick={() => handleFilterChange("payée")}>
                        Payée
                    </button>
                </div>

                <div className="filtre_date">
                    <label>Filtrer par date du : </label>
                    <input type="date" />
                    <label> au : </label>
                    <input type="date" />
                </div>
            </div>

            <div className="table_wrapper">
                <table className="list_commande">
                    <thead>
                        <tr>
                            <th>ID COMMANDE</th>
                            <th>CLIENT</th>
                            <th>DATE </th>
                            <th>MONTANT TOTAL (CFA)</th>
                            <th>STATUT</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((commande) => (
                                <tr key={commande.id} onClick={() => detailCommande(commande.id)}>
                                    <td className="id_commande">
                                        #{commande.id}
                                    </td>
                                    <td>
                                        <div className="nom_client">
                                            <h3> {commande.nom}</h3>
                                            <p>{commande.email}</p>
                                        </div>
                                    </td>
                                    <td >
                                        {commande.date}
                                    </td>
                                    <td className="montant_total">
                                        {commande.prix}
                                    </td>
                                    <td>
                                        <p className={`statut ${commande.statut}`}>
                                            {commande.statut}
                                        </p>
                                    </td>
                                    
                                </tr>
                            ))
                        ): (
                            <tr>
                                <td colSpan="3">Aucun commande trouvé</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="pagination">

                {/* Précédent */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    ⬅
                </button>

                {/* Pages */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        className={currentPage === page ? "active" : ""}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}

                {/* Suivant */}
                <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    ➡
                </button>
            </div>
                
        </div>
    );
}