
const data = [
    { id: "CMD001", nom: "Alice Mbarga", email: "alice@gmail.com", date: "14/04/2026", prix: 120000, statut: "payée" },
    { id: "CMD002", nom: "Jean Nkomo", email: "jean@yahoo.com", date: "15/04/2026", prix: 85000, statut: "encours" },
    { id: "CMD003", nom: "Paul Ndzi", email: "paul@gmail.com", date: "16/04/2026", prix: 45000, statut: "annulée" },
    { id: "CMD004", nom: "Clarisse Ndzi", email: "clarisse@yahoo.com", date: "17/04/2026", prix: 230000, statut: "payée" },
    { id: "CMD005", nom: "Marc Essono", email: "marc@gmail.com", date: "18/04/2026", prix: 99000, statut: "encours" },
    { id: "CMD006", nom: "Brice Tchoua", email: "brice@yahoo.com", date: "19/04/2026", prix: 150000, statut: "annulée" },
    { id: "CMD007", nom: "Nadine Ewane", email: "nadine@gmail.com", date: "20/04/2026", prix: 70000, statut: "payée" },
    { id: "CMD008", nom: "Serge Ndzi", email: "serge@yahoo.com", date: "21/04/2026", prix: 180000, statut: "encours" },
    { id: "CMD009", nom: "Yves Mbida", email: "yves@gmail.com", date: "22/04/2026", prix: 56000, statut: "annulée" },
    { id: "CMD010", nom: "Cynthia Ndzi", email: "cynthia@yahoo.com", date: "23/04/2026", prix: 134000, statut: "payée" },
    { id: "CMD011", nom: "Kevin Ndzi", email: "kevin@gmail.com", date: "24/04/2026", prix: 76000, statut: "encours" },
    { id: "CMD012", nom: "Mireille Ndzi", email: "mireille@yahoo.com", date: "25/04/2026", prix: 210000, statut: "annulée" },
    { id: "CMD013", nom: "Joel Ndzi", email: "joel@gmail.com", date: "26/04/2026", prix: 50000, statut: "payée" },
    { id: "CMD014", nom: "Sandra Ndzi", email: "sandra@yahoo.com", date: "27/04/2026", prix: 89000, statut: "encours" },
    { id: "CMD015", nom: "Patrick Ndzi", email: "patrick@gmail.com", date: "28/04/2026", prix: 175000, statut: "annulée" }
];


const detaildata = [
    {
        id: 1,
        image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
        nom: "T-Shirt Oversize Noir",
        categorie: "Vêtements",
        quantite: 2,
        prix: 8500,
        sousTotal: 17000
    },

    {
        id: 2,
        image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
        nom: "Sneakers Air Max",
        categorie: "Chaussures",
        quantite: 1,
        prix: 45000,
        sousTotal: 45000
    },

    {
        id: 3,
        image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
        nom: "Chemise Premium",
        categorie: "Mode Homme",
        quantite: 3,
        prix: 12000,
        sousTotal: 36000
    },

    {
        id: 4,
        image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
        nom: "Sac à Main Élégance",
        categorie: "Accessoires",
        quantite: 1,
        prix: 30000,
        sousTotal: 30000
    },

    {
        id: 5,
        image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
        nom: "Casque Bluetooth",
        categorie: "Électronique",
        quantite: 2,
        prix: 15000,
        sousTotal: 30000
    },

    {
        id: 6,
        image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
        nom: "Smartphone Galaxy",
        categorie: "Téléphone",
        quantite: 1,
        prix: 185000,
        sousTotal: 185000
    },

    {
        id: 7,
        image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
        nom: "Chaussures Running",
        categorie: "Sport",
        quantite: 2,
        prix: 25000,
        sousTotal: 50000
    },

    {
        id: 8,
        image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
        nom: "Montre Luxe Silver",
        categorie: "Montres",
        quantite: 1,
        prix: 78000,
        sousTotal: 78000
    },

    {
        id: 9,
        image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
        nom: "Montre Connectée",
        categorie: "High-Tech",
        quantite: 1,
        prix: 65000,
        sousTotal: 65000
    },

    {
        id: 10,
        image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
        nom: "Parfum Élixir",
        categorie: "Beauté",
        quantite: 4,
        prix: 9500,
        sousTotal: 38000
    },

    {
        id: 11,
        image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
        nom: "Pull Hiver Premium",
        categorie: "Mode Femme",
        quantite: 2,
        prix: 18000,
        sousTotal: 36000
    },

    {
        id: 12,
        image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
        nom: "Basket Streetwear",
        categorie: "Chaussures",
        quantite: 1,
        prix: 39000,
        sousTotal: 39000
    },

    {
        id: 13,
        image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
        nom: "Ordinateur Portable",
        categorie: "Informatique",
        quantite: 1,
        prix: 350000,
        sousTotal: 350000
    },

    {
        id: 14,
        image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
        nom: "MacBook Pro",
        categorie: "Apple",
        quantite: 1,
        prix: 950000,
        sousTotal: 950000
    },

    {
        id: 15,
        image: "https://tse3.mm.bing.net/th/id/OIP.hDsOI_W7jtwb8nIDbrBB1wHaEp?rs=1&pid=ImgDetMain&o=7&rm=3",
        nom: "Caméra Numérique",
        categorie: "Photographie",
        quantite: 2,
        prix: 120000,
        sousTotal: 240000
    }
];


export {data, detaildata}