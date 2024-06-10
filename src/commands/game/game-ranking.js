const { gameRankingChannel } = require("./../../../config.json");
const GameRankingEmbed = require("./../../embed/gameRankingEmbed");

module.exports = {
  name: "game-ranking",
  description: "Exibe o ranking de pontuação do game-catch",
  devOnly: true,
  // memberOnly: true,
  // testOnly: true,
  // deleted: Boolean,

  callback: async (client, interaction) => {
    const gameRankingEmbed = await GameRankingEmbed();

    interaction.reply({
      content: "Ranking enviado ao canal #Ranking",
      ephemeral: true,
    });

    const rankingChannel = client.channels.cache.get(gameRankingChannel);
    rankingChannel.send({ embeds: [gameRankingEmbed] });
  },
};
