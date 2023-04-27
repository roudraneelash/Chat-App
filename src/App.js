import ContactList from "./components/ContactList";
import Search from "./components/Search";
import Conversation from "./components/Conversation";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [chats, setChats] = useState([]);
  //display on rightbar
  const [activeChats, setActiveChats] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [users, setUsers] = useState([]);
  //display on leftbar
  const [activeUsers, setActiveUsers] = useState([]);

  //on loading
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const updatedActiveUsers = [];

    chats.forEach((chat) => {
      if (chat.messages.length > 0) {
        const lastMessage = chat.messages[chat.messages.length - 1].text;
        const lastSeen = chat.messages[chat.messages.length - 1].timestamp;

        //finding relevant user(returns array matching the id)
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
  }, [chats]);

  useEffect(() => {
    setSearchResults(activeUsers);
  }, [activeUsers]);
  //create chat
  const handleContactClick = (contactId) => {
    const convo = chats.filter((chat) => chat.participants === contactId);
    setActiveChats(convo);
  };
  const handleUpdate = (newMessages) => {
    addMessage(newMessages);
  };

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

  const addMessage = (newMessages) => {
    axios
      .patch(`http://localhost:8000/chats/${activeChats[0].id}`, {
        messages: newMessages,
      })
      .then((response) => {
        // handle successful patch response here
        fetchData();
      })
      .catch((error) => {
        console.log(error);
        // handle error response here
      });
  };
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
  const handleContacts = () => {
    setSearchResults(users);
  };
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
