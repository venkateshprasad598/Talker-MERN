const Message = require("./dbMessages");

const getMessages = async (req, res) => {
  try {
    const message = await Message.find({});
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

const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res.status(404).json("No Task Found");
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json("ERROR!!");
  }
};
const editTheTask = async (req, res) => {
  try {
    const { id } = req.params;
    const editTask = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!editTask) {
      res.status(500).json("Enter Correct ID");
    }
    res.status(200).json({ editTask });
  } catch (err) {
    res.status(404).json("ERROR!!");
  }
};
const deleteTheTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await Task.findOneAndDelete({ _id: id });
    if (!deleteTask) {
      return res.status(404).json("Enter Correct ID");
    }
    res.status(200).json({ deleteTask });
  } catch (err) {
    res.status(500).json("ERROR!!");
  }
};

module.exports = { getMessages, postMessages };
