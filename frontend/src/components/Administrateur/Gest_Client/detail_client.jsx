import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {ArrowLeft, Calendar, Ban, Unlock, ExternalLink,} from "lucide-react";
import { client, orders} from "./data";
import "./style_detail_client.css";



// Mapping statut commande → classe CSS
const orderStatusClass = {
    PAYÉE: "client-order-badge--payee",
    "EN COURS": "client-order-badge--en-cours",
    ANNULÉE: "client-order-badge--annulee",
};




// Génère les initiales depuis prénom + nom
function getInitials(firstName, lastName) {
    const a = firstName?.[0] ?? "";
    const b = lastName?.[0] ?? "";
    return (a + b).toUpperCase();
}


export default function ClientDetail({ onBlock, onViewAll,}) {
    const [blocked, setBlocked] = useState(client.status === "BLOQUÉ");
    const navigate = useNavigate();

    function handleBlock() {
        const next = !blocked;
        setBlocked(next);
        onBlock?.({ ...client, status: next ? "BLOQUÉ" : "ACTIF" });
    }

    const statusClass = blocked ? "client-status-badge--bloque" : "client-status-badge--actif";
    const statusLabel = blocked ? "BLOQUÉ" : "ACTIF";
    const initials = getInitials(client.firstName, client.lastName);

    const handlereturn = () => {
        navigate("/admin/users");
    }

    return (
      <div className="client-detail-page">
        {/* ── Header ── */}
        <header className="client-detail-header">
          <div className="client-detail-header__left">
            <h1 className="client-detail-header__title">Détail client</h1>
            <span className="client-detail-header__protocol">
              <span className="client-detail-header__protocol-dot" />
              Live Security Protocol Active
            </span>
          </div>
          <button className="client-detail-header__back" onClick={handlereturn}>
            <ArrowLeft size={13} strokeWidth={2.5} />
            Retour à la liste
          </button>
        </header>

        {/* ── Top Grid ── */}
        <div className="client-top-grid">
          {/* Profile Card */}
          <div className="client-profile-card">
            <div className="client-profile-card__top">
              <div className="client-profile-card__identity">
                <div className="client-avatar">
                  {client.avatar ? (
                    <img src={client.avatar} alt={`${client.firstName} ${client.lastName}`} />
                  ) : (
                    initials
                  )}
                </div>
                <div>
                  <h2 className="client-profile-card__name">
                    {client.firstName} {client.lastName}
                  </h2>
                  <p className="client-profile-card__date">
                    <Calendar size={12} strokeWidth={2} />
                    Inscrit le {client.registeredAt}
                  </p>
                </div>
              </div>
              <span className={`client-status-badge ${statusClass}`}>
                <span className="client-status-badge__dot" />
                {statusLabel}
              </span>
            </div>

            <div className="client-email-row">
              <span className="client-email-row__label">Adresse email</span>
              <span className="client-email-row__value">{client.email}</span>
            </div>
          </div>

          {/* Security Panel */}
          <div className="client-security-panel">
            <h3 className="client-security-panel__title">Actions de sécurité</h3>
            <p className="client-security-panel__desc">
              Gérez les accès de ce client à l'infrastructure VOLTANETWORK. Les changements de statut sont audités en temps réel.
            </p>
            <button
              className={`client-security-panel__btn ${
                blocked
                  ? "client-security-panel__btn--unblock"
                  : "client-security-panel__btn--block"
              }`}
              onClick={handleBlock}
            >
              {blocked ? (
                <>
                  <Unlock size={15} strokeWidth={2.5} />
                  Débloquer le client
                </>
                
              ) : (
                <>
                  <Ban size={15} strokeWidth={2.5} />
                  Bloquer le client
                </>
                
              )}
            </button>
          </div>
        </div>

        {/* ── Order History ── */}
        <div className="client-orders">
          <div className="client-orders__header">
            <h3 className="client-orders__title">Historique des commandes</h3>
            <button className="client-orders__view-all" onClick={onViewAll}>
              Voir tout l'historique
              <ExternalLink size={11} strokeWidth={2.5} />
            </button>
          </div>

          <table className="client-orders__table">
            <thead>
              <tr>
                <th>ID COMMANDE</th>
                <th>Date</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span className="client-order-id">{order.id}</span>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <span className="client-order-amount">{order.amount}</span>
                  </td>
                  <td>
                    <span
                      className={`client-order-badge ${
                        orderStatusClass[order.status] ?? "client-order-badge--en-cours"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}
