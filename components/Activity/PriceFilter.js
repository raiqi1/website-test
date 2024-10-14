import React from "react";

export default function PriceFilter({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  handleClearFilter,
  filtering,
}) {
  return (
    <div>
      <div className="mr-5 flex flex-col gap-2 mt-3 p-1">
        <h1 className="font-bold">Filter Price</h1>
        <div className="flex flex-row gap-3">
          <input
            type="text"
            value={minPrice}
            className="border border-gray-300 p-2 rounded w-20 h-8"
            placeholder="Rp. min"
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <div className="mt-4 border-gray-500 border-t w-8 flex justify-center"></div>{" "}
          <input
            type="text"
            value={maxPrice}
            className="border border-gray-300 p-2 rounded w-20 h-8"
            placeholder="Rp. max"
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        {/* <button
          className="bg-red-500 text-white p-1 rounded"
          onClick={handleFilterChange}
          disabled={filtering}
        >
          <h1 className="text-sm">{filtering ? 'Filtering...' : 'Filter'}</h1>
        </button> */}
        <button
          className={`bg-red-500 text-white p-1 rounded ${filtering && 'opacity-50 cursor-not-allowed'}`}
          onClick={handleClearFilter}
          disabled={filtering}
        >
          <h1 className="text-sm">{filtering ? 'Clearing...' : 'Clear'}</h1>
        </button>
      </div>
    </div>
  );
}
