// funzione per la registrazione
function signup() {
    // salvo i valori di tutti i campi della form
    var email = document.getElementById("exampleInputEmail1").value;
    var nome = document.getElementById("nome").value;
    var cognome = document.getElementById("cognome").value;
    var datadinascita = document.getElementById("datadinascita").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmpassword").value;


    // se le password non coincidono, mostro un alert
    if (password != confirmPassword) {
        alert("Le password non coincidono");
        return;
    };
    
    // se l'username è già in uso, mostro un alert

    let users = JSON.parse(localStorage.getItem("RegisteredUsers"));
    users.forEach(user => {
        if (user.username == username) {
            alert("Username già in uso");
            return;
        }
    });

    // se l'email è già in uso, mostro un alert
    users.forEach(user => {
        if (user.email == email) {
            alert("Email già in uso");
            return;
        }
    });
    // altrimenti, salvo l'utente in localStorage e ne creo il ricettario
    let user = {
        "username": username,
        "password": password,
        "email": email,
        "nome": nome,
        "cognome": cognome,
        "dataNascita": datadinascita
    };
    let ricettario = {
        "username": username,
        "ricette": []
    }
    // aggiungo l'utente e il ricettario a localStorage. Salvo l'utente loggato e lo reindirizzo alla pagina precedente
    let ricettari = JSON.parse(localStorage.getItem("Ricettari")) || [];
    ricettari.push(ricettario);
    localStorage.setItem("Ricettari", JSON.stringify(ricettari));
    users.push(user);
    localStorage.setItem("RegisteredUsers", JSON.stringify(users));
    localStorage.setItem("LoggedUser", username);
    localStorage.setItem("logged", "true");
    window.history.go(-1);
}
function checkLogged() {
    if (localStorage.getItem("logged") == "true") {
        window.location.href = "../Homepage/homepage.html";
    }
}