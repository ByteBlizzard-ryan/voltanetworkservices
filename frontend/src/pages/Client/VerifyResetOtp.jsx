import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Loader2, ChevronLeft } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export default function VerifyResetOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const email = location.state?.email || "votre adresse email";
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  // Auto-focus sur la première case au chargement de l'infrastructure de sécurité
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Gestion de la saisie numérique et avancement du focus
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Gestion de la touche Backspace pour reculer proprement
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    
    if (code.length < 6) {
      setError("Veuillez renseigner l'intégralité des 6 chiffres.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulation ou appel de validation de jeton avant redirection
      // On redirige vers la page de changement de mot de passe finale
      navigate(`/reset-password?email=${email}&otp=${code}`);
    } catch (err) {
      setError("Jeton de sécurité invalide ou expiré.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-slate-900">
      <div className="w-full max-w-md">
        
        {/* ── BOUTON RETOUR UNIFORMISÉ ── */}
        <Link to="/forgot-password" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-6 transition-colors text-[10px] md:text-[11px] font-extrabold uppercase tracking-widest">
          <ChevronLeft className="w-4 h-4" /> Demander un nouveau code
        </Link>

        {/* ── CARTE DE VÉRIFICATION SÉCURISÉE ── */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-8">
            <img src={logo} alt="Volta Logo" className="w-12 h-12 object-contain" />
            <div className="flex items-center gap-2 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                OTP Gate
            </div>
          </div>

          <div className="text-center sm:text-left mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Vérification</h1>
            <p className="text-xs font-medium text-slate-400 mt-2 leading-relaxed">
              Le code de récupération temporaire a été transmis à l'adresse <br className="hidden md:block"/>
              <span className="font-bold text-slate-900">{email}</span>.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold rounded-xl tracking-wide uppercase">
              {error}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6">
            {/* Grille de saisie OTP à 6 chiffres */}
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
                  className="w-full h-12 md:h-14 text-center text-lg font-extrabold bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl transition-all outline-none text-slate-900"
                />
              ))}
            </div>

            {/* Bouton Soumettre */}
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full h-12 ${
                loading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#9ADE7B] hover:bg-slate-900 text-slate-900 hover:text-[#9ADE7B]'
              } font-extrabold text-[11px] uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm pt-0.5`}
            >
              {loading ? (
                <>Validation en cours... <Loader2 className="w-4 h-4 animate-spin" /></>
              ) : (
                <>Valider le jeton <ShieldCheck className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>

        {/* ── PIED DE PAGE UNIFORMISÉ ── */}
        <p className="text-[9px] md:text-[10px] text-slate-400 text-center uppercase tracking-widest mt-12 leading-relaxed">
            © 2026 VOLTANETWORK SERVICES.<br/>
            VÉRIFICATION DE SÉCURITÉ PÉRIPHÉRIQUE.
        </p>

      </div>
    </div>
  );
}