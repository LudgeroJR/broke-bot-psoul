const { ActivityType } = require('discord.js');

module.exports = (client) => {
    const status = {
        name: 'Psoul',
        type: ActivityType.Game,
    }

    client.user.setActivity(status);
  };