import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.svg';

export default function VerifyEmail() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // On récupère l'email passé depuis la page Register.jsx
    const email = location.state?.email || "votre email";

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRefs = useRef([]);

    // Effet pour mettre le focus sur la première case au chargement
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    // Gestion du changement dans les cases
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false; // N'accepte que les chiffres

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Déplacer le focus vers la case suivante
        if (element.value !== "" && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Gestion de la touche "Retour" (Backspace)
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                // Si la case est vide, on recule et on efface la précédente
                const newOtp = [...otp];
                newOtp[index - 1] = "";
                setOtp(newOtp);
                inputRefs.current[index - 1].focus();
            }
        }
    };

    // Soumission du code au Backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullOtp = otp.join("");

        if (fullOtp.length < 6) {
            setError("Veuillez saisir les 6 chiffres.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/verify-otp', {
                email: email,
                otp: fullOtp
            });

            // Si succès : On stocke le token de session et redirige
            localStorage.setItem('token', response.data.access_token);
            navigate('/');
            
        } catch (err) {
            setError(err.response?.data?.message || "Code OTP invalide ou expiré.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start md:justify-center p-4 md:p-8 overflow-y-auto font-sans text-slate-900">
            
            {/* ── 1. HEADER UNIFORMISÉ ── */}
            <div className="text-center mt-6 mb-8 md:mb-10 flex flex-col items-center gap-4 w-full">
                <h2 className="text-[10px] font-extrabold tracking-[0.25em] text-slate-900 uppercase leading-tight px-2">
                    Volta Network <br /> Services
                </h2>
                <img src={logo} alt="Volta Logo" className="w-12 md:w-14 object-contain" />
            </div>

            {/* ── 2. CARTE DE VÉRIFICATION OTP ── */}
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm w-full max-w-md border border-slate-100">
                
                <div className="text-center sm:text-left mb-8">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Vérification de l'email
                    </h1>
                    <p className="text-xs font-medium text-slate-400 mt-2 leading-relaxed">
                        Un code d'authentification a été envoyé à l'adresse <br className="hidden md:block"/>
                        <span className="font-bold text-slate-900 transition-colors">{email}</span>.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold rounded-xl tracking-wide uppercase">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Champs Code de vérification (6 cases) */}
                    <div className="flex justify-between gap-2 md:gap-3">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                ref={(el) => (inputRefs.current[index] = el)}
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                tracking-widest
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-full h-12 md:h-14 text-center text-lg font-extrabold bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl transition-all outline-none text-slate-900"
                            />
                        ))}
                    </div>

                    {/* Bouton de Validation */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className={`w-full h-12 ${
                            loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#9ADE7B] hover:bg-slate-900 text-slate-900 hover:text-[#9ADE7B]'
                        } font-extrabold text-[11px] uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm pt-0.5`}
                    >
                        {loading ? (
                            <>Vérification... <Loader2 className="w-4 h-4 animate-spin" /></>
                        ) : (
                            <>Vérifier le jeton <ArrowRight className="w-4 h-4" /></>
                        )}
                    </button>
                </form>

                {/* Section Action alternative */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] md:text-[11px] font-extrabold uppercase tracking-widest">
                    <p className="text-slate-400 text-center sm:text-left">
                        Aucun jeton reçu ?
                    </p>
                    <button type="button" className="text-slate-950 hover:underline transition-all font-black">
                        Renvoyer un code
                    </button>
                </div>
            </div>

            {/* ── 3. FOOTER UNIFORMISÉ ── */}
            <footer className="mt-12 md:mt-16 text-center w-full px-4 mb-4">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] md:text-[11px] font-extrabold text-slate-400 uppercase mb-5 tracking-widest">
                    <Link to="/privacy" className="hover:text-slate-900 transition-colors">Politique de confidentialité</Link>
                    <Link to="/terms" className="hover:text-slate-900 transition-colors">Conditions d'utilisation</Link>
                </div>
                <p className="text-[9px] md:text-[10px] text-slate-400 leading-relaxed uppercase tracking-widest">
                    © 2026 VOLTANETWORK SERVICES.<br/>
                    CONTRÔLE DE SÉCURITÉ PÉRIPHÉRIQUE.
                </p>
            </footer>
        </div>
    );
}