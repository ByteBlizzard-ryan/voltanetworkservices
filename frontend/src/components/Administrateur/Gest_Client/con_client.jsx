import React, { useState, useMemo } from "react";
import {Couleur_Nom_Icon, Statut_client, Action_client} from "./function";
import {CircleOff, OctagonMinus} from "lucide-react"
import { data } from "./data";
import "./style_con_gest_cleint.css";
import { useNavigate } from "react-router-dom";



export default function Con_gestion_client() {

    // =========================
    // ETATS
    // =========================

    const [filtreEtat, setFiltreEtat] = useState("tous");

    const [currentPage, setCurrentPage] = useState(1);

    const [opendeploque, setOpenDeploque] = useState(false);

    const [openbloquer, setOpenbloquer] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const itemsPerPage = 10;

    const naigate = useNavigate();



    // =========================
    // FILTRAGE
    // =========================

    const filteredData = useMemo(() => {
        if (filtreEtat === "tous") {
            return data;
        }

        return data.filter(
            (item) => item.statut === filtreEtat
        );

    }, [filtreEtat]);



    // =========================
    // PAGINATION
    // =========================

    const totalPages = Math.ceil(
        filteredData.length / itemsPerPage
    );



    const indexLastItem = currentPage * itemsPerPage;

    const indexFirstItem = indexLastItem - itemsPerPage;



    const currentItems = filteredData.slice(
        indexFirstItem,
        indexLastItem
    );



    // =========================
    // FILTRE
    // =========================

    const handleFilterChange = (statut) => {
        setFiltreEtat(statut);
        setCurrentPage(1);
    };



    // =========================
    // OUVERTURE MODAL
    // =========================

    const openModal = (user) => {
        if (user.statut === "bloqué") {
            setSelectedUser(user);
            setOpenbloquer(true);
            return;
        }else if (user.statut === "débloqué") {
            setSelectedUser(user);
            setOpenDeploque(true);
            return;
        }
        

    };


    // =========================
    // detail client
    // =========================

    const handleViewDetail = (id) => {    
        naigate(`/admin/users/${id}`);
    }



    return (

        <div className="con_gestion_client">
            <div className="entete_filtre">

                <div className="filtre_etat">
                    Statut : {" "} 
                    <button className={ filtreEtat === "tous" ? "active" : "" } onClick={() => handleFilterChange("tous")}                   >
                        Tous
                    </button>
                    <button className={ filtreEtat === "débloqué" ? "active" : "" } onClick={() => handleFilterChange("débloqué") }>
                        Débloqués
                    </button>
                    <button className={ filtreEtat === "bloqué" ? "active" : "" } onClick={() => handleFilterChange("bloqué")}>
                        Bloqués
                    </button>
                </div>


                <div className="filtre_date">
                    <label>
                        Filtrer par date du :
                    </label>
                    <input type="date" />

                    <label> au : </label>
                    <input type="date" />
                </div>
            </div>



            {/* ========================= */}
            {/* TABLE */}
            {/* ========================= */}

            <div className="table_wrapper">

                <table className="list_client">
                    <thead>
                        <tr>
                            <th>NOM COMPLET</th>
                            <th>EMAIL</th>
                            <th>STATUT</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((user) => (
                                <tr key={user.id} onClick={() => handleViewDetail(user.id)}>
                                    <td>
                                        <div className="info_nom">
                                            <label style={{ backgroundColor: Couleur_Nom_Icon( user.email ?.charAt(0) .toUpperCase() || "" ) }} >
                                                {user.email ?.charAt(0) .toUpperCase() || ""}
                                            </label>

                                            <h3>
                                                {user.nom}
                                            </h3>
                                        </div>
                                    </td>

                                    <td>
                                        {user.email}
                                    </td>

                                    <td style={{ color: Statut_client( user.statut  ) }} >
                                        {user.statut}
                                    </td>

                                    <td>
                                        <button className="action"
                                            style={{ borderColor: Action_client(user.statut).couleur, backgroundColor: Action_client(user.statut).background }} 
                                                onClick={() => openModal(user) }>
                                            {Action_client(user.statut).action}
                                        </button>
                                    </td>

                                </tr>
                            ))

                        ) : (
                            <tr>
                                <td colSpan="4">
                                    Aucun client trouvé
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>



            {/* ========================= */}
            {/* PAGINATION */}
            {/* ========================= */}

            <div className="pagination">

                <button
                    disabled={currentPage === 1}
                    onClick={() =>
                        setCurrentPage(currentPage - 1)
                    }
                >
                    ⬅
                </button>



                {Array.from(
                    { length: totalPages },
                    (_, i) => i + 1
                ).map((page) => (

                    <button
                        key={page}

                        className={
                            currentPage === page
                                ? "active"
                                : ""
                        }

                        onClick={() =>
                            setCurrentPage(page)
                        }
                    >

                        {page}

                    </button>

                ))}



                <button
                    disabled={
                        currentPage === totalPages ||
                        totalPages === 0
                    }

                    onClick={() =>
                        setCurrentPage(currentPage + 1)
                    }
                >
                    ➡
                </button>

            </div>



            {/* ========================= */}
            {/* MODAL */}
            {/* ========================= */}

            {opendeploque && selectedUser && (
                <div className="overlay" onClick={() => setOpenDeploque(false)}>

                    <div className="modal" onClick={(e) => e.stopPropagation() }>
                        <div className="titre_bloq_client">
                            <div className="circleoff">
                                <CircleOff size={24}/>
                            </div>
                            <h1>Bloquer le Client ?</h1>
                        </div>

                        <h1>{selectedUser.nom}</h1>
                        <h2> Statut : {" "} {selectedUser.statut} </h2>
                        
                        <p>Êtes-vous sûr de vouloir bloquer ce client ? Cette action restreindra instantanément ses accès sur l'ensemble du réseau de VOLTA NETWORK SERVICES</p>

                        <div className="critique_impact">
                            <h3><OctagonMinus/> <span>IMPACT CRITIQUE</span></h3>
                            <p>Tous les noeuds de la communication actif seront terminée de force</p>
                        </div>

                        <div className="action_bloq">
                            <button onClick={() => setOpenDeploque(false)}>Annuler</button>
                            <button>Confirmer le blocage</button>
                        </div>
                        
                    </div>

                </div>

            )}

            {openbloquer && selectedUser && (
                <div className="overlay" onClick={() => setOpenbloquer(false)}>
                    <div className="modalbloq" onClick={(e) => e.stopPropagation() }>
                        <div className="titre_debloq_client">
                            <div className="circleon">
                                <CircleOff size={24}/>
                            </div>
                            <h1>Débloquer le Client ?</h1>
                        </div>

                        <h1>{selectedUser.nom}</h1>
                        <h2> Statut : {" "} {selectedUser.statut} </h2>
                        
                        <p>Êtes-vous sûr de vouloir débloquer ce client ? Cette action permettra de rétablir ses accès sur l'ensemble du réseau de VOLTA NETWORK SERVICES</p>

                        <div className="critique_impact_on">
                            <h3><OctagonMinus/> <span>IMPACT CRITIQUE</span></h3>
                            <p>Tous les noeuds de la communication inactif seront rétablis de force</p>
                        </div>

                        <div className="action_debloq">
                            <button onClick={() => setOpenbloquer(false)}>Annuler</button>
                            <button>Confirmer le déblocage</button>
                        </div>
                        
                    </div>
                </div>

            )}
            
        </div>

    );

}