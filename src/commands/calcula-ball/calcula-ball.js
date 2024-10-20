const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "calcula-ball",
  description: "Sugere quantidade de balls para montar sua broke.",
  // devOnly: true,
  // memberOnly: true,
  // testOnly: true,
  options: [
    {
      name: "pontos",
      description: "Pontuação da broke.",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    // {
    // 	name: "4x",
    // 	description: "Quantidade desejada de ball 4x em porcentagem.",
    // 	type: ApplicationCommandOptionType.Number,
    // 	required: true,
    // },
    {
      name: "3x",
      description: "Quantidade desejada de ball 3x em porcentagem.",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "2x",
      description: "Quantidade desejada de ball 2x em porcentagem.",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    const pontosTotais = interaction.options.get("pontos");
    //const porcBall4x = interaction.options.get("4x");
    const porcBall3x = interaction.options.get("3x");
    const porcBall2x = interaction.options.get("2x");

    let pontosRestantes = pontosTotais.value;
    let pontos = 0;

    const embed = new EmbedBuilder()
      .setTitle(`Sugestão de balls`)
      .setDescription(`Pontos: ${pontosTotais.value}`)
      .setFooter({
        text: "A Guild ARK invoca o **BUFF AH PUFF** para abençoar sua broke.",
      });

    // if (porcBall4x.value > 100) {
    // 	porcBall4x.value = 100;
    // }
    if (porcBall3x.value > 100) {
      porcBall3x.value = 100;
    }
    if (porcBall2x.value > 100) {
      porcBall2x.value = 100;
    }
    // if (porcBall4x.value !== 0) {
    // 	let ball4x = Math.floor((pontosRestantes * (porcBall4x.value / 100)) / 4);

    // 	if (ball4x !== 0) {
    // 		pontos = ball4x * 4;
    // 		embed.addFields({ name: "Ball 4x", value: `${ball4x}`, inline: true });
    // 		//message += `Ball4x: ${ball4x} - Pontos: ${pontos}` ;
    // 		pontosRestantes -= ball4x * 4;
    // 	}
    // }

    if (porcBall3x.value !== 0) {
      let ball3x = Math.floor((pontosRestantes * (porcBall3x.value / 100)) / 3);

      if (ball3x !== 0) {
        pontos = ball3x * 3;
        embed.addFields({
          name: "Ultraball",
          value: `${ball3x}`,
          inline: true,
        });
        //message += `\nUltraball: ${ball3x} - Pontos: ${pontos}`;
        pontosRestantes -= ball3x * 3;
      }
    }

    if (porcBall2x.value !== 0) {
      let ball2x = Math.floor((pontosRestantes * (porcBall2x.value / 100)) / 2);

      if (ball2x !== 0) {
        pontos = ball2x * 2;
        embed.addFields({
          name: "Greatball",
          value: `${ball2x}`,
          inline: true,
        });
        //message += `\nGreatball: ${ball2x} - Pontos: ${pontos}`;
        pontosRestantes -= ball2x * 2;
      }
    }

    if (pontosRestantes !== 0) {
      embed.addFields({
        name: "Pokeball",
        value: `${pontosRestantes}`,
        inline: true,
      });
      //message += `\nPokeball: ${pontosRestantes} - Pontos: ${pontosRestantes}`;
    }

    // message +=
    // 	"\n\nA Guild ARK invoca o **BUFF AH PUFF** para abençoar sua broke.";

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
