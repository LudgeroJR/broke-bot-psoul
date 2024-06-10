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

let saveInProgress = false;
let saveNeeded = false;

const saveJson = async (rankingData, pokeListData) => {
  if (saveInProgress) {
    saveNeeded = true;
    return;
  }

  saveInProgress = true;

  try {
    await fs.writeFile(pathGameRanking, JSON.stringify(rankingData, null, 2));
    await fs.writeFile(pathPokemonList, JSON.stringify(pokeListData, null, 2));
  } catch (error) {
    console.error("Erro ao salvar o arquivo JSON:", error);
  } finally {
    saveInProgress = false;
    if (saveNeeded) {
      saveNeeded = false;
      saveJson(rankingData, pokeListData);
    }
  }
};

const debounceSave = (() => {
  let timer;
  return (rankingData, pokeListData) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      saveJson(rankingData, pokeListData);
    }, 1000);
  };
})();

const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error("Erro ao ler ou parsear o arquivo JSON:", err);
  }
};

module.exports = async (user, ballPoint, pokemonId) => {
  const updateRanking = await readJsonFile(pathGameRanking);
  let newUpdateRanking = updateRanking;
  const updatePokemonList = await readJsonFile(pathPokemonList);
  let newUpdatePokemonList = updatePokemonList;

  let addPoints = 5 - ballPoint;

  if (!newUpdateRanking[user.id]) {
    newUpdateRanking[user.id] = {
      userGlobalName: user.globalName,
      countShinyCatch: 1,
      totalPointRankig: addPoints,
      listCatchPokemon: [pokemonId],
    };
  } else {
    newUpdateRanking[user.id].countShinyCatch++;
    newUpdateRanking[user.id].totalPointRankig += addPoints;
    newUpdateRanking[user.id].listCatchPokemon.push(pokemonId);
  }

  newUpdatePokemonList.idPokemon = newUpdatePokemonList.idPokemon.filter(
    (item) => item !== pokemonId
  );

  debounceSave(newUpdateRanking, newUpdatePokemonList);
};
