const fs = require("fs").promises;
const path = require("path");

const pathGameRanking = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "data",
  "ranking",
  "gameRanking.json"
);

const pathPokemonList = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "data",
  "pokemonlist",
  "pokemonList.json"
);

const pathUserRound = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "data",
  "cooldown",
  "userRound.json"
);

let saveInProgress = false;
let saveNeeded = false;

const saveJson = async (rankingData, pokeListData, cooldownData) => {
  if (saveInProgress) {
    saveNeeded = true;
    return;
  }

  saveInProgress = true;

  try {
    await fs.writeFile(pathGameRanking, JSON.stringify(rankingData, null, 2));
    await fs.writeFile(pathPokemonList, JSON.stringify(pokeListData, null, 2));
    await fs.writeFile(pathUserRound, JSON.stringify(cooldownData, null, 2));
  } catch (error) {
    console.error("Erro ao salvar o arquivo JSON:", error);
  } finally {
    saveInProgress = false;
    if (saveNeeded) {
      saveNeeded = false;
      saveJson(rankingData, pokeListData, cooldownData);
    }
  }
};

const debounceSave = (() => {
  let timer;
  return (rankingData, pokeListData, cooldownData) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      saveJson(rankingData, pokeListData, cooldownData);
    }, 1000);
  };
})();

module.exports = {
  name: "game-reset",
  description: "Reseta os Pokemons disponiveis no jogo e o ranking",
  devOnly: true,
  // memberOnly: true,
  // testOnly: true,
  deleted: Boolean,

  callback: async (client, interaction) => {
    // Criando uma nova lista de pokemon
    const maxPokemonId = 1025;
    const newPokemonList = { idPokemon: [] };
    for (let i = 1; i <= maxPokemonId; i++) {
      newPokemonList.idPokemon.push(i);
    }

    // Resetando o Ranking atual
    const newRanking = {};

    // Resetando todos os cooldowns
    const newCooldown = {};

    interaction.reply({
      content: "Lista de Pokemon regerada e Ranking resetado.",
      ephemeral: true,
    });

    debounceSave(newRanking, newPokemonList, newCooldown);
  },
};
