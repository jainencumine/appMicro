const mongoose = require("mongoose");

const comboSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Combo", comboSchema);
