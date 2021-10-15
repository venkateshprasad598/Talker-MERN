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
  const userDispatch = useDispatch();

  //Adding images
  const image = [
    "https://funzumo.com/wp-content/uploads/2019/06/Best-Funny-Minion-Quotes.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSikt2YTSQ9lQ9m193gW7YirTtypIWmh5NcIrL4jJGwTHQMVc365k_pJJpNoed1ii98Qrs&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvtt6IOe4Gp9Q2lcLdjEKmpreGojqeq4ZYLZSoOgrkyx_v6r6YWpo6JuHT0yW5vRRiA7g&usqp=CAU",
    "https://saltedcaramel670.files.wordpress.com/2019/04/minion-holding-banana.jpg?w=940&h=627&crop=1",
    "https://cdn.shopify.com/s/files/1/2284/6393/products/tonies-electronics-tonie-despicable-me-minions-28186416185431.jpg?v=1628453229",
    "https://i.ebayimg.com/images/g/RNsAAOSwGotWq6ju/s-l300.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwZf6vuPh0QAtebimDXbQwuipikvGiK3QWvgY9IvzehXJBpaAJFNZ2cWG6feKmoCw81g0&usqp=CAU",
    "https://i.pinimg.com/originals/a9/ec/f2/a9ecf2d6cdf8b364c3edd1bb513229e6.jpg",
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
      });
      setModel(!isModalOpen);
      addDispatch({ type: "REALTIMEADD", add: !addRealTime });
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
          <IconButton
            PersonIcon
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
        <div className="modal__container">
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
            <button type="submit" className="addBtn">
              Let's Get Started
            </button>
            {isEntered && <p>Required!!</p>}
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
