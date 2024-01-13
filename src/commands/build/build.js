const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const createModal = require("../../utils/createModal");

module.exports = {
	name: "build",
	description: "Registre a Build do seu Pokemon",
	options: [
		{
			name: "pokemon",
			description: "Pokemon",
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
	// devOnly: true,
	// memberOnly: true,
	// testOnly: true,
	// deleted: Boolean,

	callback: async (client, interaction) => {
		const pokemonName = interaction.options.get("pokemon").value;
		const modal = createModal(interaction, pokemonName);

		await interaction.showModal(modal);

		const filter = (interaction) =>
			interaction.customId === `myBuild-${interaction.user.id}`;

		interaction
			.awaitModalSubmit({ filter, time: 600_000 })
			.then((modalInteraction) => {
				const listTMValue =
					modalInteraction.fields.getTextInputValue("listTMInput");
				const listMTValue =
					modalInteraction.fields.getTextInputValue("listMTInput");
				const eggMoveValue =
					modalInteraction.fields.getTextInputValue("eggMoveInput");
				const vitaminsBuildValue =
					modalInteraction.fields.getTextInputValue("vitaminsBuildInput");
				const detailBuildValue =
					modalInteraction.fields.getTextInputValue("detailsBuildInput");

				let descriptionEmbed = "";

				if (listTMValue) {
					descriptionEmbed += `**TM's**\n${listTMValue}`;
				}

				if (listMTValue) {
					descriptionEmbed += `\n\n**MoveTutors**\n${listMTValue}`;
				}

				if (eggMoveValue) {
					descriptionEmbed += `\n\n**eggMove**\n${eggMoveValue}`;
				}

				if (vitaminsBuildValue) {
					descriptionEmbed += `\n\n**Vitaminas**\n${vitaminsBuildValue}`;
				}

				if (detailBuildValue) {
					descriptionEmbed += `\n\n**Objetivos**\n${detailBuildValue}`;
				}

				const avatar = interaction.user.displayAvatarURL();

				const embed = new EmbedBuilder()
					.setColor("Random")
					.setTitle(pokemonName)
					.setThumbnail(avatar)
					.setAuthor({
						name: `Criado por: ${interaction.user.globalName}`,
					})
					.setFooter({
						text: "A Guild ARKHAM não se responsabiliza pelos dados contido nesta Build.",
					});

				if (descriptionEmbed !== "") {
					embed.setDescription(descriptionEmbed);
				}

				modalInteraction.reply({ embeds: [embed] });
			});
	},
};
