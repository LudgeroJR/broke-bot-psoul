const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const BrokeTable = require("../../models/broketable");
const getThumbnail = require("../../utils/getThumbnail");

module.exports = {
  name: "broke-info",
  description: "Consulta a informação da broke do Pokemon.",
  // devOnly: true,
  // memberOnly: true,
  // testOnly: true,
  options: [
    // {
    // 	name: "dex",
    // 	description: "Numero da Dex",
    // 	type: ApplicationCommandOptionType.String,
    // },
    {
      name: "pokemon",
      description: "Nome do Pokemon.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    //const existDex = interaction.options.get("dex");
    const existName = interaction.options.get("pokemon");
    var consulta;
    var embed;
    let embedTitle = "";
    let embedDescription = "";
    let thumb = "";
    let consDex = "";
    let consName = "";
    let consBroke = "";
    let dexInt = 0;

    if (!existName) {
      interaction.reply({
        content: "Nenhuma informação para consulta foi fornecida.",
        ephemeral: true,
      });
      return;
    } else {
      var pokemonName;
      pokemonName = existName.value;

      const query = {
        pokemonName: { $regex: pokemonName, $options: "i" },
      };

      try {
        consulta = await BrokeTable.find(query);

        if (consulta.length === 0) {
          interaction.reply({
            content: `Nenhuma broke encontrada com nome **${pokemonName}**`,
          });
          return;
        } else if (consulta.length === 1) {
          consDex = consulta[0].dex;
          consName = consulta[0].pokemonName;
          consBroke = consulta[0].pokemonBroke;

          dexInt = parseInt(consDex);
          thumb = getThumbnail(dexInt);

          embedTitle = `#${consDex} ${consName}`;
          embedDescription = `Broke: ${consBroke}`;

          embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(embedTitle)
            .setDescription(embedDescription)
            .setThumbnail(thumb)
            .setFooter({
              text: `As informações não são fornecidas oficialmente pela Staff do Psoul. O uso é de responsabilidade do jogador. Em caso de erro, contate a Guild ARKHAM para correção.`,
            });

          interaction.reply({ embeds: [embed] });
        } else {
          await interaction.deferReply();
          for (let i = 0; i < consulta.length; i++) {
            consDex = consulta[i].dex;
            consName = consulta[i].pokemonName;
            consBroke = consulta[i].pokemonBroke;

            dexInt = parseInt(consDex);
            thumb = getThumbnail(dexInt);

            embedTitle = `#${consDex} ${consName}`;
            embedDescription = `Broke: ${consBroke}`;

            embed = new EmbedBuilder()
              .setColor("Random")
              .setTitle(embedTitle)
              .setDescription(embedDescription)
              .setThumbnail(thumb)
              .setFooter({
                text: `As informações não são fornecidas oficialmente pela Staff do Psoul. O uso é de responsabilidade do jogador. Em caso de erro, contate a Guild ARKHAM para correção.`,
              });

            interaction.channel.send({ embeds: [embed] });

            // if (i === 0) {
            // 	await interaction.reply({ embeds: [embed] });
            // } else {
            // 	await interaction.deferReply({ embeds: [embed] });
            // }
          }
          await interaction.editReply({
            content: `Resultados encontrados com **${pokemonName}**`,
          });
        }
      } catch (error) {
        console.log(error);
        interaction.reply(`Erro ao consultar a Broke: ${error}`);
      }
    }
  },
};
