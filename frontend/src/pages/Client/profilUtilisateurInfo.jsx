import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Heart, History, LogOut, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
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
        // Notification à l'API pour révoquer le token
        await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion API", error);
    } finally {
      // Nettoyage local dans tous les cas
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
          handleLogout(); // Déconnexion propre si session expirée
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
      <div className="min-h-screen flex items-center justify-center bg-[#F6F7F9]">
        <Loader2 className="w-10 h-10 text-[#9ADE7B] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9] pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- HEADER --- */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter text-gray-900 flex items-center gap-4 uppercase">
            MON PROFIL <span className="w-3 h-3 bg-[#9ADE7B] rounded-full"></span>
          </h1>
          <p className="text-gray-500 font-medium mt-2 italic">Gérez vos informations personnelles et vos paramètres d'accès.</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          
          {/* --- SIDEBAR --- */}
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[0.5rem] p-6 shadow-sm border border-gray-100 space-y-2 sticky top-10">
            <div className="flex items-center gap-3 p-4 mb-6 bg-[#F6F7F9] rounded-[0.5rem]">
               <img src={logo} alt="Volta" className="w-8 h-8 object-contain" />
              <span className="text-[10px] font-black uppercase tracking-tighter leading-none text-gray-900">
                Volta Network <br /> Services
              </span>
            </div>

            <Link to="/profil" className="block">
              <SidebarItem icon={<User className="w-5 h-5" />} label="Informations" active={location.pathname === "/profil"} />
            </Link>
            <Link to="/favoris" className="block">
              <SidebarItem icon={<Heart className="w-5 h-5" />} label="Favoris" active={location.pathname === "/favoris"} />
            </Link>
            <Link to="/historique-commandes" className="block">
              <SidebarItem icon={<History className="w-5 h-5" />} label="Historique" active={location.pathname === "/historique-commandes"} />
            </Link>

            <div className="pt-10">
              <button 
                onClick={handleLogout} 
                className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 rounded-[0.5rem] transition-all font-bold text-xs uppercase tracking-widest group text-left"
              >
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Déconnexion
              </button>
            </div>
          </motion.aside>

          {/* --- CONTENU PRINCIPAL --- */}
          <main className="lg:col-span-3 space-y-8">
            
            {/* Données d'opérateur */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[0.5rem] p-10 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#9ADE7B]/5 to-transparent blur-3xl opacity-50"></div>
              <h2 className="text-2xl font-black tracking-tight text-gray-950 uppercase mb-10 italic">Données d'opérateur</h2>
              <div className="grid md:grid-cols-2 gap-12 relative z-10">
                <InfoDisplay label="Nom Complet" value={user?.nom_complet || 'Non renseigné'} />
                <InfoDisplay label="Email Réseau" value={user?.email || 'Non renseigné'} />
              </div>
            </motion.section>

            {/* Protocoles de sécurité */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[0.5rem] p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black tracking-tight text-gray-950 uppercase mb-10 italic">Protocoles de sécurité</h2>
              
              <form onSubmit={handlePasswordUpdate} className="space-y-8">
                {message.text && (
                  <div className={`p-4 rounded-[0.5rem] flex items-center gap-3 text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    {message.text}
                  </div>
                )}

                <div className="max-w-md">
                  <InputProfile 
                    label="Mot de passe actuel" 
                    type="password" 
                    value={passwordData.current_password}
                    onChange={(e) => setPasswordData({...passwordData, current_password: e.target.value})}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
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

                <div className="pt-4">
                  <motion.button 
                    type="submit"
                    disabled={updateLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#9ADE7B] hover:bg-black hover:text-white text-[#1A4301] font-black py-4 px-10 rounded-[0.5rem] text-xs uppercase tracking-[0.2em] transition-all shadow-lg shadow-[#9ADE7B]/10 disabled:opacity-50 flex items-center gap-2"
                  >
                    {updateLoading && <Loader2 className="w-4 h-4 animate-spin" />}
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

// --- SOUS-COMPOSANTS ---

const SidebarItem = ({ icon, label, active = false }) => (
  <div className={`w-full flex items-center gap-4 px-6 py-4 rounded-[0.5rem] transition-all font-bold text-xs uppercase tracking-widest cursor-pointer ${
    active ? 'bg-[#9ADE7B] text-[#1A4301] shadow-lg shadow-[#9ADE7B]/10' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
  }`}>
    {icon}
    <span>{label}</span>
  </div>
);

const InfoDisplay = ({ label, value }) => (
  <div className="space-y-2">
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{label}</span>
    <p className="text-lg font-bold text-gray-900 tracking-tight">{value}</p>
  </div>
);

const InputProfile = ({ label, value, onChange, type = "text" }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">{label}</label>
    <input 
      type={type} 
      value={value}
      onChange={onChange}
      required
      className="w-full bg-[#F6F7F9] border-none rounded-[0.5rem] p-5 text-sm font-bold placeholder:text-gray-300 focus:ring-2 focus:ring-[#9ADE7B] transition-all outline-none"
    />
  </div>
);