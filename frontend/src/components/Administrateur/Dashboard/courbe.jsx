import React, { useMemo } from "react";
import {
    AreaChart, Area, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid
} from "recharts";
import "./style_graphe.css";



export default function CourbeVentes({ data = [] , filtre = "jour"}) {

    
    const parseDate = (str) => {
        const [datePart, timePart] = str.split(" ");
        const [jour, mois, an] = datePart.split("/");
        const [heure] = timePart.split(":");

        return {
            jour: parseInt(jour),
            mois: parseInt(mois),
            an: parseInt(an),
            heure: parseInt(heure)
        };
    };

    
    const formattedData = useMemo(() => {

        let result = {};

        data.forEach(item => {
            const d = parseDate(item.date);
            const vente = Number(item.vente);

            let key;

            if (filtre === "jour") {
                key = `${d.heure}h`;
            }

            if (filtre === "semaine") {
                const jours = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
                const jsDate = new Date(d.an, d.mois - 1, d.jour);
                key = jours[jsDate.getDay()];
            }

            if (filtre === "mois") {
                key = `${d.jour}`;
            }

            if (filtre === "annee") {
                const moisLabels = ["Jan", "Fév", "Mars", "Avr", "Mai", "Jun",
                                    "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
                key = moisLabels[d.mois - 1];
            }

            if (!result[key]) result[key] = 0;
            result[key] += vente;
        });

        // 🔥 Transformer en tableau + trier
        return Object.keys(result).map(key => ({
            label: key,
            ventes: result[key]
        }));

    }, [data, filtre]);

    return (
        <div className="chart_container">

            {/* 🔹 CHART */}
            <div className="chart_box" style={{ width: "100%", height: 300 }}  >

                <ResponsiveContainer >
                    <AreaChart data={formattedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="ventes"
                            stroke="#4CAF50"        // ligne 
                            fill="#4CAF50b0"          // remplissage 
                            fillOpacity={0.3}       // transparence 
                            strokeWidth={3}
                        />
                    </AreaChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
}