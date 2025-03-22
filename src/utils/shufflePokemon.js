const RNG = require("./rng");
const axios = require("axios");

const PokemonList = require("./../models/pokemonListModel");
const CachePokeApi = require("./../models/cachePokeApi");

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
];

// Função para obter um User-Agent aleatório
function getRandomUserAgent() {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

// Função para determinar se o Pokémon é shiny
function isShinyFunction() {
  const rateShiny = 5;
  return Math.random() <= rateShiny / 100;
}

// Função para buscar dados do Pokémon na API
async function fetchPokemonFromApi(idPokemonShuffle) {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${idPokemonShuffle}`,
    {
      headers: {
        "User-Agent": getRandomUserAgent(),
        Accept: "application/json",
      },
    }
  );

  return {
    name: response.data.name,
    thumbShiny: response.data.sprites.front_shiny,
    thumbNormal: response.data.sprites.front_default,
  };
}

// Função para obter dados do Pokémon, utilizando cache se disponível
async function getPokemonData(idPokemonShuffle, isShiny) {
  let cachedPokemon = await CachePokeApi.findOne({
    pokemonDex: idPokemonShuffle,
  });

  if (cachedPokemon) {
    return {
      name: cachedPokemon.pokemonName,
      thumb: isShiny ? cachedPokemon.thumbShiny : cachedPokemon.thumbNormal,
    };
  } else {
    const pokemonData = await fetchPokemonFromApi(idPokemonShuffle);

    await CachePokeApi.create({
      pokemonDex: idPokemonShuffle,
      pokemonName: pokemonData.name,
      thumbShiny: pokemonData.thumbShiny,
      thumbNormal: pokemonData.thumbNormal,
    });

    return {
      name: pokemonData.name,
      thumb: isShiny ? pokemonData.thumbShiny : pokemonData.thumbNormal,
    };
  }
}

// Função principal para embaralhar e obter dados do Pokémon
module.exports = async () => {
  const pokemonList = await PokemonList.findOne({});
  const idPokemon = pokemonList.idPokemon;

  if (idPokemon.length === 0) {
    return null;
  }

  const rng = new RNG();
  const idPokemonShuffle = rng.getRandomElement(idPokemon);
  const isShiny = isShinyFunction();

  const { name, thumb } = await getPokemonData(idPokemonShuffle, isShiny);

  return {
    id: idPokemonShuffle,
    name: name,
    thumb: thumb,
    shiny: isShiny,
  };
};
