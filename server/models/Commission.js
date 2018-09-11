const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CommissionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  type: {
    type: String,
    required: true
  },
  percentage: {
    type: String,
    required: true
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

module.exports = Commission = mongoose.model("commission", CommissionSchema);
