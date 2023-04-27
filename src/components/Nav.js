import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";
import "../styles/Nav.css";

function Nav({ userId }) {
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get("http://localhost:8000/users");
        // const user = usersResponse.find((user) => user.id === userId);

        const user = usersResponse.data.find((user) => user.id === userId);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userId]);

  return user ? (
    <div className="nav-bar">
      <img className="nav-profile-pic" src={user.image} alt="profile" />
      <p className="nav-profile-name">{user.name}</p>
      <button>
        <CiCirclePlus size={36} />
      </button>
    </div>
  ) : null;
}

export default Nav;
