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
      if (token) {
        await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error("Erreur déconnexion API:", error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user'); 
      navigate('/login');
    }
  };

  const filteredOrders = activeTab === 'TOUTES' 
    ? orders 
    : orders.filter(order => order.statut_commande === activeTab);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'PAYÉE': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'EN COURS': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'ANNULÉE': return 'text-rose-600 bg-rose-50 border-rose-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-[#9ADE7B] w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- HEADER UNIFORMISÉ --- */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 flex items-center gap-4">
            Mon Profil <span className="w-2.5 h-2.5 bg-[#9ADE7B] rounded-full shadow-sm shadow-[#9ADE7B]/50"></span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Suivez vos acquisitions Volta Network depuis votre espace personnel.</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          
          {/* --- SIDEBAR UNIFORMISÉE --- */}
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 space-y-1.5 lg:sticky lg:top-24">
            <div className="flex items-center gap-3 p-4 mb-4 bg-slate-50 rounded-lg border border-slate-100">
              <img src={logo} alt="Volta" className="w-6 h-6 object-contain" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-900 leading-tight">
                Volta Network <br /> Services
              </span>
            </div>

            <Link to="/profil" className="block">
              <SidebarItem icon={<User size={16}/>} label="Informations" active={location.pathname === "/profil"}/>
            </Link>
            <Link to="/favoris" className="block">
              <SidebarItem icon={<Heart size={16}/>} label="Favoris" active={location.pathname === "/favoris"}/>
            </Link>
            <Link to="/historique-commandes" className="block">
              <SidebarItem icon={<History size={16}/>} label="Historique" active={location.pathname === "/historique-commandes" || true}/>
            </Link>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-5 py-3.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-all font-extrabold text-[10px] uppercase tracking-widest group text-left mt-8"
            >
              <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform"/> Déconnexion
            </button>
          </motion.aside>

          {/* --- CONTENU PRINCIPAL --- */}
          <main className="lg:col-span-3 space-y-6">
            <div className="flex gap-8 border-b border-slate-200 pb-0.5 overflow-x-auto no-scrollbar">
              {['TOUTES', 'EN COURS', 'PAYÉE', 'ANNULÉE'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-[11px] font-extrabold tracking-widest transition-all relative whitespace-nowrap ${
                    activeTab === tab ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
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
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center gap-5 flex-1 w-full min-w-0">
                          <div className="w-16 h-16 bg-slate-50 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                            <img 
                              src={order.produits?.[0]?.url_image_principale || logo} 
                              className="w-full h-full object-cover transition-all duration-500" 
                              alt={firstProductName}
                            />
                          </div>
                          <div className="space-y-1 min-w-0">
                            <p className="text-[10px] font-extrabold text-[#9ADE7B] uppercase tracking-wider truncate">{firstProductName}</p>
                            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">VN-{shortId}</h3>
                            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                               <Calendar size={13} className="text-slate-300"/> 
                               {new Date(order.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                          </div>
                        </div>

                        <div className="w-full md:w-auto shrink-0">
                          <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">État actuel</p>
                          <div className={`inline-flex items-center gap-2 font-bold text-xs px-3 py-1 rounded-full border ${getStatusStyle(order.statut_commande)}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                            {order.statut_commande}
                          </div>
                        </div>

                        <div className="w-full md:w-auto shrink-0">
                          <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Montant Total</p>
                          <p className="text-xl font-extrabold text-slate-950 tracking-tight">
                            {(Number(order.total_commande) || 0).toLocaleString()} <span className="text-xs font-bold text-slate-500">FCFA</span>
                          </p>
                        </div>

                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="w-full md:w-auto px-6 py-3.5 bg-slate-50 hover:bg-slate-900 text-slate-600 hover:text-[#9ADE7B] border border-slate-200 hover:border-slate-900 font-extrabold text-[10px] uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 group/btn shrink-0"
                        >
                          Détails <ExternalLink size={13} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform"/>
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              ) : (
                <div className="bg-white p-16 rounded-xl border border-dashed border-slate-200 text-center flex flex-col items-center shadow-sm">
                  <Package className="w-12 h-12 text-slate-200 mb-4" />
                  <p className="text-slate-400 font-extrabold uppercase text-[10px] tracking-widest mb-4">Aucune commande trouvée</p>
                  <Link to="/boutique" className="inline-flex items-center bg-slate-900 hover:bg-black text-[#9ADE7B] font-extrabold px-6 py-3.5 rounded-lg text-[11px] uppercase tracking-widest transition-all">
                    Parcourir la boutique
                  </Link>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* --- MODAL DE DÉTAILS --- */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden max-h-[85vh] flex flex-col border border-slate-100"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#9ADE7B]/15 rounded-lg flex items-center justify-center text-slate-900">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900 leading-none">Récapitulatif de commande</h2>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-1">Ref: VN-{selectedOrder.id_commande.split('-')[0].toUpperCase()}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-slate-200/60 rounded-full transition-colors text-slate-400 hover:text-slate-900">
                  <X size={20}/>
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Articles Commandés</h4>
                  <div className="grid gap-3">
                    {selectedOrder.produits?.map((prod, i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <img src={prod.url_image_principale} className="w-12 h-12 object-cover rounded-md bg-white border border-slate-100" alt={prod.nom_produit} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">{prod.nom_produit}</p>
                          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mt-0.5">Quantité : {prod.pivot?.quantite_commandee || 1}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-extrabold text-slate-900">{Number(prod.prix_unitaire_produit).toLocaleString()} CFA</p>
                          <p className="text-[9px] font-extrabold text-[#9ADE7B] uppercase tracking-wider mt-0.5">Total : {Number(prod.pivot?.prix_global_scelle).toLocaleString()} CFA</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2"><MapPin size={12}/> Destination</h4>
                    <div className="space-y-1.5">
                      <p className="text-sm font-bold text-slate-900">{selectedOrder.nom_destinataire}</p>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{selectedOrder.adresse_livraison || "Adresse non fournie"}</p>
                      <p className="text-xs text-slate-400 font-bold tracking-wider">{selectedOrder.telephone_contact}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-2"><CreditCard size={12}/> Détails Transaction</h4>
                    <div className="space-y-2.5 bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <div className="flex justify-between items-center text-xs font-medium">
                        <span className="text-slate-400">Canal</span>
                        <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">{selectedOrder.canal_commande}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-medium">
                        <span className="text-slate-400">Statut</span>
                        <span className="font-bold uppercase text-[11px] tracking-wider text-slate-900">{selectedOrder.statut_commande}</span>
                      </div>
                      <div className="pt-2.5 border-t border-slate-200/60 flex justify-between items-baseline">
                        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Total</span>
                        <span className="text-xl font-extrabold text-slate-950 tracking-tight">{Number(selectedOrder.total_commande).toLocaleString()} <span className="text-xs font-bold text-slate-500">CFA</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-2 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-2"><Calendar size={12}/> {new Date(selectedOrder.created_at).toLocaleString('fr-FR')}</div>
                <div className="flex items-center gap-2"><Info size={12}/> Volta Network Services</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SOUS-COMPOSANT SIDEBAR UNIFORMISÉ ---
const SidebarItem = ({ icon, label, active = false }) => (
  <div className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-lg transition-all font-extrabold text-[11px] uppercase tracking-wider cursor-pointer ${
    active 
      ? 'bg-[#9ADE7B] text-slate-900 shadow-md shadow-[#9ADE7B]/10' 
      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
  }`}>
    {icon} 
    <span>{label}</span>
  </div>
);