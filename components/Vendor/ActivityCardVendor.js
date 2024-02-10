/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Rating } from "../Rating";

export default function ActivityCardVendor({ activity }) {
  console.log("activity", activity);
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="activity ">
      <div className=" w-fit shadow-lg rounded-md">
        <Link href={`/activity/${activity.id}`}>
          <img
            src={
              activity.thumbnailUrl
                ? activity.thumbnailUrl
                : "../../../images/root.png"
            }
            alt={activity.thumbnailUrl}
            className="rounded shadow object-cover h-64 w-[250px]"
          />
        </Link>
        <div className="flex flex-col  p-2 space-y-1">
          <div className="font-bold ">
            <p>{activity.name}</p>
          </div>
          <div className="flex">
            <div className="mt-[2px]">
              <Rating value={activity.ratingAvg} />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-700 ml-2">
                {activity.ratingAvg}
              </p>
            </div>
          </div>
          <Link href={`/product/${activity.slug}`}>
            <h2 className="text-lg">{activity.title}</h2>
          </Link>
        </div>
        <div className="font-semibold bg-orange-500 rounded-b-md cursor-pointer hover:bg-orange-600">
          <h1 className="text-white text-center p-1">
            {formatRupiah(activity.price)}
          </h1>
        </div>
      </div>
    </div>
  );
}
