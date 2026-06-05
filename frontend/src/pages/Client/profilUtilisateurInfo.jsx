import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Heart, History, LogOut, Loader2, AlertCircle, CheckCircle2, Shield } from 'lucide-react';
import logo from '../../assets/logo.svg';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const location = useLocation();
  const navigate = useNavigate();

  // --- ÉTATS ---
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

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
      console.error("Erreur lors de la déconnexion API", error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  // --- CHARGEMENT DES DONNÉES UTILISATEUR ---
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // --- MISE À JOUR DU MOT DE PASSE ---
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      setMessage({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas.' });
      return;
    }

    setUpdateLoading(true);
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://127.0.0.1:8000/api/user/update-password', passwordData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage({ type: 'success', text: 'Mot de passe mis à jour avec succès !' });
      setPasswordData({ current_password: '', new_password: '', new_password_confirmation: '' });
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Erreur lors de la mise à jour.' 
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-[#9ADE7B] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- HEADER --- */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 flex items-center gap-4">
            Mon Profil <span className="w-2.5 h-2.5 bg-[#9ADE7B] rounded-full shadow-sm shadow-[#9ADE7B]/50"></span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Gerez vos informations personnelles et vos paramètres de sécurité d'accès.</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          
          {/* --- SIDEBAR --- */}
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 space-y-1.5 lg:sticky lg:top-24">
            <div className="flex items-center gap-3 p-4 mb-4 bg-slate-50 rounded-lg border border-slate-100">
              <img src={logo} alt="Volta" className="w-6 h-6 object-contain" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-900 leading-tight">
                Volta Network <br /> Services
              </span>
            </div>

            <Link to="/profil" className="block">
              <SidebarItem icon={<User size={16} />} label="Informations" active={location.pathname === "/profil"} />
            </Link>
            <Link to="/favoris" className="block">
              <SidebarItem icon={<Heart size={16} />} label="Favoris" active={location.pathname === "/favoris"} />
            </Link>
            <Link to="/historique-commandes" className="block">
              <SidebarItem icon={<History size={16} />} label="Historique" active={location.pathname === "/historique-commandes"} />
            </Link>

            <button 
              onClick={handleLogout} 
              className="w-full flex items-center gap-4 px-5 py-3.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-all font-extrabold text-[10px] uppercase tracking-widest group text-left mt-8"
            >
              <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Déconnexion
            </button>
          </motion.aside>

          {/* --- CONTENU PRINCIPAL --- */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Données d'opérateur */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-8 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#9ADE7B]/5 to-transparent blur-3xl opacity-60 pointer-events-none"></div>
              
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-8">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-700 border border-slate-100">
                  <User size={16} />
                </div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Données d'opérateur</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-8 relative z-10">
                <InfoDisplay label="Nom Complet" value={user?.nom_complet || 'Non renseigné'} />
                <InfoDisplay label="Email Réseau" value={user?.email || 'Non renseigné'} />
              </div>
            </motion.section>

            {/* Protocoles de sécurité */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-8 md:p-10 shadow-sm border border-slate-100">
              
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-8">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-700 border border-slate-100">
                  <Shield size={16} />
                </div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Protocoles de sécurité</h2>
              </div>
              
              <form onSubmit={handlePasswordUpdate} className="space-y-6">
                {message.text && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-lg flex items-center gap-3 text-xs font-bold border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                    {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    {message.text}
                  </motion.div>
                )}

                <div className="max-w-md">
                  <InputProfile 
                    label="Mot de passe actuel" 
                    type="password" 
                    value={passwordData.current_password}
                    onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
                  />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <InputProfile 
                    label="Nouveau mot de passe" 
                    type="password"
                    value={passwordData.new_password}
                    onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                  />
                  <InputProfile 
                    label="Confirmer le nouveau mot de passe" 
                    type="password"
                    value={passwordData.new_password_confirmation}
                    onChange={(e) => setPasswordData({...passwordData, new_password_confirmation: e.target.value})}
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <motion.button 
                    type="submit"
                    disabled={updateLoading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full sm:w-auto bg-slate-900 hover:bg-black text-[#9ADE7B] disabled:bg-slate-200 disabled:text-slate-400 font-extrabold py-3.5 px-8 rounded-lg text-[11px] uppercase tracking-widest transition-all shadow-md shadow-slate-900/5 disabled:pointer-events-none flex items-center justify-center gap-2"
                  >
                    {updateLoading && <Loader2 size={14} className="animate-spin" />}
                    Mettre à jour les accès
                  </motion.button>
                </div>
              </form>
            </motion.section>
          </main>
        </div>
      </div>
    </div>
  );
}

// --- SOUS-COMPOSANTS OPTIMISÉS ---

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

const InfoDisplay = ({ label, value }) => (
  <div className="space-y-1">
    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{label}</span>
    <p className="text-base font-bold text-slate-800 tracking-tight">{value}</p>
  </div>
);

const InputProfile = ({ label, value, onChange, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block pl-0.5">{label}</label>
    <input 
      type={type} 
      value={value}
      onChange={onChange}
      required
      className="w-full bg-white border border-slate-200 rounded-lg py-3 px-4 text-sm font-semibold text-slate-800 placeholder:text-slate-300 focus:border-[#9ADE7B] focus:ring-4 focus:ring-[#9ADE7B]/10 transition-all outline-none"
    />
  </div>
);