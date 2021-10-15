import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "@mui/material";
import "./Chat.css";
import axios from "./axios";
import { useSelector } from "react-redux";

const Chat = () => {
  const [input, setInput] = useState("");

  //State Management Redux
  const [messages, setMessages] = useState([]);
  const [headerMsg, setHeaderMsg] = useState([]);
  const [isMsgRealTime, setRealTime] = useState(false);
  const chatId = useSelector((state) => state.chatId);

  const inputRef = useRef();
  //Focusing on the last message
  useEffect(() => {
    // inputRef.current.focus();
    console.log(inputRef.current);
  });

  // Displaying all chat of the actual conversation
  const getConversation = async (num) => {
    try {
      const res = await axios.get(`get/conversation/${num}`);
      const newMessages = res.data[0].conversation;
      const header = res.data[0];
      setHeaderMsg(header);
      setMessages(newMessages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConversation(chatId);
  }, [chatId, isMsgRealTime]);

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
      setRealTime(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={headerMsg.image} />
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
