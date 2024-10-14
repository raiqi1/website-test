/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function CheckOutAndPayment({
  dataCheckout,
  pointData,
  discountedTotalFee,
}) {
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  console.log('dataCheckout', dataCheckout)

  return (
    <div className="flex mt-2 border px-3 py-5 rounded">
      <div className="flex gap-2 w-full  px-3 py-5 rounded">
        <img
          src={dataCheckout.productThumbnail}
          alt=""
          className="w-60 h-64 mr-2 shadow-md rounded-lg"
        />
        <div className="w-full">
          <h1 className="text-lg font-bold">{dataCheckout.productName}</h1>
          <div className="flex gap-5 text-sm"></div>

          <div className=" space-y-1">
            <div className="pb-1 border-b">
              <h1>Basic Information</h1>
              <h2 className="text-sm text-gray-500">Include Tax</h2>
            </div>
            <div className="flex text-sm w-full  gap-3 pb-1 border-b">
              <div className="flex justify-between w-20 ">
                <h1>Product </h1>
                <p className="">:</p>
              </div>
              <h1>{dataCheckout.productType}</h1>
            </div>
            <div className="flex text-sm w-full  gap-3 pb-1 border-b">
              <div className="flex justify-between w-20 ">
                <h1>Person </h1>
                <p className="">:</p>
              </div>
              <h1>{dataCheckout.numberOfPerson} Person</h1>
            </div>
            <div className="flex text-sm w-full  gap-3 pb-1 border-b">
              <div className="flex justify-between w-20 ">
                <h1>Date </h1>
                <p className="">:</p>
              </div>
              <h1>{dataCheckout.date}</h1>
            </div>
            <div className="flex text-sm w-full justify-between pb-1 border-b">
              <div className="flex justify-between w-20 ">
                <h1>Price</h1>
                <p className="">:</p>
              </div>
              <div className="font-bold text-base">
                {' '}
                {formatRupiah(dataCheckout.productPrice)}
              </div>
            </div>

            <div className="flex text-sm w-full justify-between pb-1 border-b">
              <div className="flex justify-between w-20 ">
                <h1>Your Point</h1>
                <p className="">:</p>
              </div>
              <div className="font-bold text-base">
                {' '}
                {formatRupiah(pointData?.points)}
              </div>
            </div>
            <div className="flex text-sm w-full justify-between pb-1 border-b">
              <div className="flex justify-between w-20 ">
                <h1>Total </h1>
                <p className="">:</p>
              </div>
              <div className="font-bold text-base">
                {' '}
                {formatRupiah(discountedTotalFee)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
