// Importing Default Methods
const express = require("express");
const router = express.Router();

//Importing Operations
const {
  getMessages,
  postConversation,
  postNewMessage,
} = require("./operations");

//https methos
router.get("/", getMessages);
router.post("/new/conversation", postConversation);
router.post("/new/message/:id", postNewMessage);

module.exports = router;
