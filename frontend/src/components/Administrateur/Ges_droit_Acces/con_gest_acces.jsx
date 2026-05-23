import React from "react";
import { useState } from "react";
import "./style_con_gest_acces.css";
import {data, savePermissions} from './data'
import {Couleur_Nom_Icon, Etat_acces} from './function'
import {ChevronDownCircle, ChevronUpCircle, ToggleLeft, ToggleRight} from 'lucide-react'




 
export default function Con_gest_acces() {

    const [ouvert, setOuvert]= useState({})
    const [accesData, setAccesData] = useState(data)
    

    const fonction_ouvert = (id) => {
        setOuvert((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const togglePermission = (id, permission) => {

        setAccesData((prev) =>
            prev.map((item) => {

                if (item.id === id) {

                    return {
                        ...item,
                        [permission]: !item[permission]
                    }

                }

                return item

            })
        )

    }




    return (
        
            <div className="cont_acces">
                { accesData.length > 0 ? (
                    accesData.map((acces)=>(
                        <div key={acces.id} className="info_acces">
                            <div className="info_acces_titre">
                                <div className="part1_titre_acces">
                                    <label style={{backgroundColor:Couleur_Nom_Icon(acces.nom?.charAt(0).toUpperCase() || "")}}>
                                        {acces.nom?.charAt(0).toUpperCase() || ""}
                                    </label>
                                    <div className="nom_role">
                                        <h1>{acces.nom}</h1>
                                        <p>{acces.role}</p>
                                    </div>
                                </div>

                                <div className="part2_titre_acces">
                                    <label style={{backgroundColor: Etat_acces(acces.etat).arriere, color:Etat_acces(acces.etat).couleur}}>
                                        {acces.etat}
                                    </label>
                                    <button onClick={() =>fonction_ouvert(acces.id)}>
                                        {ouvert[acces.id] ? (
                                            <ChevronUpCircle />
                                        ) : (
                                            <ChevronDownCircle />
                                        )}
                                    </button>
                                </div>
                                
                            </div>
                            {ouvert[acces.id] && (
                                <div className="info_acces_contenu_principal">

                                    <div className="info_acces_contenu">
                                        <div className="permission">
                                            <p>Dashboard</p>
                                            <button className={`btn_permi ${acces.dashboard ? "actif" : ""}`}
                                            onClick={() => togglePermission(acces.id, "dashboard")}
                                            >
                                                <div className="point_permi"></div>
                                            </button>
                                        </div>
                                        <div className="permission">
                                            <p>Gestion de clients</p>
                                            <button className={`btn_permi ${acces.clients ? "actif" : ""}`}
                                            onClick={() => togglePermission(acces.id, "clients")}
                                            >
                                                <div className="point_permi"></div>
                                            </button>
                                        </div>
                                        <div className="permission">
                                            <p>Gestion de produits</p>
                                            <button className={`btn_permi ${acces.produits ? "actif" : ""}`}
                                                onClick={() => togglePermission(acces.id, "produits")}
                                            >
                                                <div className="point_permi"></div>
                                            </button>
                                        </div>
                                        <div className="permission">
                                            <p>Gestion des commandes</p>
                                            <button className={`btn_permi ${acces.commandes ? "actif" : ""}`}
                                                onClick={() => togglePermission(acces.id, "commandes")}
                                            >
                                                <div className="point_permi"></div>
                                            </button>
                                        </div>
                                        <div className="permission">
                                            <p>Gestion des administrateurs</p>
                                            <button className={`btn_permi ${acces.administrateurs ? "actif" : ""}`}
                                                onClick={() => togglePermission(acces.id, "administrateurs")}
                                            >
                                                <div className="point_permi"></div>
                                            </button>
                                        </div>
                                    </div>

                                    <button className="btn_save" onClick={()=>savePermissions(acces)}>
                                        ENREGISTRER LES MODIFICATIONS
                                    </button>

                                </div>
                            )}
                        </div>
                    ))
                ):(
                    <p>Aucun Droit d'accès disponible</p>
                )
                }
                
            </div>

    );
}
