"use client";
import React from "react";
import FilterButton from "../FilterButton";

const Species = ({ setSpecies, setPage }) => {
  let species = [
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
  return (
    <div className="bg-[#F3F4F6] mt-4 py-2 px-1 rounded-lg  flex flex-col gap-[1.5rem]">
      <div className="text-base">Species</div>
      <div className="flex flex-col gap-[1.2rem]">
        {" "}
        {species.map((item, index) => (
          <FilterButton
            key={index}
            index={index}
            name="species"
            input={item}
            task={setSpecies}
            setPage={setPage}
          ></FilterButton>
        ))}{" "}
      </div>
    </div>
  );
};

export default Species;
