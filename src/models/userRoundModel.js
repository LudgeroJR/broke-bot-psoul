const { Schema, model } = require("mongoose");

const userRoundSchema = new Schema({
  authorId: {
    type: String,
    required: true,
  },
  countRound: {
    type: Number,
    required: true,
  },
  cooldown: {
    type: String,
  },
});

module.exports = model("userRound", userRoundSchema);
