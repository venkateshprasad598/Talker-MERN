import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./sidebarChat.css";
import axios from "./axios";
import SidebarConvo from "./SidebarConvo";
import { useDispatch, useSelector } from "react-redux";

const SidebarChat = () => {
  const [chats, setChats] = useState([]);
  //Redux RealTime
  const addRealTime = useSelector((state) => state.isAddRealTime);

  //Assingin Chat ID to the redux ChatID
  const chatIdDispatch = useDispatch();

  // Getting All the Conversations
  const getChats = async () => {
    try {
      const data = await axios.get("get/conversationList");
      console.log(data.data);
      const newId = data.data[0].id;
      setChats(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getChats();
  }, [addRealTime]);

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
