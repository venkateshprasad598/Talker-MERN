//Importing
const express = require("express");
const mongoose = require("mongoose");
const messages = require("./Route/route");
// const Pusher = require("pusher");
// App Config
const app = express();
const port = process.env.PORT || 5000;

//Pusher and change stream
require("./Route/Pusher");

//Middleware
app.use(express.json());
// DB Config
const url =
  "mongodb+srv://venkateshprasad:Venku9980809652!@nodeexpressprojects.akouw.mongodb.net/ChatUp?retryWrites=true&w=majority";

mongoose.connect(url).then(() => console.log("Connected to Db..."));
// ???

// Api Routes
app.use("/api/v1/messages/new", messages);

//Listener
app.listen(port, () => console.log("Server listening at port 5000..."));