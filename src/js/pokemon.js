function createPokemon(name){
    var pokemon = document.createElement("section");
    pokemon.classList.add("pokemon");
    
    var title = document.createElement("h1");
    title.classList.add("pokemon__title");
    title.textContent = name;

    pokemon.appendChild(title);

    return pokemon;
}