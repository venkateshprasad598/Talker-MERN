import React, { useState } from "react";
import "./User.css";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import SidebarChat from "./SidebarChat";
import axios from "./axios";

function User() {
  const [isModalOpen, setModel] = useState(false);
  const [newRoom, setNewRoom] = useState("");
  const [welcomeMsg, setWelcomeMsg] = useState("");
  const [isEntered, setIsEntered] = useState(false);

  // Adding new conversation into the user Chat
  const addChat = async (e) => {
    e.preventDefault();
    if (newRoom && welcomeMsg) {
      let chatId = "";

      // Posting new conversation
      const res = await axios.post("/new/conversation", {
        chatName: newRoom,
        timestamp: Date.now(),
      });

      chatId = res.data._id;
      //Adding welcome Message to the chat
      const newMessage = await axios.post(`/new/message/${chatId}`, {
        message: welcomeMsg,
        timestamp: Date.now(),
        user: {},
      });
      setModel(!isModalOpen);
    } else {
      // Please enter all the details popup message
      setIsEntered(true);
      setTimeout(() => {
        setIsEntered(false);
      }, 1000);
    }
  };
  return (
    <div className="user">
      <div className="user__header">
        <Avatar src="https://www.seekpng.com/png/detail/306-3069752_minion-waving-nephew-minions-birthday-card.png" />
        <div className="user__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setModel(!isModalOpen);
            }}
          >
            <AddIcon />
          </IconButton>
          <IconButton>
            <PersonIcon />
          </IconButton>
        </div>
      </div>

      <div
        className={`${
          isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
        }`}
      >
        <div className="modal-container">
          <form action="POST">
            <input
              type="text"
              placeholder="New Room"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
            />
            <input
              type="text"
              placeholder="Welcome Message"
              value={welcomeMsg}
              onChange={(e) => setWelcomeMsg(e.target.value)}
            />
            <button type="submit" onClick={addChat}>
              Add
            </button>
            {isEntered && <h3>Please Enter All the details</h3>}

            <button
              onClick={(e) => {
                e.preventDefault();
                setModel(!isModalOpen);
              }}
            >
              Close
            </button>
          </form>
        </div>
      </div>

      <div className="user__chat">
        <SidebarChat />
      </div>
    </div>
  );
}

export default User;
