let registerStudiants = document.getElementById('registerStudiants'); // formulaire

// fonction qui permet de selectionner un nombre aléatoire qui correspond à un index du tableau
function getRandomArbitrary(min, max) {
    return Math.random()*(max - min) + min;
}
/* Un random de 0 à 2 nous donne des index de 0, 1, 2, cad, 3 chiffres pour un tableau de 2 élements)
Avec la fonction findMaxNum(), on réduit le nombre maximun de 0.01 pour éviter d'avoir un index 
de trop lors de la sélection de l'index de l'élève. Et avec la méthode Math.floor, on arrondit à la valeur inférieur */
function findMaxNum(n) { return (n - .01); }
function findIndex(n) { return Math.floor(getRandomArbitrary(0, n)); }

let saveBtn = document.getElementById('saveBtn'); // bouton qui permet d'enregistrer le nombre d'élèves
saveBtn.addEventListener('click', saveNbEleves);

let nbEleves;
let btnRegisterName; // déclaration de la variable du bouton d'enregistrement des noms
// déclaration de la variable de création du fieldset qui regroupera les champs de saisi des noms
let fieldsetElt;
function saveNbEleves(e) {
    nbEleves = findMaxNum(document.getElementById('nbEleves').value);
    if (nbEleves > 0) {
        //on desactive le bouton de validation du nombre d'élève
        saveBtn.disabled = true;
        
        console.log(nbEleves, 'save nb élèves');
        fieldsetElt = document.createElement('fieldset'); // Création d'un conteneur qui regroupe les input d'enregistrement des noms
        registerStudiants.appendChild(fieldsetElt); // ajout du fieldset dans le form
        let legendElt = document.createElement('legend');// creation de la balise legend
        legendElt.textContent = "Nom des élèves";
        fieldsetElt.appendChild(legendElt); // ajout de la légende dans la balise fieldset

        // Création et ajout des champs de saisi des noms des élèves
        for (let i = 0; i < nbEleves; i++) {
            let inputElt = document.createElement('input');
            inputElt.type = 'text';
            inputElt.placeholder = "Nom de l'élève";
            fieldsetElt.appendChild(inputElt);
        }
        // création et ajout du bouton d'enregistrement
        btnRegisterName = document.createElement('button');
        btnRegisterName.id = 'btnRegisterName';
        btnRegisterName.textContent = 'Enregistrer';
        fieldsetElt.appendChild(btnRegisterName);
        document.getElementById('btnRegisterName').addEventListener('click', regisrerNames);
    }
    
    e.preventDefault(); // Annulation de l'envoi des données
}
// Tableau initial
// let uncalledNames = ["Hadibéré", "Mohammed S", "Sika", "Audrey", "Amel", "Hervé", "Salim", "Mohammed K", "Andréa", "Yannik"];
let uncalledNames = [];
// Déclaration de la variable de séléction du nom d'un éléève
let btnSelectName;

function regisrerNames(e) {

    let countValidInput = 0; // variable qui permet de vérifier si les champs sont rempli

    let names = document.querySelectorAll('fieldset input');
    
    //On verifie si les champs ne sont pas vide
    for (let i = 0; i < names.length; i++) {
        if (names[i].value != "") {
            countValidInput ++;
        }
    }
    //console.log(countValidInput);

    if (countValidInput === names.length) {
        // On désactive le bouton d'enregistrement des noms
        btnRegisterName.disabled = true;

        console.log(names.length);
        for (let n = 0; n < names.length; n++) {
            //console.log(names[n].value);
            uncalledNames[n] = names[n].value;
        }
        console.log(uncalledNames, "Tableau des noms après l'enregistrement");

        //Création et ajout du bouton de sélection des noms
        btnSelectName = document.createElement('button');
        btnSelectName.id = 'btnSelectName';
        btnSelectName.textContent = 'Sélectionner un nom';
        fieldsetElt.appendChild(btnSelectName);
        document.getElementById('btnSelectName').addEventListener('click', decrementNbEleves);
    } else {
        console.log("Tous les champs ne sont pas remplis!")
    }

    e.preventDefault(); // Annulation de l'envoi des données
}

// Talbeau des après avoir sélectionné un élève
let calledNames = [];

function decrementNbEleves(e) {
    if(nbEleves > 0) {
        console.log(uncalledNames, "Avant d'avoir été appelé");
        const index = findIndex(nbEleves);
        console.log(index, 'index');
        console.log(uncalledNames[index]);
        uncalledNames.splice(index, 1);
        console.log(uncalledNames, "Après avoir été appelé");
        nbEleves--;
    }

    e.preventDefault(); // Annulation de l'envoi des données
}