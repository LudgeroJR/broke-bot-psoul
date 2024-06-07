const ShufflePokemon = require("../../utils/shufflePokemon");
const GameCatchEmbed = require("./../../embed/gameCatchEmbed");
const ShinyGlobalResultEmbed = require("./../../embed/shinyGlobalResultEmbed");
const Buttons = require("./../../buttons/gameCatchPokeballButtons");
const { ComponentType } = require("discord.js");
const TryCatchPokemon = require("../../utils/tryCatchPokemon");
const { gameChannel } = require("./../../../config.json");

const {
  usersInCooldown,
} = require("./../../utils/cooldown/cooldownGameCatch.json");

module.exports = {
  name: "game-catch",
  description: "Teste sua sorte ao tentar capturar um shiny.",
  // devOnly: true,
  memberOnly: true,
  // testOnly: true,
  // deleted: Boolean,

  callback: async (client, interaction) => {
    if (usersInCooldown.includes(interaction.user.id))
      return await interaction.reply({
        content:
          "O cooldown deste comando é de 2 segundos para evitar spam e manter a estabilidade do bot.",
        ephemeral: true,
      });

    const pokemon = await ShufflePokemon();
    const gameCatchEmbed = GameCatchEmbed(pokemon);

    var choseBall;
    var pointBall;
    var pointBall;
    var ballName;
    var finalResult;
    var updatedButtonRow;

    if (!pokemon.shiny) {
      interaction.reply({ embeds: [gameCatchEmbed], ephemeral: true });
    } else {
      const buttonRow = Buttons(interaction);
      choseBall = await interaction.reply({
        embeds: [gameCatchEmbed],
        ephemeral: true,
        components: [buttonRow],
      });

      const collector = choseBall.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 15_000,
      });

      collector.on("collect", async (interaction) => {
        if (interaction.customId === `BallClan-${interaction.user.id}`) {
          pointBall = 4;
          ballName = "Ball de Clan";
        }
        if (interaction.customId === `UltraBall-${interaction.user.id}`) {
          pointBall = 3;
          ballName = "Ultra Ball";
        }
        if (interaction.customId === `GreatBall-${interaction.user.id}`) {
          pointBall = 2;
          ballName = "Great Ball";
        }
        if (interaction.customId === `PremierBall-${interaction.user.id}`) {
          pointBall = 1;
          ballName = "Premier Ball";
        }

        finalResult = TryCatchPokemon();

        const resultMessage =
          pointBall >= finalResult
            ? `[${pointBall}/${finalResult}] - :star2: **GOTCHA** :star2: Você capturou o ${gameCatchEmbed.data.title} usando uma ${ballName}. Parabéns!!!`
            : `[${pointBall}/${finalResult}] - :weary: **QUE AZAR** :weary: Você não conseguiu capturar o ${gameCatchEmbed.data.title}. Não desanime, o próximo vem!!!`;

        await interaction.reply({ content: resultMessage, ephemeral: true });

        // Desativar botões após intereção
        updatedButtonRow = buttonRow.components.map((button) => {
          button.setDisabled(true);
          return button;
        });

        // Atualizar a mensagem original com os botões desativados
        await choseBall.edit({
          components: [{ type: 1, components: updatedButtonRow }],
        });

        collector.stop(); // Parar o coletor após a interação

        const shinyGlobalResultEmbed = ShinyGlobalResultEmbed(
          pokemon,
          ballName,
          pointBall,
          finalResult,
          interaction.user
        );

        const gameChannelGlobal = client.channels.cache.get(gameChannel);
        gameChannelGlobal.send({ embeds: [shinyGlobalResultEmbed] });
      });

      collector.on("end", async (interaction) => {
        // Desativar botões após intereção
        updatedButtonRow = buttonRow.components.map((button) => {
          button.setDisabled(true);
          return button;
        });

        // Atualizar a mensagem original com os botões desativados
        await choseBall.edit({
          components: [{ type: 1, components: updatedButtonRow }],
        });
      });
    }

    // usersInCooldown.push(interaction.user.id);
    // setTimeout(() => {
    //   usersInCooldown.shift();
    // }, 2000);
  },
};
