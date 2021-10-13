const Message = require("./dbMessages");

const getMessages = async (req, res) => {
  try {
    const message = await Message.find({});
    res.status(200).json({ message });
  } catch (err) {
    res.status(501).json({ mes: err });
  }
};

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

module.exports = { getMessages, postConversation, postNewMessage };
