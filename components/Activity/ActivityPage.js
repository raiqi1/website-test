/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { IoPeople } from 'react-icons/io5'
import { RiCircleFill } from 'react-icons/ri'
import { Rating } from '../Rating'
import { CiShop } from 'react-icons/ci'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ActivityPage({ activity }) {


  const {
    faoCode,
    typeOfFish,
    scientificName,
    englishName,
    indonesianName,
    localName,
    typeOfWater,
    imageUrl,
    statusInIndonesia,
    fishUtilization,
  } = activity ? activity : ''

  return (
    <div className="">
      <div className="flex p-2 pb-3 gap-2 text-gray-300 text-xs">
        <h1>Home</h1>
        <span>{'>'}</span>
        <h2>Activity</h2>
        <span>{'>'}</span>
        <h4 className="text-black">{name}</h4>
      </div>
      <div className=" w-full flex gap-8 mb-4">
        <div className="w-full">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Thumbnail"
              className="w-full h-full max-lg:w-[800px] cursor-pointer"
            />
          )}
        </div>
        <div className="w-full font-['Poppins'] max-md:hidden ">
          <div className="w-full">
            <h1 className=" w-full font-bold text-4xl mb-1">{faoCode}</h1>
            <div className="flex gap-5">
              <h2 className="flex gap-1">
                <span className="flex flex-col justify-center">
                  <Rating />
                </span>
              </h2>
              <div className="flex">
                <div className="flex flex-col justify-center">
                  <IoPeople />
                </div>
              </div>
            </div>
            <div className="flex mt-2 gap-2 ">
              <h1 className='text-center flex flex-col justify-center'>Tipe Ikan :</h1>
              <p className="font-bold text-2xl ">{typeOfFish}</p>
            </div>
            <div className="border-b pb-6">
              <h2 className="font-bold text-xl mt-3">Detail</h2>
              <div className="flex gap-3 mt-2">
                <span className="text-[8px] flex flex-col  justify-center mt-[2px]">
                  <RiCircleFill />
                </span>
                <h1 className="flex justify-center ">
                  Scientific Name: {scientificName}{' '}
                </h1>
              </div>
              <div className="flex gap-3 ">
                <span className="text-[8px] flex flex-col  justify-center mt-[2px]">
                  <RiCircleFill />
                </span>
                <h1 className="flex justify-center ">
                  English Name: {englishName}{' '}
                </h1>
              </div>
              <div className="flex gap-3 ">
                <span className="text-[8px] flex flex-col  justify-center mt-[2px]">
                  <RiCircleFill />
                </span>
                <h1 className="flex justify-center ">
                  Indonesia Name: {indonesianName}
                </h1>
              </div>
            </div>
            <div className="border-b pb-6">
              <h2 className="font-bold text-xl mt-3">Lokal Name :</h2>
              <p className="mt-2">{localName}</p>
            </div>
          </div>
          <div className='flex gap-2 '>
            <h1 className="font-bold text-xl text-center flex flex-col justify-center">Tipe Air : </h1>
            <h1 className="flex flex-col justify-center text-center">{typeOfWater}</h1>
          </div>
          <div>
            <button
              className={`w-full bg-[#FF7A00] text-white p-2 rounded-md mt-4 opacity-50 cursor-not-allowed'`}
            >
              {statusInIndonesia}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
