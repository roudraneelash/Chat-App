import React from "react";
import "../styles/Message.css";

function Message({ author, text, time }) {
  const senderClass = author === "sender" ? "sender" : "user";
  const now = new Date();
  const lastSeenDate = new Date(time);

  // Check if last seen time is more than 24 hours ago
  const isLastSeenMoreThan24HoursAgo = now - lastSeenDate > 24 * 60 * 60 * 1000;

  // Format last seen time as date or time in AM/PM format
  const formattedLastSeen = isLastSeenMoreThan24HoursAgo
    ? lastSeenDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : lastSeenDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

  return (
    <div className={`chat-message ${senderClass}`}>
      <div className="message-text">
        <span>{text}</span>
        <span className="message-time">{formattedLastSeen}</span>
      </div>
    </div>
  );
}

export default Message;
