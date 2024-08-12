async function getRicetta() {
    //salvo l'id dell'ultima ricetta caricata
    let id = window.location.href.split("id=")[1];
    localStorage.setItem("id", id);
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
    category.classList.add("m-3");
    category.innerHTML = "<b>Categoria: </b>"+meal["strCategory"];
    title.appendChild(category);
    let area = document.createElement("p");
    area.innerHTML = "<b>Area: </b>"+meal["strArea"];
    title.appendChild(area);
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
            li.innerText = `${measure} ${ingredient}`;
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
    instructions.appendChild(h3_3);
    let iframe = document.createElement("iframe");
    //i want the instructions preview to be centered, i want it height and width to be the same ratio as the instructions and relative to the screen
    iframe.style.width = "auto";
    iframe.style.height = "auto";
    iframe.style.alignContent = "center";
    iframe.style.margin = "auto";
    iframe.style.display = "block";
    iframe.classList.add("mb-2");
    iframe.src = meal["strYoutube"].replace("watch?v=", "embed/");
    instructions.appendChild(iframe);
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
            let div = document.createElement("div");
            
            div.classList.add("border", "border-dark", "rounded", "p-3","col-3","recensione","d-inline-block","justify-content-center");
            let h5 = document.createElement("h5");
            h5.innerText = recensione.titolo;
            div.appendChild(h5);
            let voto = document.createElement("p");
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
}
function addRecensione(){
    
    let titolo = document.getElementById("titolo").value;
    let voto = document.getElementById("rating").value;
    let testo = document.getElementById("testo").value;
    let id = localStorage.getItem("id");
    let username = localStorage.getItem("LoggedUser");
    let recensione = {
        "idRicetta": id,
        "username": username,
        "titolo": titolo,
        "testo": testo,
        "voto": voto
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
function body() {
    getRicetta();
    checklogin();
}
