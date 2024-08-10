const URL = "https://www.themealdb.com/api/json/v1/1/random.php"

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

async function crea_carosello() {
    let meals = await immagini_carosello();
    console.log(meals);
    console.log(Object.keys(meals))
    let carosello = document.getElementById("valori");
    if (!carosello) {
        console.error("Element with id 'valori' not found.");
        return;
    }
    for (let i = 0; i < meals.length; i += 3) {
        let div = document.createElement("div");
        div.className = "carousel-item";
        if (i === 0) {
            div.classList.add("active");
        }
        // div.setAttribute("data-bs-interval", "false");

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
            category.innerText = "Categoria: "+ meals[j]["strCategory"];
            cardBody.appendChild(category);

            let link = document.createElement("a");
            link.href = "..\\Ricetta\\ricetta.html?id=" + meals[j]["idMeal"];
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
