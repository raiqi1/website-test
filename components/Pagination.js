import React from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function Pagination({ currentPage, totalPages, handlePageChange, notFound }) {
  if (notFound) {
    return null; // Mengembalikan null jika tidak ditemukan aktivitas
  }

  return (
    <div className="flex gap-1 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-8 h-8 rounded-full border hover:bg-gray-200 ${
          currentPage === 1 && "bg-white text-gray-400 hover:bg-white"
        }`}
      >
        <GrFormPrevious className="ml-[6px]" size={18} />
      </button>
      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page + 1)}
          className={`w-8 h-8 rounded-full border hover:bg-gray-100 ${
            currentPage === page + 1 ? "bg-gray-100" : "bg-white"
          }`}
        >
          {page + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 rounded-full border hover:bg-gray-200 ${
          currentPage === totalPages && "bg-white text-gray-400 hover:bg-white"
        }`}
      >
        <GrFormNext className="ml-[7px]" size={18} />
      </button>
    </div>
  );
}
