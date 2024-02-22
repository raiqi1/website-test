import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import CheckOutAndPayment from '../../../components/Checkout/CheckOutAndPayment'
import { useRouter } from 'next/router'
import { fetchPointData, fetchPaymentMethods } from '../../../utils/api'
import PaymentMethods from '../../../components/Checkout/PaymentMethods'
// import Toggle from 'react-toggle'
// import 'react-toggle/style.css'
import Switch from 'react-switch'
// import 'react-switch/dist/react-switch.css';

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const [dataCheckout, setDataCheckout] = useState({})
  const [paymentData, setPaymentData] = useState({})
  const [selectedChannel, setSelectedChannel] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState({})
  const [usePoint, setUsePoint] = useState(false)
  const [pointData, setPointData] = useState({})
  const [originalTotalFee, setOriginalTotalFee] = useState(0)
  const [discountedTotalFee, setDiscountedTotalFee] = useState(0)
  const [dataCheckoutMax, setDataCheckoutMax] = useState({})

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const fetchCheckoutData = async () => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/bookings/${dataCheckout?.bookingId}`,
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
        throw new Error('Gagal mengambil data checkout')
      }

      const data = await response.json()
      setDataCheckoutMax(data.data)
      return data.data
    } catch (err) {
      console.log(err.message)
      return null
    }
  }

  useEffect(() => {
    fetchCheckoutData()
  }, [dataCheckout.bookingId, token])

  const pointUse = dataCheckoutMax.bookingDetails

  useEffect(() => {
    const id = window.location.pathname.split('/').pop()
    checkoutSuccessData(id)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mengambil data poin dan metode pembayaran
        const fetchedPointData = await fetchPointData(token)
        const fetchedPaymentData = await fetchPaymentMethods(token)

        // Memperbarui state pointData dan paymentData dengan data yang diambil
        setPointData(fetchedPointData)
        setPaymentData(fetchedPaymentData)
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data:', error.message)
      }
    }

    fetchData()
  }, [token])

  useEffect(() => {
    // Memastikan bahwa data checkout telah tersedia sebelum menghitung total biaya yang didiskon
    if (
      dataCheckout.bookingId &&
      pointData?.points &&
      pointUse?.MaxPointUse &&
      originalTotalFee
    ) {
      // Menghitung total biaya yang didiskon berdasarkan penggunaan poin
      if (usePoint) {
        const pointsToUse = Math.min(pointUse.MaxPointUse, pointData.points)
        const discountedTotal = originalTotalFee - pointsToUse

        // Memperbarui state discountedTotalFee dengan total biaya yang didiskon
        setDiscountedTotalFee(discountedTotal)
      } else {
        // Jika tidak menggunakan poin, total biaya yang didiskon tetap sama dengan total biaya asli
        setDiscountedTotalFee(originalTotalFee)
      }
    }
  }, [
    dataCheckout.bookingId,
    usePoint,
    pointData?.points,
    pointUse?.MaxPointUse,
    originalTotalFee,
  ])

  const checkoutSuccessData = async (id) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/checkout/${id}`,
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
          router.push(`/login?redirect=${window.location.pathname}`)
          return
        }
        throw new Error('Gagal mengambil data destinasi')
      }

      const data = await response.json()
      setDataCheckout(data.data)
      setOriginalTotalFee(data.data.totalFee)
    } catch (err) {
      console.log(err.message)
    }
  }

  const postPayment = async ({ paymentChannel, usePoint }) => {
    try {
      const selectedPaymentMethod = paymentData.find((p) =>
        p.channels.some((channel) => channel.code === paymentChannel),
      )
      const paymentMethodId = selectedPaymentMethod?.code || ''

      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/payments`,
        {
          method: 'POST',
          body: JSON.stringify({
            bookingId: dataCheckout.bookingId,
            paymentChannel,
            paymentMethodId,
            usePoint,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'X-Api-Key': 'VACABADEV',
          },
        },
      )

      if (!response.ok) {
        if (response.status === 401) {
          router.push(`/login?redirect=${window.location.pathname}`)
          return
        }
        throw new Error('Gagal melakukan pembayaran')
      }

      const data = await response.json()
      setPaymentSuccess(data.data)
      console.log('Data Pembayaran:', data)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleChannelChange = (channel) => {
    setSelectedChannel(channel)
    console.log('Nilai yang dipilih:', channel)
  }

  const handlePayment = () => {
    if (!selectedChannel) {
      console.log('Pilih metode pembayaran terlebih dahulu!')
      return
    }
    postPayment({ paymentChannel: selectedChannel, usePoint })
  }

  const handleToggleUsePoint = () => {
    if (pointData?.points > 0 && pointUse?.MaxPointUse > 0) {
      setUsePoint((prevUsePoint) => !prevUsePoint)
    }
  }

  useEffect(() => {
    if (pointUse?.MaxPointUse && pointData?.points) {
      if (pointUse.MaxPointUse > pointData.points) {
        setUsePoint(false)
      }
    }
  }, [pointUse?.MaxPointUse, pointData?.points])

  // useEffect(() => {
  //   if (dataCheckout.id) {
  //     router.push(`/booking/${dataCheckout.bookingId}`)
  //   }
  // }, [paymentSuccess])

  console.log('paymentSuccess', paymentSuccess)

  return (
    <Layout>
      <div className="flex gap-1 font-['Poppins']">
        <h1 className="text-xl font-bold">Pembayaran</h1>
        <span className="mt-[2px]">{'>'}</span>
        <h1 className="mt-[2px]">{dataCheckout.productType}</h1>
      </div>
      <div className="flex max-lg:flex-col  ml-12 mr-12 font-['Poppins'] gap-5">
        <div className="w-[680px]">
          <div className="gap-3">
            <CheckOutAndPayment
              pointData={pointData}
              discountedTotalFee={discountedTotalFee}
              dataCheckout={dataCheckout}
            />
          </div>
        </div>
        <div className="border rounded-md border-gray-400 px-5 py-3">
          <h1 className=" text-lg justify-center text-center flex mb-4 font-bold pt-1">
            Choose Payment Methods
          </h1>
          <div className="w-[400px]">
            {Array.isArray(paymentData) &&
              paymentData.map((p, i) => (
                <div key={i} className="flex">
                  <PaymentMethods
                    p={p}
                    selectedChannel={selectedChannel}
                    handleChannelChange={handleChannelChange}
                  />
                </div>
              ))}
          </div>
          <div className="flex mt-3 gap-3">
            <img src="../../../images/coin.svg" className="w-5" />
            <div className="flex gap-1">
              <h1 className="flex flex-col justify-center">Exchange </h1>
              <div className="flex flex-col justify-center">
                {' '}
                {pointData?.points} coins
              </div>
            </div>
            <Switch
              checked={usePoint}
              onChange={handleToggleUsePoint}
              disabled={!(pointData?.points > 0 && pointUse?.MaxPointUse > 0)}
              onColor="#3182ce" // Warna saat toggle aktif
              offColor="#CBD5E0" // Warna saat toggle non-aktif
              className="mt-1"
            />
          </div>
          <div className="text-sm flex gap-2 text-gray-500 ">
            <h1>Maksimum Point for this Product</h1>
            <div className="text-red-400">{pointUse?.MaxPointUse}</div>
            <img src="../../../images/coin.svg" className=" w-4" />
          </div>
          <button
            onClick={handlePayment}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Bayar
          </button>
        </div>
      </div>
    </Layout>
  )
}
