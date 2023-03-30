const searchInput = document.querySelector('.search-input');


function search(value) {
    
    if (value.length>2) console.log(value);
    else console.log("Veuillez entrez au moins 3 caractères")
}



searchInput.addEventListener("change", ()=>search(searchInput.value));