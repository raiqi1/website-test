import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import CheckOutAndPayment from '../../../components/Checkout/CheckOutAndPayment'
import { useRouter } from 'next/router'

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

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const fetchPoint = async () => {
    try {
      const response = await fetch(`https://api.dev.vacaba.id/api/v1/points`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Api-Key': 'VACABADEV',
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          router.push(`/login?redirect=${window.location.pathname}`)
          return
        }
        throw new Error('Gagal mengambil data destinasi')
      }

      const data = await response.json()
      setPointData(data.data)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchPoint()
  }, [])
  console.log('pointData', pointData)

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

  const fetchPayment = async () => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/payments/methods`,
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
      setPaymentData(data.data)
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
      console.log('Metode Pembayaran Dipilih:', selectedPaymentMethod)
      console.log('Kode Metode Pembayaran:', paymentMethodId)

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
        throw new Error('Gagal mengambil data destinasi')
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

  useEffect(() => {
    const id = window.location.pathname.split('/').pop()
    checkoutSuccessData(id)
  }, [])

  useEffect(() => {
    fetchPayment()
  }, [token])

  useEffect(() => {
    if (usePoint && pointData.points && pointData.points > 0) {
      const discountAmount = Math.min(pointData.points, originalTotalFee)
      const discountedTotal = originalTotalFee - discountAmount
      setDiscountedTotalFee(discountedTotal)
    } else {
      setDiscountedTotalFee(originalTotalFee)
    }
  }, [usePoint, pointData, originalTotalFee])

  console.log('dataCheckout', dataCheckout)
  console.log('paymentData', paymentData)

  const handleToggleUsePoint = () => {
    setUsePoint((prevUsePoint) => !prevUsePoint)
  }

    useEffect(() => {
    if (dataCheckout.id) {
      router.push(`/booking/${dataCheckout.bookingId}`)
    }
  }, [paymentSuccess])

  return (
    <Layout>
      <div className="flex gap-1">
        <h1 className="text-xl font-bold  ">Payment</h1>
        <span className="mt-[2px]">{'>'}</span>
        <h1 className="mt-[2px]">{dataCheckout.productType}</h1>
      </div>
      <div>
        <div className="gap-3">
          <div>{pointData.points}</div>
          <div>{discountedTotalFee}</div>
          <CheckOutAndPayment
            pointData={pointData}
            discountedTotalFee={discountedTotalFee}
            dataCheckout={dataCheckout}
          />
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          id="usePointToggle"
          checked={usePoint}
          onChange={handleToggleUsePoint}
          className="mr-2"
        />
        <label htmlFor="usePointToggle" className="mr-2">
          Gunakan Poin
        </label>
      </div>

      <div className="">
        {Array.isArray(paymentData) &&
          paymentData.map((p, i) => (
            <div key={i} className="flex">
              <div>
                <div className="flex mb-2 font-bold items-center">
                  <h1 className="mr-2">{p.name}</h1>
                  <h1 className="mr-2">{p.description}</h1>
                  <h1 className="mr-2">{p.code}</h1>
                </div>
                <div>
                  {p.channels.map((channel, i) => (
                    <div key={i} className="mb-2">
                      <input
                        type="radio"
                        id={channel.code}
                        name="paymentChannel"
                        value={channel.code}
                        checked={selectedChannel === channel.code}
                        onChange={() => handleChannelChange(channel.code)}
                        className="mr-2"
                      />
                      <label htmlFor={channel.code} className="mr-2">
                        {channel.name} - {channel.description}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={handlePayment}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Bayar
      </button>
    </Layout>
  )
}
