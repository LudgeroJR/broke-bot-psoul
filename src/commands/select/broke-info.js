const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const BrokeTable = require("../../models/broketable");
const getThumbnail = require("../../utils/getThumbnail");

module.exports = {
	name: "broke-info",
	description: "Consulta a informação da broke do Pokemon.",
	// devOnly: true,
	memberOnly: true,
	// testOnly: true,
	options: [
		{
			name: "dex",
			description: "Numero da Dex",
			type: ApplicationCommandOptionType.String,
		},
		{
			name: "pokemon",
			description: "Nome do Pokemon.",
			type: ApplicationCommandOptionType.String,
		},
	],
	// deleted: Boolean,

	callback: async (client, interaction) => {
		const existDex = interaction.options.get("dex");
		const existName = interaction.options.get("pokemon");
		var consulta;

		if (!existDex && !existName) {
			interaction.reply("Nenhuma informação para consulta foi fornecida.");
			return;
		} else if (existDex) {
			const pokemonDex = existDex.value;

			const query = {
				dex: pokemonDex,
			};

			try {
				consulta = await BrokeTable.find(query);

				if (consulta.length === 0) {
					interaction.reply(
						`Nenhuma broke encontrada com a Dex #${pokemonDex}`
					);
					return;
				}

				if (consulta.length > 1) {
					interaction.reply(
						`Existem duas ou mais brokes cadastradas com a Dex #${consulta[0].dex}.\n<@345350823485636609> Aconselho excluir a broke e recastrar.`
					);
					return;
				}
			} catch (error) {
				console.log(error);
				interaction.reply(`Erro ao consultar a Broke: ${error}`);
			}
		} else if (existName) {
			var pokemonName;
			pokemonName = existName.value;

			const query = {
				pokemonName: { $regex: pokemonName, $options: "i" },
			};

			try {
				consulta = await BrokeTable.find(query);

				if (consulta.length === 0) {
					interaction.reply(
						`Nenhuma broke encontrada com nome **${pokemonName}**`
					);
					return;
				}
			} catch (error) {
				console.log(error);
				interaction.reply(`Erro ao consultar a Broke: ${error}`);
			}
		}

		let embedTitle = "";
		let embedDescription = "";
		var thumb;

		if (consulta.length > 1) {
			embedTitle = `${pokemonName} - ${consulta.length} resultados encontrados.`;
			for (let i = 0; i < consulta.length; i++) {
				embedDescription += `**#${consulta[i].dex} ${consulta[i].pokemonName}**\n ${consulta[i].pokemonBroke}.\n\n`;
			}
			thumb =
				"https://assets.pokemon.com/assets/cms2-pt-br/img/misc/gus/buttons/logo-pokemon-79x45.png";
		} else {
			const consDex = consulta[0].dex;
			const consName = consulta[0].pokemonName;
			const consBroke = consulta[0].pokemonBroke;

			const dexInt = parseInt(consDex);
			thumb = getThumbnail(dexInt);

			embedTitle = `#${consDex} ${consName}`;
			embedDescription = `Broke: ${consBroke}`;
		}

		const embed = new EmbedBuilder()
			.setTitle(embedTitle)
			.setDescription(embedDescription)
			.setThumbnail(thumb)
			.setFooter({
				text: `@ARK Thiago. Todos os diretos reservados.`,
			});

		interaction.reply({ embeds: [embed] });
	},
};
