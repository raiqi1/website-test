import React from 'react'

export default function BookingAndDetails({
  ActivityData,
  bookingData,
  showDate,
  showData,
  payment,
  formatRupiah,
  paid,
  setShowQuantity,
  isLoading,
}) {
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <svg
            className="animate-spin h-10 w-10 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm10-1.709A7.965 7.965 0 0120 12h4c0 6.627-5.373 12-12 12v-4z"
            ></path>
          </svg>
          <span className="ml-2">Memuat...</span>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
            <a href="#" className="text-2xl font-bold text-gray-800">
              Checkout
            </a>
            <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
              <div className="relative">
                <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                  <li className="flex items-center space-x-3 text-left sm:space-x-4">
                    <a
                      className="flex h-6 w-6 items-center justify-center rounded-full  bg-emerald-200 text-xs font-semibold text-emerald-700"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </a>
                    <span className="font-semibold text-gray-900">Shop</span>
                  </li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <li className="flex items-center space-x-3 text-left sm:space-x-4">
                    <a
                      className="flex h-6 w-6 items-center justify-center rounded-full  bg-emerald-200 text-xs font-semibold text-emerald-700"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </a>
                    <span className="font-semibold text-gray-900">Payment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex max-lg:flex-col sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-16 ">
            <div className="px-4 pt-8 mr-1">
              <p className="text-xl border-b w-fit border-black ">
                Booking Details
              </p>
              <div className="mt-5 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img
                    className="m-2 h-[200px] w-[200px] rounded-md border object-cover object-centeCr"
                    src={ActivityData.thumbnailURL}
                    alt=""
                  />
                  <div className="flex w-full flex-col px-4 py-4 gap-y-1">
                    <span className="font-bold text-black text-xl">
                      {ActivityData.name}
                    </span>
                    <div className="flex gap-2 text-sm">
                      <div className="flex justify-between w-20">
                        <h1>Product</h1>
                        <p>:</p>
                      </div>
                      <h1 className="text-gray-400">
                        {bookingData.ProductType}
                      </h1>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <div className="flex justify-between w-20">
                        <h1>Qty</h1>
                        <p>:</p>
                      </div>
                      <h1 className="text-gray-400">
                        {bookingData.NumberOfPersons} Persons
                      </h1>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <div className="flex justify-between w-20">
                        <h1>Date</h1>
                        <p>:</p>
                      </div>
                      <h1 className="text-gray-400">{showDate.slice(0, 10)}</h1>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <div className="flex justify-between w-20">
                        <h1>Booking ID</h1>
                        <p>:</p>
                      </div>
                      <h1 className="text-[#16AFBD] underline cursor-pointer">
                        {showData.bookingId}
                      </h1>
                    </div>
                    <div className="flex text-sm w-full justify-between">
                      <div className="flex justify-between w-20 ">
                        <h1>Price</h1>
                        <p className="">:</p>
                      </div>
                      <div className="font-bold text-base">
                        {' '}
                        {formatRupiah(ActivityData.price)}
                      </div>
                    </div>
                    <div className="flex text-sm w-full justify-between">
                      <div className="flex justify-between w-20 ">
                        <h1>Points Use</h1>
                        <p className="">:</p>
                      </div>
                      <div className="font-bold text-base">
                        {' '}
                        {formatRupiah(
                          payment.pointsUsed ? payment.pointsUsed : 0,
                        )}
                      </div>
                    </div>
                    <div className="flex text-sm w-full justify-between">
                      <div className="flex justify-between w-20 ">
                        <h1>Total Price</h1>
                        <p className="">:</p>
                      </div>
                      <div className="font-bold text-base">
                        {' '}
                        {formatRupiah(payment.paidAmount)}
                      </div>
                    </div>
                    <p className="text-lg font-bold"></p>
                  </div>
                </div>
              </div>
              <form className="mt-5 grid gap-6">
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_1"
                    type="radio"
                    name="radio"
                    disabled
                  />
                  <span className="border-red-200 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-black-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 border-red-200 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border b p-4"
                    for="radio_1"
                  >
                    <img
                      className="w-14 object-contain"
                      src="/images/naorrAeygcJzX0SyNI4Y0.png"
                      alt=""
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">
                        {payment.paymentMethodId}
                      </span>
                      <p className="text-slate-500 text-sm leading-6">{paid}</p>
                    </div>
                  </label>
                </div>
              </form>
            </div>

            <div className="mt-10 bg-gray-50 px-3 rounded pt-8 lg:mt-0">
              <p className="text-xl font-medium border-b w-fit border-black">
                Payment Details
              </p>
              <p className="text-gray-400 mt-2 mb-2">
                Thank you for your Order,Please Check your details payment.
              </p>
              <div className="">
                <form>
                  <div className="mb-4">
                    <label htmlFor="contactFullname">Name</label>
                    <input
                      type="text"
                      className="w-full"
                      id="contactFullname"
                      defaultValue={bookingData.ContactFullName}
                      disabled
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="contactNumber">Telpon Number</label>
                    <input
                      type="text"
                      className="w-full"
                      id="contactNumber"
                      defaultValue={bookingData.ContactPhoneNumber}
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="contactEmail">Email</label>
                    <input
                      type="email"
                      defaultValue={bookingData.ContactEmail}
                      className="w-full"
                      id="contactEmail"
                      disabled
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="date">Date</label>
                    <input
                      className="w-full"
                      id="date"
                      value={showDate.slice(0, 10)}
                      disabled
                    />
                  </div>

                  <div className="mb-4 flex flex-col">
                    <label htmlFor="numberOfPerson">Number Of Person</label>
                    <input
                      type="number"
                      className="w-full text-center"
                      value={bookingData.NumberOfPersons}
                      onChange={(e) => setShowQuantity(e.target.value)}
                      disabled
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
