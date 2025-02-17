const UserRound = require("../../models/userRoundModel");

module.exports = async (userID) => {
  const query = {
    authorId: userID,
  };

  let cooldownUserRound = await UserRound.findOne(query);

  if (!cooldownUserRound) {
    let newCooldownTime = new Date();
    newCooldownTime.setHours(newCooldownTime.getHours());
    newCooldownTime.setMinutes(0);
    newCooldownTime.setSeconds(0);
    newCooldownTime.setMilliseconds(0);

    const newCooldownUserRound = new UserRound({
      authorId: userID,
      countRound: 9,
      cooldown: newCooldownTime.toISOString(),
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
    let updateCooldownTime = new Date();
    updateCooldownTime.setHours(updateCooldownTime.getHours() + 1);
    updateCooldownTime.setMinutes(0);
    updateCooldownTime.setSeconds(0);
    updateCooldownTime.setMilliseconds(0);
    cooldownUserRound.cooldown = updateCooldownTime.toISOString();
  }

  await cooldownUserRound.save().catch((e) => {
    console.log(`Erro ao gravar dados no banco: ${e}`);
    return;
  });
};
