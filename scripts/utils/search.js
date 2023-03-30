import { getRecipes } from "../pages/index.js";

const searchInput = document.querySelector('.search-input');
const recipes = await getRecipes();

function SortRecipes(value){
    
    

}

function search(value) {
    
    if (value.length>2){
        console.log(value);
        SortRecipes(value);
    } 
    else console.log("Veuillez entrez au moins 3 caractères.")
}



searchInput.addEventListener("change", ()=>search(searchInput.value));