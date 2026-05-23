import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function VerifyResetOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) element.nextSibling.focus();
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length === 6) {
      // On redirige vers la page de changement de mot de passe finale
      navigate(`/reset-password?email=${email}&otp=${code}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold tracking-tighter mb-2">Vérification Sécurisée</h2>
        <p className="text-sm text-gray-400 mb-8">Code envoyé à <span className="text-gray-900 font-bold">{email}</span></p>
        
        <div className="flex justify-center gap-2 mb-8">
          {otp.map((data, index) => (
            <input
              key={index} type="text" maxLength="1"
              className="w-12 h-14 text-center text-xl font-bold bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-[#9ADE7B] outline-none"
              value={data} onChange={e => handleChange(e.target, index)}
            />
          ))}
        </div>

        <button 
          onClick={handleVerify}
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 uppercase text-sm"
        >
          Valider le code <ShieldCheck size={18} />
        </button>
      </div>
    </div>
  );
}