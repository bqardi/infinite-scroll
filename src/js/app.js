var root = document.getElementById("root");
var counterElement = document.querySelector(".counter");
var counter = 0;

loadPokemons(`https://pokeapi.co/api/v2/pokemon?limit=10`);

function loadPokemons(url){
    getData(url, function(data){
        data.results.forEach((pokemon, index, results) => {
            let element = createPokemon(pokemon.name);
            root.appendChild(element);
            if (index === results.length - 1) {
                observe(element, function(){
                    if (!data.next) {
                        return;
                    }
                    loadPokemons(data.next);
                });
            }
            counterElement.textContent = `Pokémons: ${++counter}`;
        });
    });
}
