import { getRecipes, UpdateRecipes } from "../pages/index.js";
import { arrayUnique } from "../utils/function.js";
import { tagsApplied, SortByTag } from "../utils/tags.js";

const searchInput = document.querySelector('.search-input');
const getrecipes = await getRecipes();

let LastSorted = getrecipes;




export function search(value) {
    
    if (value.length>2){
        let sorted = FilterGlobal(value,tagsApplied);
        UpdateRecipes(sorted);
    } 
    else if (value.length==0){
        let sorted = FilterGlobal(value,tagsApplied);
        UpdateRecipes(sorted);
    } 
    else console.log("Veuillez entrez au moins 3 caractères.")
}

export function getLastSorted() {
    return LastSorted;
}
export function setLastSorted(value) {
    LastSorted= value;
}

searchInput.addEventListener("input", ()=>search(searchInput.value,tagsApplied));


export function FilterGlobal(value,tags){
    let Sorted = [];
    // premiere boucle "pour chaque recette"
    for (let i=0; i<getrecipes.length; i++){
        let recipesModel = recipesFactory(getrecipes[i])
        // seconde boucle "pour chaque ingredients de la recette"
        for (let j=0; j<recipesModel.ingredients.length; j++){
            // si la valeur saisie correspond a un ingredient
            if (recipesModel.ingredients[j].ingredient.toLowerCase().includes(value.toLowerCase())){
                Sorted.push(getrecipes[i])
            }
        }
        // si la valeur saisie correspond au nom ou a la description
        if (recipesModel.name.toLowerCase().includes(value.toLowerCase()) || recipesModel.description.toLowerCase().includes(value.toLowerCase())){
            Sorted.push(getrecipes[i])
        }  
        
    }
    Sorted= arrayUnique(Sorted)
    for (let i=0; i<tags.length; i++){
        Sorted = SortByTag(Sorted,tags[i])
    }
    
    setLastSorted(Sorted)
    return Sorted;
}