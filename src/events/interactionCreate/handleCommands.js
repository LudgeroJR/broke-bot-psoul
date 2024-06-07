const {
  devs,
  members,
  brokeChannel,
  brokeCommands,
  buildChannel,
  buildCommands,
  server,
} = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");
let memberRole = null;
let devsRole = null;

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    if (
      !brokeChannel.includes(interaction.channelId) &&
      brokeCommands.includes(commandObject.name)
    ) {
      interaction.reply({
        content: "Este comando só pode ser usado no Canal #Broke.",
        ephemeral: true,
      });
      return;
    }

    if (
      !buildChannel.includes(interaction.channelId) &&
      buildCommands.includes(commandObject.name)
    ) {
      interaction.reply({
        content: "Este comando só pode ser usado no Canal #Builds.",
        ephemeral: true,
      });
      return;
    }

    // if (
    //   !gameChannel.includes(interaction.channelId) &&
    //   gameCommands.includes(commandObject.name)
    // ) {
    //   interaction.reply({
    //     content: "Este comando só pode ser usado no Canal #Game.",
    //     ephemeral: true,
    //   });
    //   return;
    // }

    // if (commandObject.devOnly) {
    // 	if (!devs.includes(interaction.member.id)) {
    // 		interaction.reply({
    // 			content: "Você não tem permissão para executar esse comando.",
    // 			ephemeral: true,
    // 		});
    // 		return;
    // 	}
    // }

    if (commandObject.devOnly) {
      for (let i = 0; i < devs.length; i++) {
        devsRole = interaction.member.roles.cache.find((r) => r.id === devs[i]);
        if (devsRole) {
          break;
        }
      }
      if (!devsRole) {
        interaction.reply({
          content: "Você não tem permissão para executar esse comando.",
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.memberOnly) {
      for (let i = 0; i < members.length; i++) {
        memberRole = interaction.member.roles.cache.find(
          (r) => r.id === members[i]
        );
        if (memberRole) {
          break;
        }
      }
      if (!memberRole) {
        interaction.reply({
          content: "Apenas membros da ARKHAM podem executar esse comando.",
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.testOnly) {
      if (!(interaction.guild.id === server)) {
        interaction.reply({
          content: "This command cannot be ran here.",
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: "Not enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "I don't have enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
};
