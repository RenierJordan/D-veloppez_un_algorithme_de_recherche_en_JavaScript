import { getRecipes, UpdateRecipes } from "../pages/index.js";
import { arrayUnique } from "../utils/function.js";

const searchInput = document.querySelector('.search-input');
const getrecipes = await getRecipes();

let LastSorted = getrecipes;



function SortRecipes(value){

        let sortedbyname = getrecipes.filter(recipes => recipes.name.toLowerCase().includes(value.toLowerCase()))
        let sortedbydesc = getrecipes.filter(recipes => recipes.description.toLowerCase().includes(value.toLowerCase()))
        let sortedbying = getrecipes.filter(recipes => recipes.ingredients.find(ingre => ingre.ingredient.toLowerCase().includes(value.toLowerCase())));

        LastSorted = arrayUnique((sortedbyname.concat(sortedbydesc)).concat(sortedbying))
    
    
    return LastSorted;
}

function search(value) {
    
    if (value.length>2){
        let sorted = SortRecipes(value);
        UpdateRecipes(sorted);
    } 
    else if (value.length==0){
        let sorted = SortRecipes(value);
        UpdateRecipes(sorted);
    } 
    else console.log("Veuillez entrez au moins 3 caractères.")
}

export function getLastSorted() {
    return LastSorted;
}

searchInput.addEventListener("change", ()=>search(searchInput.value));