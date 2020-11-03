var root = document.getElementById("root");
var counterElement = document.querySelector(".counter");
var counter = 0;

loadPokemons(`https://pokeapi.co/api/v2/pokemon?limit=10`);

function loadPokemons(url){
    getData(url, function(data){
        data.results.forEach((pokemon, index, results) => {
            let element = createPokemon(pokemon.name);
            root.appendChild(element);
            observe(element, function(){
                getData(pokemon.url, function(imgData){
                    element.querySelector("img").src = imgData.sprites.front_default;
                });
                if (index === results.length - 1) {
                    if (!data.next) {
                        return;
                    }
                    loadPokemons(data.next);
                }
            });
            counterElement.textContent = `Pokémons: ${++counter}`;
        });
    });
}
