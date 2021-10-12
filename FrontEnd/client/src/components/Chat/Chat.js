import React from "react";
import { Avatar } from "@mui/material";
import "./Chat.css";
const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last Seen</p>
        </div>
      </div>

      <div className="chat__body">
        <p className="chat__message">
          <span className="chat__name">Venkatesh Prasad</span>
          This is Message Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Sapiente, aliquid. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Soluta, facilis?
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
      </div>

      <div className="chat__footer">
        <form>
          <input type="text" placeholder="Type a message" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
