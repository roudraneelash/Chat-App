// Importing required libraries
import React, { useEffect, useState } from "react";
import Message from "./Message";

function MessageList({ messages }) {
  // Setting state for messageList
  const [messageList, setMessageList] = useState([]);

  // Update messageList when messages prop changes
  useEffect(() => {
    setMessageList(messages || []);
  }, [messages]);

  // Render message container with messages
  return (
    <div className="chat-section">
      <div className="message-container">
        {messageList.map((message, i) => (
          <Message
            key={i}
            author={message.sender === 0 ? "user" : "sender"}
            text={message.text}
            time={message.timestamp}
          />
        ))}
      </div>
    </div>
  );
}

export default MessageList;
