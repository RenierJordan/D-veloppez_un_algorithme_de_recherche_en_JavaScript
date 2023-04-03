import { UpdateRecipes } from "../pages/index.js";
import { getLastSorted } from "../utils/search.js";
import { arrayUnique } from "../utils/function.js";

function GetTags(data, Options){
    let tags = [];
    let ID = Options.getAttribute("id")
    tags.push(ID)
    if ( ID=="ingredients"){
        data.forEach((recipes) => {
                const recipesModel = recipesFactory(recipes);
                const ingredients = recipesModel.ingredients;
                ingredients.forEach((ingredient) => {
                    tags.push(ingredient.ingredient)
                });
            });
    }
    else if (ID=="appliance"){
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
        for(let i =1; i<tagsList.length; i++){
             let li = document.createElement('li');
            li.innerHTML = tagsList[i];
            li.setAttribute("data-set",tagsList[0])
            li.addEventListener("click", ()=>ApplyTags(tagsList[i],tagsList[0]))         
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

function ApplyTags(tag,tagType) {
    const Showtag = document.querySelector(".Showtag")
    Showtag.setAttribute("data-set",tagType)
    Showtag.style.display= "flex"
    Showtag.firstChild.textContent = tag;

    
    let Sorted = SortByTag(tag,tagType)
    UpdateRecipes(Sorted)
}

function SortByTag(tag,tagType){
    let LastSorted = getLastSorted();
    if (tagType == "ingredients"){
        let result = LastSorted.filter(recipes => recipes.ingredients.find(ingre => ingre.ingredient.toLowerCase().includes(tag.toLowerCase())));  
        return(result)     
    }

    else if (tagType == "appliance"){
        let result = LastSorted.filter(recipes => recipes.appliance.toLowerCase().includes(tag.toLowerCase()))
        return(result)
    }

    else if (tagType == "ustensils"){
        let result = LastSorted.filter(recipes => recipes.ustensils.find(ustensils => ustensils.toLowerCase().includes(tag.toLowerCase())))
        return(result)
    }
        
    else return LastSorted
}


function CloseTag(){
    let LastSorted = getLastSorted();
    UpdateRecipes(LastSorted)

    const Showtag = document.querySelector(".Showtag")
    Showtag.removeAttribute("data-set")
    Showtag.style.display= "none"
    Showtag.firstChild.textContent = "";

}

let tags = document.querySelectorAll(".tags");
for (let i=0; i<tags.length; i++){  
    tags[i].addEventListener("click", ()=>Modify(tags[i]));   
}

let close = document.querySelector(".close-img");
close.addEventListener("click", ()=>CloseTag());
