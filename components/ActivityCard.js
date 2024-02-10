/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Rating } from "./Rating";

export default function ActivityCard({ card }) {
  const formatRupiah = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="card">
      <Link href={`/activity/${card.id}`}>
        <img
          src={card.thumbnailUrl}
          alt={card.thumbnailUrl}
          className="rounded shadow object-cover h-64 w-[300px]"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-2 space-y-1">
        <div className="font-bold ">
          <p>{card.name}</p>
        </div>
        <div className="flex">
          <Rating value={card.ratingAvg} />
        </div>
        <Link href={`/product/${card.slug}`}>
          <h2 className="text-lg">{card.title}</h2>
        </Link>
        <p className="font-semibold">{formatRupiah(card.price)}</p>
      </div>
    </div>
  );
}
