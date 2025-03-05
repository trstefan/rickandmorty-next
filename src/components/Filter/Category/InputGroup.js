"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, ListFilter } from "lucide-react";

const InputGroup = ({ name, changeID, total }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    setSelectedValue(value);
    changeID(value);
    setIsOpen(false);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full sm:w-64 relative" ref={dropdownRef}>
      <div className="mb-2 flex items-center gap-1.5">
        <ListFilter size={16} className="text-gray-500" />
        <label className="text-sm font-medium text-gray-700">
          Select {name}
        </label>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm
                    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition-all duration-200"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span
            className={`block truncate ${
              !selectedValue ? "text-gray-500" : "text-gray-900"
            }`}
          >
            {selectedValue ? `${name} - ${selectedValue}` : "Choose..."}
          </span>
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            <ul className="py-1" role="listbox">
              <li
                className="px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect("1")}
              >
                Choose...
              </li>

              <div className="border-t border-gray-100 my-1"></div>

              {[...Array(total).keys()].map((x, index) => {
                const value = (x + 1).toString();
                const isSelected = selectedValue === value;

                return (
                  <li
                    key={index}
                    onClick={() => handleSelect(value)}
                    className={`px-3 py-2 text-sm cursor-pointer flex items-center justify-between
                              ${
                                isSelected
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-900 hover:bg-gray-100"
                              }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span>
                      {name} - {x + 1}
                    </span>
                    {isSelected && (
                      <Check size={16} className="text-blue-600" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputGroup;
