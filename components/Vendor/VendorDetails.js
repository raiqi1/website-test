/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IoPeople } from "react-icons/io5";
import { RiCircleFill } from "react-icons/ri";
import { Rating } from "../Rating";
import { BsClock } from "react-icons/bs";
import { LuMapPin } from "react-icons/lu";
// import VendorActivivty from "./VendorActivivty";

export default function VendorDetail({ vendor }) {
  const { data } = vendor ? vendor : "";

  const {
    name,
    thumbnailUrl,
    aboutUs,
    ratingAvg,
    numberOfVisits,
    reviewCount,
    openTime,
    address,
    facilities,
  } = data ? data : "";

  return (
    <div className="">
      <div className="flex p-2 pb-3 gap-2 text-gray-300 text-xs">
        <h1>Home</h1>
        <span>{">"}</span>
        <h2>Package</h2>
        <span>{">"}</span>
        <h4 className="text-black">{name}</h4>
      </div>
      <div className=" w-full flex">
        <div className="w-full flex flex-col mr-7">
          {thumbnailUrl && (
            <div>
              <img
                src={thumbnailUrl}
                alt="Thumbnail"
                className="w-[700px] h-[450px] cursor-pointer rounded-mds"
              />
            </div>
          )}
        </div>
        <div className="w-full max-[1009px]:w-[] font-['Poppins'] max-md:hidden ">
          <div className="">
            <h1 className=" w-full font-bold lg:text-4xl mb-1 md:text-2xl">
              {name}
            </h1>
            <div className="flex gap-5 border-b pb-6">
              <h2 className="flex gap-1">
                <span className="flex flex-col justify-center">
                  <Rating value={ratingAvg} />
                </span>
                <span className="flex flex-col justify-center text-sm">
                  {ratingAvg}
                </span>
                <span className="flex flex-col justify-center text-sm">
                  ({reviewCount} reviews)
                </span>
              </h2>
              <div className="flex">
                <div className="flex flex-col justify-center">
                  <IoPeople />
                </div>
                <div className="flex flex-col justify-center">
                  {numberOfVisits}
                </div>
              </div>
            </div>
            <div className="border-b pb-6">
              <div>
                <h2 className="font-bold text-xl mt-5">About Us</h2>
              </div>
              <span>{aboutUs}</span>
            </div>
            <div className="border-b pb-6">
              <h2 className="font-bold text-xl mt-3">Information</h2>

              <div className="flex justify-between mt-2 ">
                <div
                  className="flex gap-2
                "
                >
                  <span className="mt-[2px]">
                    <LuMapPin className="text-lg text-blue-700" />
                  </span>
                  <h1 className="flex justify-center">{address}</h1>
                </div>
                <div className="text-sm text-blue-600 w-[100px]">Open Map</div>
              </div>
              <div className="flex">
                <div className="flex gap-3 mt-2 mb-1 ">
                  <span className="text-[8px] flex flex-col  justify-center mt-[2px]">
                    <BsClock className="text-blue-700 text-base" />
                  </span>
                  <h1 className="flex justify-center ">
                    Open Hour: {openTime}{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="">
              <h1 className="text-xl font-bold mt-3">Facilities</h1>
              <div>
                {facilities?.map((facility, index) => (
                  <div key={index} className="flex gap-3 mt-2">
                    <span className="text-[8px] flex flex-col  justify-center mt-[2px]">
                      <RiCircleFill className="text-blue-700" />
                    </span>
                    <h1 className="flex justify-center ">{facility}</h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <VendorActivivty vendorId={id} /> */}
      </div>
    </div>
  );
}
