/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { Rating } from '../Rating'

export default function ActivityCardVendor({ activity }) {
  console.log('activity', activity)

  return (
    <div className="activity ">
      <div className=" w-fit shadow-lg rounded-md">
        <Link href={`/species-detail/${activity?.id}`}>
          <img
            src={
              activity?.imageUrl
                ? activity.imageUrl
                : '../../../images/root.jpg'
            }
            alt={activity.imageUrl}
            className="rounded shadow object-cover h-64 w-[250px]"
          />
        </Link>
        <div className="flex flex-col  p-2 space-y-1">
          <div className="font-bold ">
            <p>{activity?.faoCode}</p>
          </div>
          <div className="flex">
            <div className="mt-[2px]">
              <Rating value={activity?.ratingAvg} />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-700 ml-2">
                {activity?.ratingAvg}
              </p>
            </div>
          </div>
          <Link href={`/species-detail/${activity?.id}`}>
            <div className='flex'>
              <h1 className="text-lg font-semibold">Tipe Ikan : </h1>
              <h2 className="text-lg">{activity?.typeOfFish}</h2>
            </div>
          </Link>
        </div>
        <div className="font-semibold bg-orange-500 rounded-b-md cursor-pointer hover:bg-orange-600">
          <h1 className="text-white text-center p-1">
            {activity.indonesianName}
          </h1>
        </div>
      </div>
    </div>
  )
}
