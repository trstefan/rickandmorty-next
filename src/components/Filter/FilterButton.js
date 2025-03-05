"use client";

const FilterButton = ({ name, index, input, task, setPage }) => {
  return (
    <div>
      <style jsx="true">
        {`
          .x:checked + label {
            background-color: #fcd34d;
            color: black;
          }
          input[type="radio"] {
            display: none;
          }
        `}
      </style>{" "}
      <div className="form-check">
        <input
          className="form-check-input x mb-5"
          type="radio"
          name={name}
          id={`${name}-${index}`}
        />
        <label
          onClick={(x) => {
            task(input);
            setPage(1);
            //console.log("works");
          }}
          className="border-2 border-gray-300 bg-white w-full text-center p-[.5rem] rounded-lg cursor-pointer"
          htmlFor={`${name}-${index}`}
        >
          {input}
        </label>
      </div>
    </div>
  );
};

export default FilterButton;
