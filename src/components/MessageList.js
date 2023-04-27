import React, { useEffect, useState } from "react";
import Message from "./Message";

function MessageList({ messages }) {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    setMessageList(messages || []);
  }, [messages]);

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

/*
<Message author="sender" time="10:30 AM" text="Hello there!" />
      <Message author="user" time="10:35 AM" text="Hi, how are you?" />
      <Message author="sender" time="10:30 AM" text="Hello there!" />
      <Message author="user" time="10:35 AM" text="Hi, how are you?" />
      <Message author="sender" time="10:30 AM" text="Hello there!" />
      <Message author="user" time="10:35 AM" text="Hi, how are you?" />
      <Message author="sender" time="10:30 AM" text="Hello there!" />
      <Message author="user" time="10:35 AM" text="Hi, how are you?" />
      <Message author="sender" time="10:30 AM" text="Hello there!" />
      <Message author="user" time="10:35 AM" text="Hi, how are you?" />
      <Message author="sender" time="10:30 AM" text="Hello there!" />
      <Message author="user" time="10:35 AM" text="Hi, how are you?" />
      <Message author="sender" time="10:30 AM" text="Hello there!" />
      <Message author="user" time="10:35 AM" text="Hi, how are you?" />
      <Message author="sender" time="10:30 AM" text="Hello there!" />
      <Message author="user" time="10:35 AM" text="Hi, how are you?" />
      <Message author="sender" time="10:30 AM" text="Hello there!" />
      <Message author="user" time="10:35 AM" text="Hi, how are you?" />
      */
