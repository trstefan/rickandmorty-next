"use client";

import React from "react";
import { useEffect, useState } from "react";
import CharsGrid from "../../components/CharsGrid";
import axios from "axios";
import SearchBar from "../../components/SearchBar";
import Filter from "../../components/Filter/Filter";
import { Header } from "@/components/header";

export default function Characters() {
  const [chars, setChars] = useState([]);
  const [page, setPage] = useState(1);
  const [searchChar, setSearchChar] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://rickandmortyapi.com/api/character?page=${page}&name=${searchChar}&status=${status}&gender=${gender}&species=${species}`
      )
      .then((response) => {
        const chars = response.data.results;
        const info = response.data.info;
        setChars(chars);
        //console.log(info.prev);

        info.prev === null
          ? (document.getElementById("btnPrev").style.display = "none")
          : (document.getElementById("btnPrev").style.display = "block");

        info.next === null
          ? (document.getElementById("btnNext").style.display = "none")
          : (document.getElementById("btnNext").style.display = "block");
      });
  }, [page, searchChar, status, gender, species]);

  function handleNextPage() {
    const currentPage = page + 1;
    setPage(currentPage);
  }

  function handlePreviousPage() {
    const currentPage = page - 1;
    setPage(currentPage);
    //console.log("works");
  }

  return (
    <section>
      <div className="flex text-center justify-center mb-5 w-full ">
        <SearchBar setSearchChar={setSearchChar} setPage={setPage} />
      </div>
      <div className="sm:flex  sm:flex-row  sm:gap-x-8  sm:justify-center  sm:items-start px-4">
        <Filter
          setStatus={setStatus}
          setGender={setGender}
          setSpecies={setSpecies}
          setPage={setPage}
        ></Filter>
        <CharsGrid chars={chars}></CharsGrid>
      </div>
      <div className="my-5 flex justify-center">
        <button
          className="bg-blue-500 disabled hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4 "
          onClick={handlePreviousPage}
          id="btnPrev"
        >
          PREVIOUS PAGE
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNextPage}
          id="btnNext"
        >
          NEXT PAGE
        </button>
      </div>
    </section>
  );
}
