/* eslint-disable @next/next/no-img-element */
import React from "react";
import { BsClock } from "react-icons/bs";

export default function ActivityList({ list }) {
  return (
    <div className="relative">
      <img src={list.thumbnailUrl} alt="" className="w-[200px] h-[160px] rounded-lg" />
      <div className="absolute bottom-0 left-2 bg-opacity-50 text-white p-2 flex items-center">
        <BsClock className="mr-1" />
        <span>{list.duration} Min</span>
      </div>
      <div className="absolute bottom-6 left-2 text-white p-2">
        <div>{list.name}</div>
      </div>
    </div>
  );
}
