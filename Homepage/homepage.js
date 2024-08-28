const URL = "https://www.themealdb.com/api/json/v1/1/random.php"
// funzione per restituire le immagini di 15 ricette randomiche, ma non ripetute
async function immagini_carosello() {
    let meals = [];
    let codici = [];
    for (let i = 0; Object.keys(meals).length < 15; i++) {
        let response = await fetch(URL);
        let data = await response.json();
        let codice = data.meals[0].idMeal;
        if (codice in codici) {
            i--;
            continue;
        }
        meals.push(data.meals[0]);
    }
    return meals;
}
// funzione per la creazione del carosello
async function crea_carosello() {
    localStorage.setItem("oldPage", window.location.href);
    let meals = await immagini_carosello();
    let carosello = document.getElementById("valori");
    // stampo 3 ricette per ogni slide
    for (let i = 0; i < meals.length; i += 3) {
        let div = document.createElement("div");
        div.className = "carousel-item";
        if (i === 0) {
            div.classList.add("active");
        }
        div.setAttribute("data-bs-interval", "3000");

        let cardContainer = document.createElement("div");
        cardContainer.className = "card-container d-flex justify-content-center";
        for (let j = i; j < i + 3 && j < meals.length; j++) {
            let card = document.createElement("div");
            
            card.className = "card bg-custom-1";
            let img = document.createElement("img");
            img.className = "card-img-top";
            img.src = meals[j]["strMealThumb"];
            card.appendChild(img);

            let cardBody = document.createElement("div");
            cardBody.className = "card-body";
            let caption = document.createElement("h5");
            caption.className = "card-title";
            caption.innerText = meals[j]["strMeal"];
            cardBody.appendChild(caption);

            let category = document.createElement("p");
            category.innerHTML = "<b>Categoria</b>: "+ meals[j]["strCategory"];
            cardBody.appendChild(category);

            let valutazione = document.createElement("p");
            let recensioni = localStorage.getItem("Recensioni");
            let array_recensioni = JSON.parse(recensioni);
            let somma = 0;
            let difficolta = 0
            let count = 0;
            array_recensioni.forEach(recensione => {
                if (recensione.idRicetta == meals[j]["idMeal"]) {
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
            cardBody.appendChild(valutazione);

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
            cardBody.appendChild(valutazionedifficolta);

            let link = document.createElement("a");
            link.href = "../Ricetta/ricetta.html?id=" + meals[j]["idMeal"];
            link.className = "btn btn-primary";
            link.innerText = "View Recipe";
            cardBody.appendChild(link);

            card.appendChild(cardBody);
            cardContainer.appendChild(card);
            
        }
        div.appendChild(cardContainer);
        carosello.appendChild(div);
    }
}
// funzione per inserire un suggerimento di ricerca nella searchbar
async function ricettarandom() {
    let ricetta = await fetch(URL);
    let data = await ricetta.json();
    let meal = data.meals[0];
    let nome = meal["strMeal"];
    let searchbar = document.getElementById("inputsearch");
    searchbar.setAttribute("placeholder",nome);
}
// funzione per la ricerca tramite searchbar
function search() {
    let searchbar = document.getElementById("inputsearch");
    let search = searchbar.value;
    if (search === "") {
        search = searchbar.placeholder;
    }
    window.location.href = "../Results/results.html?search=" + search;
}

function body() {
    crea_carosello();
    ricettarandom();
}
