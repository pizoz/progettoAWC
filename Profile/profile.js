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
    // Stampa i dati dell'utente loggato
    let utente = localStorage.getItem("LoggedUser");
    let users = JSON.parse(localStorage.getItem("RegisteredUsers"));
    let user;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == utente) {
            user = users[i];
        }
    }
    console.log(user);
    document.getElementById("username").innerHTML += " "+user.username;
    document.getElementById("email").innerHTML += " "+user.email;
    document.getElementById("nome").innerHTML += " "+user.nome;
    document.getElementById("cognome").innerHTML += " "+user.cognome;
    document.getElementById("datanascita").innerHTML += " "+user.dataNascita;

    let password = document.getElementById("password")
    password.innerHTML += " ";
    for (let i = 0; i < 7; i++) {
        password.innerHTML += '\u2022';
    }
}

function showPassword() {
    // Mostra la password dell'utente
    var x = document.getElementById("password");
    let link = document.getElementById("link");
    let utente = localStorage.getItem("LoggedUser");
    // Ricavo la password dell'utente
    let users = JSON.parse(localStorage.getItem("RegisteredUsers"));
    let user = users.find(user => user.username == utente);
    x.innerHTML = "<strong>Password</strong>: "+user.password;
    // Cambio l'icona dell'occhio e il link
    let occhio = document.getElementById("occhio");
    occhio.classList.remove("bi-eye-fill");
    occhio.classList.add("bi-eye-slash-fill");
    link.setAttribute("onclick", "hidePassword()");
}

function hidePassword() {
    // Nasconde la password dell'utente
    var x = document.getElementById("password");
    let link = document.getElementById("link");
    // Inserisco i pallini
    x.innerHTML = "<strong>Password</strong>: ";
    for (let i = 0; i < 7; i++) {
        x.innerHTML += '\u2022';
        
    };
    // Cambio l'icona dell'occhio e il link
    let occhio = document.getElementById("occhio");
    console.log("ciao");
    occhio.classList.remove("bi-eye-slash-fill");
    occhio.classList.add("bi-eye-fill");
    link.setAttribute("onclick", "showPassword()");
}

function modificaProfilo() {
    // Ricavo i dati inseriti dall'utente
    let user = localStorage.getItem("LoggedUser");
    let users = JSON.parse(localStorage.getItem("RegisteredUsers"));
    let utente = users.find(utente => utente.username == user);
    let username = document.getElementById("usernameform").value;
    let email = document.getElementById("emailform").value;
    let nome = document.getElementById("nomeform").value;
    let cognome = document.getElementById("cognomeform").value;
    let datanascita = document.getElementById("datanascitaform").value;
    let password = document.getElementById("passwordform").value;
    let confermapassword = document.getElementById("confermaPasswordform").value;
    // Controllo che le password inserite siano uguali
    if (password != confermapassword) {
        alert("Le password non corrispondono");
        return;
    }
    if (username == "") {
        username = utente.username;
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
        datanascita = utente.dataNascita;
    }
    if (password == "") {
        password = utente.password;
    }
    // Creo un utente con i dati modificati
    let utenteModificato = {
        "username": username,
        "password": password,
        "email": email,
        "nome": nome,
        "cognome": cognome,
        "dataNascita": datanascita
    }
    // Aggiorno l'utente loggato e cambio il nome nelle sue recensioni
    localStorage.setItem("LoggedUser", username);    
    let recensioni = JSON.parse(localStorage.getItem("Recensioni"));
    for (let i = 0; i < recensioni.length; i++) {
        if (recensioni[i].username == user) {
            recensioni[i].username = username;
        }
    }
    let ricettari = JSON.parse(localStorage.getItem("Ricettari"));
    for (let i = 0; i < ricettari.length; i++) {
        if (ricettari[i].username == user) {
            ricettari[i].username = username;
        }
    }
    localStorage.setItem("Ricettari", JSON.stringify(ricettari));
    localStorage.setItem("Recensioni", JSON.stringify(recensioni));
    // Aggiorno l'utente negli utenti registrati
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
    // Nascondo il box del profilo e mostro il form per la modifica
    let BoxProfilo = document.getElementById("BoxProfilo");
    let formModifica = document.getElementById("formModifica");
    BoxProfilo.style.display = "none";
    formModifica.removeAttribute("style");
}

function hideForm() {
    // Nascondo il form e mostro il box del profilo
    let BoxProfilo = document.getElementById("BoxProfilo");
    let formModifica = document.getElementById("formModifica");
    let modifica = document.getElementById("modifica");
    BoxProfilo.removeAttribute("style");
    formModifica.style.display = "none";
}

async function getRicettario() {
    // Ricavo il ricettario dell'utente
    let user = localStorage.getItem("LoggedUser");
    let ricettari = JSON.parse(localStorage.getItem("Ricettari"));
    let ricettario = ricettari.find(ricettario => ricettario.username == user);
    console.log(ricettario);
    let ricette = ricettario.ricette;
    let box = document.getElementById("BoxRicettario");
    let row = document.getElementById("riga");
    row.setAttribute("style", "display: flex !important; justify-content: space-between !important;");
    if (ricette.length == 0) {
        let noRicette = document.createElement("h3");
        noRicette.classList.add("text-center","mb-5");
        noRicette.innerHTML = "Non hai ancora aggiunto ricette al tuo ricettario";
        box.appendChild(noRicette);
    }
    for (let i = 0; i < ricette.length; i++) {
        let ricetta = ricette[i];
        let id = ricetta.id;
        let nota = ricetta.nota;
        console.log(nota);
        let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id;
        let response = await fetch(url);
        let data = await response.json();
        let meal = data.meals[0];
        
        let col = document.createElement("div");
        col.classList.add("col-md-4");
        let card = document.createElement("div");
        card.classList.add("card","bg-custom-1");
        let img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = meal.strMealThumb;
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        let title = document.createElement("h5");
        title.classList.add("card-title");
        title.innerHTML = "<strong>"+meal.strMeal+"</strong>";
        let descrizione = document.createElement("p");
        descrizione.classList.add("card-text");
        descrizione.innerHTML = "<strong>Category</strong>: "+ meal.strCategory;

        let valutazione = document.createElement("p");
        let recensioni = localStorage.getItem("Recensioni");
        let array_recensioni = JSON.parse(recensioni);
        let somma = 0;
        let difficolta = 0
        let count = 0;
        array_recensioni.forEach(recensione => {
            if (recensione.idRicetta == id) {
                difficolta += parseInt(recensione.difficolta);
                somma += parseInt(recensione.voto);
                count++;
            }
        });
        let mediavera = 0;
        let difficoltavera = 0;
        // let mediavera = Math.random() * 5;
        if (count != 0) {
            difficolta = difficolta / count;
            mediavera = somma / count;
        }
        difficoltavera = Math.round(difficolta);
        let media = Math.round(mediavera);
        valutazione.innerHTML = "<b>Gusto</b>: ";
        for (let i = 0; i < 5; i++) {
            if (i< media) {
                let star = document.createElement("i");
                star.classList.add("bi", "bi-star-fill");
                valutazione.appendChild(star);
            } else {
                let star = document.createElement("i");
                star.classList.add("bi", "bi-star");
                valutazione.appendChild(star);
            };
        };
        

        let valutazionedifficolta = document.createElement("p");
        valutazionedifficolta.innerHTML = "<b>Difficoltà</b>: ";
        for (let i = 0; i < 5; i++) {
            if (i < difficoltavera) {
                let star = document.createElement("i");
                star.classList.add("bi", "bi-star-fill");
                valutazionedifficolta.appendChild(star);
            } else {
                let star = document.createElement("i");
                star.classList.add("bi", "bi-star");
                valutazionedifficolta.appendChild(star);
            };
        };
        let notaElement = document.createElement("p");
        if(nota != undefined && nota != "") {
            notaElement.innerHTML = "<b>Nota</b>: "+nota;
            ;
        }

        let link = document.createElement("button");
        link.classList.add("btn");
        link.classList.add("btn-primary","mb-2");
        link.innerHTML = "Visualizza";
        link.id = "visualizza";
        link.setAttribute("onclick","window.location.href='../Ricetta/ricetta.html?id="+id+"'");
        let removebutton = document.createElement("button");
        removebutton.classList.add("btn");
        removebutton.classList.add("btn-primary");
        removebutton.id = "rimuovi";
        removebutton.innerHTML = "Rimuovi";
        removebutton.setAttribute("onclick", "rimuoviRicetta("+id+")");

        cardBody.appendChild(title);
        cardBody.appendChild(descrizione);
        cardBody.appendChild(valutazione);
        cardBody.appendChild(valutazionedifficolta);
        cardBody.appendChild(notaElement)
        cardBody.appendChild(link);
        cardBody.appendChild(removebutton);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
    }
    
}
function rimuoviRicetta(id) {
    // Rimuove la ricetta dal ricettario
    let user = localStorage.getItem("LoggedUser");
    if (user) {
        let ricettari = JSON.parse(localStorage.getItem("Ricettari"));
        if (ricettari) {
            let ricettario = ricettari.find(ricettario => ricettario.username == user);
            if (ricettario) {
                let ricette = ricettario.ricette;
                if (ricette) {
                    let ricettaIndex = ricette.findIndex(ricetta => ricetta.id == id);
                    if (ricettaIndex !== -1) {
                        ricette.splice(ricettaIndex, 1);
                        ricettario.ricette = ricette;
                        localStorage.setItem("Ricettari", JSON.stringify(ricettari));
                        window.location.reload();
                    } else {
                        console.error("Ricetta not found");
                    }
                } else {
                    console.error("Ricette not found");
                }
            } else {
                console.error("Ricettario not found");
            }
        } else {
            console.error("Ricettari not found");
        }
    } else {
        console.error("User not logged in");
    }

}

async function getRecensioni() {
    // Ricavo le recensioni dell'utente
    let user = localStorage.getItem("LoggedUser");
    let recensioni = JSON.parse(localStorage.getItem("Recensioni"));
    let recensioniUtente = recensioni.filter(recensione => recensione.username == user);
    console.log(recensioniUtente);
    let box = document.getElementById("BoxRecensioni");
    let row = document.getElementById("recensioniUtente");
    row.setAttribute("style", "display: flex !important; justify-content: space-between !important;");
    if (recensioniUtente.length == 0) {
        let noRecensioni = document.createElement("h3");
        noRecensioni.classList.add("text-center","mb-5");
        noRecensioni.innerHTML = "Non hai ancora scritto recensioni";
        box.appendChild(noRecensioni);
    }
    if (recensioniUtente.length < 3) {
        row.setAttribute("style", "display: flex !important; justify-content: flex-start !important;");
    }
    for (let i = 0; i < recensioniUtente.length; i++) {
        let recensione = recensioniUtente[i];
        let idRicetta = recensione.idRicetta;
        let meals = JSON.parse(localStorage.getItem("Meals"));
        let meal = meals[idRicetta];
        let titolo = meal.strMeal;
        let recensionetitolo = recensione.titolo;
        let recensionevoto = recensione.voto;
        let recensionedifficolta = recensione.difficolta;
        let recensioneText = recensione.testo;
        let recensionedata = recensione.data;
        let col = document.createElement("div");
        col.classList.add("col-md-4");
        let card = document.createElement("div");
        card.classList.add("card","bg-custom-1");
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        let title = document.createElement("h5");
        title.classList.add("card-title");
        title.innerHTML = "<strong>"+titolo+"</strong>";
        let recensioneTitle = document.createElement("p");
        recensioneTitle.innerHTML = "<strong>Titolo</strong>: "+recensionetitolo;
        let valutazione = document.createElement("p");
        let recensioneData = document.createElement("p");
        recensioneData.innerHTML = "<strong>Data</strong>: "+recensionedata;
        valutazione.innerHTML = "<b>Gusto</b>: ";
        for (let i = 0; i < 5; i++) {
            if (i< recensionevoto) {
                let star = document.createElement("i");
                star.classList.add("bi", "bi-star-fill");
                valutazione.appendChild(star);
            } else {
                let star = document.createElement("i");
                star.classList.add("bi", "bi-star");
                valutazione.appendChild(star);
            };
        };
        let difficolta = document.createElement("p");
        difficolta.innerHTML = "<b>Difficoltà</b>: ";
        for (let i = 0; i < 5; i++) {
            if (i< recensionedifficolta) {
                let star = document.createElement("i");
                star.classList.add("bi", "bi-star-fill");
                difficolta.appendChild(star);
            } else {
                let star = document.createElement("i");
                star.classList.add("bi", "bi-star");
                difficolta.appendChild(star);
            };
        };

        let recensioneElement = document.createElement("p");
        recensioneElement.innerHTML = "<strong>Testo</strong>: "+recensioneText;
        let removebutton = document.createElement("button");
        removebutton.classList.add("btn");
        removebutton.classList.add("btn-primary");
        removebutton.id = "eliminarecensione";
        removebutton.innerHTML = "Elimina";
        removebutton.setAttribute("onclick", "eliminaRecensione("+JSON.stringify(recensione)+")");
        removebutton.setAttribute("onclick", "eliminaRecensione('"+idRicetta+"', '"+recensionetitolo+"', '"+recensioneText+"', '"+recensione.username+"', "+recensionevoto+", "+recensionedifficolta+")");



        cardBody.appendChild(title);
        cardBody.appendChild(recensioneTitle);
        cardBody.appendChild(recensioneData);
        cardBody.appendChild(valutazione);
        cardBody.appendChild(difficolta);
        cardBody.appendChild(recensioneElement);
        cardBody.appendChild(removebutton);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
    }
}
function eliminaRecensione(idRIcetta,titolo, testo, username, voto, difficolta) {
    // Elimina la recensione

    alert(idRIcetta, titolo, testo, username, voto, difficolta);
    let recensioni = JSON.parse(localStorage.getItem("Recensioni"));
    let index = recensioni.findIndex(recensione => recensione.idRicetta == idRIcetta && recensione.username == username && recensione.titolo == titolo && recensione.testo == testo && recensione.voto == voto && recensione.difficolta == difficolta);
    recensioni.splice(index, 1);
    localStorage.setItem("Recensioni", JSON.stringify(recensioni));
    window.location.reload();
}