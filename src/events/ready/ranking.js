const SendCurrentRanking = require("../../../src/utils/ranking/sendCurrentRanking");
const ResetUserRound = require("../../../src/utils/cooldown/resetUserRound");

module.exports = (client) => {
  // Calcula o tempo até a próxima hora cheia
  const now = new Date();
  const delayUntilNextHour =
    (60 - now.getMinutes()) * 60 * 1000 -
    now.getSeconds() * 1000 -
    now.getMilliseconds();

  // Reset de rodadas e envio de Ranking a cada hora
  setTimeout(() => {
    ResetUserRound(client);
    SendCurrentRanking(client);
    setInterval(() => {
      ResetUserRound(client);
      SendCurrentRanking(client);
    }, 60 * 60 * 1000);
  }, delayUntilNextHour);
};
