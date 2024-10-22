const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const SkillTable = require("./../../models/skillsModel");
const SkillEmbed = require("./../../embed/skillEmbed");

module.exports = {
  name: "skill",
  description: "Consulta informação sobre uma skill",
  // devOnly: true,
  // memberOnly: true,
  // testOnly: true,
  options: [
    {
      name: "nome",
      description: "Nome da Skill",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    const skill = interaction.options.get("nome");

    var consulta;
    var skillData;

    if (!skill) {
      interaction.reply({
        content: "Nenhuma informação para consulta foi fornecida.",
        ephemeral: true,
      });
      return;
    } else {
      var data;
      data = skill.value;

      const query = {
        skillName: { $regex: data, $options: "i" },
      };

      try {
        consulta = await SkillTable.find(query);

        if (consulta.length === 0) {
          interaction.reply({
            content: `Nenhuma skill encontrada com nome **${data}**`,
            ephemeral: true,
          });
          return;
        } else if (consulta.length === 1) {
          skillData = {
            skillName: consulta[0].skillName,
            skillDescription: consulta[0].skillDescription,
            skillCategory: consulta[0].skillCategory,
            skillType: consulta[0].skillType,
            skillDamage: consulta[0].skillDamage,
            skillDistance: consulta[0].skillDistance,
            skillGapCloser: consulta[0].skillGapCloser,
            skillAreaName: consulta[0].skillAreaName,
          };

          const embed = await SkillEmbed(skillData);

          interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
          let embeds = [];
          await interaction.deferReply({ ephemeral: true });
          for (let i = 0; i < consulta.length; i++) {
            skillData = {
              skillName: consulta[i].skillName,
              skillDescription: consulta[i].skillDescription,
              skillCategory: consulta[i].skillCategory,
              skillType: consulta[i].skillType,
              skillDamage: consulta[i].skillDamage,
              skillDistance: consulta[i].skillDistance,
              skillGapCloser: consulta[i].skillGapCloser,
              skillAreaName: consulta[i].skillAreaName,
            };

            const embed = await SkillEmbed(skillData);

            embeds.push(embed);
          }
          await interaction.editReply({
            content: `Resultados encontrados com **${data}**`,
            embeds: embeds,
          });
        }
      } catch (error) {
        console.log(error);
        interaction.reply(`Erro ao consultar a skill: ${error}`);
      }
    }
  },
};
