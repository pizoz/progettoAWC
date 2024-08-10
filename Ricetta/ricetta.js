async function getRicetta() {
    localStorage.setItem("id", window.location.href.split("id=")[1]);
    console.log(localStorage.getItem("id"));
    let id = localStorage.getItem("id");
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

}