const ShufflePokemon = require("../../utils/shufflePokemon");
const GameCatchEmbed = require("./../../embed/gameCatchEmbed");
const ShinyGlobalResultEmbed = require("./../../embed/shinyGlobalResultEmbed");
const Buttons = require("./../../buttons/gameCatchPokeballButtons");
const { ComponentType } = require("discord.js");
const TryCatchPokemon = require("../../utils/tryCatchPokemon");
const { gameChannel, gameRankingChannel } = require("./../../../config.json");
const CheckCooldownRoundGameCatch = require("./../../utils/cooldown/checkCooldownRoundGameCatch");
const RegisterUserRound = require("./../../utils/cooldown/registerUserRound");
const UpdateRanking = require("./../../utils/ranking/updateRanking");
const SortedRanking = require("./../../utils/ranking/sortedRanking");
const GameRankingEmbed = require("./../../embed/gameRankingEmbed");

module.exports = {
  name: "game-catch",
  description: "Teste sua sorte ao tentar capturar um shiny.",
  // devOnly: true,
  memberOnly: true,
  // testOnly: true,
  // deleted: Boolean,

  callback: async (client, interaction) => {
    var isUserCooldownRound;
    var pokemon;
    var choseBall;
    var pointBall;
    var pointBall;
    var ballName;
    var finalResult;
    var updatedButtonRow;

    try {
      isUserCooldownRound = await CheckCooldownRoundGameCatch(
        interaction.user.id
      );

      if (isUserCooldownRound)
        return await interaction.reply({
          content:
            "**COOLDOWN** Você terminou suas 25 rodadas. Cooldown reseta na próxima hora.",
          ephemeral: true,
        });
    } catch (error) {
      console.error(`Erro ao tentar checar o cooldown do usuário\n${error}`);
    }

    try {
      pokemon = await ShufflePokemon();

      if (!pokemon)
        return await interaction.reply({
          content:
            "**ACABOU** Todos pokemons foram capturados. Avise o LudgeroJR para ele gerar o Ranking para ver quem foi o campeão e resetar o jogo.",
          ephemeral: true,
        });
    } catch (error) {
      console.error(`Erro ao sortear um pokemon\n${error}`);
    }

    const gameCatchEmbed = GameCatchEmbed(pokemon);

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
        time: 25_000,
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
        try {
          finalResult = TryCatchPokemon();
        } catch (error) {
          console.error(`Erro ao verificar se capturou o pokemon\n${error}`);
        }

        if (pointBall >= finalResult) {
          try {
            const currentRanking = await SortedRanking();
            let currentRankingList = [];
            for (let i = 0; i < currentRanking.length; i++) {
              currentRankingList[i] = currentRanking[i].userGlobalName;
            }
            UpdateRanking(interaction.user, pointBall, pokemon);
            const updatedRanking = await SortedRanking();
            let updatedRankingList = [];
            let arrayAreEqual = true;
            if (updatedRanking.length == currentRanking.length) {
              for (let i = 0; i < updatedRanking.length; i++) {
                updatedRankingList[i] = updatedRanking[i].userGlobalName;
                if (updatedRankingList[i] !== currentRankingList[i]) {
                  arrayAreEqual = false;
                }
              }
            } else {
              arrayAreEqual = false;
            }

            if (!arrayAreEqual) {
              try {
                const gameRankingEmbed = await GameRankingEmbed();
                gameRankingEmbed.setTitle(
                  "Ranking Global - Sentimos uma mudança na força"
                );
                gameRankingEmbed.setDescription(
                  "Este ranking foi gerado automaticamente devido a uma captura que alterou a classificação.\nLembre-se: este ranking foi criado no meio de uma jogada, então o posicionamento é atual, mas a pontuação pode variar."
                );
                const rankingChannel =
                  client.channels.cache.get(gameRankingChannel);
                rankingChannel.send({ embeds: [gameRankingEmbed] });
              } catch (error) {
                console.error(`Erro ao gerar o embed do ranking\n${error}`);
              }
            }
          } catch (error) {
            console.error(`Erro ao atualizar o ranking\n${error}`);
          }
        }

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

    try {
      RegisterUserRound(interaction.user.id);
    } catch (error) {
      console.error(`Erro ao registrar a rodada do usuário\n${error}`);
    }
  },
};
