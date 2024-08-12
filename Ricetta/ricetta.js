async function getRicetta() {
    localStorage.setItem("oldPage", window.location.href);
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
            console.log(media);
            count++;
            console.log(count);
        }
    });
    if(count != 0){
        media = media/count;
    } else {
        media = Math.random()*5;
    }
    let mediafalsa = Math.round(media);
    valutazione.innerHTML = "<b>Valutazione: </b>";
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
    
    title.appendChild(valutazione);
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
    
    let titolo = document.getElementById("titolorecensione").value;
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
    console.log(recensione);
    
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
function body() {
    getRicetta();
    checklogin();
    setOldPage();
}
