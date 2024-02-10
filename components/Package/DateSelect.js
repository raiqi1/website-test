/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

export default function DateSelect({ weeklySchedule }) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false);

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setIsDateSelected(true);
    setPopupOpen(false);
  };

  const handlePopupClose = () => {
    setIsDateSelected(false);
    setPopupOpen(false);
  };

  const handleClearDate = () => {
    setSelectedDate("");
    setIsDateSelected(false);
  };

  return (
    <div className="relative">
      <div className="flex gap-1 mt-5">
        <div className="bg-[rgba(22,175,189,1)] flex w-[150px] rounded-xl text-white text-sm">
          <img src="../../../calender.svg" alt="" className=" ml-3" />
          <input
            type="text"
            id="date"
            value={selectedDate}
            readOnly
            onClick={() => setPopupOpen(true)}
            placeholder="Select date"
            className="relative w-[105px] bg-[rgba(22,175,189,1)] placeholder:text-white placeholder:text-sm border-none text-white focus:outline-none focus:ring-0 focus:border-none cursor-pointer"
          />
        </div>
        {isDateSelected && (
          <div className="flex mt-1">
            <button
              onClick={handleClearDate}
              className=" h-8 w-16 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md text-white">
            <h3 className="text-lg font-bold mb-4">Select date </h3>
            {Object.entries(weeklySchedule).map(([day, schedule]) => (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className="block w-full text-left py-2 px-4 mb-2 rounded border border-gray-300 hover:bg-gray-500"
              >
                {day} ({schedule.available ? "Open" : "Close"}) -{" "}
                {schedule.timeOpen} - {schedule.timeClose}
              </button>
            ))}
            <button
              onClick={handlePopupClose}
              className="block w-full py-2 px-4 mt-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {!isDateSelected && selectedDate && (
        <p className="mt-2">Date is required</p>
      )}
    </div>
  );
}
