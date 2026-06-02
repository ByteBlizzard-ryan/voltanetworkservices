import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Server,
  Lock,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  Zap,
  Wifi,
  Cpu,
  ShoppingCart,
  MessageSquare,
} from 'lucide-react';
import imageAcceuil1 from '../../images/pageAcceuil1.png';
import imageAcceuil2 from '../../images/pageAcceuil2.png';
import imageAcceuil3 from '../../images/pageAcceuil3.png';
import ProductGrid from '../../components/ProductGrid';
import { Link } from 'react-router-dom';

const mesProduits = [
  {
    id: 1,
    name: 'Caméra Sentinelle X1',
    category: 'Surveillance',
    price: '85.000 FCFA',
    desc: 'Vision nocturne ultra-précise et détection thermique intégrée.',
    image:
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800',
    badge: 'Populaire',
  },
  {
    id: 2,
    name: 'Caméra Sentinelle X1',
    category: 'Surveillance',
    price: '85.000 FCFA',
    desc: 'Vision nocturne ultra-précise et détection thermique intégrée.',
    image:
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800',
    badge: 'Populaire',
  },
  {
    id: 3,
    name: 'Caméra Sentinelle X1',
    category: 'Surveillance',
    price: '85.000 FCFA',
    desc: 'Vision nocturne ultra-précise et détection thermique intégrée.',
    image:
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800',
    badge: 'Populaire',
  },
  {
    id: 4,
    name: 'Caméra Sentinelle X1',
    category: 'Surveillance',
    price: '85.000 FCFA',
    desc: 'Vision nocturne ultra-précise et détection thermique intégrée.',
    image:
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800',
    badge: 'Populaire',
  },
  {
    id: 5,
    name: 'Caméra Sentinelle X1',
    category: 'Surveillance',
    price: '85.000 FCFA',
    desc: 'Vision nocturne ultra-précise et détection thermique intégrée.',
    image:
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800',
    badge: 'Populaire',
  },
  {
    id: 6,
    name: 'Caméra Sentinelle X1',
    category: 'Surveillance',
    price: '85.000 FCFA',
    desc: 'Vision nocturne ultra-précise et détection thermique intégrée.',
    image:
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800',
    badge: 'Populaire',
  },
];

// Animations réutilisables
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* ========== HERO ========== */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block bg-[#1B4332]/30 text-[#A7C957] text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full"
            >
              Sécurité & Surveillance
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              Protégez vos <span className="text-[#D4AF37]">actifs</span> avec une sécurité
              infaillible.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-slate-300 text-lg max-w-xl"
            >
              Solutions sur mesure alliant <strong className="text-white">technologie de pointe</strong> et
              expertise humaine pour garantir la continuité et la sûreté de vos opérations.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/services"
                className="inline-flex items-center justify-center bg-[#1B4332] hover:bg-[#143728] text-white font-semibold px-8 py-4 rounded-lg shadow-xl transition-colors gap-2"
              >
                Découvrir nos offres <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center border border-slate-400 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-slate-900 transition-all"
              >
                Parler à un expert
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#1B4332]/20 to-[#D4AF37]/10 rounded-3xl blur-2xl"></div>
            <img
              src={imageAcceuil1}
              alt="Sécurité avancée"
              className="relative z-10 w-full rounded-3xl shadow-2xl"
            />
            {/* Badge discret */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 z-20 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg hidden lg:flex items-center gap-3"
            >
              <div className="p-2 bg-[#1B4332] rounded-lg text-white">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Statut</p>
                <p className="text-sm font-bold text-slate-900">Système actif</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* ========== POURQUOI NOUS CHOISIR ========== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#1B4332] font-bold text-xs uppercase tracking-[0.3em]">
              Pourquoi nous choisir
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4">
              L'excellence au service de votre sécurité
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Surveillance 24/7',
                desc: 'Monitoring permanent par nos équipes spécialisées, intervention immédiate.',
              },
              {
                icon: <Cpu className="w-8 h-8" />,
                title: 'Technologie certifiée',
                desc: 'Matériel et logiciels conformes aux normes internationales les plus strictes.',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Support dédié',
                desc: 'Un gestionnaire de compte attitré pour un accompagnement personnalisé.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:border-[#1B4332]/20 transition-all duration-300"
              >
                <div className="text-[#1B4332] mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== SOLUTIONS (anciennes catégories) ========== */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#1B4332] font-bold text-xs uppercase tracking-[0.3em]">
              Nos domaines d'expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4">
              Une approche globale de la sécurité
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-10 h-10" />,
                title: 'Sécurité physique',
                desc: 'Contrôle d’accès, vidéosurveillance, détection intrusion, gardiennage.',
                color: 'border-l-[#1B4332]',
              },
              {
                icon: <Server className="w-10 h-10" />,
                title: 'Cyber-défense',
                desc: 'Protection des réseaux, audits de vulnérabilités, réponse aux incidents.',
                color: 'border-l-[#D4AF37]',
              },
              {
                icon: <Wifi className="w-10 h-10" />,
                title: 'Objets connectés (IoT)',
                desc: 'Sécurisation des infrastructures connectées, capteurs intelligents.',
                color: 'border-l-[#2B4C7E]',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-white p-8 rounded-2xl shadow-sm border-l-4 ${item.color} hover:shadow-md transition-shadow`}
              >
                <div className="text-[#1B4332] mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center text-[#1B4332] font-semibold mt-6 hover:underline gap-1"
                >
                  En savoir plus <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION PRODUITS ========== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#1B4332] font-bold text-xs uppercase tracking-[0.3em]">
              Équipements recommandés
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4">
              Technologie de surveillance avancée
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mt-4">
              Découvrez notre gamme de produits conçus pour répondre aux environnements les plus exigeants.
            </p>
          </motion.div>

          <ProductGrid products={mesProduits} />
          
          <div className="text-center mt-12">
            <Link
              to="/boutique"
              className="inline-flex items-center bg-[#1B4332] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#143728] transition-colors gap-2 shadow-lg"
            >
              Voir tous les produits <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    {/* ========== NOTRE PROCESSUS ========== */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="text-[#1B4332] font-bold text-xs uppercase tracking-[0.3em]"
          >
            Méthodologie
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-4"
          >
            Une approche structurée en 3 étapes
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              step: '01',
              icon: <MessageSquare className="w-10 h-10" />,
              title: 'Audit & Conseil',
              desc: 'Analyse complète de vos risques, visite de site et identification des vulnérabilités.',
              highlight: 'Rapport sous 48h',
            },
            {
              step: '02',
              icon: <Server className="w-10 h-10" />,
              title: 'Déploiement',
              desc: 'Installation par nos équipes certifiées, configuration sur mesure et tests de résilience.',
              highlight: 'Techniciens habilités',
            },
            {
              step: '03',
              icon: <Shield className="w-10 h-10" />,
              title: 'Supervision 24/7',
              desc: 'Surveillance continue, maintenance proactive et rapports mensuels personnalisés.',
              highlight: 'Télésurveillance certifiée',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="relative bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg hover:border-[#D4AF37]/30 transition-all duration-300 group overflow-hidden"
            >
              {/* Numéro d’étape en filigrane */}
              <span className="absolute top-4 right-6 text-8xl font-black text-slate-200/60 select-none group-hover:text-[#A7C957]/10 transition-colors duration-500">
                {item.step}
              </span>
              {/* Icône */}
              <div className="text-[#D4AF37] mb-5 relative z-10 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              {/* Titre */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">
                {item.title}
              </h3>
              {/* Description */}
              <p className="text-slate-600 leading-relaxed mb-6 relative z-10">
                {item.desc}
              </p>
              {/* Badge */}
              <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full relative z-10">
                {item.highlight}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

      {/* ========== CERTIFICATIONS ========== */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-12"
          >
            <div className="flex items-center gap-3 text-slate-400">
              <Award className="w-8 h-8 text-[#1B4332]" />
              <span className="font-bold text-slate-700">ISO 27001</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-[#1B4332]" />
              <span className="font-bold text-slate-700">Certification ANSSI</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Shield className="w-8 h-8 text-[#1B4332]" />
              <span className="font-bold text-slate-700">Partenariat Interpol</span>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Zap className="w-8 h-8 text-[#D4AF37]" />
              <span className="font-bold text-slate-700">Technologie brevetée</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="py-24 bg-gradient-to-r from-slate-900 to-[#1B4332] text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center px-4 space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold">
            Prenez le contrôle de votre sécurité dès aujourd'hui.
          </h2>
          <p className="text-slate-200 text-lg max-w-2xl mx-auto">
            Audit gratuit de vos installations existantes et recommandations personnalisées par nos ingénieurs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-[#1B4332] font-bold px-10 py-5 rounded-lg hover:bg-slate-100 transition-colors gap-2 shadow-2xl text-lg"
          >
            Demander un audit gratuit <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}