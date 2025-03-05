"use client";
import { useState } from "react";
import { Globe, Check } from "lucide-react";

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

const Species = ({ setSpecies, setPage }) => {
  const [activeSpecies, setActiveSpecies] = useState(null);

  const species = [
    "All",
    "Human",
    "Alien",
    "Humanoid",
    "Poopybutthole",
    "Mythological",
    "Unknown",
    "Animal",
    "Disease",
    "Robot",
    "Cronenberg",
  ];

  const handleSpeciesSelect = (speciesName) => {
    if (activeSpecies === speciesName || speciesName === "All") {
      setActiveSpecies(null);
      setSpecies("");
    } else {
      setActiveSpecies(speciesName);
      setSpecies(speciesName);
    }
    setPage(1);
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden ">
      <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex items-center gap-2">
        <Globe size={18} className="text-gray-500" />
        <h3 className="font-medium text-gray-800">Species</h3>
      </div>

      <div className="p-3 grid grid-cols-1 gap-2">
        {species.map((item) => (
          <FilterButton
            key={item}
            input={item}
            isActive={activeSpecies === item}
            onClick={() => handleSpeciesSelect(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Species;
