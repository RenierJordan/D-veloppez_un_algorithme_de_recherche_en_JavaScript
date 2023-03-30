
export async function getRecipes() {
    const response = await fetch('./data/recipes.json');
    const jsonData = await response.json();
    
    return jsonData.recipes;
}

async function displayRecipes(data) {

    const recipesSection = document.getElementById("recipes-section");

    data.forEach((recipes) => {
        const recipesModel = recipesFactory(recipes);
        const recipesArticles = recipesModel.recipesArticles();
        recipesSection.appendChild(recipesArticles);
    });

}




async function init() {
    
    const recipes = await getRecipes();
    await displayRecipes(recipes);
}

init();