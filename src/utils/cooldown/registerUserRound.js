const UserRound = require("../../models/userRoundModel");

module.exports = async (userID) => {
  const maxRound = 20;
  const query = {
    authorId: userID,
  };

  let cooldownUserRound = await UserRound.findOne(query);

  if (!cooldownUserRound) {
    const newCooldownUserRound = new UserRound({
      authorId: userID,
      countRound: 2,
      cooldown: null,
    });

    await newCooldownUserRound.save().catch((e) => {
      console.log(`Erro ao gravar dados no banco: ${e}`);
      return;
    });
    return;
  }

  if (cooldownUserRound.countRound < maxRound) {
    cooldownUserRound.countRound++;
  } else {
    const newCooldownTime = new Date();
    newCooldownTime.setHours(newCooldownTime.getHours() + 1);
    newCooldownTime.setMinutes(0);
    newCooldownTime.setSeconds(0);
    newCooldownTime.setMilliseconds(0);
    cooldownUserRound.countRound = 1;
    cooldownUserRound.cooldown = newCooldownTime.toISOString();
  }

  await cooldownUserRound.save().catch((e) => {
    console.log(`Erro ao gravar dados no banco: ${e}`);
    return;
  });
};
