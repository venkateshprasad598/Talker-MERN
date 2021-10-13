import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./sidebarChat.css";
import axios from "./axios";
import SidebarConvo from "./SidebarConvo";

const SidebarChat = () => {
  const [chats, setChats] = useState([]);
  console.log(chats);
  const getChats = async () => {
    try {
      const data = await axios.get("get/conversationList");
      console.log(data.data);
      setChats(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        {/* <h3>RooM Name</h3>
        <p>This is going to be the last message</p>
        <span>
          Last Seen : {new Date().getHours() + ":" + new Date().getMinutes()}
        </span> */}
      </div>
      {chats.map((data) => {
        const { id, name } = data;
        return <SidebarConvo key={id} id={id} name={name} />;
      })}
    </div>
  );
};

export default SidebarChat;
