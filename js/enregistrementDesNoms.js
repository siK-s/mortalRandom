// La variable 'registerStudiants' permet d'accéder à la balise <form> dont l'id est 'registerStudiants'
let registerStudiants = document.getElementById('registerStudiants');

// Fonction de création d'input
function createInput(elt, typ, txt) {
    let element = document.createElement(elt);
    element.type = typ;
    switch (typ) {
        case 'text':
            element.placeholder = txt;
            element.classList.add('studiant');
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

/* Un random de 0 à 2 nous donne des index de 0, 1, 2, cad, 3 chiffres pour un tableau de 2 élements), on utilise la fonction math.floor pour éviter de tomber sur le numéro max */
function findIndex(n) { return Math.floor(Math.random() * n); }

/*************************************************************************************************** */
const colorTab = ["#4263eb", "#1c7ed6", "#5c7cfa", "#339af0", '#7048e8', '#5f3dc4'];
function changeColor() {
    let indexColor = findIndex(colorTab.length);
    result.style.backgroundColor = colorTab[indexColor];
}

/*************************************************************************************************** */

let saveBtn = document.getElementById('saveBtn'); // bouton qui permet d'enregistrer le nombre d'élèves
if(saveBtn) {
    saveBtn.addEventListener('click', saveNbEleves);
}

let nbEleves;
let btnRegisterName; // bouton d'enregistrement des noms
let fieldsetElt; // déclaration de la variable de création du fieldset qui regroupera les champs de saisi des noms
let modifyBtn;
let formRegisterStudiants = document.createElement('form'); // Fromulaire d'enregistrement des étudiants
formRegisterStudiants.id = 'formRegisterStudiants';
document.querySelector('main').appendChild(formRegisterStudiants);

function saveNbEleves(e) {
    /************************************************* */
    nbEleves = document.getElementById('nbEleves').value;
    if ((nbEleves > 0) && (nbEleves <=10)) {
        modifyBtn = createInput('input', 'submit', "Modifier");
        document.querySelector('.registerNumStudiants div').replaceChild(modifyBtn, saveBtn);
        modifyBtn.addEventListener('click', modifyNbEleves);
        //console.log(nbEleves, 'save nb élèves');
        fieldsetElt = document.createElement('fieldset'); // Création d'un conteneur qui regroupe les input d'enregistrement des noms
        fieldsetElt.id = 'studiantFieldsetElt';
        formRegisterStudiants.appendChild(fieldsetElt); // ajout du fieldset dans le form
        let legendElt = document.createElement('legend');// creation de la balise legend
        legendElt.textContent = "Nom des élèves";
        fieldsetElt.appendChild(legendElt); // ajout de la légende dans la balise fieldset
        let errorFormRegisterStudiants = document.createElement('p');
        errorFormRegisterStudiants.style.color = 'chartreuse';
        errorFormRegisterStudiants.id = 'errorFormRegisterStudiants';
        fieldsetElt.appendChild(errorFormRegisterStudiants);

        // Création et ajout des champs de saisi des noms des élèves
        for (let i = 0; i < nbEleves; i++) {
            let inputElt = createInput('input', 'text', "Nom de l'élève");
            fieldsetElt.appendChild(inputElt);
        }
        // création et ajout du bouton d'enregistrement
        btnRegisterName = createInput('input', 'submit', 'Enregistrer');
        btnRegisterName.id = 'btnRegisterName';
        document.getElementById('formRegisterStudiants').appendChild(btnRegisterName);
        btnRegisterName.addEventListener('click', regisrerNames);
    } else if (nbEleves >= 10) {
        //console.log("Vous pouvez saisir un nombre maximal de 10 élèves");
        //alert("Vous ne pouvez pas saisir plus de 10 élèves !");
        document.getElementById('errorNbEleves').textContent = "Vous ne pouvez pas saisir plus de 10 élèves !";
    } else {
        //alert("Merci de saisir un nombre d'élève");
        document.getElementById('errorNbEleves').textContent = "Merci de saisir un nombre d'élèves valide !";
    }

    e.preventDefault(); // Annulation de l'envoi des données
}

function modifyNbEleves(e) {
    let nStudiants = document.querySelectorAll("input[type='text").length;
    //console.log(nStudiants);
    for (let el = 0; el < nStudiants.length; el++) {
        let name = nbEleves[el].value
        if (name !== "") {
            nbEleves[el].value = name;
        }
    }
    nStudiants = nStudiants - 1; // On supprime les input qui correspondent au type submit
    let newNbEleves = Number(document.getElementById('nbEleves').value);
    let nbModify;
    // console.log(nStudiants);
    // console.log(newNbEleves); 
    if (nStudiants !== newNbEleves) {
        if (nStudiants > newNbEleves) {
            nbModify = nStudiants - newNbEleves;
            //console.log('Supprimer', nbModify, 'input');
            let studiantFieldsetElt = document.getElementById('studiantFieldsetElt');
            for (let s = 0; s < nbModify; s++) {
                studiantFieldsetElt.removeChild(studiantFieldsetElt.childNodes[nStudiants-s]);
            }
        } else {
            nbModify = newNbEleves - nStudiants;
            if (newNbEleves >= 11) {
                // console.log("Vous pouvez saisir un nombre maximal de 10 élèves");
                // alert("Vous ne pouvez pas saisir plus de 10 élèves !");
                document.getElementById('errorNbEleves').textContent = "Vous ne pouvez pas saisir plus de 10 élèves !";
            } else {
                //console.log('Ajouter', nbModify, 'input');
                for (let a = 0; a < nbModify; a++) {
                    let inputElt = createInput('input', 'text', "Nom de l'élève");
                    document.getElementById('studiantFieldsetElt').appendChild(inputElt);
                }
            }
        }
    }
    btnRegisterName.style.display = 'inline-block';//on masque le bouoton d'enregistrement des noms

   e.preventDefault(); // Annulation de l'envoi des données
}

// Tableau initial
let uncalledNames = [];
// Déclaration de la variable de séléction du nom d'un éléève
let btnSelectName = createInput('input', 'submit', 'Sélectionner un nom');
btnSelectName.id = 'btnSelectName';

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
        document.getElementById('formRegisterStudiants').style.display = 'none';

        // Ajout du bouton de sélection des noms
        document.getElementById('result').appendChild(btnSelectName);
        document.getElementById('btnSelectName').addEventListener('click', decrementNbEleves);

   
        db.collection('users').doc(getCurrentUserId()).set({
            names: uncalledNames
        });

    } else {
        //alert("Tous les champs doivent être remplis!");
        document.getElementById('errorFormRegisterStudiants').textContent = 'Tous les champs doivent être remplis !';
    }

    e.preventDefault(); // Annulation de l'envoi des données
}

// la variable result permet de selectionner la balise qui affichera le nom de l'élève selectionné
let result = document.getElementById('result');
let intervalId = null;

// Déclaration du tableau contenant les noms qui ont été appelé
let calledNames = [];
let indexColor;

function compter(){
    
    if (result.textContent > 1) {
        result.textContent -= 1;
    } else {
        nbEleves = uncalledNames.length;
        //console.log(nbEleves);
        //console.log(uncalledNames, "Avant d'avoir été appelé");
        const index = findIndex(nbEleves);
        //console.log(index, "index de l'élève qui a été séléctionné");
        //console.log(uncalledNames[index], "Nom de l'élève selectionné");
        
        // Annule l'exécution répétée
        clearInterval(intervalId);

        // Affichage du nom de l'élève dans la balise
        result.textContent = uncalledNames[index];
    
        // Appel de la fonction qui change la couleur de fond
        changeColor();
        
        // insertion du nom séléctionné dans le tableau 'calledNames'
        calledNames.push(uncalledNames[index]);

        // supression du nom de cet élève dans le tableau initial
        uncalledNames.splice(index, 1);
        //console.log(uncalledNames, "Après avoir été appelé");
        nbEleves--;

        //Création et ajout du bouton de sélection des noms
        btnSelectName = createInput('input', 'submit', 'Sélectionner un nom');
        btnSelectName.id = 'btnSelectName';
        document.getElementById('result').appendChild(btnSelectName);
        document.getElementById('btnSelectName').addEventListener('click', decrementNbEleves);
    }
}

function decrementNbEleves(e) {
    
    if(nbEleves > 0) {
        // initialisation du compte à rebour à 3
        result.textContent = 3;
        // Appelle la fonction compter() pour le compte à rebour
        intervalId = setInterval(compter, 1000);
    } else {
        //alert("Tous les élèves ont été appelé au moins une fois!");
        let pEltMessage = document.createElement('p');
        pEltMessage.style.fontSize = '1rem';
        pEltMessage.style.margin = 0;
        pEltMessage.style.color = 'cyan';
        pEltMessage.textContent = 'Tous les élèves ont été appelé au moins une fois !';
        document.getElementById('result').appendChild(pEltMessage);

        // Une fois que tous les élèves ont été appelé au moins une fois, on re-remplit le tableau 'uncalledNames' avec les noms qui on été appelé...
        calledNames.forEach(function(name, index) {
            uncalledNames[index] = name;
        });
        //... et on vide le tableau des noms appelés pour recommencer le random...
        calledNames = [];

        //...puis on réinitialise la valeur du nombre d'élèves pour qu'il ait à nouveau la valeur de la longueur du tableau
        nbEleves = uncalledNames.length;
        //console.log(nbEleves);
        //console.log("Tous les élèves ont été appelé au moins une fois!");
    }

    e.preventDefault(); // Annulation de l'envoi des données
}
