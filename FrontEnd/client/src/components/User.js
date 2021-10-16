import React, { useState } from "react";
import "./User.css";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import SidebarChat from "./SidebarChat";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
function User() {
  const [isModalOpen, setModel] = useState(false);
  const [isUserName, setUserName] = useState(true);
  const [newRoom, setNewRoom] = useState("");
  const [welcomeMsg, setWelcomeMsg] = useState("");
  const [isEntered, setIsEntered] = useState(false);

  //redux
  const addRealTime = useSelector((state) => state.isAddRealTime);
  const addDispatch = useDispatch();
  console.log(addRealTime);

  const currentUserName = useSelector((state) => state.userName);
  console.log(currentUserName);

  //Adding minion images
  const userDispatch = useDispatch();
  const image = [
    "https://img1.wallspic.com/originals/1/8/8/7/3/137881-toy-action_figure-figurine-figurines-fictional_character-3840x2160.jpg?attachment=1",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy_hwdQFeYdkCbM5VsayDyCy2M4N2g-nOErKll_WCVQdqASRaijuD7mQH6PIsw5D2FvAY&usqp=CAU",
    "https://www.wallpaperup.com/uploads/wallpapers/2015/01/10/581774/d14f864ec4e07b7af1a39e4ad75a7426-700.jpg",
    "https://www.wallpapertip.com/wmimgs/3-30218_4k-png-wallpaper-transparent-background-minion-png.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCGEnUodmoE2_8J5opEk_fvPShSjtc208AVWB4JLcnrKUpSErT5iNQgTSRUfB0cPhnF6c&usqp=CAU",
    "https://i.pinimg.com/originals/73/36/3c/73363cc3cb4370cb74f4dbffc6135d88.png",
    "https://tigheshill-p.schools.nsw.gov.au/content/dam/doe/sws/schools/t/tigheshill-p/news/2015/6/pantone-minion-color.jpg.thumb.1280.1280.jpg",
  ];

  const random = image[Math.floor(Math.random() * image.length)];

  // Adding new conversation into the user Chat
  const addChat = async (e) => {
    e.preventDefault();
    if (newRoom && welcomeMsg) {
      let chatId = "";

      // Posting new conversation
      const res = await axios.post("/new/conversation", {
        chatName: newRoom,
        timestamp: Date.now(),
        image: random,
      });

      chatId = res.data._id;
      //Adding welcome Message to the chat
      const newMessage = await axios.post(`/new/message/${chatId}`, {
        message: welcomeMsg,
        timestamp: Date.now(),
        user: currentUserName,
      });
      setModel(!isModalOpen);
      addDispatch({ type: "REALTIMEADD", add: !addRealTime });
      setNewRoom("");
      setWelcomeMsg("");
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
          <IconButton
            onClick={() => {
              setModel(!isModalOpen);
            }}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setUserName(!isUserName);
            }}
          >
            <PersonIcon />
          </IconButton>
        </div>
      </div>

      <div
        className={`${
          isModalOpen ? "modal__overlay show__modal" : "modal__overlay"
        }`}
      >
        <div className="modal__container">
          <form action="POST">
            <input
              type="text"
              placeholder="New Room Name"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
              className="newRoom"
            />
            <input
              type="text"
              placeholder="Welcome Message"
              value={welcomeMsg}
              onChange={(e) => setWelcomeMsg(e.target.value)}
              className="welcomeMessage"
            />
            <button type="submit" onClick={addChat} className="addBtn">
              Add
            </button>
            {isEntered && <p>Please Enter All the details</p>}

            <CloseIcon
              onClick={(e) => {
                e.preventDefault();
                setModel(!isModalOpen);
              }}
              className="closeBtn"
            />
          </form>
        </div>
      </div>
      <div
        className={`${
          isUserName ? "modal__overlay show__modal" : "modal__overlay"
        }`}
      >
        <div className="userName__container">
          <form action="POST">
            <input
              type="text"
              placeholder="Enter Your Name"
              className="newRoom"
              value={currentUserName}
              onChange={(e) =>
                userDispatch({ type: "USERNAME", name: e.target.value })
              }
            />
            <p className="addBtn" onClick={() => setUserName(!isUserName)}>
              Let's Get Started
            </p>

            <CloseIcon
              onClick={(e) => {
                e.preventDefault();
                setUserName(!isUserName);
              }}
              className="closeBtn"
            />
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
