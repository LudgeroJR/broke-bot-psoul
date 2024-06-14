const { gameRankingChannel } = require("./../../../config.json");
const GameRankingEmbed = require("./../../embed/gameRankingEmbed");

module.exports = async (client) => {
  var gameRankingEmbed;
  try {
    gameRankingEmbed = await GameRankingEmbed();
  } catch (error) {
    console.error(`Erro ao gerar o embed do ranking\n${error}`);
  }

  const rankingChannel = client.channels.cache.get(gameRankingChannel);
  rankingChannel.send({ embeds: [gameRankingEmbed] });
};
