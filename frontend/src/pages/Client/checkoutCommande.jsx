import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Checkout() {
    // On récupère clearCart pour vider le panier après la commande
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
        // Validation basique
        if (!formData.nom || !formData.telephone) {
            alert("Veuillez remplir au moins le nom et le téléphone.");
            return;
        }

        setLoading(true);
        
        // RÉCUPÉRATION DU TOKEN
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
                    // AJOUT DU TOKEN ICI
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success || response.ok) { // Vérification plus large du succès
                // ... reste de ta logique WhatsApp et clearCart ...
                if (method === 'WHATSAPP') {
                    // ... (ton code WhatsApp actuel)
                }
                
                if (typeof clearCart === 'function') {
                    clearCart();
                }

                setTimeout(() => {
                    navigate('/success');
                }, 500);

            } else {
                // Gestion spécifique si non autorisé
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
        <div className="min-h-screen bg-[#F6F7F9] pt-24 pb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                {/* HEADER */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end mb-12">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-bold tracking-tighter text-gray-900">Finaliser la commande</h1>
                        <p className="text-gray-500 text-sm">Veuillez renseigner vos informations pour valider votre commande.</p>
                    </div>
                    <Link to="/panier" className="hidden md:flex items-center gap-2 bg-gray-200/50 hover:bg-gray-200 text-gray-600 px-6 py-2 rounded-[0.5rem] text-xs font-bold transition-all">
                        <ArrowLeft className="w-3 h-3" /> Retour au panier
                    </Link>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12">
                    
                    {/* FORMULAIRE */}
                    <div className="lg:col-span-2 space-y-12">
                        <section className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-[#9ADE7B] rounded-full"></div>
                                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Informations de livraison</h2>
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

                        <section className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-[#9ADE7B] rounded-full"></div>
                                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Méthode de finalisation</h2>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                <button 
                                    onClick={() => setMethod('WHATSAPP')}
                                    className={`flex items-center gap-4 p-6 rounded-[0.5rem] shadow-sm text-left transition-all border-2 ${method === 'WHATSAPP' ? 'border-[#9ADE7B] bg-white' : 'border-transparent bg-gray-100/50'}`}
                                >
                                    <div className="w-12 h-12 bg-[#9ADE7B]/10 rounded-[0.5rem] flex items-center justify-center text-[#1A4301]">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Confirmer par WhatsApp</p>
                                        <p className="text-[10px] text-[#9ADE7B] uppercase tracking-wider font-bold">Réponse instantanée</p>
                                    </div>
                                </button>

                                <button 
                                    onClick={() => setMethod('FORMULAIRE')}
                                    className={`flex items-center gap-4 p-6 rounded-[0.5rem] shadow-sm text-left transition-all border-2 ${method === 'FORMULAIRE' ? 'border-[#9ADE7B] bg-white' : 'border-transparent bg-gray-100/50'}`}
                                >
                                    <div className="w-12 h-12 bg-white rounded-[0.5rem] flex items-center justify-center text-gray-400 group-hover:text-[#9ADE7B]">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Confirmer par mail</p>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Envoi automatique</p>
                                    </div>
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* RÉSUMÉ */}
                    <aside className="lg:sticky lg:top-32 h-fit">
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[0.5rem] p-8 shadow-xl border border-gray-50">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Résumé de la commande</h3>
                            
                            <div className="space-y-6 mb-8">
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

                            <div className="pt-6 border-t border-dashed border-gray-100 flex justify-between items-end mb-10">
                                <span className="text-2xl font-bold tracking-tighter text-gray-950">TOTAL</span>
                                <span className="text-3xl font-black text-[#1A4301] tracking-tighter">{cartTotal.toLocaleString()} FCFA</span>
                            </div>

                            <motion.button 
                                onClick={handleFinalize}
                                disabled={loading || cart.length === 0}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-[#9ADE7B] hover:bg-black hover:text-white text-[#1A4301] font-black py-5 rounded-[0.5rem] flex items-center justify-center gap-3 transition-all shadow-lg uppercase tracking-widest text-xs disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : "Valider la commande"}
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </motion.div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

// Composants internes (InputGroup et OrderItem)
const InputGroup = ({ label, name, value, onChange, placeholder }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</label>
        <input 
            type="text" 
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-gray-200/50 border-none rounded-[0.5rem] p-4 text-sm font-medium focus:ring-2 focus:ring-[#9ADE7B] outline-none transition-all"
        />
    </div>
);

const OrderItem = ({ name, category, price, img }) => (
    <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <img src={img} alt="" className="w-12 h-12 rounded-[0.5rem] object-cover bg-gray-100" />
            <div>
                <h4 className="font-bold text-xs text-gray-900 leading-tight">{name}</h4>
                <p className="text-[9px] text-gray-400 uppercase font-medium">{category}</p>
            </div>
        </div>
        <span className="text-[11px] font-black text-[#1A4301] shrink-0">{price}</span>
    </div>
);