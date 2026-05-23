




function Couleur_Nom_Icon (lettre="") {

    const colorMap = {
        A: "#E57373", B: "#64B5F6", C: "#81C784", D: "#BA68C8",
        E: "#FFB74D", F: "#4DD0E1", G: "#F06292", H: "#7986CB",
        I: "#388E3C", J: "#FFD54F", K: "#1976D2", L: "#D32F2F",
        M: "#7B1FA2", N: "#F57C00", O: "#00ACC1", P: "#C2185B",
        Q: "#90A4AE", R: "#A5D6A7", S: "#4FC3F7", T: "#FFF176",
        U: "#CE93D8", V: "#FFCC80", W: "#546E7A", X: "#607D8B",
        Y: "#C5E1A5", Z: "#EF9A9A"
    };


    return colorMap[lettre] || "#ccc";

}


function Statut_client (statut) {

    let couleur = "";

    if (statut === "débloqué") {
        couleur = "#4caf4f"
    }
    if (statut === "bloqué") {
        couleur = "#ff0000"
    }

    if (statut !== "bloqué" && statut !== "débloqué") {
        couleur = "#ccc"
    }

    return couleur;
}


function Action_client (statut) {

    let couleur = "";
    let action = "";
    let background = "";

    if (statut === "bloqué") {
        couleur = "#4caf4f";
        action = "débloquer";
        background = "rgba(76, 175, 79, 0.3)"
    }
    if (statut === "débloqué") {
        couleur = "#ff0000";
        action = "bloquer";
        background = "rgba(255, 0, 0, 0.3)"
    }

    return { couleur, action, background };
}



export { Couleur_Nom_Icon , Statut_client, Action_client};
