import { getLastSorted } from "../utils/search.js";
import { arrayUnique } from "../utils/function.js";

function GetTags(data, Options){
    let tags = [];
    if (Options.getAttribute("id")=="ingredients"){
        data.forEach((recipes) => {
                const recipesModel = recipesFactory(recipes);
                const ingredients = recipesModel.ingredients;
                ingredients.forEach((ingredient) => {
                    tags.push(ingredient.ingredient)
                });
            });
    }
    else if (Options.getAttribute("id")=="appareils"){
        data.forEach((recipes) => {
                const recipesModel = recipesFactory(recipes);
                const appareils = recipesModel.appliance;
                tags.push(appareils)              
            });
    }
    else {
        data.forEach((recipes) => {
            const recipesModel = recipesFactory(recipes);
            const ustensils = recipesModel.ustensils;
            for (let i=0; i<ustensils.length; i++ ){
                tags.push(ustensils[i])
            }      
        });
    }
    
    tags = arrayUnique(tags)
    console.log(tags)
    return tags;
}

function expand(tags){
    tags.setAttribute("data-set","expand");
    tags.firstElementChild.lastElementChild.setAttribute("src","./assets/expand_more-24px 5.svg")

    let LastSorted= getLastSorted();
    let tagsList = GetTags(LastSorted, tags);

    let tagsDiv = document.createElement("div")
    tagsDiv.setAttribute("class","tagsDiv")
    

    const ingredientsList = document.createElement( 'ul' );
        for(let i =0; i<tagsList.length; i++){
             let li = document.createElement('li');
            li.innerHTML = tagsList[i];         
            ingredientsList.appendChild(li);
        }
    tagsDiv.appendChild(ingredientsList)
    tags.appendChild(tagsDiv);

}

function retract(tags){
    tags.removeAttribute("data-set","expand");
    tags.firstElementChild.lastElementChild.setAttribute("src","./assets/expand_more-24px 4.svg")

    let tagsDiv = document.querySelector(".tagsDiv")
    tagsDiv.remove()
}

function Modify(tags){
    if(tags.hasAttribute("data-set","expand")){
    retract(tags);
    }
    else expand(tags);
}

let tags = document.querySelectorAll(".tags");
for (let i=0; i<tags.length; i++){  
    tags[i].addEventListener("click", ()=>Modify(tags[i]));   
}

