export async function getRecipes() {
    const response = await fetch('./data/recipes.json');
    const jsonData = await response.json();
    
    return jsonData.recipes;
}

async function displayRecipes(data) {

    const recipesSection = document.getElementById("recipes-section");
    for (let i=0; i<data.length; i++){
        const recipesModel = recipesFactory(data[i]);
        const recipesArticles = recipesModel.recipesArticles();
        recipesSection.appendChild(recipesArticles);
    }
    

}
const Erreur = document.querySelector('.recipe-error-message');
export function UpdateRecipes(data) {
    const recipesSection = document.getElementById("recipes-section");
    recipesSection.replaceChildren()
    if(data.length > 0){
        displayRecipes(data)
        Erreur.innerHTML = '';
    }
    else {
        Erreur.innerHTML = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    }
    
}
    



async function init() {
    
    const recipes = await getRecipes();
    await displayRecipes(recipes);
}

init();