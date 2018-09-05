const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RoundSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  round: {
    type: String
  },
  price: {
    type: String
  },
  bonus: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Round = mongoose.model("Round", RoundSchema);
