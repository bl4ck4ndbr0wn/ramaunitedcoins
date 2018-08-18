const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TokenVerifySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users"
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200
  }
});

module.exports = TokenVerify = mongoose.model("tokenVerify", TokenVerifySchema);
