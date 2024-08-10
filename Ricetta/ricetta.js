async function getRicetta() {

    let id = window.location.href.split("id=")[1];
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
        if(ingredient != ""){
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
    video.appendChild(h3_3);
    let iframe = document.createElement("iframe");
    //i want the video preview to be centered, i want it height and width to be the same ratio as the video and relative to the screen
    iframe.style.width = "560px";
    iframe.style.height = "315px";
    iframe.style.alignContent = "center";
    iframe.style.margin = "auto";
    iframe.style.display = "block";
    iframe.classList.add("mb-5");
    iframe.src = meal["strYoutube"].replace("watch?v=", "embed/");
    video.appendChild(iframe);


}