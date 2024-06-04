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
    {
      name: "avatar",
      description: "Cole uma URL com a imagem do pokemon.",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  // devOnly: true,
  // memberOnly: true,
  // testOnly: true,
  // deleted: Boolean,

  callback: async (client, interaction) => {
    const pokemonName = interaction.options.get("pokemon").value;
    var thumb;
    var avatarPokemon;

    // Verificar se algum valor foi adicionado na URL do avatar pokemon
    if (
      interaction.options.get("avatar") !== null &&
      interaction.options.get("avatar") !== undefined
    ) {
      avatarPokemon = interaction.options.get("avatar").value;
      // Verifica se é uma URL válida ou apenas o codigo da imagem retirada do site Pokemon.com. Coloquei porque eu vou usar apenas o código para facilitar.
      if (
        !avatarPokemon.startsWith("https://") &&
        !avatarPokemon.startsWith("http://")
      ) {
        prefixo = "https://assets.pokemon.com/assets/cms2/img/pokedex/full";
        thumb = `${prefixo}/${avatarPokemon}.png`;
      } else {
        thumb = avatarPokemon;
      }
    }

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

        const avatarAuthor = interaction.user.displayAvatarURL();
        const avatarGuild = interaction.guild.iconURL();

        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle(pokemonName)
          .setThumbnail(thumb)
          .setAuthor({
            name: `Criado por: ${interaction.user.globalName}`,
            iconURL: avatarAuthor,
          })
          .setFooter({
            text: "Agradecemos profundamente por sua generosa contribuição.",
            iconURL: avatarGuild,
          });

        if (descriptionEmbed !== "") {
          embed.setDescription(descriptionEmbed);
        }

        modalInteraction.reply({ embeds: [embed] });
      });
  },
};
