import React from "react";
import "./User.css";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@material-ui/core";

function User() {
  return (
    <div className="user">
      <div className="user__header">
        <div className="user__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default User;
