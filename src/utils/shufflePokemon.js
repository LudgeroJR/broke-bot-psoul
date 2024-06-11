const RNG = require("./rng");
const axios = require("axios");

const PokemonList = require("./../models/pokemonListModel");

module.exports = async () => {
  const pokemonList = await PokemonList.findOne({});
  const idPokemon = pokemonList.idPokemon;

  if (idPokemon.length == 0) {
    return null;
  }

  const rng = new RNG();

  var isShiny;
  var pokemonName;
  var pokemonThumb;
  var idPokemonShuffle;

  idPokemonShuffle = rng.getRandomElement(idPokemon);

  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${idPokemonShuffle}`
  );

  pokemonName = response.data.name;

  const shinyNumbers = [2, 27, 51, 77, 98];
  const rngShiny = rng.getRandomInt(1, 100);
  if (shinyNumbers.includes(rngShiny)) {
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
