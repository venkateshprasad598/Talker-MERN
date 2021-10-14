import React, { useEffect, useState } from "react";
import "./SidebarConvo.css";
import axios from "./axios";
import { useDispatch } from "react-redux";

const SidebarConvo = ({ id, name }) => {
  const dispatch = useDispatch();
  const [lastMsg, setLastMsg] = useState("");
  const [lastTimestamp, setlastTimestamp] = useState("");
  const [lastPhoto, setlastPhoto] = useState("");

  //Getting last message, photo and tiestamp of the user
  const getSidebarElement = async () => {
    try {
      const res = await axios.get(`/get/lastMessage/${id}`);
      console.log(res);
      setLastMsg(res.data.message);
      setlastTimestamp(res.data.timestamp);
      setlastPhoto(res.data.user.photo);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSidebarElement();
  }, []);

  return (
    <div
      className="sidebarConvo"
      onClick={() => dispatch({ type: "CHATID", id: id })}
    >
      <h3>{name}</h3>
      <p>{lastMsg}</p>
      <p>LastSeen : {lastTimestamp}</p>
    </div>
  );
};

export default SidebarConvo;
