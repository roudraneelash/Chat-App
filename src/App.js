import ContactList from "./components/ContactList";
import Search from "./components/Search";
import Conversation from "./components/Conversation";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  // State variables
  const [chats, setChats] = useState([]); // all chats fetched from the server
  const [activeChats, setActiveChats] = useState([]); // the currently active chat
  const [searchResults, setSearchResults] = useState([]); // search results for contacts
  const [users, setUsers] = useState([]); // all users fetched from the server
  const [activeUsers, setActiveUsers] = useState([]); // users with whom the current user has an active chat

  // Fetch data from the server on page load
  useEffect(() => {
    fetchData();
  }, []);

  // Update active users whenever chats or users change
  useEffect(() => {
    const updatedActiveUsers = [];

    chats.forEach((chat) => {
      if (chat.messages.length > 0) {
        const lastMessage = chat.messages[chat.messages.length - 1].text;
        const lastSeen = chat.messages[chat.messages.length - 1].timestamp;

        // Find the relevant user (returns array matching the id)
        const matchingUsers = users.filter(
          (user) => user.id === chat.participants
        );

        const newitem = {
          ...matchingUsers[0],
          lastSeen,
          chatPreview: lastMessage,
        };

        updatedActiveUsers.unshift(newitem);
      }
    });

    setActiveUsers(updatedActiveUsers);
  }, [chats, users]);

  // Update search results whenever active users change
  useEffect(() => {
    setSearchResults(activeUsers);
  }, [activeUsers]);

  // Handle a user clicking on a contact
  const handleContactClick = (contactId) => {
    const convo = chats.filter((chat) => chat.participants === contactId);
    setActiveChats(convo);
  };

  // Handle updates to a chat
  const handleUpdate = (newMessages) => {
    addMessage(newMessages);
  };

  // Fetch data from the server
  const fetchData = async () => {
    try {
      const usersResponse = await axios.get("http://localhost:8000/users");
      setUsers(usersResponse.data);

      const chatsResponse = await axios.get("http://localhost:8000/chats");
      setChats(chatsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add a new message to the currently active chat
  const addMessage = (newMessages) => {
    axios
      .patch(`http://localhost:8000/chats/${activeChats[0].id}`, {
        messages: newMessages,
      })
      .then((response) => {
        // Handle successful patch response here
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        // Handle error response here
      });
  };

  // Handle changes to the search input
  const handleChange = (searchInput) => {
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (searchInput.length > 0) {
      setSearchResults(filteredUsers);
    } else {
      setSearchResults(activeUsers);
    }
  };

  // Handle the user clicking on the "All Contacts" button
  const handleContacts = () => {
    setSearchResults(users);
  };

  // Handle the user
  const handleConvo = () => {
    setSearchResults(activeUsers);
  };

  return (
    <div className="container">
      <div className="left-container">
        <Search handleSearch={handleChange} />
        <div className="items-container">
          <button className="item" onClick={handleConvo}>
            CONVERSATION
          </button>
          <button className="all-contacts" onClick={handleContacts}>
            <span className="item">All Contacts</span>
            <CiCirclePlus size={32} />
          </button>
        </div>
        <ContactList onClick={handleContactClick} activeUsers={searchResults} />
      </div>
      <Conversation convo={activeChats} updateChat={handleUpdate} />
    </div>
  );
}
