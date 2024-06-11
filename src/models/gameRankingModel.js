const { Schema, model } = require("mongoose");

const gameRankingSchema = new Schema({
  authorId: {
    type: Number,
    required: true,
  },
  userGlobalName: {
    type: String,
    required: true,
  },
  countShinyCatch: {
    type: Number,
    required: true,
  },
  totalPointRankig: {
    type: Number,
    required: true,
  },
  listCatchPokemon: {
    type: [String],
    default: [],
  },
});

module.exports = model("gameRanking", gameRankingSchema);
