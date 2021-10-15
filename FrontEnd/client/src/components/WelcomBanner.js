import React from "react";
import "./WelcomeBanner.css";
const WelcomBanner = () => {
  return (
    <div className="welcomeBanner">
      <img
        src="https://chat-loop.smilegupta.tech/static/media/chat2.98094712.svg"
        alt="WelcomeBanner"
      />
      <h4>
        Add a new conversation chatroom / choose a chatroom to see your chats
      </h4>
    </div>
  );
};

export default WelcomBanner;
