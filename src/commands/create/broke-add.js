const { ApplicationCommandOptionType } = require("discord.js");
const BrokeTable = require("../../models/broketable");

module.exports = {
  name: "broke-add",
  description: "Adiciona a broke do Pokemon na lista de broke",
  devOnly: true,
  // memberOnly: true,
  // testOnly: true,
  options: [
    {
      name: "dex",
      description: "Numero da Dex",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "pokemon",
      description: "Nome Pokemon.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "broke",
      description: "Descrição da broke do Pokemon.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "thumb",
      description: "Thumbnail do Pokemon",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    const pokemonDex = interaction.options.get("dex").value;
    const pokemonName = interaction.options.get("pokemon").value;
    const pokemonBroke = interaction.options.get("broke").value;
    const thumb = interaction.options.get("thumb").value;
    const pokemonThumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${thumb}.png`;
    const authorName = interaction.member;

    const query = {
      dex: pokemonDex,
    };

    try {
      const broke = await BrokeTable.findOne(query);

      if (broke) {
        interaction.reply({
          content:
            "Esta broke já existe. Utilize o comando **/broke-update** se deseja atualizar as informações.",
          ephemeral: true,
        });
      } else {
        const newBroke = new BrokeTable({
          dex: pokemonDex,
          pokemonName: pokemonName,
          pokemonBroke: pokemonBroke,
          authorName: authorName,
          thumbnail: pokemonThumb,
        });

        await newBroke.save().catch((e) => {
          interaction.reply({
            content: `Erro ao gravar dados no banco: ${e}`,
            ephemeral: true,
          });
          return;
        });

        interaction.reply({
          content: `A broke do pokemon **#${pokemonDex} ${pokemonName}** foi cadastrada com sucesso.\n\nBroke: ${pokemonBroke}`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  },
};
