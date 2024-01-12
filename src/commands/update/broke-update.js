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
			required: true,
		},
		{
			name: "broke",
			description: "Descrição da broke do Pokemon.",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
	// deleted: Boolean,

	callback: async (client, interaction) => {
		const pokemonDex = interaction.options.get("dex").value;
		const pokemonName = interaction.options.get("pokemon").value;
		const pokemonBroke = interaction.options.get("broke").value;
		const authorName = interaction.member;

		try {
			let query = {
				dex: pokemonDex,
			};

			let broke = await BrokeTable.findOne(query);
			if (broke) {
				broke.pokemonName = pokemonName;
				broke.pokemonBroke = pokemonBroke;
				broke.authorName = authorName;

				await broke.save().catch((e) => {
					interaction.reply({
						content: `Erro ao gravar dados no banco: ${e}`,
						ephemeral: true,
					});
					return;
				});

				interaction.reply({
					content: `A broke do pokemon **#${pokemonDex} ${pokemonName}** foi atualizada com sucesso.\n\nBroke: ${pokemonBroke}`,
					ephemeral: true,
				});
				return;
			}

			query = {
				pokemonName: pokemonName,
			};
			broke = await BrokeTable.findOne(query);
			if (broke) {
				broke.dex = pokemonDex;
				broke.pokemonBroke = pokemonBroke;
				broke.authorName = authorName;

				await broke.save().catch((e) => {
					interaction.reply({
						content: `Erro ao gravar dados no banco: ${e}`,
						ephemeral: true,
					});
					return;
				});

				interaction.reply({
					content: `A broke do pokemon **#${pokemonDex} ${pokemonName}** foi atualizada com sucesso.\n\nBroke: ${pokemonBroke}`,
					ephemeral: true,
				});
				return;
			}
		} catch (error) {
			console.log(`Erro: ${error}`);
		}
	},
};
