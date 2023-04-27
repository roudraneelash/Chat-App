import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import InputBox from "./InputBox";
import MessageList from "./MessageList";

function Conversation({ convo, updateChat }) {
  const [userId, setUserId] = useState();
  const [updatedMessages, setUpdatedMessages] = useState([]);

  useEffect(() => {
    if (convo.length >= 1) {
      setUserId(convo[0].participants);
      setUpdatedMessages(convo[0].messages);
    }
  }, [convo]);

  const handleSubmit = (msg) => {
    const message = {
      sender: 0, // Replace with the sender ID
      timestamp: new Date().toISOString(),
      text: msg,
    };

    const newMessages = [...updatedMessages, message];
    setUpdatedMessages(newMessages);
    updateChat(newMessages);
  };

  return (
    <div className="conversation-container">
      <Nav userId={userId} />
      <MessageList messages={updatedMessages} />
      {userId != null && updatedMessages !== null && (
        <InputBox onsubmit={handleSubmit} />
      )}
    </div>
  );
}

export default Conversation;
