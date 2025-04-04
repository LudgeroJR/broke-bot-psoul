const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = (interaction) => {
  const clanBall = new ButtonBuilder()
    .setLabel("Ball de Clan")
    .setStyle(ButtonStyle.Primary)
    .setCustomId(`BallClan-${interaction.user.id}`)
    .setEmoji({
      name: "Clan",
      id: "839318832358752347",
    })
    .setDisabled(false);

  const ultraBall = new ButtonBuilder()
    .setLabel("Ultra Ball")
    .setStyle(ButtonStyle.Primary)
    .setCustomId(`UltraBall-${interaction.user.id}`)
    .setEmoji({
      name: "Ultra",
      id: "1211168100809048085",
    })
    .setDisabled(false);

  const greatBall = new ButtonBuilder()
    .setLabel("Great Ball")
    .setStyle(ButtonStyle.Primary)
    .setCustomId(`GreatBall-${interaction.user.id}`)
    .setEmoji({
      name: "Great",
      id: "838659788492767233",
    })
    .setDisabled(false);

  const premierBall = new ButtonBuilder()
    .setLabel("Premier Ball")
    .setStyle(ButtonStyle.Primary)
    .setCustomId(`PremierBall-${interaction.user.id}`)
    .setEmoji({
      name: "Premier",
      id: "839318832183246868",
    })
    .setDisabled(false);

  const buttonRow = new ActionRowBuilder().addComponents(
    clanBall,
    ultraBall,
    greatBall,
    premierBall
  );

  return buttonRow;
};
