"use client";
import Status from "./Category/Status";
import Gender from "./Category/Gender";
import Species from "./Category/Species";
import { Button } from "../ui/button";

const Filter = ({ setStatus, setGender, setSpecies, setPage }) => {
  function clear() {
    setPage(1);
    setStatus("");
    setGender("");
    setSpecies("");
    window.location.reload(false);
    // Avoid page reload and use state updates instead
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Filter Header */}
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm border border-gray-200">
        <p className="font-semibold text-lg text-gray-800">Filters</p>
        <Button
          variant="destructive"
          onClick={clear}
          className="px-4 py-2 text-sm font-medium transition hover:brightness-90"
        >
          Clear Filters
        </Button>
      </div>

      {/* Filter Sections - Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Column - Status and Gender */}
        <div className="flex flex-col gap-4">
          <Status setStatus={setStatus} setPage={setPage} />
          <Gender setGender={setGender} setPage={setPage} />
        </div>

        {/* Second Column - Species */}
        <div>
          <Species setSpecies={setSpecies} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default Filter;
