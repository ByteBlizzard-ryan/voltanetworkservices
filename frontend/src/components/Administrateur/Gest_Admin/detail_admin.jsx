import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {ArrowLeft, User,CheckCircle2, Ban, Unlock,} from "lucide-react";
import { admin} from "./data";
import "./style_detail_admin.css";



export default function AdminDetail({ onBlock,}) {
    const [blocked, setBlocked] = useState(admin.status === "BLOQUÉ");
    const navigate = useNavigate();
    const {id_admin} = useParams();

    //appel de fonction de mise à jour du statut de l'admin
    function handleBlock() {
        const next = !blocked;
        setBlocked(next);
        onBlock?.({ ...admin, status: next ? "BLOQUÉ" : "ACTIF" });
    }


    const handlereturn = ()=>{
        navigate('/admin/administrateur')
    }





    const statusClass = blocked ? "admin-status-badge--bloque" : "admin-status-badge--actif";
    const statusLabel = blocked ? "BLOQUÉ" : "ACTIF";

    return (
        <div className="admin-detail-page">
            {/* ── Header ── */}
            <header className="admin-detail-header">
                <div className="admin-detail-header__left">
                    <h1 className="admin-detail-header__title">Détail administrateur</h1>
                    <span className="admin-detail-header__protocol">
                        <span className="admin-detail-header__protocol-dot" />
                        Live Security Protocol Active
                    </span>
                </div>
                <button className="admin-detail-header__back" onClick={handlereturn}>
                    <ArrowLeft size={13} strokeWidth={2.5} />
                    Retour à la liste
                </button>
            </header>

            {/* ── Body ── */}
            <div className="admin-detail-body">
                {/* Profile Card */}
                <div className="admin-profile-card">
                    <div className="admin-profile-card__top">
                        <div className="admin-profile-card__avatar">
                            {admin.avatar ? (
                                <img src={admin.avatar} alt={admin.name} />
                            ) : (
                                <User size={32} className="admin-profile-card__avatar-icon" />
                            )}
                            <span className="admin-profile-card__verified">
                                <CheckCircle2 size={12} color="#fff" strokeWidth={3} />
                            </span>
                        </div>
                        <div>
                            <h2 className="admin-profile-card__name">{admin.name}</h2>
                            <p className="admin-profile-card__id">ID: {id_admin}</p>
                        </div>
                    </div>

                    <div className="admin-profile-card__fields">
                        <div className="admin-field">
                            <span className="admin-field__label">Email</span>
                            <span className="admin-field__value">{admin.email}</span>
                        </div>
                        <div className="admin-field">
                            <span className="admin-field__label">Rôle</span>
                            <span className="admin-field__value">{admin.role}</span>
                        </div>
                        <div className="admin-field">
                            <span className="admin-field__label">Statut</span>
                            <span className={`admin-status-badge ${statusClass}`}>
                                <span className="admin-status-badge__dot" />
                                {statusLabel}
                            </span>
                        </div>
                        <div className="admin-field">
                            <span className="admin-field__label">Date de création</span>
                            <span className="admin-field__value">{admin.createdAt}</span>
                        </div>
                    </div>
                </div>

                {/* Security Panel */}
                <div className="admin-security-panel">
                    <h3 className="admin-security-panel__title">Actions de sécurité</h3>
                    <p className="admin-security-panel__desc">
                        Gérez les accès des administrateurs à l'infrastructure VOLTANETWORK. Les changements de statut sont audités en temps réel.
                    </p>
                    <button
                        className={`admin-security-panel__btn ${ blocked
                            ? "admin-security-panel__btn--unblock"
                            : "admin-security-panel__btn--block"
                        }`}
                        onClick={handleBlock}
                    >
                        {blocked ? (
                            <>
                                <Unlock size={15} strokeWidth={2.5} />
                                Débloquer l'administrateur
                            </>
                        
                        ) : (
                            <>
                                <Ban size={15} strokeWidth={2.5} />
                                Bloquer l'administrateur
                            </>
                        
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}