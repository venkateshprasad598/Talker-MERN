const Pusher = require("pusher");
const mongoose = require("mongoose");

//PUSHER AND CHANGE STREAM
// step 1 : install npm i pusher
// step 2 : import pusher from the module, and copy paste the below const pusher code ot else copy it from the pusher website.

// step 3 :Write the below code, so that pusher can watch and tell the frontend that which objects are changed
const db = mongoose.connection;

db.once("open", () => {
  console.log("db connectd to a pusher...");
  // messages down here is a collection name in the db, which is nothing but lowercase plural of model Message.
  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      //third parameter is important, for each insert watch your postman debig console
      pusher.trigger("chats", "newChat", {
        change: change,
      });
    } else if (change.operationType === "update") {
      pusher.trigger("messages", "newMessage", {
        change: change,
      });
    } else {
      console.log("Error Trigerring pusher..");
    }
  });
});
