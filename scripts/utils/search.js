import { getRecipes, UpdateRecipes } from "../pages/index.js";

const searchInput = document.querySelector('.search-input');
const getrecipes = await getRecipes();

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

function SortRecipes(value){
    
    let sortedbyname = getrecipes.filter(recipes => recipes.name.toLowerCase().includes(value.toLowerCase()))
    let sortedbydesc = getrecipes.filter(recipes => recipes.description.toLowerCase().includes(value.toLowerCase()))
    let sortedbying = getrecipes.filter(recipes => recipes.ingredients.find(ingre => ingre.ingredient.toLowerCase().includes(value.toLowerCase())));
        
    let sorted = arrayUnique((sortedbyname.concat(sortedbydesc)).concat(sortedbying))
    return sorted;

}

function search(value) {
    
    if (value.length>2){
        console.log(value);
        let sorted = SortRecipes(value);
        UpdateRecipes(sorted);
    } 
    else console.log("Veuillez entrez au moins 3 caractères.")
}



searchInput.addEventListener("change", ()=>search(searchInput.value));