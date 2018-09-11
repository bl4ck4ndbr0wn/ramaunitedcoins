const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  telephone: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 0
  },
  ruc: {
    type: String,
    required: true
  },
  rcc: {
    type: String,
    required: true
  },
  commission: {
    type: Number,
    default: 0
  },
  referedcode: {
    type: String
  },
  referralcode: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
