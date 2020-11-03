function createPokemon(name){
    var pokemon = document.createElement("section");
    pokemon.classList.add("pokemon");
    
    var title = document.createElement("h1");
    title.classList.add("pokemon__title");
    title.textContent = name;
    
    var image = document.createElement("img");
    image.classList.add("pokemon__image");
    image.src = "./assets/images/pokeball.png";
    image.alt = name;

    pokemon.appendChild(title);
    pokemon.appendChild(image);

    return pokemon;
}