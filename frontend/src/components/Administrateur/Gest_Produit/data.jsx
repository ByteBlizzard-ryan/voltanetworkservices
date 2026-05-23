

const data = [
    {   
        id: 1,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        nom: "MacBook Pro 14",
        designation: "Ordinateur portable Apple M2 Pro",
        categorie: "Informatique",
        prix: "1200000",
        etat: "disponible"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        nom: "Dell XPS 13",
        designation: "Ultrabook haute performance",
        categorie: "Informatique",
        prix: "950000",
        etat: "disponible"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5",
        nom: "iPhone 14 Pro",
        designation: "Smartphone Apple 128GB",
        categorie: "Téléphonie",
        prix: "850000",
        etat: "indisponible"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        nom: "Samsung Galaxy S23",
        designation: "Smartphone Android haut de gamme",
        categorie: "Téléphonie",
        prix: "780000",
        etat: "disponible"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
        nom: "Casque Sony WH-1000XM5",
        designation: "Casque audio à réduction de bruit",
        categorie: "Audio",
        prix: "180000",
        etat: "disponible"
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
        nom: "Clavier mécanique RGB",
        designation: "Clavier gaming rétroéclairé",
        categorie: "Gaming",
        prix: "45000",
        etat: "indisponible"
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        nom: "Chaussures Nike Air Max",
        designation: "Sneakers sport lifestyle",
        categorie: "Mode",
        prix: "60000",
        etat: "disponible"
    },
    {
        id: 8,
        image: "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0",
        nom: "Montre Apple Watch",
        designation: "Montre connectée série 8",
        categorie: "Wearable",
        prix: "250000",
        etat: "disponible"
    },
    {
        id: 9,
        image: "https://images.unsplash.com/photo-1503602642458-232111445657",
        nom: "Canon EOS R",
        designation: "Appareil photo professionnel",
        categorie: "Photographie",
        prix: "1500000",
        etat: "indisponible"
    },
    {
        id: 10,
        image: "https://images.unsplash.com/photo-1512499617640-c2f999098c2f",
        nom: "Tablette iPad Air",
        designation: "Tablette Apple polyvalente",
        categorie: "Informatique",
        prix: "500000",
        etat: "disponible"
    }
];





// productData.jsx — Données dynamiques pour le composant ProductDetail
const product = {
    id: "PROD-BLP-001",
    name: "Terminal d'accès Bio-Lock Pro",
    price: "25 000 FCFA",
    category: "Boutique",
    subcategory: "Sécurité Physique",
    gallery: [
        { id: 1, src: "https://static.photos/1200x1200/shoes/5", alt: "Vue silhouette" },
        { id: 2, src: "https://static.photos/300x300/shoes/2", alt: "Vue surface" },
        { id: 3, src: "https://static.photos/300x300/tech/3", alt: "Vue composant" },
        { id: 4, src: "https://static.photos/300x300/watch/4", alt: "Vue vidéo" },
        
    ],
    shortDescriptions: [
        "Scanner biométrique haute précision pour l'entrée sécurisée des entreprises.",
        "S'intègre parfaitement au réseau Kinetic Sentinel pour la surveillance des menaces en temps réel et l'enregistrement automatisé des entrées.",
    ],
    badges: [
        { icon: "shield", label: "SUB-0.2S AUTH" },
        { icon: "lock", label: "AES-256 ENCRYPTION" },
    ],
    about: {
        title: "À propos du produit",
        body: "Le Bio-Lock Pro représente le summum de la défense autonome du périmètre. Conçu avec un capteur biométrique en réseau neuronal propriétaire, il élimine les faux positifs tout en maintenant des vitesses d'authentification parmi les meilleures du secteur. En tant que nœud central de l'écosystème Voltanetwork, ce terminal ne se contente pas d'ouvrir les portes — il agit comme un sentinelle intelligent, recoupant chaque demande d'entrée avec les protocoles de sécurité mondiaux et les algorithmes locaux de détection d'anomalies. Son design architectural brutaliste n'a d'égal que sa résilience interne, comprenant un boîtier inviolable et des canaux de communication cryptés de bout en bout.",
        features: [
        "Le capteur optique multi-spectral détecte le pouls et la température de la peau pour prévenir la falsification.",
        "Le stockage interne de sécurité maintient les journaux d'accès même lors de pannes réseau totales.",
        "Prise en charge transparente du protocole OSDP pour l'intégration avec les contrôleurs hérités existants.",
        "Résistance aux intempéries IP67 et indice de résistance aux chocs IK10 pour une durabilité extrême dans des environnements difficiles.",
        ],
    },
};






export {data, product}