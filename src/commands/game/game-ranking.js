const { gameRankingChannel } = require("./../../../config.json");
const GameRankingEmbed = require("./../../embed/gameRankingEmbed");

module.exports = {
  name: "game-ranking",
  description: "Exibe o ranking de pontuação do game-catch",
  devOnly: true,
  // memberOnly: true,
  // testOnly: true,
  deleted: Boolean,

  callback: async (client, interaction) => {
    var gameRankingEmbed;
    try {
      gameRankingEmbed = await GameRankingEmbed();
    } catch (error) {
      console.error(`Erro ao gerar o embed do ranking\n${error}`);
    }

    interaction.reply({
      content: "Ranking enviado ao canal #Ranking",
      ephemeral: true,
    });

    const rankingChannel = client.channels.cache.get(gameRankingChannel);
    rankingChannel.send({ embeds: [gameRankingEmbed] });
  },
};
