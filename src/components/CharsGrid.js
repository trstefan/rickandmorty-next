import React from "react";
import CharCard from "./CharCard";

const CharsGrid = ({ chars }) => {
  // console.log(chars);
  return (
    <section className="grid grid-col-1 justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 p-5 rounded-lg">
      {chars.map((char) => (
        <CharCard key={char.id} char={char}></CharCard>
      ))}
    </section>
  );
};

export default CharsGrid;
