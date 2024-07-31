const GameRanking = require("../../models/gameRankingModel");
const PokemonList = require("../../models/pokemonListModel");

module.exports = async (author, rateCapturaBall, pokemonObject) => {
  const pokemonId = pokemonObject.id;
  const pokemonName = pokemonObject.name;

  const clanBallPoint = 3;
  const ultraBallPoint = 4;
  const greatBallPoint = 6;
  const premierBallPoint = 12;
  // const pokemonsLendarios = [
  //   144, 145, 146, 150, 151, 244, 245, 243, 250, 249, 251, 377, 378, 379, 486,
  //   380, 381, 383, 382, 384, 385, 386, 480, 481, 482, 483, 484, 487, 488, 491,
  //   490, 489, 485, 492, 493, 494, 638, 639, 640, 647, 641, 642, 645, 644, 643,
  //   646, 648, 649, 716, 717, 718, 719, 720, 721, 801,
  // ];

  let query = {
    authorId: author.id,
  };
  let gameRanking = await GameRanking.findOne(query);

  let authorName = author.globalName;
  if (!authorName) {
    authorName = author.username;
  }

  let addPoints;

  switch (rateCapturaBall) {
    case 4:
      addPoints = clanBallPoint;
      break;
    case 3:
      addPoints = ultraBallPoint;
      break;
    case 2:
      addPoints = greatBallPoint;
      break;
    case 1:
      addPoints = premierBallPoint;
      break;
  }

  // if (pokemonsLendarios.includes(pokemonId)) {
  //   addPoints *= 2;
  // }

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
