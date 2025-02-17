const GameRanking = require("../../models/gameRankingModel");
const PokemonList = require("../../models/pokemonListModel");

module.exports = async (author, rateCapturaBall, pokemonObject) => {
  const pokemonId = pokemonObject.id;
  const pokemonName = pokemonObject.name;

  const clanBallPoint = 3;
  const ultraBallPoint = 4;
  const greatBallPoint = 6;
  const premierBallPoint = 1;
  const pokemonsLendarios = [
    144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251, 377, 378, 379, 380,
    381, 382, 383, 384, 385, 386, 480, 481, 482, 483, 484, 485, 486, 487, 488,
    489, 490, 491, 492, 493, 494, 638, 639, 640, 641, 642, 643, 644, 645, 646,
    647, 648, 649, 716, 717, 718, 719, 720, 721, 772, 773, 785, 786, 787, 788,
    789, 790, 791, 792, 800, 801, 807, 808, 809, 888, 889, 890, 891, 892, 893,
    894, 895, 896, 897, 898, 905, 1001, 1002, 1003, 1004, 1007, 1008, 1025,
  ];

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

  if (pokemonsLendarios.includes(pokemonId)) {
    addPoints *= 3;
  } else if (pokemonId == 802) {
    addPoints *= 5;
  }

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

  // Remove pokemon capturado da lista de pokemons disponíveis. Apenas se capturado por Premier ou GreatBall
  if (rateCapturaBall < 3) {
    const update = {
      $pull: { idPokemon: pokemonId },
    };
    await PokemonList.updateOne({}, update);
  }
};
