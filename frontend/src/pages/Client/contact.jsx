import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Share2, Globe, Network, Loader2, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    // Identifiants (bien entourés de guillemets "")
    const SERVICE_ID = "service_yx6dh3g";
    const TEMPLATE_ID = "template_mdhzwue";
    const PUBLIC_KEY = "gZpkNd-wxrIRlhPNv";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
          setSent(true);
          setLoading(false);
          formRef.current.reset();
          setTimeout(() => setSent(false), 5000);
      })
      .catch((error) => {
          console.error("Erreur EmailJS:", error);
          alert("Une erreur est survenue lors de l'envoi du message.");
          setLoading(false);
      });
  };
  
  return (
    <div className="min-h-screen bg-[#F6F7F9] pt-24 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- HEADER --- */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-[#9ADE7B] shadow-[0_0_10px_#9ADE7B]"
            ></motion.div>
            <span className="text-[#9ADE7B] font-bold text-[10px] uppercase tracking-[0.3em]">
              Sentinel Active
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-6">
            Contactez-nous
          </h1>
          <p className="text-gray-500 max-w-2xl text-lg leading-relaxed text-justify">
            Une question sur nos infrastructures sécurisées ou besoin d'un accompagnement technique ? 
            Nos experts sont à votre écoute pour propulser votre réseau vers la prochaine étape.
          </p>
        </motion.header>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* --- FORMULAIRE (GAUCHE) --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 bg-white p-8 md:p-12 shadow-sm rounded-2xl border border-gray-50"
          >
            {sent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <CheckCircle className="w-16 h-16 text-[#9ADE7B] mb-4" />
                <h3 className="text-2xl font-bold mb-2 uppercase tracking-tighter">Message envoyé !</h3>
                <p className="text-gray-500">Nous reviendrons vers vous dans les plus brefs délais.</p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nom Complet</label>
                    <input name="from_name" required type="text" placeholder="Jean Dupont" className="w-full bg-[#F6F7F9] border-none py-4 px-6 focus:ring-2 focus:ring-[#9ADE7B] outline-none transition-all rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Professionnel</label>
                    <input name="reply_to" required type="email" placeholder="jean@entreprise.com" className="w-full bg-[#F6F7F9] border-none py-4 px-6 focus:ring-2 focus:ring-[#9ADE7B] outline-none transition-all rounded-xl" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Téléphone</label>
                  <input name="phone" type="text" placeholder="+237 6 00 00 00 00" className="w-full bg-[#F6F7F9] border-none py-4 px-6 focus:ring-2 focus:ring-[#9ADE7B] outline-none transition-all rounded-xl" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Message</label>
                  <textarea name="message" required rows="6" placeholder="Comment pouvons-nous vous aider ?" className="w-full bg-[#F6F7F9] border-none py-4 px-6 focus:ring-2 focus:ring-[#9ADE7B] outline-none transition-all resize-none rounded-xl"></textarea>
                </div>

                <motion.button 
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="bg-[#9ADE7B] hover:bg-black hover:text-[#9ADE7B] text-[#1A4301] disabled:opacity-50 disabled:cursor-not-allowed font-bold py-5 px-10 rounded-xl flex items-center gap-3 transition-all uppercase tracking-widest text-xs group"
                >
                  {loading ? (
                    <>Envoi en cours... <Loader2 className="w-4 h-4 animate-spin" /></>
                  ) : (
                    <>Envoyer le message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* --- INFOS & MAP (DROITE) --- */}
          <div className="lg:col-span-5 space-y-8">
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="space-y-6"
            >
              {[
                { icon: <MapPin />, title: "Notre Siège", content: "42 Avenue de l'Innovation, Paris" },
                { icon: <Mail />, title: "Email Direct", content: "contact@voltanetwork.com" },
                { icon: <Phone />, title: "Support Technique", content: "+33 1 88 88 00 00", highlight: true }
              ].map((info, i) => (
                <motion.div 
                  key={i}
                  variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                  className="flex gap-6 items-start group"
                >
                  <div className="w-12 h-12 bg-white flex items-center justify-center shadow-sm shrink-0 rounded-xl group-hover:bg-[#9ADE7B] group-hover:text-white transition-colors duration-500">
                    {React.cloneElement(info.icon, { size: 20, className: "group-hover:scale-110 transition-transform" })}
                  </div>
                  <div>
                    <h4 className={`font-bold mb-1 uppercase text-xs tracking-wider ${info.highlight ? 'text-[#9ADE7B]' : 'text-gray-900'}`}>{info.title}</h4>
                    <p className="text-gray-500 text-sm">{info.content}</p>
                    {info.highlight && <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 tracking-tighter">Disponible 24/7 Enterprise</p>}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Suivez-nous */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#1A1D1F] p-8 text-white rounded-2xl relative overflow-hidden"
            >
              <h4 className="font-bold mb-6 tracking-tight relative z-10 uppercase text-xs">Réseaux Sociaux</h4>
              <div className="flex gap-4 relative z-10">
                {[Share2, Globe, Network].map((Icon, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ y: -5, backgroundColor: "#9ADE7B", color: "#000" }}
                    className="w-12 h-12 bg-white/5 flex items-center justify-center transition-colors rounded-xl"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#9ADE7B]/10 blur-3xl rounded-full"></div>
            </motion.div>

            {/* Carte (Map) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="rounded-2xl overflow-hidden grayscale contrast-125 h-56 bg-gray-300 relative group border border-gray-200"
            >
              <div className="absolute inset-0 bg-[#9ADE7B]/10 group-hover:bg-transparent transition-colors duration-700"></div>
              <img src="https://api.maptiler.com/static/styles/toner/static/2.35,48.86,12/400x250.png?key=get_your_key" alt="Map Location" className="w-full h-full object-cover" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-[#9ADE7B] rounded-lg"
                  ></motion.div>
                  <div className="w-10 h-10 bg-[#9ADE7B] rounded-xl flex items-center justify-center shadow-2xl relative z-10">
                    <div className="w-2 h-2 bg-[#1A4301] rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}