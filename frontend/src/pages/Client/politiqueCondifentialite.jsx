import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Database, Zap, Share2, 
  Cookie, Scale, Mail, ArrowRight 
} from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdate = "24 Mai 2024";

  return (
    <div className="min-h-screen bg-[#F6F7F9] pt-28 pb-20 font-sans">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* --- HEADER --- */}
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9ADE7B]">
                Confidentialité & Transparence
              </span>
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-gray-900 leading-[0.9]">
                Politique de<br />confidentialité
              </h1>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dernière mise à jour</p>
              <p className="text-lg font-black text-gray-900 tracking-tight">{lastUpdate}</p>
            </div>
          </div>
          
          <div className="mt-8 max-w-2xl">
            <p className="text-gray-500 font-medium text-lg leading-relaxed">
              Chez VOLTANETWORK, la protection de vos infrastructures numériques commence par le respect absolu de votre vie privée. 
              Découvrez comment nous sécurisons vos données avec la même rigueur que nos systèmes sentinelles.
            </p>
          </div>
          <div className="h-[1px] bg-gray-200 w-full mt-12"></div>
        </header>

        {/* --- STATUS BAR --- */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-[0.5rem] border border-gray-100 shadow-sm">
            <div className="w-2 h-2 bg-[#9ADE7B] rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">
              Live Security Status: <span className="text-[#9ADE7B]">Active</span>
            </span>
          </div>
        </div>

        {/* --- SECTIONS --- */}
        <div className="space-y-20">
          
          {/* Section 1: Collecte */}
          <PolicySection 
            icon={<Database className="w-6 h-6" />}
            title="Collecte des informations"
            content="Nous collectons uniquement les données strictement nécessaires à la fourniture de nos services de haute sécurité. Cela inclut vos informations d'identification professionnelle, les journaux système de vos infrastructures connectées et les métadonnées de communication essentielles."
            items={[
              "Données d'authentification chiffrées",
              "Configurations réseau sécurisées",
              "Métadonnées de diagnostic en temps réel"
            ]}
          />

          {/* Section 2: Utilisation */}
          <PolicySection 
            icon={<Zap className="w-6 h-6" />}
            title="Utilisation des données"
            content="Vos données sont traitées pour optimiser la réponse aux menaces de la KINETIC SENTINEL. Nous ne pratiquons aucune analyse comportementale à des fins marketing. Chaque octet traité vise exclusivement à renforcer le périmètre de sécurité de votre organisation et à prévenir les intrusions."
          />

          {/* Section 3: Protection (Highlight Card) */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[0.5rem] p-8 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#9ADE7B]/5 blur-3xl rounded-full -mr-20 -mt-20"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#9ADE7B] rounded-[0.5rem] flex items-center justify-center text-[#1A4301]">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-black tracking-tight text-gray-950 uppercase">Protection des données</h2>
              </div>

              <p className="text-gray-500 font-medium max-w-3xl leading-relaxed">
                La sécurité est notre architecture. Toutes les données stockées sont protégées par un chiffrement **AES-256** au repos et transportées via des tunnels TLS 1.3 hautement sécurisés.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#F6F7F9] p-6 rounded-[0.5rem] border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Algorithme</p>
                  <p className="text-xl font-black text-[#1A4301]">AES-256-GCM</p>
                </div>
                <div className="bg-[#F6F7F9] p-6 rounded-[0.5rem] border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Standard</p>
                  <p className="text-xl font-black text-[#1A4301]">FIPS 140-2</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 4: Partage */}
          <PolicySection 
            icon={<Share2 className="w-6 h-6" />}
            title="Partage des données"
            content="VOLTANETWORK ne vend ni ne loue jamais vos informations personnelles. Le partage est strictement limité à nos partenaires d'infrastructure audités et aux obligations légales impérieuses, dans le respect des cadres juridiques internationaux."
          />

          {/* Section 5: Cookies */}
          <PolicySection 
            icon={<Cookie className="w-6 h-6" />}
            title="Cookies & Traceurs"
            content="Notre interface utilise uniquement des cookies techniques essentiels au maintien de votre session sécurisée. Aucun traceur publicitaire tiers n'est autorisé sur nos plateformes de gestion de sécurité."
          />

          {/* Section 6: Droits */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#9ADE7B]/10 rounded-[0.5rem] flex items-center justify-center text-[#9ADE7B]">
                <Scale className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black tracking-tight text-gray-950 uppercase">Droits des utilisateurs</h2>
            </div>
            
            <p className="text-gray-500 font-medium leading-relaxed">
              Conformément au RGPD, vous disposez d'un contrôle total sur vos données :
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {["Droit d'accès & Rectification", "Droit à l'effacement", "Portabilité des données", "Limitation du traitement"].map((droit) => (
                <div key={droit} className="flex items-center gap-4 bg-white p-5 rounded-[0.5rem] border border-gray-100 shadow-sm">
                  <div className="w-5 h-5 bg-[#9ADE7B]/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#9ADE7B] rounded-full"></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{droit}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 7: Contact DPO */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-12 border-t border-gray-200"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-10 rounded-[0.5rem] border border-gray-100 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-950">
                  <Mail className="w-6 h-6" />
                  <h2 className="text-2xl font-black uppercase tracking-tight">Contactez notre DPO</h2>
                </div>
                <p className="text-gray-500 font-medium max-w-md">
                  Pour toute question concernant vos données ou pour exercer vos droits, contactez notre Délégué à la Protection des Données (DPO).
                </p>
              </div>
              
              <a 
                href="mailto:privacy@voltanetwork.com"
                className="bg-[#9ADE7B] hover:bg-black hover:text-white text-[#1A4301] px-8 py-5 rounded-[0.5rem] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-4 transition-all group shadow-lg shadow-[#9ADE7B]/10"
              >
                privacy@voltanetwork.com
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
}

// --- SOUS-COMPOSANT DE SECTION ---
const PolicySection = ({ icon, title, content, items = [] }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="grid md:grid-cols-3 gap-8"
  >
    <div className="flex items-center gap-4 md:items-start">
      <div className="w-12 h-12 bg-[#9ADE7B]/10 rounded-[0.5rem] flex items-center justify-center text-[#9ADE7B] shrink-0">
        {icon}
      </div>
      <h2 className="text-2xl font-black tracking-tight text-gray-950 uppercase leading-tight md:hidden">
        {title}
      </h2>
    </div>
    
    <div className="md:col-span-2 space-y-6">
      <h2 className="hidden md:block text-2xl font-black tracking-tight text-gray-950 uppercase">
        {title}
      </h2>
      <p className="text-gray-500 font-medium leading-relaxed text-lg">
        {content}
      </p>
      
      {items.length > 0 && (
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#9ADE7B] rounded-full"></div>
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </motion.section>
);