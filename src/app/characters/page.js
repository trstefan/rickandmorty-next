"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, FilterIcon, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "../../components/SearchBar";
import Filter from "../../components/Filter/Filter";
import CharsGrid from "../../components/CharsGrid";

export default function Characters() {
  const [chars, setChars] = useState([]);
  const [page, setPage] = useState(1);
  const [searchChar, setSearchChar] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState({ prev: null, next: null });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${page}&name=${searchChar}&status=${status}&gender=${gender}&species=${species}`
        );

        setChars(response.data.results);
        setInfo(response.data.info);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // No results found
          setChars([]);
          setInfo({ prev: null, next: null });
        } else {
          setError("Failed to fetch characters. Please try again later.");
          console.error("API Error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page, searchChar, status, gender, species]);

  const handleNextPage = () => setPage(page + 1);
  const handlePreviousPage = () => setPage(page - 1);
  const toggleFilters = () => setShowFilters(!showFilters);

  // Calculate if any filters are active
  const hasActiveFilters = status !== "" || gender !== "" || species !== "";

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
          Rick and Morty Characters
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore characters from the Rick and Morty universe. Use the search
          and filters to find your favorites.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
          <div className="w-full md:w-2/3">
            <SearchBar setSearchChar={setSearchChar} setPage={setPage} />
          </div>

          <Button
            onClick={toggleFilters}
            variant="outline"
            className={`flex items-center gap-2 md:w-auto w-full ${
              hasActiveFilters ? "border-blue-500 text-blue-600" : ""
            }`}
          >
            <FilterIcon size={16} />
            Filters
            {hasActiveFilters && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                Active
              </span>
            )}
          </Button>
        </div>

        {/* Collapsible Filter Panel */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showFilters ? "max-h opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
            <Filter
              setStatus={setStatus}
              setGender={setGender}
              setSpecies={setSpecies}
              setPage={setPage}
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-600">Loading characters...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md my-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && !error && chars.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No characters found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
        </div>
      )}

      {/* Characters Grid */}
      {!loading && !error && chars.length > 0 && (
        <div className="mb-8">
          <CharsGrid chars={chars} />
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && chars.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            onClick={handlePreviousPage}
            disabled={!info.prev}
            variant={info.prev ? "default" : "outline"}
            className="flex items-center gap-2 transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </Button>

          <span className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium">
            Page {page}
          </span>

          <Button
            onClick={handleNextPage}
            disabled={!info.next}
            variant={info.next ? "default" : "outline"}
            className="flex items-center gap-2 transition-all"
          >
            Next
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      )}
    </section>
  );
}
