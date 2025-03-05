"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ setSearchChar, setPage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setPage(1);
    setSearchChar(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevent form submission refresh but still trigger search
    setPage(1);
    setSearchChar(inputValue);
  };

  const clearSearch = () => {
    setInputValue("");
    setPage(1);
    setSearchChar("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-500">
          <Search size={18} />
        </div>

        <input
          className="w-full p-3 pl-10 pr-10 bg-white border border-gray-300 rounded-lg 
                    text-gray-800 placeholder-gray-500 shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition-colors"
          type="text"
          placeholder="Search for characters"
          value={inputValue}
          onChange={handleChange}
          aria-label="Search for characters"
        />

        {inputValue && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
