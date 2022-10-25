let contentList = []

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

function convertPokemonToDetail(pokemon) {
    return `
        <div class="pokemon ${pokemon.type}">
            <span class="name text-7xl		">${pokemon.name}</span>
            <div class="flex">
                <div class="w-1/2">
                    ${pokemon.types.map((type) => `
                        <span class="shadow-2xl text-xl font-semibold mr-2 px-2.5 py-0.5 rounded bg-black bg-opacity-5	">${type}</span>
                    `
                    ).join('')}
                </div>
                <span class="w-1/2 text-right text-xl">#${pokemon.number}</span>
            </div>
            <img class="photo h-96" src="${pokemon.photo}" alt="${pokemon.name}">
        </div>`
}

function convertPokemonAbout(pokemon) {
    return `
    <div class="flex flex-col text-left">
        <span>Height: ${pokemon.height}</span>
        <span>Weight: ${pokemon.weight}</span>
        <span>Abilities: ${pokemon.abilities}</span>
        <span> 
    </div>
    `
}

function loadPokemonDetail() {
    const pokemonId = findGetParameter('id')
    if(pokemonId == null || pokemonId == undefined) {
        window.location.href = "index.html"
    }
    pokeApi.getPokemon(pokemonId).then((pokemon) => {
        const pokemonDetail = document.getElementById('pokemonDetail')
        pokemonDetail.innerHTML = convertPokemonToDetail(pokemon)
        const content = document.getElementById('content')
        content.innerHTML = convertPokemonAbout(pokemon)
    })
}
loadPokemonDetail()