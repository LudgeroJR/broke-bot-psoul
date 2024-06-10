const { EmbedBuilder } = require("discord.js");

const fs = require("fs").promises;
const path = require("path");

const pathGameRanking = path.join(
  __dirname,
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
  const allRanking = await readJsonFile(pathGameRanking);
  const pokemonList = await readJsonFile(pathPokemonList);
  const idPokemon = pokemonList.idPokemon;

  // Ordenar a lista de Ranking por pontuação
  const pokemonStock = idPokemon.length + 1;
  const footerMsg = `Use o comando /game-catch e conquiste o seu lugar entre os melhores capturadores de shinys. Pokemons restantes: ${pokemonStock}`;

  const sortedData = Object.values(allRanking)
    .map(({ userGlobalName, countShinyCatch, totalPointRankig }) => ({
      userGlobalName,
      countShinyCatch,
      totalPointRankig,
    }))
    .sort((a, b) => b.totalPointRankig - a.totalPointRankig);

  const rankingEmbed = new EmbedBuilder()
    .setTitle("Ranking Global - Game-Catch")
    .setDescription(
      "Guild ARKHAM tem a honra de apresentar os melhores treinadores atualmente."
    )
    .setFooter({
      text: footerMsg,
    });

  if (sortedData.length == 0) {
    rankingEmbed.addFields({
      name: "Seja o primeiro ....",
      value: "Ainda não há registros de Capturas realizadas por treinadores.",
    });
  }

  if (sortedData.length > 0) {
    rankingEmbed.addFields({
      name: ":first_place:",
      value: `**Pontos**: ${sortedData[0].totalPointRankig}\n**Nome**: ${sortedData[0].userGlobalName}\n**Total Shiny**: ${sortedData[0].countShinyCatch}`,
      inline: true,
    });
  }

  if (sortedData.length > 1) {
    rankingEmbed.addFields({
      name: ":second_place:",
      value: `**Pontos**: ${sortedData[1].totalPointRankig}\n**Nome**: ${sortedData[1].userGlobalName}\n**Total Shiny**: ${sortedData[1].countShinyCatch}`,
      inline: true,
    });
  }
  if (sortedData.length > 2) {
    rankingEmbed.addFields({
      name: ":third_place:",
      value: `**Pontos**: ${sortedData[2].totalPointRankig}\n**Nome**: ${sortedData[2].userGlobalName}\n**Total Shiny**: ${sortedData[2].countShinyCatch}`,
      inline: true,
    });
  }

  if (sortedData.length > 3) {
    rankingEmbed.addFields(
      { name: "\u200B", value: "\u200B" },
      {
        name: "E na cola dos líderes, visando o topo estão:",
        value: "\u200B",
      }
    );
    let position;
    for (let i = 3; i < sortedData.length; i++) {
      position = i + 1;
      rankingEmbed.addFields({
        name: `${position}º`,
        value: `Pontos: ${sortedData[i].totalPointRankig}\nNome: ${sortedData[i].userGlobalName}\nTotal Shiny: ${sortedData[i].countShinyCatch}`,
        inline: true,
      });
    }
  }

  return rankingEmbed;
};
