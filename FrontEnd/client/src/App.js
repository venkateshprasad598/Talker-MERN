import "./App.css";
import User from "./components/users/User";
import Chat from "./components/Chat";
import { useEffect } from "react";
import Pusher from "pusher-js";

// The Home page is divided into two components, user on left and chat on right.
function App() {
  //Thus useEffect loads whenever a data is inserted
  useEffect(() => {
    // Install npm i pusher-js
    const pusher = new Pusher("de50ab2bce039e10f10a", {
      cluster: "ap2",
    });
    // subscribe to pusher.trigger 1st paramater
    // channel.bind to pusher.trigger 2nd paramater
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      alert(JSON.stringify(data));
    });
  }, []);
  return (
    <div className="app">
      <div className="app__body">
        <User />
        <Chat />
      </div>
    </div>
  );
}

export default App;
