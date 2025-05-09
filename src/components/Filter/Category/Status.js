"use client";
import React from "react";
import { useState } from "react";
import { Activity, Check } from "lucide-react";
import { ACTION_HEADER } from "next/dist/client/components/app-router-headers";

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
const Status = ({ setStatus, setPage }) => {
  const [activeStatus, setActiveStatus] = useState(null);

  const status = ["Alive", "Dead", "Unknow"];

  const handleStatusSelect = (status) => {
    // If clicking the active status or "All", reset the filter
    if (activeStatus === status || status === "All") {
      setActiveStatus(null);
      setStatus("");
    } else {
      setActiveStatus(status);
      setStatus(status);
    }
    setPage(1);
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 flex items-center gap-2">
        <Activity size={18} className="text-gray-500" />
        <h3 className="font-medium text-gray-800">Status</h3>
      </div>

      <div className="p-3 grid grid-cols-1 gap-2">
        {status.map((item) => (
          <FilterButton
            key={item}
            input={item}
            name="status"
            isActive={activeStatus === item}
            onClick={() => handleStatusSelect(item)}
          ></FilterButton>
        ))}
      </div>
    </div>
  );
};

export default Status;
