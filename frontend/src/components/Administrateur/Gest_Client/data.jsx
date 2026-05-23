
const data = [
    { id: 1, nom: "Alice", email: "alice@test.com", statut: "débloqué" },
    { id: 2, nom: "Bob", email: "bob@test.com", statut: "bloqué" },
    { id: 3, nom: "Chris", email: "chris@test.com", statut: "débloqué" },
    { id: 4, nom: "David", email: "david@test.com", statut: "bloqué" },
    { id: 5, nom: "Emma", email: "emma@test.com", statut: "débloqué" },
    { id: 6, nom: "Frank", email: "frank@test.com", statut: "débloqué" },
    { id: 7, nom: "Grace", email: "grace@test.com", statut: "bloqué" },
    { id: 8, nom: "Hugo", email: "hugo@test.com", statut: "débloqué" },
    { id: 9, nom: "Iris", email: "iris@test.com", statut: "bloqué" },
    { id: 10, nom: "Jack", email: "jack@test.com", statut: "débloqué" }
];


// clientData.jsx — Données dynamiques pour le composant ClientDetail

const client = {
    id: "CLI-JP-001",
    firstName: "Jean-Pierre",
    lastName: "Dubois",
    email: "j.dubois@network-solutions.com",
    status: "ACTIF", // "ACTIF" | "BLOQUÉ"
    registeredAt: "14 Mars 2024",
    avatar: null, // URL ou null (initiales générées automatiquement)
};

const orders =[
        {
        id: "#CMD-8892",
        date: "12 Oct 2024",
        amount: "1 240 FCFA",
        status: "PAYÉE",
        },
        {
        id: "#CMD-8741",
        date: "05 Sep 2024",
        amount: "890 FCFA",
        status: "PAYÉE",
        },
        {
        id: "#CMD-8622",
        date: "28 Juil 2024",
        amount: "2 100 FCFA",
        status: "EN COURS",
        },
        {
        id: "#CMD-8509",
        date: "14 Juin 2024",
        amount: "450 FCFA",
        status: "PAYÉE",
        },
    ]
    





export { data, client, orders }