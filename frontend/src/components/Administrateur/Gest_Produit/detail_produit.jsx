import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  ArrowLeft,ShieldCheck, Lock, CheckCircle2, Package, Video,} from "lucide-react";
import { product } from "./data";
import "./style_detail_produit.css";



// Icône par badge type
const badgeIconMap = {
  shield: <ShieldCheck size={13} strokeWidth={2.5} className="product-badge__icon" />,
  lock: <Lock size={13} strokeWidth={2.5} className="product-badge__icon" />,
};

// Placeholder thumbnails par index
const thumbIcons = [
    <Package size={22} />,
    <Package size={22} />,
    <Package size={22} />,
    <Video size={22} />,
];




export default function ProductDetail() {
    const [activeThumb, setActiveThumb] = useState(0);
    const navigate = useNavigate();


    const retourListe = () => {
        navigate("/admin/products");
    }



    return (
        <div className="product-detail-page">
            {/* ── Header ── */}
            <header className="product-detail-header">
                <div className="product-detail-header__left">
                    <h1 className="product-detail-header__title">Détail produit</h1>
                    <span className="product-detail-header__protocol">
                        <span className="product-detail-header__protocol-dot" />
                        Live Security Protocol Active
                    </span>
                </div>
                <button className="product-detail-header__back" onClick={() => retourListe()}>
                    <ArrowLeft size={13} strokeWidth={2.5} />
                    Retour à la liste
                </button>
            </header>

            {/* ── Body ── */}
            <div className="product-detail-body">
                {/* Gallery */}
                <div className="product-gallery">
                    <div className="product-gallery__main">
                        {product.gallery[activeThumb]?.src ? (
                            <img
                                src={product.gallery[activeThumb].src}
                                alt={product.gallery[activeThumb].alt}
                            />
                        ) : (
                            <div className="product-gallery__main-placeholder">
                                <Package size={64} strokeWidth={1} />
                            </div>
                        )}
                    </div>

                    <div className="product-gallery__thumbnails">
                        {product.gallery.map((thumb, idx) => (
                            <button
                                key={thumb.id}
                                className={`product-gallery__thumb${
                                idx === activeThumb ? " product-gallery__thumb--active" : ""
                                }`}
                                onClick={() => setActiveThumb(idx)}
                                aria-label={thumb.alt}
                            >
                                {thumb.src ? (
                                    <img src={thumb.src} alt={thumb.alt} />
                                ) : (
                                    thumbIcons[idx] ?? <Package size={22} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="product-info">
                    <div className="product-info__breadcrumb">
                        <span className="product-info__breadcrumb-dot" />
                        {product.category}
                        {product.subcategory && (
                        <>
                            <span>/</span>
                            <span>{product.subcategory}</span>
                        </>
                        )}
                    </div>

                    <h2 className="product-info__name">{product.name}</h2>
                    <p className="product-info__price">{product.price}</p>

                    <div className="product-info__descriptions">
                        {product.shortDescriptions.map((desc, i) => (
                            <p key={i} className="product-info__desc">{desc}</p>
                        ))}
                    </div>

                    <div className="product-info__badges">
                        {product.badges.map((badge, i) => (
                        <span key={i} className="product-badge">
                            {badgeIconMap[badge.icon] ?? (
                                <ShieldCheck size={13} strokeWidth={2.5} className="product-badge__icon" />
                            )}
                            {badge.label}
                        </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── About ── */}
            <div className="product-about">
                <div className="product-about__header">
                    <h3 className="product-about__title">À propos du produit</h3>
                    <div className="product-about__line" />
                </div>
                <div className="product-about__content">
                    <p className="product-about__body">{product.about.body}</p>
                    <ul className="product-about__features">
                        {product.about.features.map((feat, i) => (
                            <li key={i} className="product-about__feature">
                                <CheckCircle2
                                    size={15}
                                    strokeWidth={2.5}
                                    className="product-about__feature-icon"
                                />
                                {feat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
