const { ActivityType } = require("discord.js");

module.exports = (client) => {
  const status = {
    name: "Comandos: Broke-info / Game-Catch",
    type: ActivityType.Custom,
  };

  client.user.setActivity(status);
};
