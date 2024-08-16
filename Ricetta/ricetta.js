async function getRicetta() {
    localStorage.setItem("oldPage", window.location.href);
    //salvo l'id dell'ultima ricetta caricata
    let id = window.location.href.split("id=")[1];
    localStorage.setItem("id", id);
    console.log(id);
    //ricavo le informazioni della ricetta
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id;
    let response = await fetch(url);
    let data = await response.json();
    let meal = data.meals[0];
    console.log(meal);
    let title = document.getElementById("title");
    //Create an h2 element and put text inside it 
    let h2 = document.createElement("h2");
    h2.innerText = meal["strMeal"];
    title.appendChild(h2);
    //TTitolo, area e categoria della ricetta
    let category = document.createElement("p");
    category.innerHTML = "<b>Categoria: </b>"+meal["strCategory"];
    title.appendChild(category);
    let area = document.createElement("p");
    area.innerHTML = "<b>Area: </b>"+meal["strArea"];
    title.appendChild(area);
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
    for (let i = 0; i < 5; i++) {
        if (i< mediafalsa) {
            let star = document.createElement("i");
            star.classList.add("bi", "bi-star-fill");
            valutazione.appendChild(star);
        } else {
            let star = document.createElement("i");
            star.classList.add("bi", "bi-star");
            valutazione.appendChild(star);
        };
    };
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
        if (i< difficoltafalsa) {
            let star = document.createElement("i");
            star.classList.add("bi", "bi-star-fill");
            valutazionedifficolta.appendChild(star);
        } else {
            let star = document.createElement("i");
            star.classList.add("bi", "bi-star");
            valutazionedifficolta.appendChild(star);
        };
    };
    title.appendChild(valutazione);
    title.appendChild(valutazionedifficolta);
    valutazionedifficolta.innerHTML += " ("+difficolta.toFixed(1)+")";


    
    title.appendChild(valutazionedifficolta);
    let img = document.getElementById("img");
    //Create an img element and put the image inside it
    let image = document.createElement("img");
    image.src = meal["strMealThumb"];
    image.id = "copertina";
    img.appendChild(image);
    let ingredients = document.getElementById("ingredients");
    //Create an h3 element and put text inside it
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
    //Create an h3 element and put text inside it
    let h3_2 = document.createElement("h3");
    h3_2.innerText = "Istruzioni";
    h3_2.style.textAlign = "center";
    instructions.appendChild(h3_2);
    let p = document.createElement("p");
    p.innerText = meal["strInstructions"];
    instructions.appendChild(p);
    //Create a youtube video preview with the link found in the API
    let video = document.getElementById("video");
    video.style.alignContent = "center";
    let h3_3 = document.createElement("h3");
    h3_3.innerText = "Tutorial";
    h3_3.style.textAlign = "center";
    h3_3.classList.add("m-2");
    video.appendChild(h3_3);
    let iframe = document.createElement("iframe");
    //i want the instructions preview to be centered, i want it height and width to be the same ratio as the instructions and relative to the screen
    iframe.style.width = "50vw";
    iframe.style.height = "29vw";
    iframe.style.alignContent = "center";
    iframe.style.margin = "auto";
    iframe.style.display = "block";
    iframe.src = meal["strYoutube"].replace("watch?v=", "embed/");
    video.appendChild(iframe);
    let recensioni = document.getElementById("recensioni");
    //Create an h3 element and put text inside it
    let h3_4 = document.createElement("h3");
    h3_4.innerText = "Recensioni";
    h3_4.style.textAlign = "center";
    recensioni.appendChild(h3_4);
    let array_recensioni = JSON.parse(localStorage.getItem("Recensioni"));
    console.log(array_recensioni);
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
                    console.log(recensione.difficolta);
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
            user.innerText = "- "+recensione.username;
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
    setBottoni();
}
function addRecensione(){
    
    let titolo = document.getElementById("titolorecensione").value;
    let voto = document.getElementById("gusto").value;
    let difficolta = document.getElementById("difficolta").value;
    let testo = document.getElementById("testo").value;
    let id = localStorage.getItem("id");
    let username = localStorage.getItem("LoggedUser");
    let recensione = {
        "idRicetta": id,
        "username": username,
        "titolo": titolo,
        "testo": testo,
        "voto": voto,
        "difficolta": difficolta
    };
    
    let array_recensioni = JSON.parse(localStorage.getItem("Recensioni"));
    array_recensioni.push(recensione);
    localStorage.setItem("Recensioni", JSON.stringify(array_recensioni));
    location.href = "ricetta.html?id="+id;
}
function checklogin() {
    if (localStorage.getItem("logged") == "false") {
        let button = document.getElementById("formrecensione");
        button.style.display = "none";
    }

}
function setOldPage() {
    let logout = document.getElementById("logout");
    localStorage.setItem("oldPage", window.location.href);
}

function setBottoni() {
    let logged = localStorage.getItem("logged");
    if (logged == "false") {
        return;
    }
    let user = localStorage.getItem("LoggedUser");
    console.log(user);
    let ricettari = JSON.parse(localStorage.getItem("Ricettari"));
    console.log(ricettari);
    let ricettario = ricettari.find(ricettario => ricettario.username == user);
    console.log(ricettario);
    let ricette = ricettario.ricette;
    console.log(ricette);
    let id = localStorage.getItem("id");
    let ricetta = ricette.find(ricetta => ricetta.id == id);
    let title = document.getElementById("title");
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
function addRicetta() {
    let user = localStorage.getItem("LoggedUser");
    let ricettari = JSON.parse(localStorage.getItem("Ricettari"));
    let ricettario = ricettari.find(ricettario => ricettario.username == user);
    let id = localStorage.getItem("id");
    let ricetta = {
        "id": id,
        "nota": ""
    };
    ricettario.ricette.push(ricetta);
    window.localStorage.setItem("Ricettari", JSON.stringify(ricettari));
    window.location.reload();
}
function removeRicetta() {
    let user = localStorage.getItem("LoggedUser");
    let ricettari = JSON.parse(localStorage.getItem("Ricettari"));
    let ricettario = ricettari.find(ricettario => ricettario.username == user);
    let id = localStorage.getItem("id");
    let ricette = ricettario.ricette;
    let ricetta = ricette.find(ricetta => ricetta.id == id);
    let index = ricette.indexOf(ricetta);
    ricette.splice(index, 1);
    window.localStorage.setItem("Ricettari", JSON.stringify(ricettari));
    window.location.reload();
}
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
// NON FUNZIONA
function addNota() {
    let user = localStorage.getItem("LoggedUser");
    let ricettari = JSON.parse(localStorage.getItem("Ricettari"));
    let ricettario = ricettari.find(ricettario => ricettario.username == user);
    let id = localStorage.getItem("id");
    let ricette = ricettario.ricette;
    let ricetta = ricette.find(ricetta => ricetta.id == id);
    let notaElement = document.getElementById("nota");
    let nota = notaElement.value;
    ricetta.nota = nota;
    window.localStorage.setItem("Ricettari", JSON.stringify(ricettari));
    window.location.reload();
}
function body() {
    getRicetta();
    checklogin();
    setOldPage();
}
