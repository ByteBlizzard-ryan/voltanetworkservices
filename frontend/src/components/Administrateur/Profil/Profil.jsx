import React, {useState} from "react";
import "./style_profil.css";
import { Couleur_Nom_Icon } from "./function";
import {UserCog, KeyIcon, LogOut, PencilLine, Eye, EyeOff, ShieldCheck} from 'lucide-react';





 
export default function Profil() {

    const email="mouga@gmail.com";
    const nom= "Mouga";
    const password= "Azerty@46+c"
    const [paramProfil, setParamProfil]= useState('personnelle')
    const [eye, setEye]= useState(false)


    return (
        
            <div className="profil">
                <h1>Mon Profil</h1>
                <p> Consultez et Gérez vos informations personnelles</p>

                <div className="con_profil">
                
                    <div className="bar_vertical_profil">
                        <div className="tete_parm_prof">
                            <label style={{backgroundColor:Couleur_Nom_Icon(email?.charAt(0).toUpperCase() || "")}}>
                                {email?.charAt(0).toUpperCase() || ""}
                            </label>
                            <div className="parm_prof">
                                <h1>Mon profil</h1>
                                <p>PARAMETRES DU COMPTE</p>
                            </div>
                        
                        </div>

                        <div className="option_parm_prof">
                            <button className={paramProfil === "personnelle"  ? "active" : ""} onClick={()=>setParamProfil('personnelle')}>
                                <UserCog/> <span>INFORMATION PERSONNELLE</span>
                            </button>
                            <button className={paramProfil === "modifier_pass"  ? "active" : ""} onClick={()=>setParamProfil('modifier_pass')}>
                                <KeyIcon/> <span>MODIFIER LE MOT DE PASSE</span>
                            </button>
                            <button>
                                <LogOut/> <span>DECONNEXION</span>
                            </button>
                        </div>

                    </div>

                    {paramProfil==='personnelle' && (
                        <div className="info_personnelle">
                            <div className="titre_info_perso">
                                <h1>INFORMATIONS PERSONNELLES</h1>
                                <hr />
                            </div>
                            <div className="con_info_perso">
                                <div className="nom_email">
                                    <div className="profil_nom">
                                       <p>NOM COMPLET</p>
                                        <h1>{nom}</h1> 
                                    </div>
                                    <div className="profil_email">
                                        <p>EMAIL</p>
                                        <h1>{email}</h1>
                                    </div>
                                </div>

                                <button><PencilLine size={15}/>MODIFIER</button>
                            </div>
                            
                        </div>
                    )}
                    {paramProfil ==='modifier_pass' && (
                        <div className="modifier_pass">
                            <div className="titre_modif_pass">
                                <h1>MODIFIER MOT DE PASSE</h1>
                                <hr /> 
                            </div>
                            <div className="con_modif_pass">
                                <p>MOT DE PASSE ACTUEL  <span onClick={()=>setEye(!eye)}>{eye ? (<Eye/>):(<EyeOff/>)}</span>  </p>
                                <input type={eye ? 'text' : 'password'} disabled={true} value={password}/>

                                <div className="new_password">
                                    <p>NOUVEAU MOT DE PASSE</p>
                                    <input type="text" />
                                </div>
                                
                                <div className="confi_new_password">
                                    <p>CONFIRMATION DU NOUVEAU MOT DE PASSE</p>
                                    <input type="text" />
                                </div>
                                
                                <button className="updapte_pass">
                                    <ShieldCheck/> METTRE A JOUR
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="pied_info_zone">
                    <label className=""></label>
                    <p>Session sécurisée par VOLTA NETWORK SERVICES</p>
                </div>


            </div>

    );
}
