//Importing
const express = require("express");
const mongoose = require("mongoose");
const messages = require("./Route/route");
const cors = require("cors");
const path = require("path")

// App Config
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

//Middleware
app.use(express.json());

// DB Config
const url =
  "mongodb+srv://venkateshprasad:Venku9980809652!@nodeexpressprojects.akouw.mongodb.net/ChatUp?retryWrites=true&w=majority";

mongoose.connect(url).then(() => console.log("Connected to Db..."));

// Api Routes
app.use(messages);


// ------------------------------Deployment---------------------------------

if(process.env.NODE_ENV === "production"){
  //Set Static folder
  app.use(express.static("FrontEnd/client/build"))

  app.get("*", (req, res) => {
res.sendFile(path.resolve(__dirname, "FrontEnd", "client", "build", "index.html"))
  })

}

// ------------------------------Deployment---------------------------------
//Listener
app.listen(port, () => console.log("Server listening at port 5000..."));
