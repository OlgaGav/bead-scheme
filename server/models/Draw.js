const { Schema, model } = require("mongoose");

const drawSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Draw = model("Draw", drawSchema);

module.exports = Draw;
