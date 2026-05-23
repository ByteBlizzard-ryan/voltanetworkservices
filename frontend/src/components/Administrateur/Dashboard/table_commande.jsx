import React from "react";
import "./style_table_com.css"
import {Couleur_Nom_Icon, Etat_commande} from "./function"



export default function Table_commande() {

    const data = [
        { id: 1, client: "Alice", date: "2023-01-01", montant: 1000, statut: "En cours", email: "alice@gmail.com" },
        { id: 2, client: "Bob", date: "2023-01-02", montant: 1500, statut: "Payé", email: "bob@gmail.com" },
        { id: 3, client: "Charlie", date: "2023-01-03", montant: 2000, statut: "Annulée", email: "charlie@gmail.com" },
    ];
/*
    const data=[]
*/
    return (
        <div className="con_table_commande">
            
            <div className="table_commande">
                <h2 >Dernières Commandes</h2>

                <div className="table_wrapper">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>CLIENT</th>
                                <th>DATE</th>
                                <th>MONTANT (CFA)</th>
                                <th>STATUT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="info_perso">
                                            <label style={{backgroundColor:Couleur_Nom_Icon(user.email?.charAt(0).toUpperCase() || "")}}>
                                                {user.email?.charAt(0).toUpperCase() || ""}
                                            </label>
                                            <div className="info_perso_tab">
                                                <h3>
                                                    {user.client}
                                                </h3>
                                                <p>
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.date}</td>
                                    <td>{user.montant}</td>
                                    <td>
                                        <label className="statut_tab_com" style={{ backgroundColor: Etat_commande(user.statut) }}>
                                            {user.statut}
                                        </label>
                                    </td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                                        Aucune commande résente trouvée.
                                    </td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                </div>  
                
            </div>
        </div>
    );
}


