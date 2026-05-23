import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.svg';

export default function VerifyEmail() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // On récupère l'email passé depuis la page Register.jsx
    // Si l'utilisateur arrive ici sans email, on met une valeur par défaut
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

            // Si succès : On peut stocker le token et rediriger
            localStorage.setItem('token', response.data.access_token);
            alert("Vérification réussie !");
            navigate('/'); // Ou ta page d'accueil
            
        } catch (err) {
            setError(err.response?.data?.message || "Code invalide ou expiré.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F6F7F9] flex flex-col items-center justify-start md:justify-center p-4 md:p-8 overflow-y-auto font-sans">
            
            {/* 1. Header (Logo & Titre) */}
            <div className="text-center mt-6 mb-8 md:mb-12 flex flex-col items-center gap-4 md:gap-6 w-full max-w-[90%]">
                <h2 className="text-base md:text-xl font-bold tracking-[0.2em] text-gray-950 uppercase px-2">
                    VOLTA NETWORK SERVICES
                </h2>
                <img src={logo} alt="Volta Logo" className="w-16 md:w-24" />
            </div>

            {/* 2. Carte de Vérification */}
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] w-full max-w-md border border-gray-100">
                
                <div className="text-center sm:text-left mb-8 md:mb-10">
                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-950 tracking-tighter">
                        Vérification de votre email
                    </h1>
                    <p className="text-xs md:text-sm text-gray-400 mt-3 leading-relaxed">
                        Un code de vérification a été envoyé à l'adresse <br className="hidden md:block"/>
                        <span className="font-bold text-gray-700">{email}</span>.
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-500 text-xs rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
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
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-full h-12 md:h-14 text-center text-lg md:text-xl font-bold bg-[#EAECEF] border-2 border-transparent rounded-xl focus:border-[#9ADE7B] focus:bg-white transition-all outline-none"
                            />
                        ))}
                    </div>

                    {/* Bouton Vérifier */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className={`w-full min-h-[48px] ${loading ? 'bg-gray-400' : 'bg-[#9ADE7B] hover:bg-[#89cf6a]'} text-gray-900 font-bold py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-sm text-sm md:text-base uppercase`}
                    >
                        {loading ? "Vérification..." : "Vérifier"} <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                {/* Section Renvoyer le code */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] md:text-[11px] font-bold uppercase tracking-wider">
                    <p className="text-gray-400 text-center sm:text-left">
                        Vous n'avez pas reçu le code ?
                    </p>
                    <div className="flex items-center gap-3">
                        <button type="button" className="text-[#9ADE7B] hover:text-[#89cf6a] flex items-center gap-1.5 transition-colors">
                            Renvoyer le code
                        </button>
                    </div>
                </div>
            </div>

            {/* 3. Footer */}
            <footer className="mt-10 md:mt-14 text-center w-full px-4 mb-6">
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase mb-5">
                    <Link to="/privacy" className="hover:text-gray-600 transition-colors">Police de confidentialité</Link>
                    <Link to="/terms" className="hover:text-gray-600 transition-colors">Conditions d'utilisation</Link>
                </div>
                <p className="text-[9px] md:text-[10px] text-gray-400 leading-relaxed uppercase tracking-wider">
                    © 2026 VOLTANETWORK SERVICES.<br/>
                    INFRASTRUCTURE DE SECURITE.
                </p>
            </footer>
        </div>
    );
}