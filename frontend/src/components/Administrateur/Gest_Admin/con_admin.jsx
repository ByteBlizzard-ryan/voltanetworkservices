import React, {useState, useMemo} from "react";
import {useNavigate} from 'react-router-dom'
import {Couleur_Nom_Icon, Statut_admin, Action_admin} from "./function";
import "./style_con_admin.css"
import {data} from "./data"




export default function Con_gestion_admin() {

    const naviguer= useNavigate()
    
    

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

    const handleAjout = ()=>{
        naviguer('/admin/administrateur/ajouter_admin')
    }

    const handleDetail = (admin)=>{
        naviguer(`/admin/administrateur/${admin.id}`)
    }


    return (
        <div className="con_gestion_admin">

            <div className="ajout_admin">
                <button onClick={handleAjout}>+ AJOUTER UN ADMINISTRATEUR</button>
            </div>


            <div className="entete_filtre">
                <div className="filtre_etat">
                    <button className={filtreEtat === "tous"  ? "active" : ""}
                         onClick={() => handleFilterChange("tous")}>
                        Tous
                    </button>
                    <button className={filtreEtat=== "actif"  ? "active" : ""}
                         onClick={() => handleFilterChange("actif")}>
                        Actifs
                    </button>
                    <button className={filtreEtat=== "inactif"  ? "active" : ""}
                         onClick={() => handleFilterChange("inactif")}>
                        Inactifs
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
                <table className="list_admin">
                    <thead>
                        <tr>
                            <th>NOM DU CLIENT</th>
                            <th>EMAIL</th>
                            <th>ROLE</th>
                            <th>STATUT </th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((admin) => (
                                <tr key={admin.id} onClick={()=>{handleDetail(admin)}}>
                                    <td>
                                        <div className="info_nom">
                                            <label style={{backgroundColor:Couleur_Nom_Icon(admin.email?.charAt(0).toUpperCase() || "")}}>
                                                {admin.email?.charAt(0).toUpperCase() || ""}
                                            </label>
                                            <h3>
                                                {admin.nom}
                                            </h3>      
                                        </div>
                                    </td>
                                    <td>{admin.role}</td>
                                    <td>{admin.email}</td>
                                    <td style={{ color: Statut_admin(admin.statut) }}>
                                        {admin.statut}
                                    </td>
                                    <td>
                                        <button style={{ color: Action_admin(admin.statut).couleur }}>
                                            {Action_admin(admin.statut).action}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ): (
                            <tr>
                                <td colSpan="3">Aucun administrateur de trouvé</td>
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