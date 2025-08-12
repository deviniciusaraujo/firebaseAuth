//importa as funções necessatias do firebase 
import { initializeApp } from ""
import { getAuth, GoogleProvider, signInWithPopup, signOut,
onAuthStateChanged, createUserWithEmailAndPassword,
signInWithEmailAndPassword } from ""
import { getFiretore, setDoc, doc } from ""

//configuração do firebase

//inicializa o firebase
const app = initializeApp(firebaseConfig)

//função para exibir mensagens temporárias na interface
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId)
    messageDiv.style.display = "block"
    messageDiv.innerHTML = message
    messageDiv.style.opacity = 0
    setTimeout(function() {
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
    .catch((error) => {
        const errorCode = error.code
    })
})

// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/deviniciusaraujo/firebaseAuth.git
// git push -u origin main