const GameRanking = require("../../models/gameRankingModel");
const PokemonList = require("../../models/pokemonListModel");

module.exports = async (author, ballPoint, pokemonObject) => {
  const pokemonId = pokemonObject.id;
  const pokemonName = pokemonObject.name;

  let query = {
    authorId: author.id,
  };
  let gameRanking = await GameRanking.findOne(query);

  let authorName = author.globalName;
  if (!authorName) {
    authorName = author.username;
  }

  let addPoints = 5 - ballPoint;

  if (!gameRanking) {
    const newGameRanking = new GameRanking({
      authorId: author.id,
      userGlobalName: authorName,
      countShinyCatch: 1,
      totalPointRankig: addPoints,
      listCatchPokemon: [pokemonName],
    });

    await newGameRanking.save().catch((e) => {
      console.error(`Erro ao gravar dados no banco: ${e}`);
      return;
    });
  } else {
    gameRanking.countShinyCatch++;
    gameRanking.totalPointRankig += addPoints;
    gameRanking.listCatchPokemon.push(pokemonName);

    await gameRanking.save().catch((e) => {
      console.error(`Erro ao gravar dados no banco: ${e}`);
      return;
    });
  }

  const update = {
    $pull: { idPokemon: pokemonId },
  };
  await PokemonList.updateOne({}, update);
};
