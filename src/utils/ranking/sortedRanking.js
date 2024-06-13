const GameRanking = require("./../../models/gameRankingModel");

module.exports = async () => {
  const gameRanking = await GameRanking.find({});

  // Ordenar a lista de Ranking por pontuação

  const sortedData = Object.values(gameRanking)
    .map(({ userGlobalName, countShinyCatch, totalPointRankig }) => ({
      userGlobalName,
      countShinyCatch,
      totalPointRankig,
    }))
    .sort((a, b) => b.totalPointRankig - a.totalPointRankig);

  return sortedData;
};
