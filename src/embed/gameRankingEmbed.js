const { EmbedBuilder } = require("discord.js");

const GameRanking = require("./../models/gameRankingModel");
const PokemonList = require("./../models/pokemonListModel");

module.exports = async () => {
  const gameRanking = await GameRanking.find({});
  const pokemonList = await PokemonList.findOne({});
  const idPokemon = pokemonList.idPokemon;

  // Ordenar a lista de Ranking por pontuação
  const pokemonStock = idPokemon.length;
  const footerMsg = `Use o comando /game-catch e conquiste o seu lugar entre os melhores capturadores de shinys. Pokemons restantes: ${pokemonStock}`;

  const sortedData = Object.values(gameRanking)
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

  var rankingLength;
  if (sortedData.length > 21) {
    rankingLength = 21;
  } else {
    rankingLength = sortedData.length;
  }

  if (rankingLength == 0) {
    rankingEmbed.addFields({
      name: "Seja o primeiro ....",
      value: "Ainda não há registros de Capturas realizadas por treinadores.",
    });
  }

  if (rankingLength > 0) {
    rankingEmbed.addFields({
      name: ":first_place:",
      value: `**Pontos**: ${sortedData[0].totalPointRankig}\n**Nome**: ${sortedData[0].userGlobalName}\n**Total Shiny**: ${sortedData[0].countShinyCatch}`,
      inline: true,
    });
  }

  if (rankingLength > 1) {
    rankingEmbed.addFields({
      name: ":second_place:",
      value: `**Pontos**: ${sortedData[1].totalPointRankig}\n**Nome**: ${sortedData[1].userGlobalName}\n**Total Shiny**: ${sortedData[1].countShinyCatch}`,
      inline: true,
    });
  }
  if (rankingLength > 2) {
    rankingEmbed.addFields({
      name: ":third_place:",
      value: `**Pontos**: ${sortedData[2].totalPointRankig}\n**Nome**: ${sortedData[2].userGlobalName}\n**Total Shiny**: ${sortedData[2].countShinyCatch}`,
      inline: true,
    });
  }

  if (rankingLength > 3) {
    rankingEmbed.addFields(
      { name: "\u200B", value: "\u200B" },
      {
        name: "E na cola dos líderes, visando o topo estão:",
        value: "\u200B",
      }
    );
    let position;

    for (let i = 3; i <= rankingLength; i++) {
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
