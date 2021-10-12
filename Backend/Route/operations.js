const Message = require("./dbMessages");

const getMessages = async (req, res) => {
  try {
    const message = await Message.find();
    res.status(200).json({ message });
  } catch (err) {
    res.status(501).json({ mes: err });
  }
};
const postMessages = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(200).json({ message });
  } catch (err) {
    res.status(501).json({ mes: err });
  }
};

module.exports = { getMessages, postMessages };
