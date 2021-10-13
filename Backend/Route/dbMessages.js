const mongoose = require("mongoose");
const ChatSchema = mongoose.Schema({
  chatName: String,
  conversation: [
    {
      message: String,
      timestamp: String,
      user: {
        displayName: String,
        photo: String,
        uid: String,
      },
    },
  ],
});

module.exports = mongoose.model("Message", ChatSchema);
