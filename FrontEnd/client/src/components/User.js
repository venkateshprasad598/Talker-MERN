import React, { useState } from "react";
import "./User.css";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import SidebarChat from "./SidebarChat";
// import SidebarChat from "./sidebarChat";
import axios from "./";

function User() {
  const [isModalOpen, setModel] = useState(false);
  const [newRoom, setNewRoom] = useState("");
  const [welcomeMsg, setWelcomeMsg] = useState("");

  const addChat = async (e) => {
    if (newRoom && welcomeMsg) {
      let chatId = "";
      const res = await axios.post("/new/conversation", {
        chatName: newRoom,
      });
      console.log(res);
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
            <button
              onClick={() => {
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
