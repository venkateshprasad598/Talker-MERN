// Importing Default Methods
const express = require("express");
const router = express.Router();

//Importing Operations
const {
  getMessages,
  postConversation,
  postNewMessage,
  getConversationList,
  actualConversation,
  lastConversation,
} = require("./operations");

//https methos
router.get("/", getMessages);
router.post("/new/conversation", postConversation);
router.post("/new/message/:id", postNewMessage);
router.get("/get/conversationList", getConversationList);
router.get("/get/conversation/:id", actualConversation);
router.get("/get/lastMessage/:id", lastConversation);
module.exports = router;
