

const data = [
    {id:"1", nom: "Jean Paul", role: "RESPONSABLE LOGISTIQUE", etat: "actif", dashboard: true, clients: true, produits: false, commandes: true, administrateurs: false },
    {id:"2", nom: "Marie Claire", role: "ASSISTANTE ADMINISTRATIVE", etat: "inactif", dashboard: false, clients: false, produits: false, commandes: false, administrateurs: false },
    {id:"3", nom: "Patrick Ndzi", role: "CHEF DE PROJET", etat: "actif", dashboard: true, clients: true, produits: true, commandes: true, administrateurs: false },
    {id:"4", nom: "Sophie Kamga", role: "COMPTABLE", etat: "actif", dashboard: true, clients: false, produits: false, commandes: true, administrateurs: false },
    {id:"5", nom: "Armand Tchoua", role: "DÉVELOPPEUR WEB", etat: "inactif", dashboard: false, clients: false, produits: false, commandes: false, administrateurs: false },
    {id:"6", nom: "Linda Muna", role: "RESPONSABLE RH", etat: "actif", dashboard: true, clients: true, produits: true, commandes: true, administrateurs: true },
    {id:"7", nom: "Kevin Mbarga", role: "TECHNICIEN RÉSEAU", etat: "actif", dashboard: false, clients: false, produits: false, commandes: false, administrateurs: false },
    {id:"8", nom: "Estelle Ndzié", role: "SECRÉTAIRE", etat: "inactif", dashboard: false, clients: false, produits: false, commandes: false, administrateurs: false },
    {id:"9", nom: "Brice Fotso", role: "ANALYSTE DATA", etat: "actif", dashboard: true, clients: false, produits: false, commandes: true, administrateurs: false },
    {id:"10", nom: "Carine Ngo", role: "GESTIONNAIRE DE STOCK", etat: "actif", dashboard: true, clients: true, produits: true, commandes: true, administrateurs: true }
];



const savePermissions = async (acces) => {

    try {

        const response = await fetch(
            "http://localhost:3000/update-permissions",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: acces.id,
                    dashboard: acces.dashboard,
                    clients: acces.clients,
                    produits: acces.produits,
                    commandes: acces.commandes,
                    administrateurs: acces.administrateurs
                })
            }
        )



        const result = await response.json()

        console.log(result)



        if (response.ok) {

            alert("Permissions mises à jour")

        } else {

            alert("Erreur de mise à jour")

        }

    } catch (error) {

        console.log(error)

        alert("Erreur serveur")

    }

}











export {data, savePermissions}