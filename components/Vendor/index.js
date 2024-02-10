/* eslint-disable @next/next/no-img-element */
import React from "react";
import { BsClock } from "react-icons/bs";
import { HiOutlineMapPin } from "react-icons/hi2";
import Link from "next/link";

export default function VendorPage({ card }) {
  console.log("card", card);
  return (
    <div>
      <div class="relative flex pb-3 w-full max-w-[18rem] h-[23rem] flex-col rounded-xl bg-white shadow-lg">
        <div class="relative text-white shadow-lg rounded-xl bg-blue-gray-500 ">
          <div className="cursor-pointer">
            <Link href={`/activity-vendor/${card.id}`}></Link>
            <img
              src={card.thumbnailUrl}
              alt="ui/ux review check"
              className="w-[400px] h-[220px] rounded-xl"
            />
          </div>
          <Link href={`/activity-vendor/${card.id}`}>
            <div class="absolute inset-0 w-full h-full  bg-gradient-to-tr from-transparent via-transparent to-black/60 outline-none rounded-xl cursor-pointer"></div>
          </Link>
          <button
            class="!absolute  top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
              </svg>
            </span>
          </button>
        </div>
        <div className="pr-3 pl-3">
          <div class="pt-3">
            <div class="flex items-center justify-between">
              <Link href={`/activity-vendor/${card.id}`}>
                <h5 class="text-black block font-bold text-xl antialiased leading-snug tracking-normal text-blue-gray-900">
                  {card.name}
                </h5>
              </Link>
            </div>
          </div>
          <div className="flex text-[rgba(121,121,121,1)] mb-1 mt-1">
            <div className="flex">
              {card.isOpen ? (
                <div className="bg-blue-100 rounded-md w-14 text-blue-500">
                  <h1 className="flex justify-center font-semibold">Open</h1>
                </div>
              ) : (
                <div className="bg-red-100 rounded-md w-14 text-red-500">
                  <h1 className="flex justify-center">Close</h1>
                </div>
              )}
            </div>
          </div>
          <div className="flex pt-1  gap-2 justify-between ">
            <div className="flex gap-2 text-[rgba(121,121,121,1)] ">
              <div className="text-center flex flex-col justify-center">
                <HiOutlineMapPin size={20} />
              </div>
              <h1 className="">{card.address.slice(0, 25)}...</h1>
            </div>
          </div>
          <div className="flex gap-2 mt-1 ">
            <h1 className="text-sm font-bold flex flex-col justify-center">
              {!card.openTime ? "" : <BsClock className="ml-1 mr-1" />}
            </h1>
            <div className="text-sm flex flex-col justify-center">
              {card.openTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
