import React from 'react';
import { motion } from 'framer-motion'; // Import crucial
import { 
  ShieldCheck, UserCheck, Globe, ShoppingBag, 
  AlertTriangle, Copyright, XCircle, RefreshCw, Mail, Calendar
} from 'lucide-react';

export default function TermsOfService() {
  const lastUpdate = "25 Mai 2024";

  const sections = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Objet",
      content: "Le présent document a pour objet de définir les modalités et conditions dans lesquelles VOLTANETWORK met à la disposition de ses utilisateurs le site et les services associés de protection infrastructurelle. Toute connexion au site est subordonnée au respect des présentes conditions."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Accès au site",
      content: "L'accès au site est possible 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure ou d'un événement hors du contrôle de VOLTANETWORK, et sous réserve des éventuelles pannes et interventions de maintenance nécessaires au bon fonctionnement du service et des matériels."
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Comptes utilisateurs",
      content: "Pour accéder à certaines fonctionnalités, l'utilisateur doit créer un compte Kinetic Sentinel. Vous êtes responsable du maintien de la confidentialité de vos identifiants. Toute activité effectuée sous votre compte est sous votre entière responsabilité.",
      quote: "La sécurité commence par la gestion rigoureuse des accès individuels."
    },
    {
      icon: <XCircle className="w-6 h-6" />,
      title: "Utilisation du site",
      content: "L'utilisateur s'engage à ne pas perturber le fonctionnement du site et à ne pas utiliser les services à des fins illégales. Sont strictement interdits : l'extraction de données massive, l'intrusion dans les systèmes automatisés ou la diffusion de codes malveillants."
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Produits et services",
      content: "VOLTANETWORK s'efforce de fournir des descriptions précises de ses solutions de protection. Cependant, nous ne garantissons pas que les descriptions de produits ou tout autre contenu du site soient exempts d'erreurs techniques mineures."
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Responsabilités",
      content: "Les informations et documents figurant sur ce site sont fournis sans aucune garantie expresse ou tacite. VOLTANETWORK ne pourra être tenu responsable des dommages directs ou indirects résultant de l'accès ou de l'usage de ce site ou des informations qu'il contient."
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        
        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="border-b border-gray-100 pb-12 mb-16"
        >
          <div className="flex items-center gap-2 text-[#9ADE7B] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-[#9ADE7B]"
            ></motion.div>
            Juridique & Conformité
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-gray-900">
              Conditions d'utilisation
            </h1>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-[#F6F7F9] px-4 py-2 rounded-lg shrink-0 border border-gray-100"
            >
              <Calendar className="w-4 h-4 text-gray-400" />
              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                Mise à jour : <span className="text-[#9ADE7B]">{lastUpdate}</span>
              </div>
            </motion.div>
          </div>
          <p className="mt-8 text-gray-500 text-lg leading-relaxed max-w-2xl font-medium">
            Bienvenue sur la plateforme VOLTANETWORK. Les présentes conditions régissent votre accès et l'utilisation de nos services de protection.
          </p>
        </motion.div>

        {/* --- SECTIONS --- */}
        <div className="space-y-24">
          {sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
              className="grid md:grid-cols-12 gap-8 items-start group"
            >
              <div className="md:col-span-1 flex justify-start md:justify-center pt-1">
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  className="text-[#1A4301] p-2 bg-[#9ADE7B]/5 rounded-lg group-hover:bg-[#9ADE7B]/20 transition-colors duration-500"
                >
                  {section.icon}
                </motion.div>
              </div>
              <div className="md:col-span-11 space-y-4">
                <h2 className="text-xl font-bold text-gray-950 tracking-tight flex items-center gap-3 group-hover:text-[#9ADE7B] transition-colors duration-300">
                  {section.title}
                </h2>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {section.content}
                </p>
                {section.quote && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="border-l-4 border-[#9ADE7B] bg-[#F6F7F9] p-6 rounded-r-2xl shadow-sm"
                  >
                    <p className="text-sm italic font-bold text-[#1A4301]">
                      "{section.quote}"
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- ADDITIONAL INFO --- */}
       
      </div>
    </div>
  );
}

