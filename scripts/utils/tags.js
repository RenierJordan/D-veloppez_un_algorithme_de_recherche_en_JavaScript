function expand(tags){
    tags.setAttribute("data-set","expand");
    tags.firstElementChild.lastElementChild.setAttribute("src","/assets/expand_more-24px 5.svg")
}

function retract(tags){
    tags.removeAttribute("data-set","expand");
    tags.firstElementChild.lastElementChild.setAttribute("src","/assets/expand_more-24px 4.svg")
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

