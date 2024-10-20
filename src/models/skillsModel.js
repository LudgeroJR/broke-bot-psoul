const { Schema, model } = require("mongoose");

const skillsTableSchema = new Schema({
  skillName: {
    type: String,
    required: true,
  },
  skillDescription: {
    type: String,
    required: true,
  },
  skillCategory: {
    type: String,
    required: true,
  },
  skillType: {
    type: String,
    required: true,
  },
  skillDamage: {
    type: Number,
    required: false,
  },
  skillDistance: {
    type: Number,
    required: false,
  },
  skillGapCloser: {
    type: Boolean,
    default: false,
    required: false,
  },
  skillAreaName: {
    type: String,
    required: false,
  },
});

module.exports = model("SkillsTable", skillsTableSchema);
