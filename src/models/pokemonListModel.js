const { Schema, model } = require("mongoose");

const listPokemonSchema = new Schema({
  idPokemon: {
    type: [Number],
    required: true,
  },
});

module.exports = model("pokemonList", listPokemonSchema);
