const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SettingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  account: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    type: {
      type: String
    },
    address: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  distribution: {
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
    date: {
      type: Date,
      default: Date.now
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Setting = mongoose.model("setting", SettingSchema);
