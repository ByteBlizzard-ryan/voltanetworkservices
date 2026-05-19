import React from "react";
import {UserPlus, FileChartColumn, ArrowUpRight, ArrowDownRight, Banknote, ShoppingBag } from "lucide-react"
import "./style_recap_tete.css";


export default function Recap_tete (){


    return(
        <div className="recap_tete">
            <section className="recap_tete_section">
                <div className="recap_tete_section_icon">
                    <ShoppingBag size={25} className="ShoppingBag" />
                    <div>
                        <ArrowUpRight size={20} />
                        <p className="recap_tete_taux">+10%</p>
                    </div>
                </div>
                <p>COMMANDES</p>
                <h1>1,284</h1>
            </section>
            <section className="recap_tete_section">
                <div className="recap_tete_section_icon">
                    <Banknote size={25} className="Banknote" />
                    <div>
                        <ArrowUpRight size={20} />
                        <p className="recap_tete_taux">+10%</p>
                    </div>
                </div>
                <p>CHIFFRE D'AFFAIRES</p>
                <h1>1,284</h1>
            </section>
            <section className="recap_tete_section">
                <div className="recap_tete_section_icon">
                    <UserPlus size={25} className="UserPlus" />
                    <div>
                        <ArrowUpRight size={20} />
                        <p className="recap_tete_taux">+10%</p>
                    </div>
                </div>
                <p>CLIENTS</p>
                <h1>1,284</h1>
            </section>
            <section className="recap_tete_section">
                <div className="recap_tete_section_icon">
                    <FileChartColumn size={25} className="FileChartColumn" />
                    <div>
                        <ArrowUpRight size={20} />
                        <p className="recap_tete_taux">+10%</p>
                    </div>
                </div>
                <p>PRODUITS</p>
                <h1>1,284</h1>
            </section>
        </div>
    );
}