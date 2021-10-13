//Importing
const express = require("express");
const mongoose = require("mongoose");
const messages = require("./Route/route");
const cors = require("cors");
// App Config
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

//Pusher and change stream
// require("./Route/Pusher");

//Middleware
app.use(express.json());

// DB Config
const url =
  "mongodb+srv://venkateshprasad:Venku9980809652!@nodeexpressprojects.akouw.mongodb.net/ChatUp?retryWrites=true&w=majority";

mongoose.connect(url).then(() => console.log("Connected to Db..."));
// ???

// Api Routes
app.use(messages);

//Listener
app.listen(port, () => console.log("Server listening at port 5000..."));
