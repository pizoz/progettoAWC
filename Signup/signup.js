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

    // se un campo è vuoto, mostro un alert
    if (email == "" || nome == "" || cognome == "" || datadinascita == "" || username == "" || password == "" || confirmPassword == "") {
        alert("Compilare tutti i campi");
        return;
    }

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
    // altrimenti, salvo l'utente in localStorage e ne creo il ricettario, aggiorno le info di login e lo reindirizzo alla pagina precedente
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

    let ricettari = JSON.parse(localStorage.getItem("Ricettari")) || [];
    ricettari.push(ricettario);
    localStorage.setItem("Ricettari", JSON.stringify(ricettari));
    users.push(user);
    localStorage.setItem("RegisteredUsers", JSON.stringify(users));
    localStorage.setItem("LoggedUser", username);
    localStorage.setItem("logged", "true");
    window.location.href = localStorage.getItem("oldPage");
}