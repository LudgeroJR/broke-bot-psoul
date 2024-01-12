const {
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require("discord.js");

module.exports = (interaction, pokemonName) => {
	const modal = new ModalBuilder({
		custom_id: `myBuild-${interaction.user.id}`,
		title: `${pokemonName} Build`,
	});

	const listTMInput = new TextInputBuilder({
		custom_id: "listTMInput",
		label: "TMs",
		style: TextInputStyle.Paragraph,
		placeholder: "nomeAtk > nomeTM\nnomeAtk > nomeTM",
		required: false,
	});
	const listMTInput = new TextInputBuilder({
		custom_id: "listMTInput",
		label: "MoveTutors",
		style: TextInputStyle.Paragraph,
		placeholder: "nomeAtk > nomeMT\nnomeAtk > nomeMT",
		required: false,
	});
	const eggMoveInput = new TextInputBuilder({
		custom_id: "eggMoveInput",
		label: "eggMove",
		style: TextInputStyle.Short,
		placeholder: "nomeAtk > nomeEggMove",
		required: false,
	});
	const detailsBuildInput = new TextInputBuilder({
		custom_id: "detailsBuildInput",
		label: "Vitaminas",
		style: TextInputStyle.Paragraph,
		placeholder: "Ex.: 3x Protein\n3x Iron\n3x Calcium",
		required: false,
	});

	const firstActionRow = new ActionRowBuilder().addComponents(listTMInput);
	const secondActionRow = new ActionRowBuilder().addComponents(listMTInput);
	const thirdActionRow = new ActionRowBuilder().addComponents(eggMoveInput);
	const fourthActionRow = new ActionRowBuilder().addComponents(
		detailsBuildInput
	);

	modal.addComponents(
		firstActionRow,
		secondActionRow,
		thirdActionRow,
		fourthActionRow
	);

	return modal;
};
