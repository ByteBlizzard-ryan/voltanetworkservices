import React from 'react';
import { motion } from 'framer-motion'; // Importation nécessaire
import { Shield, Target, Cpu, CheckCircle, Rocket, Award, Smile, ArrowRight } from 'lucide-react';
import imageApropos1 from '../../images/pageApropos1.png';

// Variantes pour les apparitions en cascade (Valeurs)
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
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 text-[#9ADE7B] text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-[1px] bg-[#9ADE7B]"
            ></motion.div>
            Volta Network Services Identity
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-8">
            À propos de nous
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed font-medium">
            Nous sommes spécialisés dans les solutions technologiques innovantes pour sécuriser et améliorer votre quotidien.
          </p>
        </motion.div>
      </section>

      {/* --- QUI SOMMES-NOUS --- */}
      <section className="py-20 bg-[#F6F7F9]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">Qui sommes-nous ?</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed font-medium">
              <p>
                VOLTA NETWORK SERVICES incarne l'alliance de l'expertise technique et de l'innovation constante. Depuis notre création, nous redéfinissons les standards de la sécurité physique et numérique.
              </p>
              <p>
                Notre savoir-faire s'étend de la sécurité périmétrale aux systèmes IoT complexes, en passant par la domotique intelligente et le matériel électrique industriel.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-[#9ADE7B]/20 rounded-[2rem] blur-2xl group-hover:bg-[#9ADE7B]/40 transition-all duration-700"></div>
            <img 
              src={imageApropos1}
              alt="Data Center" 
              className="relative rounded-[2rem] shadow-2xl border border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* --- NOTRE MISSION --- */}
      <section className="py-32 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">Notre mission</h2>
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
              Assurer l'intégrité de vos actifs par une surveillance cinétique et une intelligence distribuée, tout en simplifiant l'interaction humaine avec la technologie complexe.
            </p>
          </motion.div>
          <div className="grid gap-6">
            <MissionCard 
              index={0}
              icon={<Shield className="w-6 h-6" />}
              title="Sécurité Absolue"
              desc="La protection est notre ADN, assurée par des protocoles cryptographiques et physiques de classe militaire."
            />
            <MissionCard 
              index={1}
              icon={<Cpu className="w-6 h-6" />}
              title="Innovation Continue"
              desc="Nous explorons sans cesse les frontières de l'IoT et de l'intelligence artificielle pour vos projets."
            />
          </div>
        </div>
      </section>

      {/* --- VALEURS (LES PILIERS) --- */}
      <section className="py-32 bg-gray-50/50">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-20"
        >
          <span className="text-[#9ADE7B] text-[10px] font-black uppercase tracking-[0.3em]">Valeurs fondamentales</span>
          <h2 className="text-4xl font-bold tracking-tight text-gray-950 mt-4">Les piliers de notre Sentinel</h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <ValueCard icon={<CheckCircle />} title="FIABILITÉ" desc="Systèmes redondants et architecture haute disponibilité." />
          <ValueCard icon={<Rocket />} title="INNOVATION" desc="Déploiement agile des dernières percées technologiques." />
          <ValueCard icon={<Award />} title="QUALITÉ" desc="Standards rigoureux de fabrication pour chaque composant." />
          <ValueCard icon={<Smile />} title="SATISFACTION" desc="Un accompagnement personnalisé et réactif à votre service." />
        </motion.div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto bg-gray-900 p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="relative z-10 space-y-4 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter max-w-md">
              Faites confiance à notre expertise pour vos projets.
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#9ADE7B] text-[10px] font-black uppercase tracking-widest">
              Prêt pour la prochaine étape ? <ArrowRight className="w-3 h-3" />
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#9ADE7B]/5 blur-[120px] rounded-full"></div>
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
    className="flex gap-6 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
  >
    <div className="shrink-0 w-12 h-12 bg-[#9ADE7B]/10 rounded-xl flex items-center justify-center text-[#9ADE7B] group-hover:bg-[#9ADE7B] group-hover:text-white transition-colors duration-500">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed font-medium">{desc}</p>
    </div>
  </motion.div>
);

const ValueCard = ({ icon, title, desc }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -12 }}
    className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm text-center space-y-6 group hover:shadow-2xl transition-all duration-500"
  >
    <div className="w-14 h-14 bg-[#9ADE7B]/10 rounded-2xl flex items-center justify-center text-[#9ADE7B] mx-auto group-hover:bg-[#9ADE7B] group-hover:text-white transition-colors duration-500">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div className="space-y-3">
      <h3 className="font-black text-xs tracking-[0.2em] text-gray-900 uppercase">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed font-medium">{desc}</p>
    </div>
  </motion.div>
);