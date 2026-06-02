import React from 'react';
import { motion } from 'framer-motion'; // Importation de Framer Motion
import { ShieldCheck, Cpu, Wifi, Volume2, Zap, Search, CheckCircle2, Mail, Link } from 'lucide-react';
import { Link as LinkNav} from 'react-router-dom'; // Importation de Link pour la navigation

const serviceCards = [
  {
    title: "Sécurité Physique",
    desc: "Contrôle d'accès biométrique et surveillance périmétrale intelligente avec analyse comportementale en temps réel.",
    icon: <ShieldCheck className="w-6 h-6 text-[#9ADE7B]" />
  },
  {
    title: "IoT & Domotique",
    desc: "Écosystèmes intelligents pour infrastructures tertiaires et résidentielles, connectés via protocoles sécurisés.",
    icon: <Wifi className="w-6 h-6 text-[#9ADE7B]" />
  },
  {
    title: "Informatique & Réseaux",
    desc: "Sécurité des données critiques et déploiement de pare-feux next-gen pour une résilience cybernétique totale.",
    icon: <Cpu className="w-6 h-6 text-[#9ADE7B]" />
  },
  {
    title: "Sonorisation & Alertes",
    desc: "Systèmes de diffusion audio haute-fidélité et alarmes vocales d'urgence certifiées pour ERP et industries.",
    icon: <Volume2 className="w-6 h-6 text-[#9ADE7B]" />
  },
  {
    title: "Matériel Électrique",
    desc: "Solutions d'alimentation ininterrompue et câblage structuré certifié pour environnements haute disponibilité.",
    icon: <Zap className="w-6 h-6 text-[#9ADE7B]" />
  },
  {
    title: "Audit & Conseil",
    desc: "Analyse experte des vulnérabilités et accompagnement vers la conformité réglementaire internationale.",
    icon: <Search className="w-6 h-6 text-[#9ADE7B]" />
  }
];

// Variantes pour les animations de liste (grid)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 } // Apparition en cascade
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
    <div className="min-h-screen bg-[#F6F7F9] overflow-x-hidden">
      
      {/* --- SECTION 1: HERO SERVICES --- */}
      <section className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="bg-[#9ADE7B]/20 text-[#1A4301] px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">
            Operational Excellence
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-950 mb-8">
            Nos <span className="text-[#9ADE7B]">Services</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
            Découvrez nos solutions innovantes pour sécuriser et optimiser vos installations. 
            Une synergie technologique au service de votre infrastructure.
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {serviceCards.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-10 rounded-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 group cursor-default"
            >
              <div className="w-12 h-12 bg-[#F6F7F9] rounded-lg flex items-center justify-center mb-8 group-hover:bg-[#9ADE7B] group-hover:text-white transition-colors duration-500">
                <div className="group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- SECTION 3: SÉCURITÉ INTÉGRÉE --- */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image avec Reveal par le bas */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square group">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800" 
                alt="Data Center Security" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
              />
            </div>
            {/* Badge Expertise 360 flottant */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-[#9ADE7B] p-6 rounded-xl shadow-xl text-center min-w-[120px] z-10"
            >
              <p className="text-3xl font-black text-[#1A4301] leading-none">360°</p>
              <p className="text-[10px] font-bold text-[#1A4301] uppercase tracking-widest mt-1">Expertise</p>
            </motion.div>
          </motion.div>

          {/* Contenu Texte */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="text-[#9ADE7B] font-bold text-xs uppercase tracking-[0.3em] mb-4">Protocole Unifié</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-950 uppercase">
                Sécurité Intégrée
              </h2>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Notre approche ne se limite pas à l'installation de matériel. Nous créons des écosystèmes où chaque composant communique au sein d'un centre de commandement unifié.
            </p>
            <ul className="space-y-4">
              {[
                "Monitoring 24/7/365",
                "Réponse Automatisée aux Incidents",
                "Maintenance Prédictive Hardware"
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-sm font-medium text-gray-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#9ADE7B]" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

    {/* --- SECTION 4: CONTACT CTA (OPTIMISÉE) --- */}
<section className="py-20 px-4 w-full">
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
    className="w-full bg-[#1A1D1F] p-12 md:p-24 text-center rounded-3xl relative overflow-hidden flex flex-col items-center justify-center min-h-[450px] shadow-2xl border border-gray-800"
  >
    {/* Effet de lueur radial en arrière-plan */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(154,222,123,0.05)_0%,transparent_70%)] pointer-events-none" />

    <div className="relative z-10 max-w-4xl mx-auto space-y-8">
      {/* Petit badge stylisé */}
      <span className="inline-block bg-[#9ADE7B]/10 text-[#9ADE7B] border border-[#9ADE7B]/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-2">
        Prêt à démarrer ?
      </span>

      <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
        Besoin d'une solution <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9ADE7B] to-[#b7f29c]">
          adaptée à vos besoins ?
        </span>
      </h2>
      
      <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
        Nos ingénieurs sont prêts à concevoir votre architecture de sécurité personnalisée.
      </p>
      
      <div className="pt-4">
        <LinkNav to="/contact" className="inline-block">
          <motion.div 
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(154,222,123,0.35)",
              backgroundColor: "#9ADE7B",
              color: "#1A4301"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black font-extrabold py-4 px-12 rounded-xl flex items-center justify-center gap-3 transition-colors duration-300 group cursor-pointer tracking-wide"
          >
            NOUS CONTACTER <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </LinkNav>
      </div>
    </div>
    
    {/* Cercles décoratifs animés d'origine conservés en fond */}
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-0">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 right-10 w-96 h-96 border border-white rounded-full"
      />
    </div>
  </motion.div>
</section>
    </div>
  );
}