import React, { useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {ArrowLeft, CheckCircle} from "lucide-react"
import {detaildata} from './data'
import "./style_detail_com.css";



export default function Detail_com() {

    const { id_commande } = useParams(); 
    const naviguer = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // pagination simple
    const totalPages = Math.ceil(
        detaildata.length / itemsPerPage
    );

    const indexLastItem =
        currentPage * itemsPerPage;

    const indexFirstItem =
        indexLastItem - itemsPerPage;

    const currentItems = detaildata.slice(
        indexFirstItem,
        indexLastItem
    );


    const retourCommande = () => {
        // Rediriger vers la page de détail de la commande
        naviguer("/admin/commande");
    }




    return (
        <div className="detail_commande">
            <div className="titre_detail_com">
                <h1>Détail de la commande {id_commande}</h1>
                <button className="retour_list_commande" onClick={retourCommande}>
                    <ArrowLeft size={16} />
                    Retour à la liste
                </button>
            </div>

            <div className="info_recap_com">
                <div className="recap_client">
                    <div className="recap_client_nom">
                        <p>Client</p>
                        <h1>John Doe</h1>
                        <p>john.doe@example.com</p>
                        
                    </div>
                    <div className="recap_client_date">
                        <p>Date de commande</p>
                        <h1>2023-10-15</h1>
                    </div>
                    <div className="recap_client_statut">
                        <p>STATUS ACTUEL</p>
                        <label>  <CheckCircle size={14}/> En cours</label>
                    </div>
                </div>

                <div className="recap_prix_com">
                    <p>TOTAL GENERAL</p>
                    <h1>150.000</h1>
                    <button>
                        GENERER LA FACTURE PDF
                    </button>
                </div>
            </div>


            <div className="modif_statut_com">
                <div className="titre_mod_st_com">
                    <h2>Modifier le statut</h2>
                    <p>Cette action mettra à jour l'inventaire et notifiera le client instantanément</p>
                </div>

                <button className="action_modifier_cour">En cours</button>
                <button className="action_modifier_payee">Payée</button>
                <button className="action_modifier_annulee">Annulée</button>
            </div>

            <div className="table_wrapper">
                <table className="list_commande">
                    <thead>
                        <tr>
                            <th>PRODUIT</th>
                            <th>QUANTITE</th>
                            <th>PRIX UNITAIRE </th>
                            <th>SOUS TOTAL (CFA)</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((commande) => (
                                <tr key={commande.id} >
                                    <td className="detail_nom_commande">
                                        <img src="" alt="logo_produit" className="logo_produit" />
                                        <div className="nom_categorie">
                                            <h1>{commande.nom}</h1>
                                            <p>{commande.categorie}</p>
                                        </div>
                                    </td>
                                    <td className="detail_quantite">
                                        <p>{commande.quantite}</p>
                                    </td>
                                    <td className="detail_prix">
                                        <p>{commande.prix}</p>
                                    </td>
                                    <td className="detail_sous_total">
                                        <p>{commande.sousTotal}</p>
                                    </td>
                                    
                                </tr>
                            ))
                        ): (
                            <tr>
                                <td colSpan="3">Aucun détail de commande trouvé</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="pagination">

                {/* PRECEDENT */}
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    ⬅
                </button>

                {/* NUMEROS */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button key={page} className={currentPage === page ? "active" : ""} onClick={() => setCurrentPage(page)}>
                        {page}
                    </button>
                ))}

                {/* SUIVANT */}
                <button disabled={ currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(currentPage + 1)}>
                    ➡
                </button>
            </div>

        </div>
    );
}