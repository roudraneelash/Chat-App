//import necessary modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiCirclePlus } from "react-icons/ci";
import "../styles/Nav.css";

//create Nav component with userId as props
function Nav({ userId }) {
  //create state for user
  const [user, setUser] = useState();

  //fetch user data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get("http://localhost:8000/users");

        //find the user that matches the userId passed as prop
        const user = usersResponse.data.find((user) => user.id === userId);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userId]);

  //render the user's profile picture, name, and a button
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

//export Nav component
export default Nav;
