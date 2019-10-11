let firebaseConfig = {
    apiKey: "AIzaSyCd1K2rlAb0clWFB5WktJgTEZcBQhYChys",
    authDomain: "mortalrandom-233c5.firebaseapp.com",
    databaseURL: "https://mortalrandom-233c5.firebaseio.com",
    projectId: "mortalrandom-233c5",
    storageBucket: "",
    messagingSenderId: "588166743285",
    appId: "1:588166743285:web:2484c9a825ea5f625a71bc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');
const btnSign = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');
const form = document.querySelector('form');

const accueil = document.getElementById('section-accueil');
const profil = document.getElementById('section-profil');


profil.style.display = "none";



btnLogin.addEventListener('click', () => {
   const email = txtEmail.value;
   const pass = txtPassword.value;
   const auth = firebase.auth();

   const promise = auth.signInWithEmailAndPassword(email , pass);
   promise.catch(e => {
        document.getElementById('error').style.display = "block"
        document.getElementById('error').innerHTML = e.message
        setTimeout(function() {
            document.getElementById('error').style.display = "none"
        },2000);
   });
   
});


btnSign.addEventListener('click', () => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email , pass);
    promise.catch(e => {
        console.log(e.message)
        document.getElementById('error').style.display = "block"
        document.getElementById('error').innerHTML = e.message
        setTimeout(function() {
            document.getElementById('error').style.display = "none"
        },2000);
    });
})



if(btnLogout) {
    btnLogout.addEventListener('click', () => {
        firebase.auth().signOut().then(() => {
            console.log("Deconnexion reussie !");
            accueil.style.display = "";
            profil.style.display = "none";
        }).catch(() => {
            console.log("une erreur est survenue");
        });
    })
}

const list = document.querySelector('ul');


firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        const userId = getCurrentUserId();
        db.collection('users').doc(getCurrentUserId()).get().then(doc => {
            user = doc.data();
            let result = user.names;
            result.forEach(elem => {
                list.innerHTML += `
                <li>
                 ${elem}
                </li>`
            });
            if (!user) {
            db.collection('users').doc(userId).set({
                names: []
                });
            }
        })
    accueil.style.display = "none";
    profil.style.display = "";  
    } 
});

/*
db.collection('users').doc(getCurrentUserId()).get().then((namesStud) => {
    namesStud.docs.forEach(name => {
        addElem(name.data())
    });
}).catch((err) => {
   console.log("Error")
})
*/


const getCurrentUserId = () => firebase.auth().currentUser.uid;

form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(form.addName.value);

    db.collection('users').doc(getCurrentUserId()).update({
        names: firebase.firestore.FieldValue.arrayUnion(form.addName.value)
    }).then(()=> {
        console.log("data add !");
    }).catch((e)=> {
        console.log(e.message);
    })  
})





   




 