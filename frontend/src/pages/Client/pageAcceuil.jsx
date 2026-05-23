import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Wifi, ArrowRight, CheckCircle2, ShoppingCart, ChevronLeft, ChevronRight, Zap, Lock } from 'lucide-react';
import ProductSection from '../../components/sectionProduit';
import imageAcceuil1 from '../../images/pageAcceuil1.png';
import imageAcceuil2 from '../../images/pageAcceuil2.png';
import imageAcceuil3 from '../../images/pageAcceuil3.png';
import ProductGrid from '../../components/ProductGrid';
import { Link } from 'react-router-dom';
// import imageAcceuil1 from'../../imagesProduit/camera1.jpg';

const mesProduits = [
  {
    id: 1,
    name: "Caméra Sentinelle X1",
    category: "Surveillance",
    price: "85.000 FCFA",
    desc: "Vision nocturne ultra-précise et détection thermique intégrée.",
    image:"https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
    badge: "Populaire"
  },
  {
    id: 2,
    name: "Caméra Sentinelle X1",
    category: "Surveillance",
    price: "85.000 FCFA",
    desc: "Vision nocturne ultra-précise et détection thermique intégrée.",
    image:"https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
    badge: "Populaire"
  },
  {
    id: 3,
    name: "Caméra Sentinelle X1",
    category: "Surveillance",
    price: "85.000 FCFA",
    desc: "Vision nocturne ultra-précise et détection thermique intégrée.",
    image:"https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
    badge: "Populaire"
  },
  {
    id: 4,
    name: "Caméra Sentinelle X1",
    category: "Surveillance",
    price: "85.000 FCFA",
    desc: "Vision nocturne ultra-précise et détection thermique intégrée.",
    image:"https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
    badge: "Populaire"
  },
  {
    id: 5,
    name: "Caméra Sentinelle X1",
    category: "Surveillance",
    price: "85.000 FCFA",
    desc: "Vision nocturne ultra-précise et détection thermique intégrée.",
    image:"https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
    badge: "Populaire"
  },
  {
    id: 6,
    name: "Caméra Sentinelle X1",
    category: "Surveillance",
    price: "85.000 FCFA",
    desc: "Vision nocturne ultra-précise et détection thermique intégrée.",
    image:"https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
    badge: "Populaire"
  }
  // ... ajoute autant de produits que tu veux
];

// Variantes d'animation pour la réutilisation
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FBFBFD] font-sans text-gray-900 overflow-x-hidden">
      
      {/* --- SECTION 1: HERO ULTRA-MODERNE --- */}
      <section className="relative pt-12 pb-10 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Cercles de fond décoratifs animés */}
        <div className="absolute top-0 -right-20 w-96 h-96 bg-[#9ADE7B]/10 rounded-full blur-[100px] animate-pulse"></div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 z-10"
          >
            <div className="inline-flex items-center gap-2 bg-white border border-gray-100 shadow-sm px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-600">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Systèmes de Grade Militaire
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-[ -0.05em] leading-[0.95]">
              LA SÉCURITÉ <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#9ADE7B] to-gray-900 bg-[length:200%_auto] animate-gradient">
                RÉINVENTÉE
              </span>
            </h1>
            
            <p className="text-gray-500 text-lg md:text-xl max-w-lg leading-relaxed font-medium">
              Nous ne vendons pas du matériel, nous bâtissons des <span className="text-black font-bold">forteresses numériques</span> pour vos actifs les plus précieux.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/services" className="contents">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  /* 1. Changé en rounded-[0.5rem] pour la cohérence 
                    2. Ajout de cursor-pointer car c'est une div maintenant
                  */
                  className="bg-black text-white font-bold py-5 px-10 rounded-[0.5rem] transition-all shadow-2xl flex items-center justify-center gap-3 group cursor-pointer"
                >
                  NOS SOLUTIONS <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
              <Link to="/contact" className="bg-white border border-gray-200 text-black font-bold py-5 px-10 rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
                PARLER À UN EXPERT
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#9ADE7B]/30 to-blue-500/10 rounded-[3rem] blur-2xl opacity-50"></div>
            <img 
              src={imageAcceuil1}
              alt="Security Architecture" 
              className="relative z-10 w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] rounded-3xl"
            />
            {/* Floating Card Animation */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 z-20 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 hidden lg:block"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500 rounded-lg text-white">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Status</p>
                  <p className="text-sm font-black uppercase">Cryptage Actif</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: CATEGORIES (GLASSMORPHISM) --- */}
      <section className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <h2 className="text-[#9ADE7B] font-bold text-xs uppercase tracking-[0.4em] mb-4">Écosystèmes</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">Maîtrisez votre environnement</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Sécurité Physique", icon: <Shield />, color: "from-green-500/20" },
              { title: "Cyber-Défense", icon: <Cpu />, color: "from-blue-500/20" },
              { title: "IoT Connecté", icon: <Wifi />, color: "from-purple-500/20" }
            ].map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`relative p-10 rounded-[2.5rem] bg-gradient-to-b ${cat.color} to-transparent border border-white/10 overflow-hidden group`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                  {React.cloneElement(cat.icon, { size: 120 })}
                </div>
                <div className="relative z-10">
                  <div className="text-[#9ADE7B] mb-6">{React.cloneElement(cat.icon, { size: 32 })}</div>
                  <h4 className="text-2xl font-bold text-white mb-4">{cat.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">Solutions haute performance adaptées aux exigences des infrastructures critiques.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: EXPERTISE (STORYTELLING) --- */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#9ADE7B] rounded-full opacity-20 blur-2xl"></div>
              <div className="rounded-[3rem] overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500 shadow-[40px_40px_0px_0px_rgba(154,222,123,0.1)]">
                <img src={imageAcceuil2} alt="Expert" className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
            </div>
            
            <div className="space-y-10">
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Technologie de Pointe</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                L'INTELLIGENCE <br /> <span className="text-[#9ADE7B]">AU CŒUR</span> DU RÉSEAU.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Notre approche fusionne la <span className="text-black font-bold">biométrie avancée</span> et l'analyse comportementale pour créer une barrière proactive. 
              </p>
              
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <div className="text-4xl font-black mb-2 italic">150+</div>
                  <div className="h-1 w-12 bg-[#9ADE7B] mb-4"></div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Projets Sensibles</p>
                </div>
                <div>
                  <div className="text-4xl font-black mb-2 italic">24/7</div>
                  <div className="h-1 w-12 bg-[#9ADE7B] mb-4"></div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Veille Opérationnelle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     <ProductGrid products={mesProduits} />

      {/* --- CTA FINAL (HIGH CONTRAST) --- */}
      <section className="px-4 py-20">
        <motion.div 
          whileInView={{ scale: [0.95, 1] }}
          className="mx-auto bg-[#9ADE7B] p-12 md:p-24 text-center relative overflow-hidden"
        >
          {/* Cercles décoratifs CTA */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-black/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-8xl font-black text-[#1A4301] leading-none uppercase tracking-tighter">
              BÂTISSONS VOTRE <br /> SÉCURITÉ.
            </h2>
            <p className="text-[#1A4301]/70 font-bold uppercase tracking-widest text-sm">Prêt pour une infrastructure sans faille ?</p>
            <Link to="/contact" className="bg-[#1A4301] text-[#9ADE7B] font-black py-6 px-12 rounded-[0.25rem] hover:bg-black hover:text-[#9ADE7B] transition-all shadow-2xl uppercase tracking-tighter text-xl">
              DEMANDER UN AUDIT GRATUIT
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}