import React from "react";

const CharCard = ({ char }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={char.image} alt="" />

      <div className="px-6 py-4">
        {(() => {
          if (char.status === "Alive") {
            return (
              <span className="text-xs inline-block py-2 px-3 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-600 text-white rounded-full">
                {char.status}
              </span>
            );
          } else if (char.status === "Dead") {
            return (
              <span className="text-xs inline-block py-2 px-3 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded-full">
                {char.status}
              </span>
            );
          } else {
            return (
              <span className="text-xs inline-block py-3 px-3 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full">
                {" "}
                {char.status}
              </span>
            );
          }
        })()}
        <div className="font-bold text-xl mb-2 text-red-600">{char.name}</div>
        <p className="font-bold">Origin: </p>
        <p className="text-gray-700 text-base">{char.origin.name}</p>
        <p className="font-bold">Last known location: </p>
        <p className="text-gray-700 text-base">{char.location.name}</p>
      </div>
    </div>
  );
};

export default CharCard;
