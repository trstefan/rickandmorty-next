import React from "react";

const SearchBar = ({ setSearchChar, setPage }) => {
  return (
    <form action="">
      <input
        className="p-4 bg-blue-600 rounded-lg text-center text-yellow-500 font-medium"
        type="text"
        placeholder="Search for characters"
        onChange={(e) => {
          setPage(1);
          setSearchChar(e.target.value);
          console.log(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchBar;
