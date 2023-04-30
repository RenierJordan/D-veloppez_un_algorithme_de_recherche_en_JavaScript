import { getRecipes, UpdateRecipes } from "../pages/index.js";
import { arrayUnique } from "../utils/function.js";
import { tagsApplied, SortByTag } from "../utils/tags.js";

const searchInput = document.querySelector('.search-input');
const getrecipes = await getRecipes();
const errorMessage = document.querySelector('.search-error-message');

let LastSorted = getrecipes;




export function search(value) {
    
    if (value.length>2){
        let sorted = FilterGlobal(value,tagsApplied);
        UpdateRecipes(sorted);
        errorMessage.textContent= "";

    } 
    else if (value.length==0){
        let sorted = FilterGlobal(value,tagsApplied);
        UpdateRecipes(sorted);
        errorMessage.textContent= "";
    } 
    else {
        console.log("Veuillez entrez au moins 3 caractères.")
        errorMessage.textContent= "Veuillez entrez au moins 3 caractères.";
    } 
}

export function getLastSorted() {
    return LastSorted;
}
export function setLastSorted(value) {
    LastSorted= value;
}

searchInput.addEventListener("input", ()=>search(searchInput.value,tagsApplied));


export function FilterGlobal(value,tags){
    let sortedbyname = getrecipes.filter(recipes => recipes.name.toLowerCase().includes(value.toLowerCase()))
    let sortedbydesc = getrecipes.filter(recipes => recipes.description.toLowerCase().includes(value.toLowerCase()))
    let sortedbying = getrecipes.filter(recipes => recipes.ingredients.find(ingre => ingre.ingredient.toLowerCase().includes(value.toLowerCase())));    
    let Sorted = arrayUnique((sortedbyname.concat(sortedbydesc)).concat(sortedbying))

    tags.forEach(tag => {
        Sorted = SortByTag(Sorted,tag)
    });
    setLastSorted(Sorted)
    return Sorted;
}