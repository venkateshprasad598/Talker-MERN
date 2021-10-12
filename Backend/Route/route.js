// Importing Default Methods
const express = require("express");
const router = express.Router();

//Importing Operations
const { getMessages, postMessages } = require("./operations");

//https methos
router.get("/", getMessages);
router.post("/", postMessages);

module.exports = router;
