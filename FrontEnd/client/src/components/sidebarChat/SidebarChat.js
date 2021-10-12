import { Avatar } from "@mui/material";
import React from "react";
import "./sidebarChat.css";

const SidebarChat = () => {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h3>RooM Name</h3>
        <p>This is going to be the last message</p>
        <span>
          Last Seen : {new Date().getHours() + ":" + new Date().getMinutes()}
        </span>
      </div>
    </div>
  );
};

export default SidebarChat;
