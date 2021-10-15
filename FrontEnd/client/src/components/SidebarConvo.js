import React, { useEffect, useState } from "react";
import "./SidebarConvo.css";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";

const SidebarConvo = ({ id, name, image }) => {
  const dispatch = useDispatch();
  const [lastMsg, setLastMsg] = useState("");
  const [lastTimestamp, setlastTimestamp] = useState("");
  const [lastPhoto, setlastPhoto] = useState("");

  // redux RealTime
  const realTime = useSelector((state) => state.isMessageRealTime);

  //Getting last message, photo and tiestamp of the user
  const getSidebarElement = async () => {
    try {
      const res = await axios.get(`/get/lastMessage/${id}`);
      setLastMsg(res.data.message);
      setlastTimestamp(res.data.timestamp);
      // setlastPhoto(res.data.user.photo)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSidebarElement();
  }, [realTime]);

  return (
    <>
      <div
        className="sidebarConvo"
        onClick={() => dispatch({ type: "CHATID", id: id, showChat: false })}
      >
        <Avatar src={image} />
        <div className="sidebarConvo__info">
          <h4>{name}</h4>
          <p>
            {lastMsg && lastMsg.length > 30
              ? lastMsg.substring(0, 30) + "..."
              : lastMsg}
          </p>
          <p>
            Last Active: {new Date(parseInt(lastTimestamp)).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="underline"></div>
    </>
  );
};
export default SidebarConvo;
