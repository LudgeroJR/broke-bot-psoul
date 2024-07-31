const UserRound = require("../../models/userRoundModel");

module.exports = async (userID) => {
  const query = {
    authorId: userID,
  };

  let cooldownUserRound = await UserRound.findOne(query);

  if (!cooldownUserRound) {
    const newCooldownUserRound = new UserRound({
      authorId: userID,
      countRound: 19,
      cooldown: null,
    });

    await newCooldownUserRound.save().catch((e) => {
      console.log(`Erro ao gravar dados no banco: ${e}`);
      return;
    });
    return;
  }

  if (cooldownUserRound.countRound > 0) {
    cooldownUserRound.countRound--;
  } else {
    const newCooldownTime = new Date();
    newCooldownTime.setHours(newCooldownTime.getHours() + 1);
    newCooldownTime.setMinutes(0);
    newCooldownTime.setSeconds(0);
    newCooldownTime.setMilliseconds(0);
    cooldownUserRound.cooldown = newCooldownTime.toISOString();
  }

  await cooldownUserRound.save().catch((e) => {
    console.log(`Erro ao gravar dados no banco: ${e}`);
    return;
  });
};
