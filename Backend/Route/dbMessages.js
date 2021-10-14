const mongoose = require("mongoose");
const ChatSchema = mongoose.Schema({
  chatName: String,
  timestamp: String,
  image: String,
  conversation: [
    {
      message: String,
      timestamp: String,
    },
  ],
});

module.exports = mongoose.model("Message", ChatSchema);
