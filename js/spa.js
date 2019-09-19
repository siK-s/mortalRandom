/**************************************************/
/* querySelector retourne le premier Element (ID ou class) dans le document ( DOM )correspondant au sélecteur
/* La propriété style et un sous-objet contenant les attributs CSS de l'objet
/* La propriété display définit le type d'affichage utilisée pour le rendu d'un élément 
/**************************************************/
function affichagePage1() {
    document.querySelector("#section-accueil").style.display = "";  
    document.querySelector("#section-connexion").style.display = "none";
    document.querySelector("#section-inscription").style.display = "none";
    document.querySelector('#section-profil').style.display = "none";
}

function affichagePage2() {
    document.querySelector("#section-accueil").style.display = "none";
    document.querySelector("#section-connexion").style.display = "";
    document.querySelector("#section-inscription").style.display = "none";
    document.querySelector('#section-profil').style.display = "none";
}

function affichagePage3() {
    document.querySelector("#section-accueil").style.display = "none";
    document.querySelector("#section-connexion").style.display = "none";
    document.querySelector("#section-inscription").style.display = "";
    document.querySelector('#section-profil').style.display = "none";
}

function affichagePage4() {
    document.querySelector("#section-accueil").style.display = "none";
    document.querySelector("#section-connexion").style.display = "none";
    document.querySelector("#section-inscription").style.display = "none";
    document.querySelector('#section-profil').style.display = "";
}

affichagePage1() // Affichage de la page numéro 1