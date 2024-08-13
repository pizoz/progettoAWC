function eliminaProfilo() {
    var r = confirm("Sei sicuro di voler eliminare il tuo profilo?");
    if (r == true) {
        let users = JSON.parse(localStorage.getItem("RegisteredUsers"));
        let currentUser =localStorage.getItem("LoggedUser");
        for (let i = 0; i < users.length; i++) {
            if (users[i].username == currentUser) {
                users.pop(users[i]);
                localStorage.setItem("RegisteredUsers", JSON.stringify(users));
                localStorage.setItem("LoggedUser", "");
                localStorage.setItem("logged", "false");
                window.location.href = "../Homepage/homepage.html";
            }
        }
    } else {
        window.location.reload
    }
    
}
function stampa() {
    let utente = localStorage.getItem("LoggedUser");
    let users = JSON.parse(localStorage.getItem("RegisteredUsers"));
    let user = users.find(user => user.username == utente);
    document.getElementById("username").innerHTML += " "+user.username;
    document.getElementById("email").innerHTML += " "+user.email;
    document.getElementById("nome").innerHTML += " "+user.nome;
    document.getElementById("cognome").innerHTML += " "+user.cognome;
    document.getElementById("datanascita").innerHTML += " "+user.datadinascita;

    let password = document.getElementById("password")
    password.innerHTML += " ";
    for (let i = 0; i < 7; i++) {
        password.innerHTML += '\u2022';
    }
}

function showPassword() {
    var x = document.getElementById("password");
    let link = document.getElementById("link");
    let utente = localStorage.getItem("LoggedUser");
    let users = JSON.parse(localStorage.getItem("RegisteredUsers"));
    let user = users.find(user => user.username == utente);
    x.innerHTML = "<strong>Password</strong>: "+user.password;
    let occhio = document.getElementById("occhio");
    occhio.classList.remove("bi-eye-fill");
    occhio.classList.add("bi-eye-slash-fill");
    link.setAttribute("onclick", "hidePassword()");
}

function hidePassword() {
    
    var x = document.getElementById("password");
    let link = document.getElementById("link");
    x.innerHTML = "<strong>Password</strong>: ";
    for (let i = 0; i < 7; i++) {
        x.innerHTML += '\u2022';
        
    };
    
    let occhio = document.getElementById("occhio");
    console.log("ciao");
    occhio.classList.remove("bi-eye-slash-fill");
    occhio.classList.add("bi-eye-fill");
    link.setAttribute("onclick", "showPassword()");
}

function modificaProfilo() {
    let user = localStorage.getItem("LoggedUser");
    let users = JSON.parse(localStorage.getItem("RegisteredUsers"));
    let utente = users.find(utente => utente.username == user);
    let email = document.getElementById("emailform").value;
    let nome = document.getElementById("nomeform").value;
    let cognome = document.getElementById("cognomeform").value;
    let datanascita = document.getElementById("datanascitaform").value;
    let password = document.getElementById("passwordform").value;
    let confermapassword = document.getElementById("confermaPasswordform").value;
    if (password != confermapassword) {
        alert("Le password non corrispondono");
        return;
    }
    if (email == "") {
        email = utente.email;
    }
    if (nome == "") {
        nome = utente.nome;
    }
    if (cognome == "") {
        cognome = utente.cognome;
    }
    if (datanascita == "") {
        datanascita = utente.datadinascita;
    }
    if (password == "") {
        password = utente.password;
    }
    let utenteModificato = {
        "username": user,
        "password": password,
        "email": email,
        "nome": nome,
        "cognome": cognome,
        "datadinascita": datanascita
    }
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == user) {
            users[i] = utenteModificato;
            localStorage.setItem("RegisteredUsers", JSON.stringify(users));
            alert("Profilo modificato con successo");
            window.location.reload();
            hideForm();
        }
    }
    
}
function showForm() {
    let BoxProfilo = document.getElementById("BoxProfilo");
    let formModifica = document.getElementById("formModifica");
    BoxProfilo.style.display = "none";
    formModifica.removeAttribute("style");
}
function hideForm() {
    let BoxProfilo = document.getElementById("BoxProfilo");
    let formModifica = document.getElementById("formModifica");
    let modifica = document.getElementById("modifica");
    BoxProfilo.removeAttribute("style");
    formModifica.style.display = "none";
}