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
    type: String,
    required: true
  },
  confirmed: {
    type: Boolean,
    default: false
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Request = mongoose.model("request", RequestSchema);
