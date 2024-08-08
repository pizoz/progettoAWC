const URL = "https://www.themealdb.com/api/json/v1/1/random.php"

async function immagini_carosello() {
    
    let meals = {};
    for (let i = 0; Object.keys(meals).length < 10; i++) {
        let response = await fetch(URL);
        let data = await response.json();
        let codice = data.meals[0].idMeal;
        if (codice in Object.keys(meals)) {
            i--;
            continue;
        }
        let chiave = codice.toString();
        let link_immagine = data.meals[0].strMealThumb;
        meals[chiave] = link_immagine;
    }
    console.log(meals);
    console.log(Object.keys(meals).length);
    return meals;
}