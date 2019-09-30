let comptnum = document.getElementById("numdep");

// Diminue le compteur jusqu'à 0
function decompte() {
    // Conversion en nombre(de départ) du texte du compteur
    let compteur = Number(comptnum.textContent);        
    comptnum.textContent = compteur - 1;
    if (compteur > 1) {
        comptnum.textContent = compteur - 1;
    } else {
        // Annule l'exécution répétée
        clearInterval(comptRebours);
        // Modifie le titre de la page
        let noms = `${prenom}`;
        comptnum.textContent = `${prenom}`;
    }
}


// Appelle la fonction decompte toutes les secondes (1000 millisecondes)
let comptRebours = setInterval(decompte, 1000);

//test de prompt et alert
/*let prenom = prompt("Entrez votre 1er prénom :");
alert(`Bonjour, ${prenom}`);*/
