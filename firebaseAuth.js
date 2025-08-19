//importa as funções necessatias do firebase 
//importa as funções necessatias do firebase 
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js"
import { getAuth, GoogleProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js"
import { getFiretore, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js"

//configuração do firebase
const firebaseConfig = {
    apiKey: "AIzaSyDniwR1JWARqDFg40hEdF4BvXhjNNuAxyo",
    authDomain: "openidconnect-3e4a0.firebaseapp.com",
    projectId: "openidconnect-3e4a0",
    storageBucket: "openidconnect-3e4a0.firebasestorage.app",
    messagingSenderId: "188787300177",
    appId: "1:188787300177:web:c3e89fb7e54835ab282570"
  };

//inicializa o firebase
const app = initializeApp(firebaseConfig)

//função para exibir mensagens temporárias na interface
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId)
    messageDiv.style.display = "block"
    messageDiv.innerHTML = message
    messageDiv.style.opacity = 0
    setTimeout(function () {
        messageDiv.style.opacity = 0
    }, 5000) // a mensagem desaparece após 5 segundos
}

//lógica de cadastro de novos usuários
const signUp = document.getElementById('submitSignUp')
signUp.addEventListener('click', (event) => {
    event.preventDefault() //previne o comportamento padrão do botão

    //adicionar os dados do formulario de cadastro
    const email = document.getElementById('rEmail').value
    const password = document.getElementById('rPassword').value
    const firstName = document.getElementById('rName').value
    const lastName = document.getElementById('rName').value

    const auth = getAuth() //configura o serviço de autenticação
    const db = getFiretore() //conecta ao firestore

    //cria uma conta com email e senha
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user //usuario autenticado
            const userData = { email, firstName, lastName } //dados do
            //usuario para salvar

            // exibe mensagem de sucesso
            showMessage('Conta criada com sucesso', 'signUpMessage')

            //salva os dados do usuario no firestore
            const docRef = doc(db, "users", user.uid)
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = "index.html" //redireciona para a
                    //pagina de login após cadastro
                })
                .catch((error) => {
                    console.error("Error writting document", error)
                })
        })
        .catch(error => {
            const errorCode = error.code;
            if (errorCode == "auth/email-already-in-use") {
                showMessage("Endereço de email já existe", "signUpMessage");
            } else {
                showMessage("Não é possível criar usuário", "signUpMessage");
            }
        });
});

const signIn = document.getElementById("submitSignIn");
signIn.addEventListener("click", event => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();

    //Realiza o login com email e senha
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('usuário logado com sucesso', 'signInMessage'); //exibe mensagem de sucesso
            const user = userCredential.user; //usuario autenticado

            // Salva o ID no localStorage
            localStorage.setItem('loggedInUserId', user.uid);

            window.location.href = 'homepage.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-credential") {
                showMessage("Email ou Senha incorreta", "signInMessage");
            } else {
                showMessage("Essa conta não existe", "signInMessage");
            }
        });
});