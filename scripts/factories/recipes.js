function recipesFactory(data) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;

    function recipesArticles() {
        const article = document.createElement( 'article' );

        const bg = document.createElement( 'div' );
        bg.setAttribute("class","article-bg")

        const infos = document.createElement( 'div' );
        infos.setAttribute("class","article-infos")

        const nom = document.createElement( 'p' );
        nom.textContent = name;
        nom.setAttribute("class","article-infos-nom")

        const temps = document.createElement( 'p' );
        temps.textContent = time + " min";
        temps.setAttribute("class","article-infos-temps")

        const ingredientsList = document.createElement( 'ul' );
        for(let i =0; i<ingredients.length; i++){
             let li = document.createElement('li');
            li.innerHTML += '<b>' + ingredients[i].ingredient  ;
            if (ingredients[i].quantity) li.innerHTML += '<b>' +": "+'</b>' + ingredients[i].quantity;
            if (ingredients[i].unit) li.innerHTML += ingredients[i].unit;
            ingredientsList.appendChild(li);
        }
        
        ingredientsList.setAttribute("class","article-infos-ingredients")

        const desc = document.createElement( 'p' );
        desc.textContent = description;
        desc.setAttribute("class","article-infos-description")

        article.appendChild(bg);
        article.appendChild(infos);
        infos.appendChild(nom);
        infos.appendChild(temps);
        infos.appendChild(ingredientsList);
        infos.appendChild(desc);

        return (article);

    }


    return { name, id, time, recipesArticles}
}