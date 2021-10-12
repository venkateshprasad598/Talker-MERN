const mongoose = require("mongoose");
const ChatSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide string"],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "must provide string"],
    trim: true,
  },
  timeStamp: String,
  received: Boolean,
});

module.exports = mongoose.model("Message", ChatSchema);