const UserRound = require("./../../models/userRoundModel");

module.exports = async () => {
  try {
    let userRound = await UserRound.find({});

    for (let i = 0; i < userRound.length; i++) {
      userRound[i].countRound = 1;
      await userRound[i].save();
    }
  } catch (error) {
    console.log(`Erro ao gravar dados no banco: ${error}`);
  }
};
