import React from "react";
import "./User.css";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import SidebarChat from "../SidebarChat";
// import SidebarChat from "./sidebarChat";

function User() {
  return (
    <div className="user">
      <div className="user__header">
        <Avatar src="https://www.seekpng.com/png/detail/306-3069752_minion-waving-nephew-minions-birthday-card.png" />
        <div className="user__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AddIcon />
          </IconButton>
          <IconButton>
            <PersonIcon />
          </IconButton>
        </div>
      </div>
      <div className="user__chat">
        <SidebarChat />
      </div>
    </div>
  );
}

export default User;
