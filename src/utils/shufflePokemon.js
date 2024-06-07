const RNG = require("./rng");
const axios = require("axios");

module.exports = async () => {
  const rng = new RNG();

  const maxPokemonDex = 1025;
  var isShiny;
  var pokemonName;
  var pokemonThumb;
  var idPokemon;

  idPokemon = rng.getRandomInt(1, maxPokemonDex);

  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
  );

  pokemonName = response.data.name;

  const shinyNumbers = [3, 27, 50, 73, 97];
  const rngShiny = rng.getRandomInt(1, 100);
  if (shinyNumbers.includes(rngShiny)) {
    isShiny = true;
    pokemonThumb = response.data.sprites.front_shiny;
  } else {
    isShiny = false;
    pokemonThumb = response.data.sprites.front_default;
  }

  const pokemonObject = {
    //id: idPokemon,
    name: pokemonName,
    thumb: pokemonThumb,
    shiny: isShiny,
  };

  return pokemonObject;
};
