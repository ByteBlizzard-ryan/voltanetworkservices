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
    loading(true);

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
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 font-sans text-slate-900 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- HEADER --- */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 space-y-4"
        >
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-[#9ADE7B] shadow-[0_0_8px_rgba(154,222,123,0.6)]"
            />
            <span className="text-[#9ADE7B] font-bold text-xs uppercase tracking-[0.2em]">
              Sentinel Active
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
            Contactez-nous
          </h1>
          <p className="text-slate-500 max-w-2xl text-base md:text-lg leading-relaxed">
            Une question sur nos infrastructures sécurisées ou besoin d'un accompagnement technique dédié ? 
            Nos experts sont à votre écoute pour propulser votre architecture réseau vers la prochaine étape.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- FORMULAIRE (GAUCHE) --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 bg-white p-8 md:p-12 shadow-sm rounded-2xl border border-slate-100"
          >
            {sent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center space-y-4"
              >
                <CheckCircle className="w-14 h-14 text-[#9ADE7B]" />
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">Message envoyé !</h3>
                <p className="text-slate-500 text-sm max-w-xs">Nous analyserons votre demande et reviendrons vers vous dans les plus brefs délais.</p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Nom Complet</label>
                    <input name="from_name" required type="text" placeholder="Jean Dupont" className="w-full bg-slate-50 border-0 py-4 px-6 focus:ring-2 focus:ring-[#9ADE7B]/40 focus:bg-white outline-none transition-all rounded-xl text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Professionnel</label>
                    <input name="reply_to" required type="email" placeholder="jean@entreprise.com" className="w-full bg-slate-50 border-0 py-4 px-6 focus:ring-2 focus:ring-[#9ADE7B]/40 focus:bg-white outline-none transition-all rounded-xl text-sm" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Téléphone</label>
                  <input name="phone" type="text" placeholder="+237 6 00 00 00 00" className="w-full bg-slate-50 border-0 py-4 px-6 focus:ring-2 focus:ring-[#9ADE7B]/40 focus:bg-white outline-none transition-all rounded-xl text-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Message</label>
                  <textarea name="message" required rows="6" placeholder="Comment pouvons-nous vous aider ?" className="w-full bg-slate-50 border-0 py-4 px-6 focus:ring-2 focus:ring-[#9ADE7B]/40 focus:bg-white outline-none transition-all resize-none rounded-xl text-sm"></textarea>
                </div>

                <motion.button 
                  disabled={loading}
                  whileHover={{ scale: 1.02, backgroundColor: "#000000", color: "#9ADE7B" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="bg-[#9ADE7B] text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed font-extrabold py-4 px-10 rounded-xl flex items-center gap-3 transition-all uppercase tracking-wider text-xs group shadow-md cursor-pointer"
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
          <div className="lg:col-span-5 space-y-8 w-full">
            
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
                  className="flex gap-5 items-start group"
                >
                  <div className="w-11 h-11 bg-white flex items-center justify-center shadow-sm shrink-0 rounded-xl border border-slate-100 group-hover:bg-[#9ADE7B] group-hover:text-slate-900 transition-colors duration-500 text-[#9ADE7B]">
                    {React.cloneElement(info.icon, { size: 18, className: "group-hover:scale-110 transition-transform duration-500" })}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className={`font-bold uppercase text-xs tracking-wider ${info.highlight ? 'text-[#9ADE7B]' : 'text-slate-900'}`}>{info.title}</h4>
                    <p className="text-slate-500 text-sm">{info.content}</p>
                    {info.highlight && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Disponible 24/7 Enterprise</p>}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Réseaux Sociaux */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-slate-900 to-[#1B4332] p-8 text-white rounded-2xl relative overflow-hidden shadow-lg border border-slate-800"
            >
              <h4 className="font-bold mb-6 tracking-wider uppercase text-xs text-slate-300 relative z-10">Réseaux Sociaux</h4>
              <div className="flex gap-4 relative z-10">
                {[Share2, Globe, Network].map((Icon, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ y: -4, backgroundColor: "#9ADE7B", color: "#000000" }}
                    className="w-11 h-11 bg-white/10 flex items-center justify-center transition-colors rounded-xl cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.button>
                ))}
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(154,222,123,0.06)_0%,transparent_70%)] pointer-events-none" />
            </motion.div>

            {/* Carte (Map) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="rounded-2xl overflow-hidden grayscale contrast-125 h-56 bg-slate-200 relative group border border-slate-200 shadow-sm"
            >
              <div className="absolute inset-0 bg-[#9ADE7B]/5 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img src="https://api.maptiler.com/static/styles/toner/static/2.35,48.86,12/400x250.png?key=get_your_key" alt="Map Location" className="w-full h-full object-cover" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[#9ADE7B] rounded-lg"
                  />
                  <div className="w-10 h-10 bg-[#9ADE7B] rounded-xl flex items-center justify-center shadow-2xl relative">
                    <div className="w-2 h-2 bg-slate-900 rounded-full" />
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