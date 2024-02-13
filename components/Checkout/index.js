import React from 'react'

export default function CheckoutPage({ destinationTarget, formatRupiah }) {
  return (
    <div className="mr-10 pr-12 pt-8 w-fit ">
      <p className="text-xl font-medium">Summary</p>
      <p className="text-gray-400">
        Check Your Item Carefully and Add the Following Details
      </p>
      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        <div className="flex flex-col rounded-lg bg-white sm:flex-row">
          <img
            className="m-2 h-24 w-28 rounded-md border object-cover object-center"
            src={destinationTarget.thumbnailURL}
            alt=""
          />
          <div className="flex w-full flex-col px-4 py-4">
            <span className="font-bold text-black">
              {destinationTarget.name}
            </span>

            <p className="text-lg font-bold text-black">
              {formatRupiah(destinationTarget.price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
