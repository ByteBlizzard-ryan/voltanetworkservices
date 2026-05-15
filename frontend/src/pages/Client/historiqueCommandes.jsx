import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Heart, History, LogOut, 
  ExternalLink, Loader2, Calendar, Package, 
  X, MapPin, ShoppingBag, CreditCard, Info
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.svg';

export default function OrderHistory() {
  const [activeTab, setActiveTab] = useState('TOUTES');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // --- RÉCUPÉRATION DES COMMANDES ---
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/commandes/historique', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des commandes:", error);
        // Si le token est expiré ou invalide (401), on déconnecte
        if (error.response?.status === 401) handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  // --- FONCTION DE DÉCONNEXION ---
  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    
    try {
      // 1. Appel optionnel à l'API pour révoquer le token côté serveur
      if (token) {
        await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error("Erreur déconnexion API:", error);
    } finally {
      // 2. Nettoyage local (Quoi qu'il arrive)
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // Si tu stockes les infos user
      
      // 3. Redirection
      navigate('/login');
    }
  };

  const filteredOrders = activeTab === 'TOUTES' 
    ? orders 
    : orders.filter(order => order.statut_commande === activeTab);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'PAYÉE': return 'text-green-500';
      case 'EN COURS': return 'text-orange-500';
      case 'ANNULÉE': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F7F9]">
        <Loader2 className="animate-spin text-[#9ADE7B] w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9] pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter text-gray-900 flex items-center gap-4 uppercase">
            Mon Profil <span className="w-3 h-3 bg-[#9ADE7B] rounded-full"></span>
          </h1>
          <p className="text-gray-500 font-medium mt-2 italic">Suivez vos acquisitions Volta Network.</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          
          {/* SIDEBAR */}
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[0.5rem] p-6 shadow-sm border border-gray-100 space-y-2 sticky top-10">
            <div className="flex items-center gap-3 p-4 mb-6 bg-[#F6F7F9] rounded-[0.5rem]">
              <img src={logo} alt="Volta" className="w-8 h-8" />
              <span className="text-[10px] font-black uppercase tracking-tighter text-gray-900">Volta Network</span>
            </div>

            <Link to="/profil"><SidebarItem icon={<User size={18}/>} label="Informations" active={location.pathname === "/profil"}/></Link>
            <Link to="/favoris"><SidebarItem icon={<Heart size={18}/>} label="Favoris" active={location.pathname === "/favoris"}/></Link>
            <Link to="/historique-commandes"><SidebarItem icon={<History size={18}/>} label="Historique" active={true}/></Link>

            {/* BOUTON DÉCONNEXION MIS À JOUR */}
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 text-red-500 font-bold text-[10px] uppercase mt-10 hover:bg-red-50 rounded-[0.5rem] transition-all tracking-widest group"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform"/> Déconnexion
            </button>
          </motion.aside>

          {/* CONTENU PRINCIPAL */}
          <main className="lg:col-span-3 space-y-8">
            <div className="flex gap-8 border-b border-gray-200 pb-1 overflow-x-auto no-scrollbar">
              {['TOUTES', 'EN COURS', 'PAYÉE', 'ANNULÉE'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-[11px] font-black tracking-[0.2em] transition-all relative whitespace-nowrap ${
                    activeTab === tab ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9ADE7B]" />
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredOrders.length > 0 ? (
                <AnimatePresence mode='popLayout'>
                  {filteredOrders.map((order) => {
                    const firstProductName = order.produits?.[0]?.nom_produit || "Commande sans nom";
                    const shortId = order.id_commande.split('-')[0].toUpperCase();
                    
                    return (
                      <motion.div 
                        key={order.id_commande}
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[0.5rem] p-6 border border-gray-50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center gap-6 flex-1 w-full">
                          <div className="w-20 h-20 bg-[#F6F7F9] rounded-[0.5rem] overflow-hidden shrink-0 border border-gray-100">
                            <img 
                              src={order.produits?.[0]?.url_image_principale || logo} 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                              alt=""
                            />
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-[#9ADE7B] uppercase tracking-[0.15em] line-clamp-1">{firstProductName}</p>
                            <h3 className="text-xl font-black text-gray-950 uppercase italic tracking-tighter">VN-{shortId}</h3>
                            <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold">
                               <Calendar size={12} className="text-gray-300"/> 
                               {new Date(order.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                          </div>
                        </div>

                        <div className="min-w-[130px] w-full md:w-auto text-left">
                          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">État actuel</p>
                          <div className={`flex items-center gap-2 font-black text-[11px] uppercase tracking-tighter ${getStatusStyle(order.statut_commande)}`}>
                            <div className="w-2 h-2 rounded-full bg-current shadow-[0_0_8px_currentColor]"></div>
                            {order.statut_commande}
                          </div>
                        </div>

                        <div className="min-w-[140px] w-full md:w-auto text-left">
                          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Montant Total</p>
                          <p className="text-xl font-black text-gray-950 tracking-tight">
                            {(Number(order.total_commande) || 0).toLocaleString()} <span className="text-[10px]">FCFA</span>
                          </p>
                        </div>

                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="w-full md:w-auto px-8 py-4 bg-transparent border-2 border-gray-100 hover:border-[#9ADE7B] hover:text-[#1A4301] text-gray-400 font-black text-[10px] uppercase tracking-[0.2em] rounded-[0.5rem] transition-all flex items-center justify-center gap-2 group/btn"
                        >
                          Détails <ExternalLink size={14} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform"/>
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              ) : (
                <div className="bg-white p-20 rounded-[0.5rem] border-2 border-dashed border-gray-100 text-center flex flex-col items-center">
                  <Package className="w-12 h-12 text-gray-100 mb-4" />
                  <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-4">Aucune commande trouvée</p>
                  <Link to="/boutique" className="text-[#9ADE7B] font-black uppercase text-[11px] hover:underline transition-all">Parcourir la boutique</Link>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* --- MODAL DE DÉTAILS --- */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[0.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#F6F7F9]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#9ADE7B] rounded-full flex items-center justify-center text-[#1A4301]">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none">Récapitulatif</h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Ref: VN-{selectedOrder.id_commande.split('-')[0].toUpperCase()}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-900">
                  <X size={24}/>
                </button>
              </div>

              <div className="p-8 overflow-y-auto space-y-10 no-scrollbar">
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 border-b border-gray-50 pb-2">Articles Commandés</h4>
                  <div className="grid gap-3">
                    {selectedOrder.produits?.map((prod, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-[0.5rem] bg-[#F6F7F9] border border-gray-100">
                        <img src={prod.url_image_principale} className="w-16 h-16 object-cover rounded-[0.3rem] bg-white" alt="" />
                        <div className="flex-1">
                          <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{prod.nom_produit}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Quantité : {prod.pivot?.quantite_commandee || 1}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-gray-900">{Number(prod.prix_unitaire_produit).toLocaleString()} CFA</p>
                          <p className="text-[9px] font-bold text-[#9ADE7B] uppercase tracking-widest mt-1">Sous-total : {Number(prod.pivot?.prix_global_scelle).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 border-b border-gray-50 pb-2"><MapPin size={14}/> Destination</h4>
                    <div className="space-y-2">
                      <p className="text-sm font-black text-gray-900 uppercase italic underline decoration-[#9ADE7B] decoration-2 underline-offset-4">{selectedOrder.nom_destinataire}</p>
                      <p className="text-xs text-gray-500 font-bold leading-relaxed">{selectedOrder.adresse_livraison || "Adresse non fournie"}</p>
                      <p className="text-xs text-gray-400 font-black tracking-widest">{selectedOrder.telephone_contact}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 border-b border-gray-50 pb-2"><CreditCard size={14}/> Détails Transaction</h4>
                    <div className="space-y-3 bg-white p-4 rounded-[0.5rem] border border-gray-100 shadow-sm">
                      <div className="flex justify-between items-center text-xs font-black uppercase tracking-tighter">
                        <span className="text-[10px] font-bold text-gray-400 italic">Canal</span>
                        <span>{selectedOrder.canal_commande}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-black uppercase tracking-tighter">
                        <span className="text-[10px] font-bold text-gray-400 italic">État</span>
                        <span className={getStatusStyle(selectedOrder.statut_commande)}>{selectedOrder.statut_commande}</span>
                      </div>
                      <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Payé</span>
                        <span className="text-2xl font-black text-gray-950 tracking-tighter">{Number(selectedOrder.total_commande).toLocaleString()} <span className="text-[10px]">CFA</span></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
                  <div className="flex items-center gap-2"><Calendar size={12}/> {new Date(selectedOrder.created_at).toLocaleString('fr-FR')}</div>
                  <div className="flex items-center gap-2"><Info size={12}/> Volta Network Services</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const SidebarItem = ({ icon, label, active }) => (
  <div className={`w-full flex items-center gap-4 px-6 py-4 rounded-[0.5rem] transition-all font-bold text-[11px] uppercase tracking-[0.15em] ${
    active ? 'bg-[#9ADE7B] text-[#1A4301] shadow-lg shadow-[#9ADE7B]/10' : 'text-gray-400 hover:bg-gray-50'
  }`}>
    {icon} <span>{label}</span>
  </div>
);