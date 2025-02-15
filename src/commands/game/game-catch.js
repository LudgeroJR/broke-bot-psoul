const ShufflePokemon = require("../../utils/shufflePokemon");
const GameCatchEmbed = require("./../../embed/gameCatchEmbed");
const ShinyGlobalResultEmbed = require("./../../embed/shinyGlobalResultEmbed");
const Buttons = require("./../../buttons/gameCatchPokeballButtons");
const { ComponentType } = require("discord.js");
const TryCatchPokemon = require("../../utils/tryCatchPokemon");
const { gameChannel } = require("./../../../config.json");
const CheckCooldownRoundGameCatch = require("./../../utils/cooldown/checkCooldownRoundGameCatch");
const RegisterUserRound = require("./../../utils/cooldown/registerUserRound");
const UpdateRanking = require("./../../utils/ranking/updateRanking");

module.exports = {
  name: "game-catch",
  description: "Teste sua sorte ao tentar capturar um shiny.",
  // devOnly: true,
  // memberOnly: true,
  // testOnly: true,
  // deleted: Boolean,

  // callback: async (client, interaction) => {
  //   var isUserCooldownRound;
  //   var pokemon;
  //   var choseBall;
  //   var rateCapturaBall;
  //   var ballName;
  //   var finalResult;
  //   var updatedButtonRow;

  //   try {
  //     await RegisterUserRound(interaction.user.id);
  //   } catch (error) {
  //     console.error(`Erro ao registrar a rodada do usuário\n${error}`);
  //   }

  //   try {
  //     isUserCooldownRound = await CheckCooldownRoundGameCatch(
  //       interaction.user.id
  //     );

  //     if (isUserCooldownRound)
  //       return await interaction.reply({
  //         content:
  //           "Rodadas finalizadas. Você receberá mais 20 na próxima hora.",
  //         ephemeral: true,
  //       });
  //   } catch (error) {
  //     console.error(`Erro ao tentar checar o cooldown do usuário\n${error}`);
  //   }

  //   try {
  //     pokemon = await ShufflePokemon();

  //     if (!pokemon)
  //       return await interaction.reply({
  //         content:
  //           "**ACABOU** Todos pokemons foram capturados. Aguarde até o anúncio do campeão e do início da próxima rodada.",
  //         ephemeral: true,
  //       });
  //   } catch (error) {
  //     console.error(`Erro ao sortear um pokemon\n${error}`);
  //   }

  //   const gameCatchEmbed = await GameCatchEmbed(interaction.user.id, pokemon);

  //   if (!pokemon.shiny) {
  //     interaction.reply({ embeds: [gameCatchEmbed], ephemeral: true });
  //   } else {
  //     const buttonRow = Buttons(interaction);
  //     choseBall = await interaction.reply({
  //       embeds: [gameCatchEmbed],
  //       ephemeral: true,
  //       components: [buttonRow],
  //     });

  //     const collector = choseBall.createMessageComponentCollector({
  //       componentType: ComponentType.Button,
  //       time: 25_000,
  //     });

  //     collector.on("collect", async (interaction) => {
  //       if (interaction.customId === `BallClan-${interaction.user.id}`) {
  //         rateCapturaBall = 4;
  //         ballName = "Ball de Clan";
  //       }
  //       if (interaction.customId === `UltraBall-${interaction.user.id}`) {
  //         rateCapturaBall = 3;
  //         ballName = "Ultra Ball";
  //       }
  //       if (interaction.customId === `GreatBall-${interaction.user.id}`) {
  //         rateCapturaBall = 2;
  //         ballName = "Great Ball";
  //       }
  //       if (interaction.customId === `PremierBall-${interaction.user.id}`) {
  //         rateCapturaBall = 1;
  //         ballName = "Premier Ball";
  //       }
  //       try {
  //         finalResult = TryCatchPokemon();
  //       } catch (error) {
  //         console.error(`Erro ao verificar se capturou o pokemon\n${error}`);
  //       }

  //       if (rateCapturaBall >= finalResult) {
  //         try {
  //           // Atualiza as informações do Ranking após uma captura bem sucedida
  //           UpdateRanking(interaction.user, rateCapturaBall, pokemon);
  //         } catch (error) {
  //           console.error(`Erro ao atualizar o ranking\n${error}`);
  //         }
  //       }

  //       const resultMessage =
  //         rateCapturaBall >= finalResult
  //           ? `[${rateCapturaBall}/${finalResult}] - :star2: **GOTCHA** :star2: Você capturou o ${gameCatchEmbed.data.title} usando uma ${ballName}. Parabéns!!!`
  //           : `[${rateCapturaBall}/${finalResult}] - :weary: **OUNCH** :weary: Sua pokebola quebrou ao tentar capturar o ${gameCatchEmbed.data.title}.`;

  //       await interaction.reply({ content: resultMessage, ephemeral: true });

  //       // Desativar botões após intereção
  //       updatedButtonRow = buttonRow.components.map((button) => {
  //         button.setDisabled(true);
  //         return button;
  //       });

  //       // Atualizar a mensagem original com os botões desativados
  //       await choseBall.edit({
  //         components: [{ type: 1, components: updatedButtonRow }],
  //       });

  //       collector.stop(); // Parar o coletor após a interação

  //       const shinyGlobalResultEmbed = ShinyGlobalResultEmbed(
  //         pokemon,
  //         ballName,
  //         rateCapturaBall,
  //         finalResult,
  //         interaction.user
  //       );

  //       const gameChannelGlobal = client.channels.cache.get(gameChannel);
  //       gameChannelGlobal.send({ embeds: [shinyGlobalResultEmbed] });
  //     });

  //     collector.on("end", async (interaction) => {
  //       // Desativar botões após intereção
  //       updatedButtonRow = buttonRow.components.map((button) => {
  //         button.setDisabled(true);
  //         return button;
  //       });

  //       // Atualizar a mensagem original com os botões desativados
  //       await choseBall.edit({
  //         components: [{ type: 1, components: updatedButtonRow }],
  //       });
  //     });
  //   }
  // },

  // Nova Logica do Game Catch - EM TESTE
  callback: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true }); // Defer para evitar timeout

    var isUserCooldownRound;
    var pokemon;
    var choseBall;
    var rateCapturaBall;
    var ballName;
    var finalResult;
    var updatedButtonRow;

    while (true) {
      try {
        await RegisterUserRound(interaction.user.id);
      } catch (error) {
        console.error(`Erro ao registrar a rodada do usuário\n${error}`);
      }

      try {
        isUserCooldownRound = await CheckCooldownRoundGameCatch(
          interaction.user.id
        );
        if (isUserCooldownRound) {
          await interaction.editReply({
            content:
              "Rodadas finalizadas. Você receberá mais 20 na próxima hora.",
          });
          break;
        }

        pokemon = await ShufflePokemon();
        if (!pokemon) {
          await interaction.editReply({
            content:
              "**ACABOU** Todos pokemons foram capturados. Aguarde até o anúncio do campeão e do início da próxima rodada.",
          });
          break;
        }
      } catch (error) {
        console.error(`Erro ao processar rodada do usuário\n${error}`);
      }

      const gameCatchEmbed = await GameCatchEmbed(interaction.user.id, pokemon);

      if (!pokemon.shiny) {
        await interaction.editReply({ embeds: [gameCatchEmbed] });
      } else {
        const buttonRow = Buttons(interaction);

        // Envia uma nova mensagem para o shiny
        try {
          choseBall = await interaction.editReply({
            //choseBall = await interaction.followUp({
            embeds: [gameCatchEmbed],
            components: [buttonRow],
            //ephemeral: true, // Define como false para que todos possam ver a mensagem
          });
        } catch (error) {
          console.error("Erro ao enviar nova mensagem para captura:", error);
          break;
        }

        const collector = choseBall.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 25_000,
        });

        collector.on("collect", async (buttonInteraction) => {
          try {
            if (
              buttonInteraction.customId === `BallClan-${interaction.user.id}`
            ) {
              rateCapturaBall = 4;
              ballName = "Ball de Clan";
            } else if (
              buttonInteraction.customId === `UltraBall-${interaction.user.id}`
            ) {
              rateCapturaBall = 3;
              ballName = "Ultra Ball";
            } else if (
              buttonInteraction.customId === `GreatBall-${interaction.user.id}`
            ) {
              rateCapturaBall = 2;
              ballName = "Great Ball";
            } else if (
              buttonInteraction.customId ===
              `PremierBall-${interaction.user.id}`
            ) {
              rateCapturaBall = 1;
              ballName = "Premier Ball";
            }

            try {
              finalResult = TryCatchPokemon();
            } catch (error) {
              console.error(
                `Erro ao verificar se capturou o pokemon\n${error}`
              );
            }

            if (rateCapturaBall >= finalResult) {
              try {
                UpdateRanking(interaction.user, rateCapturaBall, pokemon);
              } catch (error) {
                console.error(`Erro ao atualizar o ranking\n${error}`);
              }
            }

            const resultMessage =
              rateCapturaBall >= finalResult
                ? `[${rateCapturaBall}/${finalResult}] - :star2: **GOTCHA** :star2: Você capturou o ${gameCatchEmbed.data.title} usando uma ${ballName}. Parabéns!!!`
                : `[${rateCapturaBall}/${finalResult}] - :weary: **OUNCH** :weary: Sua pokebola quebrou ao tentar capturar o ${gameCatchEmbed.data.title}.`;

            await buttonInteraction.reply({
              content: resultMessage,
              ephemeral: true,
            });

            updatedButtonRow = buttonRow.components.map((button) => {
              button.setDisabled(true);
              return button;
            });

            try {
              // Edita a nova mensagem para desativar os botões
              // await choseBall.edit({
              //   components: [{ type: 1, components: updatedButtonRow }],
              // });
              choseBall = await interaction.editReply({
                //choseBall = await interaction.followUp({
                embeds: [gameCatchEmbed],
                components: [{ type: 1, components: updatedButtonRow }],
                //ephemeral: true, // Define como false para que todos possam ver a mensagem
              });
            } catch (error) {
              console.error(
                "Erro ao editar a nova mensagem. Talvez tenha sido deletada.",
                error
              );
            }

            collector.stop();

            const shinyGlobalResultEmbed = ShinyGlobalResultEmbed(
              pokemon,
              ballName,
              rateCapturaBall,
              finalResult,
              interaction.user
            );

            const gameChannelGlobal = client.channels.cache.get(gameChannel);
            if (gameChannelGlobal) {
              await gameChannelGlobal.send({
                embeds: [shinyGlobalResultEmbed],
              });
            } else {
              console.error("Canal do jogo não encontrado.");
            }

            return; // Encerra o loop após capturar um shiny
          } catch (error) {
            console.error(`Erro durante a interação do coletor\n${error}`);
          }
        });

        // collector.on("end", async () => {
        //   updatedButtonRow = buttonRow.components.map((button) => {
        //     button.setDisabled(true);
        //     return button;
        //   });

        //   try {
        //     // Tenta editar a nova mensagem para desativar os botões
        //     await choseBall.edit({
        //       components: [{ type: 1, components: updatedButtonRow }],
        //     });
        //   } catch (error) {
        //     console.error(
        //       "Erro ao editar a nova mensagem após o coletor expirar:",
        //       error
        //     );
        //   }
        // });

        break; // Sai do loop ao encontrar um shiny
      }

      // Pequena pausa para evitar flood de requisições
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  },
};
