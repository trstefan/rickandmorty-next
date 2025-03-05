import React from "react";

const InputGroup = ({ name, changeID, total }) => {
  return (
    <div className=" flex flex-col px-5 py-3 w-full sm:w-1/4 bg-blue-500 rounded-lg my-2 ">
      <p className="font-medium">Pick: </p>
      <select
        onChange={(e) => changeID(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
      >
        <option value="1">Choose...</option>
        {[...Array(total).keys()].map((x, index) => {
          return (
            <option value={x + 1} key={index}>
              {name}- {x + 1}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default InputGroup;
