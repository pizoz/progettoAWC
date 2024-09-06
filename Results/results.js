// funzione di ricerca della barra
function search() {
    let searchbar = document.getElementById("inputsearch");
    let search = searchbar.value;

    if (search === "") {
        let value = searchbar.placeholder.trim();
        let meals = JSON.parse(localStorage.getItem("Meals"));
        meals = meals.filter(meal => meal["strMeal"].toLowerCase().includes(value.toLowerCase()))
        if (meals.length !== 1) {
            window.location.href = "../Results/results.html?search=" + encodeURIComponent(search);
        }
        let meal = meals[0];
        let id = meal.idMeal;
        window.location.href = "../Ricetta/ricetta.html?id=" + id;
            
    } else {
        window.location.href = "../Results/results.html?search=" + encodeURIComponent(search);
    }
}
//funzione per settare una ricetta random come suggerimento nella barra di ricerca
function ricettarandom() {
    let meals = JSON.parse(localStorage.getItem("Meals"));
    let meal = meals[Math.floor(Math.random() * meals.length)];
    let nome = meal["strMeal"];
    let searchbar = document.getElementById("inputsearch");
    searchbar.setAttribute("placeholder",nome);
}
// funzione per stampare tutte le ricette ricevute tramite l'ultima ricerca
function getResults() {
    //utilizzo la ricerca passata per utilizzare trovare le ricette cercate
    let search = new URLSearchParams(window.location.search).get("search");

    //ricerca meals in localstorage
    let meals = JSON.parse(localStorage.getItem("Meals"));
    let selectedmeals = meals.filter(meal => meal["strMeal"].toLowerCase().includes(search.toLowerCase()));

    // outdated: ricerca meals tramite API

    // let URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search;
    // let response = await fetch(URL);
    // let data = await response.json();
    // let selectedmeals = data.meals;


    let resultsrow = document.getElementById("resultsrow");
    let results = document.getElementById("results");
    results.classList.add("display-flex");
    results.setAttribute("style", "justify-content: flex-start;");
    // se non ci sono risultati stampo a video
    if (selectedmeals.length === 0) {
        let noresults = document.createElement("h5");
        noresults.classList.add("text-center");
        noresults.innerHTML = "Nessun risultato trovato per: <strong>" + search;
        results.appendChild(noresults);
    } else {
        // altrimenti stampo tutte le ricette che sono state trovate
        let numerorisultati = document.createElement("h5");
        numerorisultati.classList.add("text-center","mb-3");

        numerorisultati.innerHTML = "Ci sono "+selectedmeals.length+" risultati per: <strong>" + search;
        results.appendChild(numerorisultati);
        for (let i = 0; i < selectedmeals.length; i++) {
            let meal = selectedmeals[i];
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
                let star = document.createElement("i");
                if (i < media) {
                    star.classList.add("bi", "bi-star-fill");
                }
                if (i === Math.floor(mediavera) && (mediavera - Math.floor(mediavera) >= 0.25 && mediavera - Math.floor(mediavera) <= 0.75)) {
                    star.classList.remove("bi","bi-star-full")
                    star.classList.add("bi", "bi-star-half");
                } else if (i >= media){
                    star.classList.add("bi", "bi-star");
                }
                valutazione.appendChild(star);
            }
            
            let valutazionedifficolta = document.createElement("p");
            valutazionedifficolta.innerHTML = "<b>Difficoltà</b>: ";
            for (let i = 0; i < 5; i++) {
                let star = document.createElement("i");
                if (i < difficoltavera) {
                    star.classList.add("bi", "bi-star-fill");
                }
                if (i === Math.floor(difficolta) && (difficolta - Math.floor(difficolta) >= 0.25 && difficolta - Math.floor(difficolta) <= 0.75)) {
                    star.classList.remove("bi","bi-star-full")
                    star.classList.add("bi", "bi-star-half");
                } else if (i >= difficoltavera){
                    star.classList.add("bi", "bi-star");
                }
                valutazionedifficolta.appendChild(star);
            }
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
    if (selectedmeals.length < 3) {
        resultsrow.setAttribute("style", "justify-content: flex-start !important;");
    }
}

function body() {
    ricettarandom();
    getResults();
}