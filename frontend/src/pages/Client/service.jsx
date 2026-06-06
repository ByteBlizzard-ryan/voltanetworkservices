import React from 'react';
import { motion } from 'framer-motion'; 
import { ShieldCheck, Cpu, Wifi, Volume2, Zap, Search, CheckCircle2, Mail } from 'lucide-react';
import { Link as LinkNav } from 'react-router-dom'; 

const serviceCards = [
  {
    title: "Sécurité Physique",
    desc: "Contrôle d'accès biométrique et surveillance périmétrale intelligente avec analyse comportementale en temps réel.",
    icon: <ShieldCheck className="w-6 h-6 text-[#9ADE7B] group-hover:text-slate-900 transition-colors duration-500" />
  },
  {
    title: "IoT & Domotique",
    desc: "Écosystèmes internes pour infrastructures tertiaires et résidentielles, connectés via protocoles réseaux hautement sécurisés.",
    icon: <Wifi className="w-6 h-6 text-[#9ADE7B] group-hover:text-slate-900 transition-colors duration-500" />
  },
  {
    title: "Informatique & Réseaux",
    desc: "Sécurité des données critiques et déploiement de pare-feux next-gen pour une résilience cybernétique totale.",
    icon: <Cpu className="w-6 h-6 text-[#9ADE7B] group-hover:text-slate-900 transition-colors duration-500" />
  },
  {
    title: "Sonorisation & Alertes",
    desc: "Systèmes de diffusion audio haute-fidélité et alarmes vocales d'urgence certifiées pour ERP et complexes industriels.",
    icon: <Volume2 className="w-6 h-6 text-[#9ADE7B] group-hover:text-slate-900 transition-colors duration-500" />
  },
  {
    title: "Matériel Électrique",
    desc: "Solutions d'alimentation ininterrompue et câblage structuré certifié pour environnements à haute disponibilité.",
    icon: <Zap className="w-6 h-6 text-[#9ADE7B] group-hover:text-slate-900 transition-colors duration-500" />
  },
  {
    title: "Audit & Conseil",
    desc: "Analyse experte approfondie des vulnérabilités et accompagnement complet vers la conformité réglementaire internationale.",
    icon: <Search className="w-6 h-6 text-[#9ADE7B] group-hover:text-slate-900 transition-colors duration-500" />
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function Services() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      
      {/* --- SECTION 1: HERO SERVICES --- */}
      <section className="pt-12 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl space-y-6"
        >
          <span className="bg-[#9ADE7B]/10 text-slate-900 border border-[#9ADE7B]/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] inline-block">
            Excellence Opérationnelle
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
            Nos <span className="text-[#9ADE7B]">Services</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl">
            Découvrez nos solutions innovantes pour sécuriser et optimiser vos installations. 
            Une synergie technologique globale au service de votre infrastructure numérique et physique.
          </p>
        </motion.div>
      </section>

      {/* --- SECTION 2: GRID SERVICES --- */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {serviceCards.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="bg-white p-8 md:p-10 rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-500 group cursor-default"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#9ADE7B] transition-colors duration-500">
                <div className="group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-[#9ADE7B] transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- SECTION 3: SÉCURITÉ INTÉGRÉE --- */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square group">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800" 
                alt="Sécurité de l'infrastructure" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
              />
            </div>
            
            {/* Badge Expertise flottant uniforme */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-slate-900 p-6 rounded-2xl shadow-xl text-center min-w-[130px] z-10 border border-slate-800"
            >
              <p className="text-3xl font-black text-[#9ADE7B] leading-none">360°</p>
              <p className="text-[10px] font-bold text-white uppercase tracking-widest mt-2">Expertise</p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="text-[#9ADE7B] font-bold text-xs uppercase tracking-[0.3em] mb-3">Protocole Unifié</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                SÉCURITÉ INTÉGRÉE
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Notre approche ne se limite pas à l'installation de matériel isolé. Nous concevons des écosystèmes interconnectés où chaque composant technique communique de manière fluide au sein d'un centre de commandement centralisé et sécurisé.
            </p>
            <ul className="space-y-4">
              {[
                "Monitoring permanent 24/7/365",
                "Réponse automatisée et résilience aux incidents",
                "Maintenance prédictive des infrastructures matérielles"
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#9ADE7B] shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 4: CONTACT CTA (PLEINE LARGEUR) --- */}
      <section className="py-20 w-full consecutive-sections-fix">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-br from-slate-900 to-emerald-950 p-12 md:p-24 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[450px] shadow-2xl border-t border-b border-slate-800"
        >
          {/* Effet de lueur radial avec ton vrai vert */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(154,222,123,0.06)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8 px-4">
            <span className="inline-block bg-white/5 text-[#9ADE7B] border border-white/10 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
              Prêt à sécuriser vos actifs ?
            </span>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Besoin d'une solution <br />
              <span className="text-[#9ADE7B]">adaptée à vos infrastructures ?</span>
            </h2>
            
            <p className="text-slate-300 max-w-xl mx-auto text-base md:text-lg font-normal leading-relaxed">
              Nos ingénieurs et techniciens certifiés sont à votre disposition pour concevoir votre architecture de sécurité personnalisée.
            </p>
            
            <div className="pt-4">
              <LinkNav to="/contact" className="inline-block">
                <motion.div 
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                    backgroundColor: "#9ADE7B",
                    color: "#0f172a"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white text-slate-900 font-extrabold py-4 px-12 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer tracking-wide text-sm shadow-md"
                >
                  NOUS CONTACTER <Mail className="w-4 h-4" />
                </motion.div>
              </LinkNav>
            </div>
          </div>
          
          {/* Formes géométriques d'ambiance */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none z-0">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full"
            />
            <motion.div 
              animate={{ scale: [1, 1.15, 1], rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-10 right-10 w-96 h-96 border border-white rounded-full"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}