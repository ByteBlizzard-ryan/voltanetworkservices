import React, {useState} from "react";
import "./style_graphe.css";
import CourbeVentes from "./courbe";
import JaugeProduits from "./circulaire";


export default function Graphe() {
    const [filtre, setFiltre] = useState("jour");

    const jauge = [
        { name: "Produit A", value: 400 },
        { name: "Produit B", value: 300 },
        { name: "Produit C", value: 300 },
        { name: "Produit D", value: 200 },
        { name: "Produit E", value: 300 },
        { name: "Produit F", value: 200 }
    ];

    const data = [
        { id: "1",  date: "14/04/2026 08:12", vente: 90 },
        { id: "2",  date: "14/04/2026 09:05", vente: 150 },
        { id: "3",  date: "14/04/2026 10:23", vente: 120 },
        { id: "4",  date: "14/04/2026 10:47", vente: 200 },
        { id: "5",  date: "14/04/2026 11:10", vente: 300 },
        { id: "6",  date: "14/04/2026 11:55", vente: 180 },
        { id: "7",  date: "14/04/2026 12:30", vente: 250 },
        { id: "8",  date: "14/04/2026 13:15", vente: 320 },
        { id: "9",  date: "14/04/2026 14:02", vente: 210 },
        { id: "10", date: "14/04/2026 15:20", vente: 400 },
        { id: "11", date: "14/04/2026 16:05", vente: 350 },
        { id: "12", date: "14/04/2026 17:40", vente: 280 },
        { id: "13", date: "14/04/2026 18:10", vente: 500 },
        { id: "14", date: "14/04/2026 19:25", vente: 420 },
        { id: "15", date: "14/04/2026 20:50", vente: 370 },
        { id: "16", date: "15/05/2026 18:10", vente: 500 },
        { id: "17", date: "14/06/2026 19:25", vente: 420 },
        { id: "18", date: "14/07/2026 20:50", vente: 370 }
    ];


    return(
        <div className="graphe">
            

            <div className="courbe">
                <div className="entete_courbe">
                    <h2>Evolution des ventes</h2>
                    <label className="label_direct"> Direct Live</label>
                </div>
                
                <div className="chart_filters">
                    <button className={filtre === "jour"  ? "active" : ""} onClick={() => setFiltre("jour")}>
                        Aujourd’hui
                    </button>
                    <button className={filtre === "semaine"  ? "active" : ""}  onClick={() => setFiltre("semaine")}>
                        Semaine
                    </button>
                    <button className={filtre === "mois"  ? "active" : ""} onClick={() => setFiltre("mois")}>
                        Mois
                    </button>
                    <button className={filtre === "annee"  ? "active" : ""} onClick={() => setFiltre("annee")}>
                        Année
                    </button>
                </div>
                <CourbeVentes data={data} filtre={filtre}/>

            </div>

            <div className="barres">
                <JaugeProduits data={jauge}/>
            </div>
        
        </div>
    );
}




