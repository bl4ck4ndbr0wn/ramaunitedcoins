const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  modetransfer: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 0
  },
  ruc: {
    type: Number,
    default: 0
  },
  rcc: {
    type: Number,
    default: 0
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  ruc: {
    type: Number,
    default: 0,
    required: true
  },
  rcc: {
    type: Number,
    default: 0,
    required: true
  },
  round_bonus: {
    type: Number,
    default: 0,
    required: true
  },
  round_price: {
    type: Number,
    default: 0,
    required: true
  },
  document: [
    {
      originalname: {
        type: String,
        required: true
      },
      filename: {
        type: String,
        required: true
      },
      path: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  ApprovedBy: {
    type: String
  },
  Approveddate: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Request = mongoose.model("request", RequestSchema);
