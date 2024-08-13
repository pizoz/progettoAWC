function signup() {
    var email = document.getElementById("exampleInputEmail1").value;
    var nome = document.getElementById("nome").value;
    var cognome = document.getElementById("cognome").value;
    var datadinascita = document.getElementById("datadinascita").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmpassword").value;

    if (password != confirmPassword) {
        alert("Le password non coincidono");
        return;
    };
    let users = JSON.parse(localStorage.getItem("RegisteredUsers"));
    users.forEach(user => {
        if (user.username == username) {
            alert("Username già in uso");
            return;
        }
    });
    let user = {
        "username": username,
        "password": password,
        "email": email,
        "nome": nome,
        "cognome": cognome,
        "datadinascita": datadinascita
    };
    console.log(user);
    users.push(user);
    localStorage.setItem("RegisteredUsers", JSON.stringify(users));
    localStorage.setItem("LoggedUser", username);
    localStorage.setItem("logged", "true");
    window.location.href = localStorage.getItem("oldPage");
}