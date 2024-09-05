// allo start del sito vengono salvate tutte le ricette, utilizzando tutte le categorie presenti nel sito
async function fetchAllMeals() {
   const BASE_URI = "https://www.themealdb.com/api/json/v1/1/";
   let allMeals = [];
   const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

   for (const letter of alphabet) { 
      try {
         const response = await fetch(BASE_URI + "search.php?f=" + letter);
         const { meals } = await response.json();
           
         if (meals) {
            meals.forEach((meal) => {
               allMeals.push(meal);
            });
         }
      } catch (error) {
         console.error(`Error fetching meals for letter ${letter}:`, error);
      }
   }
   localStorage.setItem("Meals", JSON.stringify(allMeals));
   return allMeals;
}

// funzione che genera recensioni casuali per tutte le ricette presenti nel sito
function generarecensioni()  {

   let meals = JSON.parse(localStorage.getItem("Meals"));
   let recensioni = JSON.parse(localStorage.getItem("Recensioni")) || [];  

   meals.forEach(meal => {
      for (let i = 0; i <2; i++) {
      let username = "admin";
      let titolo = "titolo";
      let testo = "testo";
      let voto = Math.floor(Math.random() * 5)+1; // genera numeri da 0 a 4 e poi aggiunge 1
      let difficolta = Math.floor(Math.random() * 5)+1;
      let data = new Date(); //data di oggi
      data = data.getDate() + "/" + (data.getMonth()+1) + "/" + data.getFullYear();
      let recensione = {
         "idRicetta": meal["idMeal"],
         "username": username,
         "titolo": titolo,
         "testo": testo,
         "voto": voto.toString(),
         "difficolta": difficolta.toString(),
         "data": data
      };
      recensioni.push(recensione);
      }
   });
   // salvo le recensioni in localStorage
   localStorage.setItem("Recensioni", JSON.stringify(recensioni));
}