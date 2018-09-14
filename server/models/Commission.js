const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CommissionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  requestId: {
    type: Schema.Types.ObjectId,
    ref: "request"
  },
  percentage: {
    type: Number,
    default: 0,
    required: true
  },
  ruc: {
    type: Number,
    default: 0
  },
  rcc: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Commission = mongoose.model("commission", CommissionSchema);
