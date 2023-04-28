import React, { useEffect, useState, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import "../styles/Search.css";

function Search({ handleSearch }) {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearchCallback = useCallback(handleSearch, [handleSearch]);

  useEffect(() => {
    handleSearchCallback(searchInput);
  }, [searchInput, handleSearchCallback]);

  // useEffect(() => {
  //   handleSearch(searchInput);
  // }, [searchInput]);

  return (
    <div className="search-container">
      <span>
        <FiSearch />
      </span>
      <input
        className="search-input"
        type="text"
        placeholder="Search for conversation"
        onChange={handleChange}
        value={searchInput}
      />
    </div>
  );
}

export default Search;
