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
// funzione per restituire 15 ricette randomiche, ma non ripetute CHE PERO' USA LE RICETTE IN LOCAL STORAGE E NON RANDOM -> PIU' EFFICIENTE
function immagini_efficiente() {
    //salvo le ricette presenti in localStorage
    let meals = JSON.parse(localStorage.getItem("Meals"));
    let i = 0;
    let scelti = []
    while (i < 15) {
        //prendo una ricetta random
        let meal = meals[Math.floor(Math.random() * meals.length)]
        //se è già stata scelta, la salto
        if (meal in scelti) {
            continue;
        }
        //altrimenti la aggiungo alla lista delle ricette
        scelti.push(meal)
        i++;
    }
    return scelti;
}
// funzione per la creazione del carosello
function crea_carosello() {
    // let meals = await immagini_carosello();
    let meals = immagini_efficiente();
    // console.log(controllo)
    let carosello = document.getElementById("valori");
    // stampo 3 ricette per ogni slide
    for (let i = 0; i < meals.length; i += 3) {
        // creo un div per ogni slide
        let div = document.createElement("div");
        div.className = "carousel-item";
        if (i === 0) {
            div.classList.add("active");
        }
        //aggiungo un countdown di 3 secondi per lo scorrimento automatico
        div.setAttribute("data-bs-interval", "3000");
        // creo un div per contenere le 3 carte
        let cardContainer = document.createElement("div");
        cardContainer.className = "card-container d-flex justify-content-center";
        //creo 3 carte per carousel-item
        for (let j = i; j < i + 3 && j < meals.length; j++) {
            // creo la carta stampando l'immagine e il nome della ricetta da Meals in localStorage e ne usa l'id
            // per creare le recensioni e il link alla pagina della ricetta

            //creo la carta
            let card = document.createElement("div");
            card.className = "card bg-custom-1";
            //aggiungo l'immagine
            let img = document.createElement("img");
            img.className = "card-img-top";
            img.src = meals[j]["strMealThumb"];
            card.appendChild(img);
            //aggiungo il titolo 
            let cardBody = document.createElement("div");
            cardBody.className = "card-body";
            let caption = document.createElement("h5");
            caption.className = "card-title";
            caption.innerText = meals[j]["strMeal"];
            cardBody.appendChild(caption);

            let category = document.createElement("p");
            category.innerHTML = "<b>Categoria</b>: "+ meals[j]["strCategory"];
            cardBody.appendChild(category);

            // calcolo la media delle recensioni in difficoltà e gusto per la ricetta e stampo le stelle
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
            cardBody.appendChild(valutazione);

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
function ricettarandom() {
    let meals = JSON.parse(localStorage.getItem("Meals"));
    let meal = meals[Math.floor(Math.random() * meals.length)];
    let nome = meal["strMeal"];
    let searchbar = document.getElementById("inputsearch");
    searchbar.setAttribute("placeholder",nome);
}
// funzione per la ricerca tramite searchbar
function search() {
    let searchbar = document.getElementById("inputsearch");
    let search = searchbar.value.trim();

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
function body() {
    crea_carosello();
    ricettarandom();
}
