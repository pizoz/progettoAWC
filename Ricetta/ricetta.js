//funzione per stampare le informazioni relative alla ricetta selezionata
function getRicetta() {
    //salvo l'id dell'ultima ricetta caricata
    let id = window.location.href.split("id=")[1];
    localStorage.setItem("id", id);
    //ricavo le informazioni della ricetta
    let meals = JSON.parse(localStorage.getItem("Meals"));
    let meal = meals.find(meal => meal.idMeal == id);
    let title = document.getElementById("title");
    //Creo un h2 e ci inserisco il nome della ricetta
    let h2 = document.createElement("h2");
    h2.innerText = meal["strMeal"];
    title.appendChild(h2);
    //Titolo, area e categoria della ricetta
    let category = document.createElement("p");
    category.innerHTML = "<b>Categoria: </b>"+meal["strCategory"];
    title.appendChild(category);
    let area = document.createElement("p");
    area.innerHTML = "<b>Area: </b>"+meal["strArea"];
    title.appendChild(area);
    // stampo la media delle recensioni di gusto e difficoltà
    let valutazione = document.createElement("p");
    let recensioniricetta = JSON.parse(localStorage.getItem("Recensioni"));
    let media = 0;
    let count = 0;
    recensioniricetta.forEach(recensione => {
        if(recensione.idRicetta == id){
            media += parseInt(recensione.voto);
            count++;
        }
    });
    if(count != 0){
        media = media/count;
    }
    let mediafalsa = Math.round(media);
    valutazione.innerHTML = "<b>Gusto: </b>";
    valutazione.style.textWrap = "nowrap";
    //Creo delle stelle per rappresentare la media delle recensioni: se la media è n.5, stampo n stelle piene e mezza stella
    for (let i = 0; i < 5; i++) {
        let star = document.createElement("i");
        if (i < mediafalsa) {
            star.classList.add("bi", "bi-star-fill");
        }
        if (i === Math.floor(media) && (media - Math.floor(media) >= 0.25 && media - Math.floor(media) <= 0.75)) {
            star.classList.remove("bi","bi-star-full")
            star.classList.add("bi", "bi-star-half");
        } else if (i >= mediafalsa){
            star.classList.add("bi", "bi-star");
        }
        valutazione.appendChild(star);
    }
    valutazione.innerHTML += " ("+media.toFixed(1)+")";

    let valutazionedifficolta = document.createElement("p");
    valutazionedifficolta.id = "valutazionedifficolta";
    valutazionedifficolta.innerHTML = "<b>Difficoltà: </b>";
    let difficolta = 0;
    count = 0;
    recensioniricetta.forEach(recensione => {
        if(recensione.idRicetta == id){
            difficolta += parseInt(recensione.difficolta);
            count++;
        }
    });
    if(count != 0){
        difficolta = difficolta/count;
    }
    let difficoltafalsa = Math.round(difficolta);
    for (let i = 0; i < 5; i++) {
        let star = document.createElement("i");
        if (i < difficoltafalsa) {
            star.classList.add("bi", "bi-star-fill");
        }
        if (i === Math.floor(difficolta) && (difficolta - Math.floor(difficolta) >= 0.25 && difficolta - Math.floor(difficolta) <= 0.75)) {
            star.classList.remove("bi","bi-star-full")
            star.classList.add("bi", "bi-star-half");
        } else if (i >= difficoltafalsa){
            star.classList.add("bi", "bi-star");
        }
        valutazionedifficolta.appendChild(star);
    }
    title.appendChild(valutazione);
    title.appendChild(valutazionedifficolta);
    valutazionedifficolta.innerHTML += " ("+difficolta.toFixed(1)+")";


    
    title.appendChild(valutazionedifficolta);
    let img = document.getElementById("img");
    //creo un'immagine con la copertina della ricetta
    let image = document.createElement("img");
    image.src = meal["strMealThumb"];
    image.id = "copertina";
    img.appendChild(image);
    let ingredients = document.getElementById("ingredients");
    // stampo ingredienti e quantità
    let h3 = document.createElement("h3");
    h3.innerText = "Ingredienti";
    h3.style.textAlign = "center";
    ingredients.appendChild(h3);
    let ul = document.createElement("ul");
    ingredients.appendChild(ul);
    //Create a list of ingredients
    for(let i=1; i<=20; i++){
        let ingredient = meal["strIngredient"+i];
        let measure = meal["strMeasure"+i];
        if(ingredient != "" && ingredient != null){
            let li = document.createElement("li");
            li.innerHTML = `<strong>${ingredient}</strong> - ${measure} `;
            ul.appendChild(li);
        }
    }
    let instructions = document.getElementById("instructions");
    // stampo le istruzioni
    let h3_2 = document.createElement("h3");
    h3_2.innerText = "Istruzioni";
    h3_2.style.textAlign = "center";
    instructions.appendChild(h3_2);
    let p = document.createElement("p");
    p.innerText = meal["strInstructions"];
    instructions.appendChild(p);
    //creo preview del video tutorial

    if (meal["strYoutube"] != "") {
        let video = document.getElementById("video");
        video.style.alignContent = "center";
        let h3_3 = document.createElement("h3");
        h3_3.innerText = "Tutorial";
        h3_3.style.textAlign = "center";
        h3_3.classList.add("m-2");
        video.appendChild(h3_3);
        let iframe = document.createElement("iframe");
        iframe.style.width = "50vw";
        iframe.style.height = "29vw";
        iframe.style.alignContent = "center";
        iframe.style.margin = "auto";
        iframe.style.display = "block";
        iframe.src = meal["strYoutube"].replace("watch?v=", "embed/");
        video.appendChild(iframe);
    } else {
        let video = document.getElementById("rowvideo");
        video.style.display = "none";
    }
    let recensioni = document.getElementById("recensioni");
    //Create an h3 element and put text inside it
    let h3_4 = document.createElement("h3");
    h3_4.innerText = "Recensioni";
    h3_4.style.textAlign = "center";
    recensioni.appendChild(h3_4);
    // stampo tutte le recensioni della ricetta selezionata
    let array_recensioni = JSON.parse(localStorage.getItem("Recensioni"));
    // console.log(array_recensioni);
    let numberofrecensioni = 0;
    array_recensioni.forEach(recensione => {

        if(recensione.idRicetta == id){
            if (recensione.difficolta == null) {
                recensione.difficolta = 0;
            }
            let div = document.createElement("div");
            div.classList.add("col-lg-3","col-sm-12", "col-md-5","col-xs-12");
            div.classList.add("border", "border-dark", "rounded", "p-3","col-3","recensione","d-inline-block","justify-content-center");
            let h5 = document.createElement("h5");
            h5.innerText = recensione.titolo;
            div.appendChild(h5);
            let voto = document.createElement("p");
            voto.innerHTML = "<b>Gusto: </b>";
            for (let i = 0; i < 5; i++) {
                if (i< recensione.voto) {
                    let star = document.createElement("i");
                    star.classList.add("bi", "bi-star-fill");
                    voto.appendChild(star);
                } else {
                    let star = document.createElement("i");
                    star.classList.add("bi", "bi-star");
                    voto.appendChild(star);
                };
            };
            div.appendChild(voto);
            let difficolta = document.createElement("p");
            difficolta.innerHTML = "<b>Difficoltà: </b>";
            for (let i = 0; i < 5; i++) {
                if (i< recensione.difficolta) {
                    // console.log(recensione.difficolta);
                    let star = document.createElement("i");
                    star.classList.add("bi", "bi-star-fill");
                    difficolta.appendChild(star);
                } else {
                    let star = document.createElement("i");
                    star.classList.add("bi", "bi-star");
                    difficolta.appendChild(star);
                };
            };
            div.appendChild(difficolta);
            let p = document.createElement("p");
            p.innerText = recensione.testo;
            div.appendChild(p);
            recensioni.appendChild(div);
            let user = document.createElement("p");
            user.innerText = "- "+recensione.username+" il "+recensione.data;
            user.style.textAlign = "right";
            user.style.fontStyle = "italic";
            div.appendChild(user);
            numberofrecensioni++;
        }
    });
    if(numberofrecensioni == 0){
        let p = document.createElement("h4");
        p.classList.add("text-center");
        p.innerText = "Ancora nessuna recensione per questa ricetta";
        recensioni.appendChild(p);
    }
    if (numberofrecensioni % 3 != 0) {
        recensioni.setAttribute("style", "justify-content: flex-start !important;");
    }
    setBottoni();
}
// funzione per aggiungere una recensione
function addRecensione(){
    // prende i valori ricevuti dalla form e crea una recensione
    let titolo = document.getElementById("titolorecensione").value;
    let voto = document.getElementById("gusto").value;
    let difficolta = document.getElementById("difficolta").value;
    let testo = document.getElementById("testo").value;
    let id = localStorage.getItem("id");
    let data = new Date();
    data = data.getDate() + "/" + (data.getMonth()+1) + "/" + data.getFullYear();
    let username = localStorage.getItem("LoggedUser");
    let recensione = {
        "idRicetta": id,
        "username": username,
        "titolo": titolo,
        "testo": testo,
        "voto": voto,
        "difficolta": difficolta,
        "data": data
    };
    
    let array_recensioni = JSON.parse(localStorage.getItem("Recensioni"));
    array_recensioni.push(recensione);
    localStorage.setItem("Recensioni", JSON.stringify(array_recensioni));
    location.href = "ricetta.html?id="+id;
}
// se l'utente non è loggato il form per le recensioni è bloccato
function checklogin() {
    if (localStorage.getItem("logged") == "false") {
        let button = document.getElementById("formrecensione");
        button.style.display = "none";
    }

}
// stampo i bottoni per aggiungi ricettario, se l'utente è loggato. Stampo aggiungi nota se la ricetta è nel ricettario dell'utente
function setBottoni() {
    let logged = localStorage.getItem("logged");
    if (logged == "false") {
        return;
    }
    let username = localStorage.getItem("LoggedUser");
    let users = JSON.parse(localStorage.getItem("RegisteredUsers"));
    let user = users.find(user => user.username == username);

    let ricettario = user.ricettario;
    
    
    let id = localStorage.getItem("id");
    let ricetta = ricettario.find(ricetta => ricetta.id == id);
    let title = document.getElementById("title");
    // se la ricetta non è nel ricettario, aggiungo il bottone per aggiungerla, altrimenti per toglierla e per aggiungere la nota
    if (ricetta == undefined) {
        let button = document.createElement("button");
        button.id = "aggiungi";
        button.classList.add("btn", "btn-primary","mb-2");
        button.innerText = "Aggiungi al ricettario";
        button.onclick = function() {
            addRicetta();
        };
        title.appendChild(button);
    } else {
        let button = document.createElement("button");
        button.id = "rimuovi";
        button.classList.add("btn", "btn-primary","mb-2");
        button.innerText = "Rimuovi dal ricettario";
        button.onclick = function() {
            removeRicetta();
        };
        title.appendChild(button);
        let button2 = document.createElement("button");
        button2.id = "shownota";
        button2.classList.add("btn", "btn-primary",);
        button2.innerText = "Aggiungi nota";
        button2.onclick = function() {
            showformNota();
        };
        title.appendChild(button2);
    }
}
// funzione per aggiungere la ricetta al ricettario
function addRicetta() {
    let username = localStorage.getItem("LoggedUser");
    let users = JSON.parse(localStorage.getItem("RegisteredUsers"));
    let user = users.find(user => user.username == username);
    
    let ricettario = user.ricettario;

    let id = localStorage.getItem("id");
    let ricetta = {
        "id": id,
        "nota": ""
    };
    ricettario.push(ricetta);
    localStorage.setItem("RegisteredUsers", JSON.stringify(users));
    window.location.reload();
}
// funzione per la barra di ricerca: cerca tra i cibi che CONTENGONO la stringa, non che iniziano con essa. 
// Se c'è una sola corrispondenza, reindirizza alla pagina della ricetta
function search() {
    let searchbar = document.getElementById("inputsearch");
    let search = searchbar.value.trim();

    if (search === "") {
        let value = searchbar.placeholder.trim();
        let meals = JSON.parse(localStorage.getItem("Meals"));
        meals = meals.filter(meal => meal["strMeal"].toLowerCase().includes(value.toLowerCase()));
        if (meals.length != 1) {
            window.location.href = "../Results/results.html?search=" + search;
            return;
        }
        let meal = meals[0];
        let id = meal.idMeal;
        window.location.href = "../Ricetta/ricetta.html?id=" + id;
            
    } else {
        window.location.href = "../Results/results.html?search=" + search;
    }
}
//funzione per rimuovere la ricetta dal ricettario
function removeRicetta() {
    let username = localStorage.getItem("LoggedUser");
    let users = JSON.parse(localStorage.getItem("RegisteredUsers"));
    let user = users.find(user => user.username == username);
    
    let ricettario = user.ricettario;
    let id = localStorage.getItem("id");
    let ricetta = ricettario.find(ricetta => ricetta.id == id);
    let index = ricettario.indexOf(ricetta);
    ricettario.splice(index, 1);
    localStorage.setItem("RegisteredUsers",JSON.stringify(users));
    
    window.location.reload();
}
// quando schiaccio aggiungi nota, viene mostrato uno input testuale per aggiungere la nota e un bottone per salvarla
function showformNota() {
    let title = document.getElementById("title");
    let form = document.createElement("form");
    form.id = "formNota";
    form.setAttribute("onsubmit", "event.preventDefault();addNota()");
    let nota = document.createElement("input");
    nota.type = "text";
    nota.id = "nota";
    nota.placeholder = "Inserisci la nota";
    form.appendChild(nota);
    let button = document.createElement("button");
    button.id = "inviaNota";
    button.classList.add("btn", "btn-primary","m-1");
    button.innerText = "Invia";
    button.type = "submit";
    form.appendChild(button);
    title.appendChild(form);
    let button2 = document.getElementById("shownota");
    button2.style.display = "none";
}
// funzione per salvare la nota nel ricettario
function addNota() {
    let username = localStorage.getItem("LoggedUser");
    let users = JSON.parse(localStorage.getItem("RegisteredUsers"));
    let user = users.find(user => user.username == username);
    let ricettario = user.ricettario;
    let id = localStorage.getItem("id");
    let ricetta = ricettario.find(ricetta => ricetta.id == id);
    let notaElement = document.getElementById("nota");
    let nota = notaElement.value;
    ricetta.nota = nota;
    localStorage.setItem("RegisteredUsers",JSON.stringify(users));
    window.location.reload();
}
// funzione per stampare nella barra di ricerca un suggerimento di ricetta casuale
function ricettarandom() {
    let meals = JSON.parse(localStorage.getItem("Meals"));
    let meal = meals[Math.floor(Math.random() * meals.length)];
    let nome = meal["strMeal"];
    let searchbar = document.getElementById("inputsearch");
    searchbar.setAttribute("placeholder",nome);
}
function body() {
    getRicetta();
    checklogin();
    ricettarandom();
}
