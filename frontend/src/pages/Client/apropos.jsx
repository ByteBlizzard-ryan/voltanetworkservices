import React from 'react';
import { motion } from 'framer-motion'; 
import { Shield, Target, Cpu, CheckCircle, Rocket, Award, Smile, ArrowRight } from 'lucide-react';
import imageApropos1 from '../../images/pageApropos1.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 text-[#9ADE7B] text-xs font-bold uppercase tracking-[0.2em]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-[2px] bg-[#9ADE7B]"
            />
            Identité Volta Network Services
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
            À propos de nous
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
            Nous concevons des solutions technologiques intégrées d'avant-garde pour sécuriser et optimiser vos infrastructures critiques.
          </p>
        </motion.div>
      </section>

      {/* --- QUI SOMMES-NOUS --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Qui sommes-nous ?</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
              <p>
                VOLTA NETWORK SERVICES incarne l'alliance d'une expertise technique de pointe et d'une recherche constante d'innovation. Depuis notre création, nous redéfinissons les standards d'excellence au sein de la sécurité physique et numérique.
              </p>
              <p>
                Notre savoir-faire global englobe la sécurité périmétrale, le déploiement d'écosystèmes IoT complexes, les infrastructures de domotique intelligente, ainsi que l'ingénierie et la fourniture de matériel électrique de classe industrielle.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative group justify-self-center lg:justify-self-end"
          >
            <div className="absolute -inset-4 bg-[#9ADE7B]/10 rounded-3xl blur-2xl group-hover:bg-[#9ADE7B]/20 transition-all duration-700" />
            <img 
              src={imageApropos1}
              alt="Data Center & Security Hub" 
              className="relative rounded-3xl shadow-xl border border-white max-w-full h-auto object-cover max-h-[450px]"
            />
          </motion.div>
        </div>
      </section>

      {/* --- NOTRE MISSION --- */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Notre mission</h2>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed">
              Assurer de manière absolue la protection de vos actifs grâce à une surveillance continue et une intelligence applicative distribuée, tout en simplifiant l'interaction des équipes humaines avec les technologies hautement complexes.
            </p>
          </motion.div>
          
          <div className="grid gap-6 w-full">
            <MissionCard 
              index={0}
              icon={<Shield className="w-5 h-5" />}
              title="Sécurité Absolue"
              desc="La protection globale fait partie de notre ADN. Elle est garantie par des protocoles rigoureux et des architectures matérielles et logicielles hautement résilientes."
            />
            <MissionCard 
              index={1}
              icon={<Cpu className="w-5 h-5" />}
              title="Innovation Continue"
              desc="Nous explorons et testons de manière permanente les frontières technologiques de l'IoT et de l'automatisation intelligente afin de pérenniser vos projets."
            />
          </div>
        </div>
      </section>

      {/* --- VALEURS (LES PILIERS) --- */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-50">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-16 space-y-3"
        >
          <span className="text-[#9ADE7B] text-xs font-bold uppercase tracking-[0.2em]">Valeurs fondamentales</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Les piliers de notre architecture</h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <ValueCard icon={<CheckCircle />} title="FIABILITÉ" desc="Systèmes redondants natifs et architectures d'infrastructure à haute disponibilité continue." />
          <ValueCard icon={<Rocket />} title="INNOVATION" desc="Déploiement agile et proactif des dernières percées et standards technologiques du marché." />
          <ValueCard icon={<Award />} title="QUALITÉ" desc="Standards industriels rigoureux appliqués à la sélection et à l'intégration de chaque composant." />
          <ValueCard icon={<Smile />} title="SATISFACTION" desc="Un accompagnement technique ultra-réactif et personnalisé, à la hauteur de vos exigences." />
        </motion.div>
      </section>

      {/* --- CTA FINAL (PLEINE LARGEUR) --- */}
      <section className="py-20 w-full consecutive-sections-fix">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-br from-slate-900 to-[#1B4332] p-12 md:p-24 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] shadow-2xl border-t border-b border-slate-800"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(154,222,123,0.05)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6 px-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Faites confiance à notre expertise <br />
              <span className="text-[#D4AF37]">pour tous vos projets industriels.</span>
            </h2>
            
            <div className="pt-6 flex justify-center">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 hover:border-white/20 text-white font-bold py-3.5 px-8 rounded-xl text-xs tracking-wider uppercase transition-all duration-300">
                Prêt pour la prochaine étape ? <ArrowRight className="w-4 h-4 text-[#9ADE7B]" />
              </div>
            </div>
          </div>
          
          {/* Formes géométriques décoratives d'ambiance */}
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

const MissionCard = ({ icon, title, desc, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2, duration: 0.6 }}
    className="flex flex-col sm:flex-row gap-6 p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group w-full"
  >
    <div className="shrink-0 w-12 h-12 bg-[#9ADE7B]/10 rounded-xl flex items-center justify-center text-[#9ADE7B] group-hover:bg-[#9ADE7B] group-hover:text-slate-900 transition-colors duration-500">
      {icon}
    </div>
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#9ADE7B] transition-colors">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const ValueCard = ({ icon, title, desc }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -8 }}
    className="bg-white p-8 md:p-10 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col items-center space-y-6 group hover:shadow-xl transition-all duration-500"
  >
    <div className="w-12 h-12 bg-[#9ADE7B]/10 rounded-xl flex items-center justify-center text-[#9ADE7B] group-hover:bg-[#9ADE7B] group-hover:text-slate-900 transition-colors duration-500">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div className="space-y-3">
      <h3 className="font-bold text-xs tracking-[0.2em] text-slate-900 uppercase">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);