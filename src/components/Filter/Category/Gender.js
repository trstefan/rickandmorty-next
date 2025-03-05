"use client";
import React from "react";
import FilterButton from "../FilterButton";

const Gender = ({ setGender, setPage }) => {
  let genders = ["Female", "Male", "Enderless", "Unknown"];
  return (
    <div className="bg-[#F3F4F6] mt-4 py-2 px-1 rounded-lg  flex flex-col gap-[1.5rem]">
      <div className="text-base">Gender</div>
      <div className="flex flex-col gap-[1.2rem]">
        {genders.map((item, index) => (
          <FilterButton
            key={index}
            index={index}
            name="gender"
            input={item}
            task={setGender}
            setPage={setPage}
          ></FilterButton>
        ))}
      </div>
    </div>
  );
};

export default Gender;
