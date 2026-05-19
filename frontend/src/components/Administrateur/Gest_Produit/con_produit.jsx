import React, {useState, useMemo} from "react";
import { useNavigate } from "react-router-dom";
import {ToggleLeft, ToggleRight} from "lucide-react"
import {Couleur_Nom_Icon, Etat_produit, Action_produit} from "./function";
import {data} from "./data"
import "./style_con_gest_produit.css"



export default function Con_gestion_produit() {

    const navigate = useNavigate();
    

    // 📌 États
    const [filtreEtat, setFiltreEtat] = useState("tous");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    

    // 📌 Filtrage
    const filteredData = useMemo(() => {
        if (filtreEtat === "tous") return data;
        return data.filter(item => item.etat === filtreEtat);
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


    const detailProduit = (id) => {
        navigate(`/admin/detail_produits/${id}`);
    }


    function statut_produit (id) {
        console.log("Changer état du produit ID:", id);
        //fonction qui modifie l'etat de produit disponible ou indisponible
    };


    return (
        <div className="con_gestion_produit">
            <div className="entete_filtre">
                <div className="filtre_etat">
                    <button className={filtreEtat === "tous"  ? "active" : ""}
                         onClick={() => handleFilterChange("tous")}>
                        Tous
                    </button>
                    <button className={filtreEtat=== "disponible"  ? "active" : ""}
                         onClick={() => handleFilterChange("disponible")}>
                        Disponible
                    </button>
                    <button className={filtreEtat=== "indisponible"  ? "active" : ""}
                         onClick={() => handleFilterChange("indisponible")}>
                        Indisponible
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
                <table className="list_produit">
                    <thead>
                        <tr>
                            <th>APERCU</th>
                            <th>DESIGNATION DU PRODUIT</th>
                            <th>CATEGORIE </th>
                            <th>PRIX UNITAIRE(CFA)</th>
                            <th>ETAT</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((produit) => (
                                <tr key={produit.id}>
                                    <td>
                                        <img src={produit.image} alt="Aperçu" className="apercu"/>
                                    </td>
                                    <td onClick={()=>detailProduit(produit.id)} className="designation">
                                        <div className="design_produit">
                                            <h3> {produit.nom}</h3>
                                            <p>{produit.designation}</p>
                                        </div>
                                    </td>
                                    <td >
                                        <label className="categorie" >{produit.categorie}</label>
                                    </td>
                                    <td className="prix">
                                    {produit.prix}
                                    </td>
                                    <td>
                                        <label className="etat" style={{border:`1px solid ${Etat_produit(produit.etat).bordure}`, background:Etat_produit(produit.etat).couleur }}>
                                            {produit.etat}
                                        </label>
                                    </td>
                                    <td>
                                        <button className={`action ${Action_produit(produit.etat) ? "on": "off"}`}
                                            onClick={()=>statut_produit(produit.id)}
                                        >
                                            {Action_produit(produit.etat) ? (
                                                <ToggleLeft  />
                                            ):(
                                                <ToggleRight />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ): (
                            <tr>
                                <td colSpan="3">Aucun produit trouvé</td>
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