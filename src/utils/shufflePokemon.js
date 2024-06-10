const RNG = require("./rng");
const axios = require("axios");

const fs = require("fs").promises;
const path = require("path");

const pathPokemonList = path.join(
  __dirname,
  "..",
  "..",
  "data",
  "pokemonlist",
  "pokemonList.json"
);

const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error("Erro ao ler ou parsear o arquivo JSON:", err);
  }
};

module.exports = async () => {
  const pokemonList = await readJsonFile(pathPokemonList);
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
