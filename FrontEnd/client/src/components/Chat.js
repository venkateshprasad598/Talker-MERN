import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "@mui/material";
import "./Chat.css";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import WelcomBanner from "./WelcomBanner";

const Chat = () => {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);
  const [headerMsg, setHeaderMsg] = useState([]);

  //UserName
  const userName = useSelector((state) => state.userName);

  //State Management Redux
  const chatId = useSelector((state) => state.chatId);

  //Real time sending message to the chat box
  const realTime = useSelector((state) => state.isMessageRealTime);
  const realTimeDispatch = useDispatch();

  //Chat Home display
  const showChat = useSelector((state) => state.showChat);

  // Displaying all chat of the actual conversation
  const getConversation = async (num) => {
    try {
      const res = await axios.get(`get/conversation/${num}`);
      const newMessages = res.data[0].conversation;
      console.log(newMessages);
      setMessages(newMessages);
      const header = res.data[0];
      setHeaderMsg(header);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConversation(chatId);
  }, [chatId, realTime]);

  //Storing userName
  // useEffect(() => {
  //   const name = prompt("Enter tour name");
  //   setUserName(name);
  // }, []);
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
        user: userName,
      });
      setInput("");
      realTimeDispatch({ type: "REALTIME", realTimeMsg: !realTime });
    } catch (err) {
      console.log(err);
    }
  };
  //Return Statement

  if (showChat) {
    return (
      <div className="chat">
        <WelcomBanner />
      </div>
    );
  } else if (chatId !== null) {
    return (
      <div className="chat">
        <div className="chat__header">
          {headerMsg.image && <Avatar src={headerMsg.image} />}
          <div className="chat__headerInfo">
            <h3>{headerMsg.chatName}</h3>
            {headerMsg.timestamp && (
              <p>
                Last Active:{"  "}
                {new Date(parseInt(headerMsg.timestamp)).toLocaleString()}{" "}
              </p>
            )}
          </div>
        </div>

        <div className="chat__body">
          {messages.map((data) => {
            return (
              <p
                className={
                  userName === data.user ? "chat__messageUser" : "chat__message"
                }
                key={data._id}
              >
                <span className="chat__name">{data.user || "Unknown"}</span>
                <span className="chat__messages">{data.message}</span>
                <span className="chat__timestamp">
                  {new Date(parseInt(data.timestamp)).toDateString()}
                  {", "}
                  {new Date(parseInt(data.timestamp)).toLocaleTimeString()}
                </span>
              </p>
            );
          })}
        </div>
        {headerMsg.image && (
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
        )}
      </div>
    );
  }
};
export default Chat;
