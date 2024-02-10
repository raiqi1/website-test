/* eslint-disable @next/next/no-img-element */
import React from "react";
import { IoPeople } from "react-icons/io5";
import { RiCircleFill } from "react-icons/ri";
import { Rating } from "../Rating";
// import Galery from "./Galery";

export default function ResponsiveAct({ activity }) {
  const { data } = activity;
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const {
    name,
    highlight,
    ratingAvg,
    numberOfVisits,
    price,
    reviewCount,
    openTime,
    duration,
    minPerson,
    guaranteed,
  } = data ? data : "";

  const jam = Math.floor(duration / 60);
  const guarantee1 = guaranteed ? guaranteed.Guarantee1 : "";
  const guarantee2 = guaranteed ? guaranteed.Guarantee2 : "";
  const refundable = guaranteed ? guaranteed.Refundable : "";
  const safe = guaranteed ? guaranteed.Safe : "";

  return (
    <div className="">
      <div className=" w-full flex gap-8 mb-4">
        <div className="w-full font-['Poppins']">
          <div className="w-full">
            <h1 className=" w-full font-bold text-4xl mb-1">{name}</h1>
            <div className="flex gap-5">
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
              <p className="font-bold text-2xl mt-1">{formatRupiah(price)}</p>
            </div>
            <div className="border-b pb-6">
              <h2 className="font-bold text-xl mt-3">Activity Detail</h2>
              <div className="flex gap-3 mt-2">
                <span className="text-[8px] flex flex-col  justify-center mt-[2px]">
                  <RiCircleFill />
                </span>
                <h1 className="flex justify-center ">Duration: {jam} Hours </h1>
              </div>
              <div className="flex gap-3 ">
                <span className="text-[8px] flex flex-col  justify-center mt-[2px]">
                  <RiCircleFill />
                </span>
                <h1 className="flex justify-center ">Open Time: {openTime} </h1>
              </div>
              <div className="flex gap-3 ">
                <span className="text-[8px] flex flex-col  justify-center mt-[2px]">
                  <RiCircleFill />
                </span>
                <h1 className="flex justify-center ">
                  Minimum Person: {minPerson} person
                </h1>
              </div>
            </div>
            <div className="border-b pb-6">
              <h2 className="font-bold text-xl mt-3">Highlight We Offer</h2>
              <p className="mt-2">{highlight}</p>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl mt-3">We Guaranteed</h1>
            {guarantee1 ? (
              <div className="flex gap-2 mt-1">
                <span className=" ">
                  <img
                    src="../../../images/easy.png"
                    className="w-[22px]"
                    alt=""
                  />
                </span>
                <h1 className="text-center font-semibold">Easy Refund</h1>
              </div>
            ) : null}
            <h1 className="flex justify-center">{guarantee1}</h1>
            {guarantee2 ? (
              <div className="flex gap-2 mt-1">
                <span className=" ">
                  <img
                    src="../../../images/kalender.png"
                    className="w-[21px]"
                    alt=""
                  />
                </span>
                <h1 className="text-center font-semibold">Reschedule</h1>
              </div>
            ) : null}
            <h1 className="flex justify-center">{guarantee2}</h1>
            {refundable ? (
              <div className="flex gap-2 mt-1">
                <span className=" ">
                  <img
                    src="../../../images/easy.png"
                    className="w-[22px]"
                    alt=""
                  />
                </span>
                <h1 className="text-center font-semibold">Easy Refund</h1>
              </div>
            ) : null}
            <h1 className="flex justify-center">{refundable}</h1>
            {safe ? (
              <div className="flex gap-2 mt-1">
                <span className=" ">
                  <img
                    src="../../../images/kalender.png"
                    className="w-[21px]"
                    alt=""
                  />
                </span>
                <h1 className="text-center font-semibold">Reschedule</h1>
              </div>
            ) : null}
            <h1 className="flex justify-center">{safe}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
