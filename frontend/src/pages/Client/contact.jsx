import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Share2, Globe, Network } from 'lucide-react';

export default function Contact() {
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
              className="w-2 h-2 rounded-[0.5rem] bg-[#9ADE7B] shadow-[0_0_10px_#9ADE7B]"
            ></motion.div>
            <span className="text-[#9ADE7B] font-bold text-[10px] uppercase tracking-[0.3em]">
              Sentinel Active
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-6">
            Contactez-nous
          </h1>
          <p className="text-gray-500 max-w-2xl text-lg leading-relaxed">
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
            className="lg:col-span-7 bg-white p-8 md:p-12 shadow-sm rounded-[0.5rem] border border-gray-50"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Nom Complet</label>
                  <input type="text" placeholder="Jean Dupont" className="w-full bg-[#F6F7F9] border-none py-4 px-6 focus:ring-2 focus:ring-[#9ADE7B] outline-none transition-all rounded-[0.5rem]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Professionnel</label>
                  <input type="email" placeholder="jean@entreprise.com" className="w-full bg-[#F6F7F9] border-none py-4 px-6 focus:ring-2 focus:ring-[#9ADE7B] outline-none transition-all rounded-[0.5rem]" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Téléphone</label>
                <input type="text" placeholder="+237 6 00 00 00 00" className="w-full bg-[#F6F7F9] border-none py-4 px-6 focus:ring-2 focus:ring-[#9ADE7B] outline-none transition-all rounded-[0.5rem]" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Message</label>
                <textarea rows="6" placeholder="Comment pouvons-nous vous aider ?" className="w-full bg-[#F6F7F9] border-none py-4 px-6 focus:ring-2 focus:ring-[#9ADE7B] outline-none transition-all resize-none rounded-[0.5rem]"></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#9ADE7B] hover:bg-black hover:text-[#9ADE7B] text-[#1A4301] font-bold py-5 px-10 rounded-[0.5rem] flex items-center gap-3 transition-all uppercase tracking-widest text-xs group"
              >
                Envoyer le message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </form>
          </motion.div>

          {/* --- INFOS & MAP (DROITE) --- */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Blocs d'infos animés en cascade */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="space-y-6"
            >
              {[
                { icon: <MapPin />, title: "Notre Siège", content: "42 Avenue de l'Innovation, Paris" },
                { icon: <Mail />, title: "Email Direct", content: "contact@voltanetwork.com" },
                { icon: <Phone />, title: "Support Technique", content: "+33 1 88 88 00 00", highlight: true }
              ].map((info, i) => (
                <motion.div 
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="flex gap-6 items-start group"
                >
                  <div className="w-12 h-12 bg-white flex items-center justify-center shadow-sm shrink-0 rounded-[0.5rem] group-hover:bg-[#9ADE7B] group-hover:text-white transition-colors duration-500">
                    {React.cloneElement(info.icon, { size: 20, className: "group-hover:scale-110 transition-transform" })}
                  </div>
                  <div>
                    <h4 className={`font-bold mb-1 ${info.highlight ? 'text-[#9ADE7B]' : 'text-gray-900'}`}>{info.title}</h4>
                    <p className="text-gray-500 text-sm">{info.content}</p>
                    {info.highlight && <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-tighter">Disponible 24/7 Enterprise</p>}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Suivez-nous */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#1A1D1F] p-8 text-white rounded-[0.5rem] relative overflow-hidden"
            >
              <h4 className="font-bold mb-6 tracking-tight relative z-10">Suivez-nous</h4>
              <div className="flex gap-4 relative z-10">
                {[Share2, Globe, Network].map((Icon, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ y: -5, backgroundColor: "#9ADE7B", color: "#000" }}
                    className="w-12 h-12 bg-white/5 flex items-center justify-center transition-colors rounded-[0.5rem]"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#9ADE7B]/10 blur-3xl rounded-full"></div>
            </motion.div>

            {/* Placeholder pour la Carte (Map) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="rounded-[0.5rem] overflow-hidden grayscale contrast-125 h-56 bg-gray-300 relative group border border-gray-200"
            >
              <div className="absolute inset-0 bg-[#9ADE7B]/10 group-hover:bg-transparent transition-colors duration-700"></div>
              <img src="https://api.maptiler.com/static/styles/toner/static/2.35,48.86,12/400x250.png?key=get_your_key" alt="Map Location" className="w-full h-full object-cover" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-[#9ADE7B] rounded-[0.5rem]"
                  ></motion.div>
                  <div className="w-10 h-10 bg-[#9ADE7B] rounded-[0.5rem] flex items-center justify-center shadow-2xl relative z-10">
                    <div className="w-2 h-2 bg-[#1A4301] rounded-[0.5rem]"></div>
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