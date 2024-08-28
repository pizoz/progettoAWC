
async function checkLogin(){
    // controllo che esista un utente tra quelli registrati con le credenziali inserite
    let username = document.getElementById("username").value;
    let password = document.getElementById("exampleInputPassword1").value;

    let users = JSON.parse(localStorage.getItem("RegisteredUsers"));

    for(let i=0; i<users.length; i++){
        
        if(users[i].username == username && users[i].password == password){

            localStorage.setItem("logged", "true");
            localStorage.setItem("LoggedUser", username);
            setTimeout(function() {
                window.location.href = localStorage.getItem("oldPage");
            });
            return;
        }
   }
    alert("Username o password errati", "danger");
   window.location.reload();
}
