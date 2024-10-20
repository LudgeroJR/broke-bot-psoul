const { EmbedBuilder } = require("discord.js");

module.exports = async (skillData) => {
  const footerMsg =
    "Informações do Jogo Psoul. Acesse o site psoul.gg e inicie sua jornada Pokemon.";

  const skillEmbed = new EmbedBuilder()
    .setTitle(skillData.skillName)
    .setDescription(skillData.skillDescription)
    .setFooter({
      text: footerMsg,
    });

  skillEmbed.addFields({
    name: "Categoria:",
    value: skillData.skillCategory,
    inline: true,
  });

  skillEmbed.addFields({
    name: "Tipo:",
    value: skillData.skillType,
    inline: true,
  });

  if (skillData.skillDamage) {
    skillEmbed.addFields({
      name: "Dano:",
      value: skillData.skillDamage.toString(),
      inline: true,
    });
  }

  if (skillData.skillDistance) {
    skillEmbed.addFields({
      name: "Distância:",
      value: skillData.skillDistance.toString(),
      inline: true,
    });
  }

  if (skillData.skillGapCloser) {
    skillEmbed.addFields({
      name: "GapCloser:",
      value: "Habilitado",
      inline: true,
    });
  }

  if (skillData.skillAreaName) {
    skillEmbed.addFields({
      name: "Area:",
      value: skillData.skillAreaName,
      inline: true,
    });
  }

  return skillEmbed;
};
