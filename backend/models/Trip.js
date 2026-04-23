const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  name: String,
  email: String,
  place: String,
  days: String,
  budget: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Trip", tripSchema);