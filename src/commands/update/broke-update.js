const { ApplicationCommandOptionType } = require("discord.js");
const BrokeTable = require("../../models/broketable");

module.exports = {
  name: "broke-update",
  description: "Atualiza a broke do pokemon.",
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
    },
    {
      name: "broke",
      description: "Descrição da broke do Pokemon.",
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "thumb",
      description: "Thumbnail do Pokemon",
      type: ApplicationCommandOptionType.String,
    },
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    const pokemonDex = interaction.options.get("dex").value;
    const pokemonName = interaction.options.get("pokemon")?.value || null;
    const pokemonBroke = interaction.options.get("broke")?.value || null;
    const thumb = interaction.options.get("thumb")?.value || null;
    const authorName = interaction.member;
    var pokemonThumb;

    try {
      let query = {
        dex: pokemonDex,
      };

      let broke = await BrokeTable.findOne(query);
      if (broke) {
        if (pokemonName) {
          broke.pokemonName = pokemonName;
        }
        if (pokemonBroke) {
          broke.pokemonBroke = pokemonBroke;
        }
        if (authorName) {
          broke.authorName = authorName;
        }
        if (thumb) {
          pokemonThumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${thumb}.png`;
          broke.thumbnail = pokemonThumb;
        }

        await broke.save().catch((e) => {
          interaction.reply({
            content: `Erro ao gravar dados no banco: ${e}`,
            ephemeral: true,
          });
          return;
        });

        interaction.reply({
          content: `A broke do pokemon foi atualizada com sucesso.`,
          ephemeral: true,
        });
        return;
      }

      query = {
        pokemonName: pokemonName,
      };
      broke = await BrokeTable.findOne(query);
      if (broke) {
        if (pokemonDex) {
          broke.dex = pokemonDex;
        }
        if (pokemonBroke) {
          broke.pokemonBroke = pokemonBroke;
        }
        if (authorName) {
          broke.authorName = authorName;
        }
        if (thumb) {
          pokemonThumb = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${thumb}.png`;
          broke.thumbnail = pokemonThumb;
        }

        await broke.save().catch((e) => {
          interaction.reply({
            content: `Erro ao gravar dados no banco: ${e}`,
            ephemeral: true,
          });
          return;
        });

        interaction.reply({
          content: `A broke do pokemon foi atualizada com sucesso.`,
          ephemeral: true,
        });
        return;
      }
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  },
};
