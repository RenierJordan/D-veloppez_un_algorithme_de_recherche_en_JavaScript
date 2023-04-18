import { getRecipes, UpdateRecipes } from "../pages/index.js";
import { getLastSorted, FilterGlobal } from "../utils/search.js";
import { arrayUnique } from "../utils/function.js";

const searchInput = document.querySelector(".search-input");
let tagsApplied = [];

export {tagsApplied}

function GetTags(data, Options) {
  let tags = [];
  let ID = Options.getAttribute("id");
  tags.push(ID);
  if (ID == "ingredients") {
    for (let i=0; i<data.length; i++){
      const recipesModel = recipesFactory(data[i]);
      const ingredients = recipesModel.ingredients;
      for(let j=0; j<ingredients.length;j++){
        tags.push(ingredients[j].ingredient);
      }
    }
    
  } else if (ID == "appliance") {
    for (let i=0; i<data.length; i++){
      const recipesModel = recipesFactory(data[i]);
      const appareils = recipesModel.appliance;
      tags.push(appareils);
    }
    
  } else {
    for (let i=0; i<data.length; i++){
      const recipesModel = recipesFactory(data[i]);
      const ustensils = recipesModel.ustensils;
      for(let j=0; j<ustensils.length;j++){
        tags.push(ustensils[j]);
      }
    }
  }
  tags = arrayUnique(tags);
  console.log(tags);
  return tags;
}

function expand(tags) {
  tags.setAttribute("data-set", "expand");
  tags.firstElementChild.lastElementChild.setAttribute(
    "src",
    "./assets/expand_more-24px 5.svg"
  );

  let LastSorted = getLastSorted();
  let tagsList = GetTags(LastSorted, tags);

  let tagsDiv = document.createElement("div");
  tagsDiv.setAttribute("class", "tagsDiv");

  const ingredientsList = document.createElement("ul");
  for (let i = 1; i < tagsList.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = tagsList[i];
    li.setAttribute("data-set", tagsList[0]);
    li.addEventListener("click", () => ApplyTag(tagsList[i], tagsList[0]));
    ingredientsList.appendChild(li);
  }
  tagsDiv.appendChild(ingredientsList);
  tags.appendChild(tagsDiv);
}

function retract(tags) {
  tags.removeAttribute("data-set", "expand");
  tags.firstElementChild.lastElementChild.setAttribute(
    "src",
    "./assets/expand_more-24px 4.svg"
  );

  tags.lastElementChild.remove();
}

function Modify(tags) {
  if (tags.hasAttribute("data-set", "expand")) {
    retract(tags);
  } else expand(tags);
}

function ApplyTag(tag, tagType) {
  const Showtag = document.querySelector(".Showtag");
  Showtag.style.display = "flex";

  const tagbtn = document.createElement("div");
  tagbtn.setAttribute("data-set", tagType);
  tagbtn.textContent = tag;

  const Close = document.createElement("i");
  Close.setAttribute("class", "fa-regular fa-circle-xmark svg close-img");
  Close.addEventListener("click", () => CloseTag(tag));

  tagbtn.appendChild(Close);
  Showtag.appendChild(tagbtn);

  tagsApplied.push(tag);
  console.log(tagsApplied);
  let Sorted = FilterGlobal(searchInput.value, tagsApplied);
  UpdateRecipes(Sorted);
}

function RemoveTag(tag) {
  tagsApplied = tagsApplied.filter((_tag) => tag !== _tag);
  let Sorted = FilterGlobal(searchInput.value, tagsApplied);
  UpdateRecipes(Sorted);
  console.log(tagsApplied);
}

export function SortByTag(Sorted, tag) {
 
  let result = [];
  for (let i=0; i<Sorted.length; i++){
    let recipesModel = recipesFactory(Sorted[i])

    if (recipesModel.appliance.toLowerCase() === tag.toLowerCase()){
      result.push(Sorted[i])
    }
    else {
      for (let j=0; j<recipesModel.ustensils.length; j++){
        if (recipesModel.ustensils[j].toLowerCase() === tag.toLowerCase()){
          result.push(Sorted[i])
        }
      } 

      for (let j=0; j<recipesModel.ingredients.length; j++){
        if (recipesModel.ingredients[j].ingredient.toLowerCase() === tag.toLowerCase()){
          result.push(Sorted[i])
        }
      }
    }

  }
 return result
 
}

export function CloseTag(tag) {
  const Showtag = document.querySelector(".Showtag");
  Showtag.childNodes.forEach((node) => {
    if (node.textContent === tag) {
      node.remove();
    }
  });
  RemoveTag(tag);
  if (!Showtag.hasChildNodes) {
    Showtag.style.display = "none";
  }
}

let tags = document.querySelectorAll(".tags");
for (let i = 0; i < tags.length; i++) {
  tags[i].addEventListener("click", () => Modify(tags[i]));
  tags[i].addEventListener("blur", () => retract(tags[i]));

  //Permet de fermet les dropdown de tags lorsque l'on clique en dehors
  document.addEventListener("click", (evt) => {
  let targetEl = evt.target; // clicked element      
  do {
    if(targetEl == tags[i]) {
      return;
    }
    // Go up the DOM
    targetEl = targetEl.parentNode;
  } while (targetEl);    
  if (tags[i].hasAttribute("data-set", "expand")) {
    retract(tags[i]);
  }
});
}