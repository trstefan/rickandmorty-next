"use client";
import React from "react";
import FilterButton from "../FilterButton";

const Status = ({ setStatus, setPage }) => {
  let status = ["Alive", "Dead", "Unknow"];
  return (
    <div className="bg-[#F3F4F6] mt-4 py-2 px-1 rounded-lg  flex flex-col gap-[1.5rem]">
      <div className="text-base"> Status</div>
      <div className="flex flex-col gap-[1.2rem]">
        {" "}
        {status.map((item, index) => (
          <FilterButton
            key={index}
            index={index}
            name="status"
            input={item}
            task={setStatus}
            setPage={setPage}
          ></FilterButton>
        ))}
      </div>
    </div>
  );
};

export default Status;
