// La variable 'registerStudiants' permet d'accéder à la balise <form> dont l'id est 'registerStudiants'
let registerStudiants = document.getElementById('registerStudiants');

// Fonction de création d'input
function createInput(elt, typ, txt) {
    let element = document.createElement(elt);
    element.type = typ;
    switch (typ) {
        case 'text':
            element.placeholder = txt;
            break;
        case 'submit':
            element.value = txt;
            break;
        default:
            element.value = txt;
            break;
    }
    return element;
}

/*************************************************************************************************** */
const colorTab = ["#4263eb", "#1c7ed6", "#5c7cfa", "#339af0", '#7048e8', '#5f3dc4'];
let maxIndexColor = colorTab.length - .01;
function changeColor() {
    let indexColor = findIndex(maxIndexColor);
    result.style.backgroundColor = colorTab[indexColor];
    //console.log(indexColor);
}
/*************************************************************************************************** */ 

// fonction qui permet de selectionner un nombre aléatoire qui correspond à un index du tableau
function getRandomArbitrary(min, max) { return Math.random()*(max - min) + min; }
/* Un random de 0 à 2 nous donne des index de 0, 1, 2, cad, 3 chiffres pour un tableau de 2 élements), on réduit le nombre maximun de 0.01 pour éviter d'avoir un index de trop lors de la sélection de l'index de l'élève, et, avec la méthode Math.floor, on arrondit ce nombre max à la valeur inférieur */
function findIndex(n) { return Math.floor(getRandomArbitrary(0, n)); }

let saveBtn = document.getElementById('saveBtn'); // bouton qui permet d'enregistrer le nombre d'élèves
saveBtn.addEventListener('click', saveNbEleves);

let nbEleves;
let btnRegisterName; // bouton d'enregistrement des noms
let fieldsetElt; // déclaration de la variable de création du fieldset qui regroupera les champs de saisi des noms
let formRegisterStudiants = document.createElement('form'); // Fromulaire d'enregistrement des étudiants
formRegisterStudiants.id = 'formRegisterStudiants';
document.querySelector('main').appendChild(formRegisterStudiants);
let modifyBtn;
function saveNbEleves(e) {
    /************************************************* */
    nbEleves = document.getElementById('nbEleves').value;
    if ((nbEleves > 0) && (nbEleves <=10)) {
        modifyBtn = createInput('input', 'submit', "Modifier");
        document.querySelector('.registerNumStudiants').replaceChild(modifyBtn, saveBtn);
        modifyBtn.addEventListener('click', modifyNbEleves);
        //console.log(nbEleves, 'save nb élèves');
        fieldsetElt = document.createElement('fieldset'); // Création d'un conteneur qui regroupe les input d'enregistrement des noms
        fieldsetElt.id = 'studiantFieldsetElt';
        formRegisterStudiants.appendChild(fieldsetElt); // ajout du fieldset dans le form
        let legendElt = document.createElement('legend');// creation de la balise legend
        legendElt.textContent = "Nom des élèves";
        fieldsetElt.appendChild(legendElt); // ajout de la légende dans la balise fieldset

        // Création et ajout des champs de saisi des noms des élèves
        for (let i = 0; i < nbEleves; i++) {
            let inputElt = createInput('input', 'text', "Nom de l'élève");
            fieldsetElt.appendChild(inputElt);
        }
        // création et ajout du bouton d'enregistrement
        btnRegisterName = createInput('input', 'submit', 'Enregistrer');
        btnRegisterName.id = 'btnRegisterName';
        document.getElementById('formRegisterStudiants').appendChild(btnRegisterName);
        document.getElementById('btnRegisterName').addEventListener('click', regisrerNames);
    } else if (nbEleves >= 10) {
        //console.log("Vous pouvez saisir un nombre maximal de 10 élèves");
        alert("Vous ne pouvez pas saisir plus de 10 élèves !");
        nbEleves = 9.99;
    } else {
        alert("Merci de saisir un nombre d'élève");
    }

    e.preventDefault(); // Annulation de l'envoi des données
}

function modifyNbEleves(e) {
    let nbEleves = document.querySelectorAll('input').length;
    //console.log(nbEleves);
    for (let el = 0; el < nbEleves.length; el++) {
        let name = nbEleves[el].value
        if (name !== "") {
            nbEleves[el].value = name;
        }
    }
    nbEleves = nbEleves - 3; // On supprime les input qui correspondent au type submit
    let newNbEleves = Number(document.getElementById('nbEleves').value);
    let nbModify;
    // console.log(nbEleves);
    // console.log(newNbEleves); 
    if (nbEleves === newNbEleves) {
        console.log('On ne fait rien');
    } else if (nbEleves > newNbEleves) {
        nbModify = nbEleves - newNbEleves;
        console.log('Supprimer', nbModify, 'input');
        let studiantFieldsetElt = document.getElementById('studiantFieldsetElt');
        for (let s = 0; s < nbModify; s++) {
            studiantFieldsetElt.removeChild(studiantFieldsetElt.childNodes[nbEleves-s]);
        }
    } else {
        nbModify = newNbEleves - nbEleves;
        console.log('Ajouter', nbModify, 'input');
        for (let a = 0; a < nbModify; a++) {
            let inputElt = createInput('input', 'text', "Nom de l'élève");
            document.getElementById('studiantFieldsetElt').appendChild(inputElt);
        }
    }
    btnRegisterName.style.display = 'inline-block';//on masque le bouoton d'enregistrement des noms
    if (btnSelectName) {
        btnSelectName.style.display = 'none';
    }

    e.preventDefault(); // Annulation de l'envoi des données
}
// Tableau initial
let uncalledNames = [];
// Déclaration de la variable de séléction du nom d'un éléève
let btnSelectName;

// la variable result permet de selectionner la balise qui affichera le nom de l'élève selectionné
let result = document.getElementById('result');

function regisrerNames(e) {
    
    let countValidInput = 0; // variable qui permet de vérifier si les champs sont rempli
    // La variable names permettra de séléctionner tous les champs (input) contenant le nom des éléèves
    let names = document.querySelectorAll('fieldset input[type=text]');
    
    //On verifie si les champs ne sont pas vide
    for (let i = 0; i < names.length; i++) {
        if (names[i].value != "")
            countValidInput ++;
    }
    //console.log(countValidInput);

    if (countValidInput === names.length) {
        // On désactive le bouton d'enregistrement des noms
        btnRegisterName.disabled = true;

        // On rempli le tableau 'uncalledNames' avec le nom des élèves qui ont été saisi dans les input
        //on commence à 1 pour ne pas tenir compte de l'input où l'on saisi du nombre d'élèves
        for (let n = 1; n < names.length; n++) {
            //console.log(names[n].value);
            uncalledNames[n-1] = names[n].value;
        }
        //console.log(uncalledNames, "Tableau des noms après l'enregistrement");
        btnRegisterName.style.display = 'none';//on masque le bouoton d'enregistrement des noms

        result.style.position = 'absolute';
        result.style.height = '100vh';
        result.style.top = '0';
        result.style.backgroundColor = 'cornflowerblue';

        //Création et ajout du bouton de sélection des noms
        btnSelectName = createInput('input', 'submit', 'Sélectionner un nom');
        btnSelectName.id = 'btnSelectName';
        document.getElementById('result').appendChild(btnSelectName);
        document.getElementById('btnSelectName').addEventListener('click', decrementNbEleves);
        
    } else {
        alert("Tous les champs doivent être remplis!")
    }

    e.preventDefault(); // Annulation de l'envoi des données
}

function decrementNbEleves(e) {
    
    nbEleves = uncalledNames.length - .01;
    console.log(nbEleves);
    if(nbEleves > 0) {
        console.log(uncalledNames, "Avant d'avoir été appelé");
        const index = findIndex(nbEleves);
        console.log(index, "index de l'élève qui a été séléctionné");
        console.log(uncalledNames[index], "Nom de l'élève selectionné");
        
        // Affichage du nom de l'élève dans la balise <p>
        result.textContent = uncalledNames[index];
        changeColor();

        // supression du nom de cet élève dans le tableau initial
        uncalledNames.splice(index, 1);
        //console.log(uncalledNames, "Après avoir été appelé");
        nbEleves--;

        //Création et ajout du bouton de sélection des noms
        btnSelectName = createInput('input', 'submit', 'Sélectionner un nom');
        btnSelectName.id = 'btnSelectName';
        document.getElementById('result').appendChild(btnSelectName);
        document.getElementById('btnSelectName').addEventListener('click', decrementNbEleves);
    } else {
        alert("Tous les élèves ont été appelé au moins une fois!");
    }

    e.preventDefault(); // Annulation de l'envoi des données
}