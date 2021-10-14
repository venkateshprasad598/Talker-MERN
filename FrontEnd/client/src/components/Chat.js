import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import "./Chat.css";
import axios from "./axios";
import { useSelector } from "react-redux";

const Chat = () => {
  const [input, setInput] = useState("");

  //State Management Redux
  const [messages, setMessages] = useState([]);
  const [headerMsg, setHeaderMsg] = useState([]);
  const chatId = useSelector((state) => state.chatId);

  // Displaying all chat of the actual conversation
  const getConversation = async (num) => {
    try {
      const res = await axios.get(`get/conversation/${num}`);
      const newMessages = res.data[0].conversation;
      const header = res.data[0];
      setHeaderMsg(header);
      console.log(header);
      console.log(res);
      // console.log(newMessages);
      setMessages(newMessages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConversation(chatId);
  }, [chatId]);

  //Entering new Message
  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  // Sending new message to the respective chat
  const sendMessage = async (e, num) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/new/message/${num}`, {
        message: input,
        timestamp: Date.now(),
      });
      setInput("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{headerMsg.chatName}</h3>
          <p>
            Last Active :
            {new Date(parseInt(headerMsg.timestamp)).toLocaleTimeString()}{" "}
          </p>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((data) => {
          return (
            <p className="chat__message" key={data._id}>
              {/* <span className="chat__name">{messages.name}</span> */}
              {data.message}
              <span className="chat__timestamp">
                {new Date(parseInt(data.timestamp)).toLocaleTimeString()}
              </span>
            </p>
          );
        })}
      </div>
      <div className="chat__footer">
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={handleChange}
          />
          <button type="submit" onClick={(e) => sendMessage(e, chatId)}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
