import React, { useState } from "react";
import "./style_ajout_admin.css";
import { useNavigate } from "react-router-dom";
import {CornerUpLeft, Mail, User, LockKeyhole, RotateCcwKey, ShieldCog, UserPlus} from 'lucide-react'



export default function Ajout_Admin() {

    const naviguer= useNavigate()
    const [nom, setNom]= useState('')
    const [email, setEmail]= useState('')
    const [role, setRole]= useState('')
    const [password, setPassword]= useState('')
    const [confirmPassword, setConfirmPassword]= useState('')


    const retourner =()=>{
        naviguer('/admin/administrateur')
    }


    
    return(
        <div className="ajouter_admin">
            <div className="titre_ajout_admin">
                <p>GESTION DES ACCES</p>
                <button onClick={retourner}><CornerUpLeft/> RETOUR A LA LISTE</button>
            </div>

            <h1 className="titre">Nouveau Profil de Sécurité</h1>

            <p className="description_titre">
                Configurer les privilèges et les identifiants pour un nouvel administrateur du réseau. 
                Chaque profil est audité en temps réel par le noyau Sentinel.
            </p>

            <div className="con_ajout_admin">
                <label >
                    <p><User/> NOM COMPLET</p>
                    <input type="text" placeholder="jean paul" value={nom} onChange={(e) => setNom(e.target.value)} />
                </label>
                <label >
                    <p><Mail/> EMAIL PROFESIONNEL</p>
                    <input type="text" placeholder="jean@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label >
                    <p><ShieldCog/> ROLE & PRIVILEGES</p>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>

                        <option value="">Sélectionnez un rôle</option>
                        <option value="ADMIN">Administrateur</option>
                        <option value="USER">Utilisateur</option>
                    </select>
                </label>
                <label >
                    <p><LockKeyhole/> MOT DE PASSE</p>
                    <input type="text" placeholder="Seorfzn8s@tqT" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label >
                    <p><RotateCcwKey/> CONFIRMER MOT DE PASSE</p>
                    <input type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </label>

                <div className="validation">
                    <button className="annuler">
                        ANNULER
                    </button>
                    <button className="ajouter">
                        <UserPlus/> AJOUTER UN ADMINISTRATEUR
                    </button>
                </div>
            </div>

            

        </div>
    )
    
}