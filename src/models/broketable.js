const { Schema, model } = require("mongoose");

const brokeTableSchema = new Schema({
  dex: {
    type: String,
    required: true,
  },
  pokemonName: {
    type: String,
    required: true,
  },
  pokemonBroke: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
});

module.exports = model("BrokeTable", brokeTableSchema);
