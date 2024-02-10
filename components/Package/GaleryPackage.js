/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

export default function GaleryPackage({ image }) {
  const gambar = image.data;
  console.log("gambar ==>>", gambar);
  const [showDialog, setShowDialog] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClickThumbnail = (index) => {
    setCurrentImageIndex(index);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === gambar.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? gambar.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-3 mt-2 ">
        {gambar?.map((url, index) => (
          <img
            key={index}
            src={url}
            alt=""
            className="w-[90px] h-[90px] cursor-pointer rounded-lg"
            onClick={() => handleClickThumbnail(index)}
          />
        ))}
      </div>

      {showDialog && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50 ">
          <div className="max-w-full bg-black bg-opacity-70 relative rounded-lg">
            <button
              className="absolute -top-6 -right-1 text-lg font-bold"
              onClick={handleCloseDialog}
            >
              <RxCross1 className="text-white" />
            </button>
            <div className="relative text-gray-300 z-50">
              <button
                className="absolute top-1/2  text-4xl"
                onClick={handlePrev}
              >
                <MdOutlineNavigateBefore className="" />
              </button>
              <button
                className="absolute top-1/2 -right-0 text-4xl"
                onClick={handleNext}
              >
                <MdOutlineNavigateNext />
              </button>
              <img
                src={gambar[currentImageIndex]}
                alt="Popup"
                className="rounded-lg w-[700px] h-[470px]"
              />
            </div>
            <div className="flex mt-2 gap-3 p-2">
              <div className="flex gap-3">
                {gambar?.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt=""
                    className={`w-[70px] h-[70px] cursor-pointer rounded-md  ${
                      index === currentImageIndex
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                    onClick={() => handleClickThumbnail(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
