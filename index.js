
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

   let meals = await fetchAllMeals();
   console.log(meals);
   let recensioni = JSON.parse(localStorage.getItem("Recensioni")) || [];  
   
   Object.keys(meals).forEach(meal => {
       for (let i = 0; i <10; i++) {
         let username = "admin";
         let titolo = "titolo";
         let testo = "testo";
         let voto = Math.floor(Math.random() * 5);  
         let difficolta = Math.floor(Math.random() * 5);  
         let recensione = {
            "idRicetta": meal,
            "username": username,
            "titolo": titolo,
            "testo": testo,
            "voto": voto.toString(),
            "difficolta": difficolta.toString()
         };
         recensioni.push(recensione);
         }
   });
   
   localStorage.setItem("Recensioni", JSON.stringify(recensioni));
}
