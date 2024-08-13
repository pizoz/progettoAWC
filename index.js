async function fetchAllMeals() {
    const BASE_URI = "https://www.themealdb.com/api/json/v1/1/"
    const response = await fetch(BASE_URI + "categories.php");
    const { categories } = await response.json();
 
    const allMeals = {};
 
    for (const category of categories) {
       const response = await fetch(
          BASE_URI + "filter.php?c=" + category.strCategory,
       );
       const { meals } = await response.json();
       meals.forEach((meal) => {
          allMeals[meal.idMeal] = meal;
       });
    }
 
    return allMeals;
 }

 async function generarecensioni()  {
    let data = await fetchAllMeals();
    let meals = await data;
    console.log(meals);
    let recensioni = JSON.parse(localStorage.getItem("Recensioni"));
    Object.keys(meals).forEach(meal => {
        let username = "admin";
        let titolo = "titolo";
        let testo = "testo";
        let voto = Math.round(Math.random() * 5);
        let difficolta = Math.round(Math.random() * 5);
        let recensione = {
            "idRicetta": meal,
            "username": username,
            "titolo": titolo,
            "testo": testo,
            "voto": voto,
            "difficolta": difficolta
        };
        recensioni.push(recensione);
        console.log(recensione);
    });
    localStorage.setItem("Recensioni", JSON.stringify(recensioni));
}