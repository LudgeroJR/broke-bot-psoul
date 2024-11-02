const GameRankingModel = require("./../../models/gameRankingModel");
const PokemonListModel = require("./../../models/pokemonListModel");
const UserRoundModel = require("./../../models/userRoundModel");

module.exports = {
  name: "game-reset",
  description: "Reseta os Pokemons disponiveis no jogo e o ranking",
  devOnly: true,
  // memberOnly: true,
  // testOnly: true,
  // deleted: Boolean,

  callback: async (client, interaction) => {
    // Criando uma nova lista de pokemon
    const maxPokemonId = 1025;
    const newPokemonList = { idPokemon: [] };
    for (let i = 1; i <= maxPokemonId; i++) {
      newPokemonList.idPokemon.push(i);
    }
    let pokemonList;
    try {
      pokemonList = await PokemonListModel.findOne({});
      if (!pokemonList) {
        pokemonList = new PokemonListModel(newPokemonList);
      } else {
        pokemonList.idPokemon = newPokemonList.idPokemon;
      }

      await pokemonList.save();
    } catch (error) {
      console.error(`Erro ao obter as informações do PokemonList\n${error}`);
    }

    // Resetando o Ranking atual
    let gameRanking;
    try {
      gameRanking = await GameRankingModel.find({});
    } catch (error) {
      console.error(`Erro ao obter as informações do GameRanking\n${error}`);
    }

    try {
      if (gameRanking.length !== 0) {
        for (let i = 0; i < gameRanking.length; i++) {
          await gameRanking[i].deleteOne();
        }
      }
    } catch (error) {
      console.error(`Erro ao deletar dados do Game Ranking\n${e}`);
    }

    // Resetando todos os cooldowns
    let userRound;
    try {
      userRound = await UserRoundModel.find({});
    } catch (error) {
      console.error(`Erro ao obter as informações do GameRanking\n${error}`);
    }

    try {
      if (userRound.length !== 0) {
        for (let i = 0; i < userRound.length; i++) {
          await userRound[i].deleteOne();
        }
      }
    } catch (error) {
      console.error(`Erro ao deletar dados do Game Ranking\n${e}`);
    }

    interaction.reply({
      content: "Lista de Pokemon regerada e Ranking resetado.",
      ephemeral: true,
    });
  },
};
