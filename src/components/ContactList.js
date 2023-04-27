import Contact from "./Contact";

export default function ContactList({ activeUsers, onClick }) {
  const handleClick = (contactId) => {
    onClick(contactId);
  };
  return (
    <div className="contact-list-container">
      {activeUsers.map((contact, i) => {
        return (
          <Contact
            key={i}
            name={contact.name}
            profile_picture={contact.image}
            last_seen={contact.lastSeen}
            last_message={contact.chatPreview}
            onClick={() => handleClick(contact.id)}
          />
        );
      })}
    </div>
  );
}
