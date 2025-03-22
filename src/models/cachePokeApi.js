const { Schema, model } = require("mongoose");

const skillsTableSchema = new Schema({
  pokemonDex: {
    type: Number,
    required: true,
  },
  pokemonName: {
    type: String,
    required: true,
  },
  thumbShiny: {
    type: String,
    required: true,
  },
  thumbNormal: {
    type: String,
    required: true,
  },
});

module.exports = model("cachePokeApi", skillsTableSchema);
