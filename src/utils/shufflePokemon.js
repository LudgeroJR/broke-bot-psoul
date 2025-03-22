const RNG = require("./rng");
const axios = require("axios");

const PokemonList = require("./../models/pokemonListModel");

function isShinyFunction() {
  // Define a porcentagem da chance de aparição do shiny
  const rateShiny = 5;
  return Math.random() <= rateShiny / 100;
}

module.exports = async () => {
  const pokemonList = await PokemonList.findOne({});
  const idPokemon = pokemonList.idPokemon;

  if (idPokemon.length == 0) {
    return null;
  }

  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
  ];

  const getRandomUserAgent = () =>
    userAgents[Math.floor(Math.random() * userAgents.length)];

  const rng = new RNG();

  var isShiny;
  var pokemonName;
  var pokemonThumb;
  var idPokemonShuffle;

  idPokemonShuffle = rng.getRandomElement(idPokemon);

  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${idPokemonShuffle}`,
    {
      headers: {
        "User-Agent": getRandomUserAgent(),
        Accept: "application/json",
      },
    }
  );

  pokemonName = response.data.name;

  // const shinyNumbers = [4, 17, 21, 33, 50, 76, 85, 92];
  // const rngShiny = rng.getRandomInt(1, 100);
  // if (shinyNumbers.includes(rngShiny)) {
  //   isShiny = true;
  //   pokemonThumb = response.data.sprites.front_shiny;
  // } else {
  //   isShiny = false;
  //   pokemonThumb = response.data.sprites.front_default;
  // }

  if (isShinyFunction()) {
    isShiny = true;
    pokemonThumb = response.data.sprites.front_shiny;
  } else {
    isShiny = false;
    pokemonThumb = response.data.sprites.front_default;
  }

  const pokemonObject = {
    id: idPokemonShuffle,
    name: pokemonName,
    thumb: pokemonThumb,
    shiny: isShiny,
  };

  return pokemonObject;
};
