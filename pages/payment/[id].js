/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PaymentSuccess from '../../components/Payment/PaymentSuccess'

export default function BookingScreen() {
  const router = useRouter()

  //   const [isLoading, setIsLoading] = useState(true)
  const [ActivityData, setActivityData] = useState({})
  const [showData, setShowData] = useState({})
  const [payment, setPayment] = useState([])
  const [paid, setPaid] = useState('')
  const [showSuccess, setShowSuccess] = useState(null)
  const [showPayment, setShowPayment] = useState(false)

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null

  // Fungsi untuk format rupiah
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Fungsi untuk mengambil data booking dari API
  const fetchBooking = async (id) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/payments/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'X-Api-Key': 'VACABADEV',
          },
        },
      )

      if (!response.ok) {
        if (response.status === 401) {
          // Jika status 401, arahkan pengguna ke halaman login dengan menyertakan parameter redirect
          router.push(`/login?redirect=${window.location.pathname}`)
          return
        }
        throw new Error('Gagal mengambil data destinasi')
      }

      const data = await response.json()
      //   setBookingData(data.data.bookingDetails)
      setShowData(data.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  // Fungsi untuk mengambil data aktivitas dari API
  const fetchData = async (id) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': 'VACABADEV',
          },
        },
      )

      const data = await response.json()
      setActivityData(data.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  // Fungsi untuk mengambil data pembayaran dari API
  const fetchPayment = async () => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/payments/booking/${showData.bookingId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'X-Api-Key': 'VACABADEV',
          },
        },
      )

      const data = await response.json()
      setPayment(data.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    if (router.query.id) {
      fetchBooking(router.query.id)
    }
  }, [router.query.id])

  //   useEffect(() => {
  //     if (bookingData.ProductUUID) {
  //       fetchData(bookingData.ProductUUID)
  //     }
  //   }, [bookingData.ProductUUID])

  useEffect(() => {
    if (showData.bookingId) {
      fetchPayment(showData.bookingId)
    }
  }, [showData.bookingId])

  useEffect(() => {
    if (payment.paymentStatus == null) {
      setPaid('Unpaid')
    } else {
      setPaid('Paid')
    }
  }, [payment.paymentStatus])

  //   useEffect(() => {
  //     setIsLoading(false)
  //   }, [bookingData, ActivityData, payment])

  console.log('showData', showData)
  console.log('payment', payment)

  return (
    <div className="font-['Poppins']">
      {/* {isLoading ? ( */}
      {/* <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 mr-3 text-gray-500"
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
          Loading...
        </div> */}
      {/* ) : ( */}
      <PaymentSuccess
        //   bookingData={bookingData}
        ActivityData={ActivityData}
        //   showDate={showDate}
        showData={showData}
        payment={payment}
        paid={paid}
        showSuccess={showSuccess}
        showPayment={showPayment}
        formatRupiah={formatRupiah}
      />
      {/* )} */}
    </div>
  )
}
