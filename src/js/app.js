var root = document.getElementById("root");
var offset = 0;

loadPokemons(`https://pokeapi.co/api/v2/pokemon?limit=10`);

function loadPokemons(url){
    getData(url, function(data){
        data.results.forEach((pokemon, index, results) => {
            let element = createPokemon(pokemon.name);
            root.appendChild(element);
            if (index === results.length - 1) {
                observe(element, function(){
                    offset += 10;
                    if (!data.next) {
                        return;
                    }
                    loadPokemons(data.next);
                });
            }
        });
    });
}
