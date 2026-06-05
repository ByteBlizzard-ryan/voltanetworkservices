import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    
    // État du formulaire
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState('WHATSAPP'); // WHATSAPP ou FORMULAIRE (Mail)
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        whatsapp: '',
        telephone2: '',
        adresse: ''
    });

    // Sécurité : Si le panier est vide, on ne reste pas sur cette page
    useEffect(() => {
        if (cart.length === 0 && !loading) {
            navigate('/boutique');
        }
    }, [cart, navigate, loading]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFinalize = async () => {
        if (!formData.nom || !formData.telephone) {
            alert("Veuillez remplir au moins le nom et le téléphone.");
            return;
        }

        setLoading(true);
        const token = localStorage.getItem('token');
        
        const payload = {
            nom_destinataire: `${formData.prenom} ${formData.nom}`,
            email_contact: formData.email,
            telephone_contact: formData.whatsapp || formData.telephone,
            telephone_secondaire: formData.telephone2,
            adresse_livraison: formData.adresse,
            canal_commande: method,
            panier: cart
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/commandes', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success || response.ok) {
                if (method === 'WHATSAPP') {
                    // Logique WhatsApp actuelle
                }
                
                if (typeof clearCart === 'function') {
                    clearCart();
                }

                setTimeout(() => {
                    navigate('/success');
                }, 500);

            } else {
                if (response.status === 401) {
                    alert("Votre session a expiré. Veuillez vous reconnecter.");
                    navigate('/login');
                } else {
                    alert("Erreur lors de l'enregistrement : " + (result.message || "Erreur inconnue"));
                }
            }
        } catch (error) {
            console.error("Erreur réseau:", error);
            alert("Impossible de contacter le serveur.");
        } finally {
            setLoading(false);
        } 
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-900 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                {/* HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12"
                >
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">Finaliser la commande</h1>
                        <p className="text-slate-500 text-sm font-medium">Veuillez renseigner vos informations pour valider votre commande.</p>
                    </div>
                    <Link to="/panier" className="inline-flex items-center gap-2 bg-slate-200/60 hover:bg-slate-900 text-slate-700 hover:text-[#9ADE7B] px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-sm">
                        <ArrowLeft className="w-4 h-4" /> Retour au panier
                    </Link>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    
                    {/* FORMULAIRE (GAUCHE) */}
                    <div className="lg:col-span-2 space-y-12 bg-white rounded-xl p-6 md:p-8 border border-slate-100 shadow-sm">
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-[#9ADE7B] rounded-full shadow-sm shadow-[#9ADE7B]/50"></div>
                                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Informations de livraison</h2>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <InputGroup label="Nom" name="nom" value={formData.nom} onChange={handleInputChange} placeholder="Dupont" />
                                <InputGroup label="Prénom" name="prenom" value={formData.prenom} onChange={handleInputChange} placeholder="Jean" />
                                <InputGroup label="Numéro de téléphone" name="telephone" value={formData.telephone} onChange={handleInputChange} placeholder="+237 6..." />
                                <InputGroup label="Email" name="email" value={formData.email} onChange={handleInputChange} placeholder="jean@exemple.com" />
                                <InputGroup label="Numéro WhatsApp" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="+237 6..." />
                                <InputGroup label="Numéro Additionnel" name="telephone2" value={formData.telephone2} onChange={handleInputChange} placeholder="Facultatif" />
                                <div className="md:col-span-2">
                                    <InputGroup label="Adresse de livraison" name="adresse" value={formData.adresse} onChange={handleInputChange} placeholder="Quartier, Rue, Ville" />
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-[#9ADE7B] rounded-full shadow-sm shadow-[#9ADE7B]/50"></div>
                                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">Méthode de finalisation</h2>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                <button 
                                    onClick={() => setMethod('WHATSAPP')}
                                    className={`flex items-center gap-4 p-5 rounded-lg text-left transition-all border-2 ${
                                        method === 'WHATSAPP' 
                                            ? 'border-[#9ADE7B] bg-[#9ADE7B]/5' 
                                            : 'border-slate-100 hover:border-slate-200 bg-slate-50'
                                    }`}
                                >
                                    <div className="w-12 h-12 bg-[#9ADE7B]/15 rounded-lg flex items-center justify-center text-slate-900 shrink-0">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">Confirmer par WhatsApp</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mt-0.5">Réponse instantanée</p>
                                    </div>
                                </button>

                                <button 
                                    onClick={() => setMethod('FORMULAIRE')}
                                    className={`flex items-center gap-4 p-5 rounded-lg text-left transition-all border-2 ${
                                        method === 'FORMULAIRE' 
                                            ? 'border-[#9ADE7B] bg-[#9ADE7B]/5' 
                                            : 'border-slate-100 hover:border-slate-200 bg-slate-50'
                                    }`}
                                >
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-slate-400 border border-slate-200 shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">Confirmer par mail</p>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">Envoi automatique</p>
                                    </div>
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* RÉSUMÉ (DROITE) */}
                    <aside className="lg:sticky lg:top-24">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            className="bg-white rounded-xl p-8 shadow-xl shadow-slate-100/50 border border-slate-100"
                        >
                            <h3 className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-400 mb-8">Résumé de la commande</h3>
                            
                            <div className="space-y-5 mb-8 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <OrderItem 
                                        key={item.id_produit} 
                                        name={item.nom_produit} 
                                        category={item.sous_categorie?.nom_sous_categorie || "Matériel"} 
                                        price={`${(item.prix_unitaire_produit * item.quantity).toLocaleString()} FCFA`} 
                                        img={item.url_image_principale} 
                                    />
                                ))}
                            </div>

                            <div className="pt-6 border-t border-dashed border-slate-200 flex justify-between items-baseline mb-10">
                                <span className="text-xl font-bold tracking-tight text-slate-950">TOTAL</span>
                                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                                    {cartTotal.toLocaleString()} <span className="text-lg font-bold">FCFA</span>
                                </span>
                            </div>

                            <motion.button 
                                onClick={handleFinalize}
                                disabled={loading || cart.length === 0}
                                whileHover={!(loading || cart.length === 0) ? { scale: 1.01 } : {}}
                                whileTap={!(loading || cart.length === 0) ? { scale: 0.99 } : {}}
                                className="w-full bg-[#9ADE7B] hover:bg-slate-900 text-slate-900 hover:text-[#9ADE7B] font-extrabold py-5 rounded-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#9ADE7B]/10 uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Valider la commande"}
                                {!loading && <ArrowRight className="w-4 h-4" />}
                            </motion.button>
                        </motion.div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

// --- SOUS-COMPOSANTS INTERNES ---

const InputGroup = ({ label, name, value, onChange, placeholder }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">{label}</label>
        <input 
            type="text" 
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#9ADE7B]/50 focus:border-[#9ADE7B] outline-none transition-all placeholder:text-slate-300 text-slate-900"
        />
    </div>
);

const OrderItem = ({ name, category, price, img }) => (
    <div className="flex items-center justify-between gap-4 py-1">
        <div className="flex items-center gap-4 min-w-0">
            <img src={img} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-50 border border-slate-100 shrink-0" />
            <div className="min-w-0">
                <h4 className="font-bold text-xs text-slate-900 leading-tight truncate">{name}</h4>
                <span className="inline-block text-[9px] font-extrabold text-[#9ADE7B] uppercase tracking-wider mt-0.5">{category}</span>
            </div>
        </div>
        <span className="text-xs font-extrabold text-slate-900 shrink-0 whitespace-nowrap">{price}</span>
    </div>
);