const UserRound = require("../../models/userRoundModel");

module.exports = async (userId) => {
  const query = {
    authorId: userId,
  };

  try {
    const cooldownUserRound = await UserRound.findOne(query);

    const currentTime = new Date();
    if (!cooldownUserRound) {
      return false;
    } else {
      const userCooldownTime = new Date(cooldownUserRound.cooldown);

      if (userCooldownTime > currentTime) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
};
