import React, { useState } from "react";
import { CgAttachment } from "react-icons/cg";
import { IoSend } from "react-icons/io5";
import "../styles/InputBox.css";

function InputBox({ onsubmit }) {
  const [inputValue, setInputvalue] = useState("");

  const handleChange = (event) => {
    setInputvalue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onsubmit(inputValue);
    setInputvalue("");
  };
  return (
    <div className="input-box">
      <button>
        <CgAttachment size={32} />
      </button>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message here"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit" className="btn-submit">
          <IoSend size={32} />
        </button>
      </form>
    </div>
  );
}

export default InputBox;
