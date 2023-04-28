// Importing necessary components
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import InputBox from "./InputBox";
import MessageList from "./MessageList";

function Conversation({ convo, updateChat }) {
  // Initializing states
  const [userId, setUserId] = useState();
  const [updatedMessages, setUpdatedMessages] = useState([]);

  // Updating states with the selected conversation's data
  useEffect(() => {
    if (convo.length >= 1) {
      setUserId(convo[0].participants);
      setUpdatedMessages(convo[0].messages);
    }
  }, [convo]);

  // Handling message submission
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

  // Rendering the conversation component
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
