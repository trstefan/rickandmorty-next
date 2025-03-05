"use client";
import { useState } from "react";
import { Users, Check } from "lucide-react";

const FilterButton = ({ input, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-2 rounded-md transition-all
                ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-medium border border-blue-300"
                    : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
                }`}
    >
      <span>{input}</span>
      {isActive && <Check size={16} className="text-blue-600" />}
    </button>
  );
};

const Gender = ({ setGender, setPage }) => {
  const [activeGender, setActiveGender] = useState(null);

  const genders = ["All", "Female", "Male", "Genderless", "Unknown"];

  const handleGenderSelect = (gender) => {
    // If clicking the active gender or "All", reset the filter
    if (activeGender === gender || gender === "All") {
      setActiveGender(null);
      setGender("");
    } else {
      setActiveGender(gender);
      setGender(gender);
    }
    setPage(1);
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex items-center gap-2">
        <Users size={18} className="text-gray-500" />
        <h3 className="font-medium text-gray-800">Gender</h3>
      </div>

      <div className="p-3 grid grid-cols-1 gap-2">
        {genders.map((item) => (
          <FilterButton
            key={item}
            input={item}
            isActive={activeGender === item}
            onClick={() => handleGenderSelect(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gender;
