import React from "react";
import "../styles/Contact.css";

function Contact({ name, profile_picture, last_message, last_seen, onClick }) {
  const now = new Date();
  const lastSeenDate = new Date(last_seen);

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
    <div className="contact-container" onClick={onClick}>
      <img className="profile-pic" src={profile_picture} alt="profile" />
      <div className="text-container">
        <p className="contact-name">{name}</p>
        <p className="last-message">{last_message}</p>
      </div>
      <div className="time-container">
        {formattedLastSeen != "Invalid Date" && <p>{formattedLastSeen}</p>}
      </div>
    </div>
  );
}

export default Contact;
