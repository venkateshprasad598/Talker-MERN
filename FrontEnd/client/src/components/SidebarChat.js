import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./sidebarChat.css";
import axios from "./axios";
import SidebarConvo from "./SidebarConvo";

const SidebarChat = () => {
  const [chats, setChats] = useState([]);

  // Getting All the Conversations
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
    <div>
      {chats.map((data) => {
        const { id, name, image } = data;
        return <SidebarConvo key={id} id={id} name={name} image={image} />;
      })}
    </div>
  );
};

export default SidebarChat;
