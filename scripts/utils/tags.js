import { UpdateRecipes } from "../pages/index.js";
import { getLastSorted, FilterGlobal } from "../utils/search.js";
import { arrayUnique } from "../utils/function.js";

const searchInput = document.querySelector(".search-input");
let tagsApplied = [];

export {tagsApplied}

function GetTags(data, Options) {
  let tags = [];
  let ID = Options.getAttribute("id");
  let input = document.getElementById(ID+"-input").value
  tags.push(ID);
  if (ID == "ingredients") {
    data.forEach((recipes) => {
      const recipesModel = recipesFactory(recipes);
      const ingredients = recipesModel.ingredients;
      ingredients.forEach((ingredient) => {
        if(ingredient.ingredient.toLowerCase().includes(input.toLowerCase())){
          tags.push(ingredient.ingredient);
        }
      });
    });
  } else if (ID == "appliance") {
    data.forEach((recipes) => {
      const recipesModel = recipesFactory(recipes);
      const appareils = recipesModel.appliance;
      if (appareils.toLowerCase().includes(input.toLowerCase())){
        tags.push(appareils);
      }
    });
  } else {
    data.forEach((recipes) => {
      const recipesModel = recipesFactory(recipes);
      const ustensils = recipesModel.ustensils;
      ustensils.forEach((ustensil) => {
        if(ustensil.toLowerCase().includes(input.toLowerCase())){
          tags.push(ustensil);
        }
      });
    });
  }

  tags = arrayUnique(tags);
  return tags;
}

function displaytaglist(tags){
  let LastSorted = getLastSorted();
  let tagsList = GetTags(LastSorted, tags);
  if (tags.lastElementChild.getAttribute("class")== "tagsDiv"){
    tags.lastElementChild.remove();
  }

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

function expand(tags) {
  tags.setAttribute("data-set", "expand");
  tags.firstElementChild.lastElementChild.setAttribute(
    "src",
    "./assets/expand_more-24px 5.svg"
  );
  displaytaglist(tags)
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
  if (
    Sorted.find((recipes) =>
      recipes.ingredients.find(
        (ingre) => ingre.ingredient.toLowerCase() === tag.toLowerCase()
      )
    )
  ) {
    let result = Sorted.filter((recipes) =>
      recipes.ingredients.find(
        (ingre) => ingre.ingredient.toLowerCase() === tag.toLowerCase()
      )
    );
    return result;
  } else if (
    Sorted.find(
      (recipes) => recipes.appliance.toLowerCase() === tag.toLowerCase()
    )
  ) {
    let result = Sorted.filter(
      (recipes) => recipes.appliance.toLowerCase() === tag.toLowerCase()
    );
    return result;
  } else if (
    Sorted.find((recipes) =>
      recipes.ustensils.find(
        (ustensils) => ustensils.toLowerCase() === tag.toLowerCase()
      )
    )
  ) {
    let result = Sorted.filter((recipes) =>
      recipes.ustensils.find(
        (ustensils) => ustensils.toLowerCase() === tag.toLowerCase()
      )
    );
    return result;
  } else return Sorted;
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

  tags[i].childNodes[1].childNodes[1].addEventListener("input", () => displaytaglist(tags[i]));

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
