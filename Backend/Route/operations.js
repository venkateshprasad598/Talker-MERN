const Message = require("./dbMessages");

//Reading all messages
const getMessages = async (req, res) => {
  try {
    const message = await Message.find({});
    res.status(200).json({ message });
  } catch (err) {
    res.status(501).json({ mes: err });
  }
};

// Creating a room
const postConversation = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    // const message = await Message.create(req.body);
    res.status(200).json(message);
  } catch (err) {
    res.status(501).json({ mes: err });
  }
};

// Posting new messeges into  the room or conversation created
const postNewMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.updateOne(
      { _id: id },
      { $push: { conversation: req.body } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ message });
  } catch (err) {
    res.status(501).json("Error");
  }
};

// displaying user Added List on the left side
const getConversationList = async (req, res) => {
  try {
    const message = await Message.find({});
    message.sort((b, a) => {
      return a.timestamp - b.timestamp;
    });

    let conversations = [];

    message.map((convo) => {
      const conversationData = {
        id: convo._id,
        name: convo.chatName,
        timestamp: convo.conversation[0].timestamp,
      };
      conversations.push(conversationData);
    });

    res.status(200).json(conversations);
  } catch (err) {
    console.log("ERROR");
  }
};

//getting Actual conversation of the particular conversation
const actualConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findOne({ _id: id });
    if (!message) {
      return res.status(404).json("No message Found");
    }
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json("ERROR!!");
  }
};
module.exports = {
  getMessages,
  postConversation,
  postNewMessage,
  getConversationList,
  actualConversation,
};
