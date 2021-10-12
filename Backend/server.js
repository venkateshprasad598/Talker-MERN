//Importing
const express = require("express");
const mongoose = require("mongoose");
const messages = require("./Route/route");
// App Config
const app = express();
const port = process.env.PORT || 5000;

const pusher = new Pusher({
  appId: "1280776",
  key: "de50ab2bce039e10f10a",
  secret: "94c3a60dcee1e7f220b9",
  cluster: "ap2",
  useTLS: true,
});

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
