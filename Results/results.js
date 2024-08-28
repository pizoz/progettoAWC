const URL = "https://www.themealdb.com/api/json/v1/1/random.php"
// funzione di ricerca della barra
function search() {
    let searchbar = document.getElementById("inputsearch");
    let search = searchbar.value;
    if (search === "") {
        search = searchbar.placeholder;
    }
    window.location.href = "../Results/results.html?search=" + search;
}
//funzione per settare una ricetta random come suggerimento nella barra di ricerca
async function ricettarandom() {
    let ricetta = await fetch(URL);
    let data = await ricetta.json();
    let meal = data.meals[0];
    let nome = meal["strMeal"];
    let searchbar = document.getElementById("inputsearch");
    searchbar.setAttribute("placeholder",nome);
}
// funzione per stampare tutte le ricette ricevute tramite l'ultima ricerca
async function getResults() {
    //utilizzo la ricerca passata per utilizzare l'api
    let search = new URLSearchParams(window.location.search).get("search");
    let URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search;
    let response = await fetch(URL);
    let data = await response.json();
    let meals = data.meals;
    let recensione;
    let resultsrow = document.getElementById("resultsrow");
    let results = document.getElementById("results");
    results.classList.add("display-flex");
    results.setAttribute("style", "justify-content: flex-start;");
    // se non ci sono risultati stampo a video
    if (meals === null) {
        let noresults = document.createElement("h1");
        noresults.innerText = "No results found";
        resultsrow.appendChild(noresults);
    } else {
        // altrimenti stampo tutte le ricette che sono state trovate
        for (let i = 0; i < meals.length; i++) {
            let meal = meals[i];
            let card = document.createElement("div");
            card.classList.add("card", "col-md-4", "col-12", "mb-3","col-sm-5","col-lg-3","col-xl-3");
            card.setAttribute("style", "margin: ");
            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            let cardImg = document.createElement("img");
            cardImg.classList.add("card-img-top");
            cardImg.src = meal["strMealThumb"];
            cardBody.appendChild(cardImg);
            let cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.innerHTML ="<strong>" +meal["strMeal"]+"</strong>";
            cardBody.appendChild(cardTitle);

            let valutazione = document.createElement("p");
            let recensioni = localStorage.getItem("Recensioni");
            let array_recensioni = JSON.parse(recensioni);
            let somma = 0;
            let difficolta = 0
            let count = 0;
            array_recensioni.forEach(recensione => {
                if (recensione.idRicetta == meal["idMeal"]) {
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
            cardBody.appendChild(valutazione);
            cardBody.appendChild(valutazionedifficolta);
            let link = document.createElement("a");
            link.href = "../Ricetta/ricetta.html?id=" + meal["idMeal"];
            link.className = "btn btn-primary";
            link.innerText = "View Recipe";
            cardBody.appendChild(link);
            card.appendChild(cardBody);
            results.appendChild(card);

        }
    }
    // se le recensioni sono meno di 3 voglio che stiano a sinistra
    if (meals.length < 3) {
        resultsrow.setAttribute("style", "justify-content: flex-start !important;");
    }
}

function body() {
    localStorage.setItem("oldPage", window.location.href);
    ricettarandom();
    getResults();
}