const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "calcula-broke",
  description: "Calcula a broke de acordo com o máximo obtido.",
  // devOnly: true,
  // memberOnly: true,
  // testOnly: true,
  options: [
    {
      name: "maximo",
      description: "Numero máximo obtido",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    const maximo = interaction.options.get("maximo");

    const SKILL = 100;
    const TALENT = 10;

    function estimateCatchChance(observedY, shiny) {
      let baseChance = observedY + SKILL / 10;

      if (shiny) {
        return baseChance * 1.03;
      } else {
        return baseChance;
      }
    }

    function calculateChanceMax(catchChance, tries) {
      let talentCatch = (TALENT * 0.5) / 100;
      catchChance = catchChance / (1 + 0.1 + talentCatch);

      let triesFactor = tries / catchChance;

      let chanceMax = Math.ceil(
        catchChance -
          SKILL / 10 -
          (triesFactor > 1.0 ? (triesFactor - 1.0) * catchChance : 0)
      );
      if (chanceMax < 5) {
        chanceMax = catchChance < 5 && catchChance > 0 ? catchChance : 5;
      }

      return chanceMax;
    }

    function estimateTriesToMinChance(observedY) {
      let estimatedCatchChanceShiny = estimateCatchChance(observedY, true);

      let tries = 1;

      while (calculateChanceMax(estimatedCatchChanceShiny, tries) > 5) {
        tries += 1;
      }

      return tries;
    }

    const numeroMax = parseInt(maximo.value);
    const embed = new EmbedBuilder()
      .setTitle(`Calculo de Broke`)
      .setDescription(`Máximo obtido: ${maximo.value}`)
      .setFooter({
        text: "Os dados obtidos são de sua responsábilidade. A Guild ARKHAM e o jogo Psoul não se responsabilizam por eventuais perdas.",
      });

    let estimatedAdditionalTries = estimateTriesToMinChance(numeroMax);
    embed.addFields({
      name: "Broke exata:",
      value: `${estimatedAdditionalTries}`,
      inline: true,
    });
    embed.addFields({
      name: "Broke minima:",
      value: `${estimatedAdditionalTries - 4}`,
      inline: true,
    });

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
