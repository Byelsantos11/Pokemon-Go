
/*Cumprir esse evento após toda pagina ser carregada*/
document.addEventListener("DOMContentLoaded", function() {
    const pokeContainer = document.querySelector('.poke');
    const infoElement = document.querySelector('.informacao');
    const previousButton = document.getElementById('anterior');
    const nextButton = document.getElementById('proximo');
    let offset = 0;


    /*Buscando todos itens da api e tranfromando em um objeto json*/ 
    const fetchPokemons = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar os Pokémon:', error);
        }
    };

    /*Buscando especialemnte todos os pokemons da api. Se caso não achar, vai enviar uma menssagem de erro*/
    const fetchPokemonData = async (pokemon) => {
        try {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar os dados do Pokémon:', error);
        }
    };


/* Cria uma div pelo js  e nomeia ela. Após isso, manda em html todas as informações com template string*/ 
    const createPokemonCard = (pokemon) => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('poke-card');
        pokemonCard.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <div class="info">
                <span>#${pokemon.id}</span>
                <p class="name">${pokemon.name}</p>
                <p>Peso: ${pokemon.weight}</p>
                <p>Altura: ${pokemon.height}</p>
                <p>Poderes: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
            </div>
        `;
        pokeContainer.innerHTML = ''
        pokeContainer.appendChild(pokemonCard);
    };

    const updatePokemonInfo = (info) => {
        infoElement.textContent = info
    };


    /*LIgamento com api e de elemento da api.*/
    const loadPokemons = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon/?limit=1&offset=${offset}`
        const data = await fetchPokemons(url)
        const pokemon = data.results[0]
        const pokemonData = await fetchPokemonData(pokemon)
        createPokemonCard(pokemonData)
        updatePokemonInfo('')
    };


    /*Funçaõ de voltar os pokemon*/
    previousButton.addEventListener('click', () => {
        offset -= 1
        if (offset < 0) offset = 0
        loadPokemons()
    });

    /*Funçaõ de avançar pokemon*/
    nextButton.addEventListener('click', () => {
        offset += 1
        loadPokemons()
    });

    loadPokemons()
})
