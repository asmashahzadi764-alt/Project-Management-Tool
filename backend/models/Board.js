const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model("Board", boardSchema);
