// di dalam file CheckoutSuccessPage.js

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../../../components/Layout'
import CheckOutAndPayment from '../../../components/Checkout/CheckOutAndPayment'
import PaymentMethods from '../../../components/Checkout/PaymentMethods'
import Switch from 'react-switch'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import IconPayment from '../../../components/Payment/IconPayment'
import {
  fetchPointDataAPI,
  fetchPaymentMethodsAPI,
  fetchCheckoutDataAPI,
  fetchCheckoutSuccessDataAPI,
  postPaymentAPI,
} from '../../../tool/apipayment'
import {
  setDataCheckout,
  setDataCheckoutMax,
  setDiscountedTotalFee,
  setIsLoading,
  setIsLoadingPayment,
  setOriginalTotalFee,
  setPaymentSuccess,
  setPaymentData,
  setPointData,
  setSelectedChannel,
  setUsePoint,
} from '../../../tool/paymentSlice'

export default function CheckoutSuccessPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const {
    dataCheckout,
    dataCheckoutMax,
    discountedTotalFee,
    isLoading,
    isLoadingPayment,
    originalTotalFee,
    paymentSuccess,
    paymentData,
    pointData,
    selectedChannel,
    usePoint,
  } = useSelector((state) => state.payment)

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedPointData = await fetchPointDataAPI(token)
        const fetchedPaymentData = await fetchPaymentMethodsAPI(token)
        dispatch(setPointData(fetchedPointData))
        dispatch(setPaymentData(fetchedPaymentData))
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push(`/login?redirect=${window.location.pathname}`)
        } else {
          toast.error(error.message)
        }
        console.error('Terjadi kesalahan saat mengambil data:', error.message)
      } finally {
        dispatch(setIsLoading(false))
      }
    }
    fetchData()
  }, [token, dispatch, router])

  useEffect(() => {
    async function fetchCheckout() {
      try {
        const bookingId = dataCheckout?.bookingId
        const data = await fetchCheckoutDataAPI(bookingId, token)
        dispatch(setDataCheckoutMax(data))
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push(`/login?redirect=${window.location.pathname}`)
        } else {
          toast.error(error.message)
        }
      }
    }
    if (dataCheckout.bookingId) {
      fetchCheckout()
    }
  }, [dataCheckout.bookingId, token, dispatch, router])

  useEffect(() => {
    async function fetchCheckoutSuccess() {
      try {
        const id = window.location.pathname.split('/').pop()
        const data = await fetchCheckoutSuccessDataAPI(id, token)
        dispatch(setDataCheckout(data))
        dispatch(setOriginalTotalFee(data.totalFee))
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchCheckoutSuccess()
  }, [token, dispatch])

  const pointUse = dataCheckoutMax?.bookingDetails

  useEffect(() => {
    if (
      dataCheckout.bookingId &&
      pointData?.points &&
      pointUse?.MaxPointUse &&
      originalTotalFee
    ) {
      if (usePoint) {
        const pointsToUse = Math.min(pointUse.MaxPointUse, pointData.points)
        const discountedTotal = originalTotalFee - pointsToUse
        dispatch(setDiscountedTotalFee(discountedTotal))
      } else {
        dispatch(setDiscountedTotalFee(originalTotalFee))
      }
    }
  }, [
    dataCheckout.bookingId,
    usePoint,
    pointData?.points,
    pointUse?.MaxPointUse,
    originalTotalFee,
    dispatch,
  ])

  const handleChannelChange = (channel) => {
    dispatch(setSelectedChannel(channel))
  }

  const handlePayment = () => {
    if (!selectedChannel) {
      toast.error('Pilih metode pembayaran terlebih dahulu!')
      return
    }
    dispatch(setIsLoadingPayment(true))

    const selectedPaymentMethod = paymentData.find((p) =>
      p.channels.some((channel) => channel.code === selectedChannel),
    )
    const paymentMethodId = selectedPaymentMethod?.code || ''

    postPaymentAPI({
      bookingId: dataCheckout.bookingId,
      paymentChannel: selectedChannel,
      paymentMethodId: paymentMethodId,
      usePoint,
      token,
    })
      .then((data) => {
        dispatch(setPaymentSuccess(data))
      })
      .catch((error) => {
        toast.error(error.message)
      })
      .finally(() => {
        dispatch(setIsLoadingPayment(false))
      })
  }

  const handleToggleUsePoint = () => {
    if (pointData?.points > 0 && pointUse?.MaxPointUse > 0) {
      dispatch(setUsePoint((prevUsePoint) => !prevUsePoint))
    }
  }

  useEffect(() => {
    if (pointUse?.MaxPointUse && pointData?.points) {
      if (pointUse.MaxPointUse > pointData.points) {
        dispatch(setUsePoint(false))
      }
    }
  }, [pointUse?.MaxPointUse, pointData?.points, dispatch])

  useEffect(() => {
    if (paymentSuccess?.message === 'success' && paymentSuccess?.data) {
      const { paymentUrl, bookingId } = paymentSuccess.data
      if (paymentUrl) {
        window.location.href = paymentUrl
      } else if (bookingId) {
        router.push(`/booking/${bookingId}`)
      }
    }
  }, [paymentSuccess, router])

  return (
    <Layout>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-900"></div>
            <p className="text-sm mt-2">Loading...</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-1 font-['Poppins'] mb-5">
          <div className="flex w-full gap-2">
            <h1 className="text-xl flex flex-col justify-center font-bold">
              Payment
            </h1>
            <span className=" flex flex-col justify-center ">{'>'}</span>
            <h1 className=" flex flex-col justify-center">
              {dataCheckout.productType === 'activity' ? 'Activity' : ''}
            </h1>
          </div>
          <div>
            <IconPayment />
          </div>
        </div>
      )}
      {!isLoading && (
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
              Pilih Metode Pembayaran
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
                <h1 className="flex flex-col justify-center">Tukar </h1>
                <div className="flex flex-col justify-center">
                  {' '}
                  {pointData?.points} koin
                </div>
              </div>
              <Switch
                checked={usePoint}
                onChange={handleToggleUsePoint}
                disabled={!(pointData?.points > 0 && pointUse?.MaxPointUse > 0)}
                onColor="#3182ce"
                offColor="#CBD5E0"
                className="mt-1"
              />
            </div>
            <div className="text-sm flex gap-2 text-gray-500 ">
              <h1>Maksimum Poin untuk Produk Ini</h1>
              <div className="text-red-400">{pointUse?.MaxPointUse}</div>
              <img src="../../../images/coin.svg" className=" w-4" />
            </div>
            <button
              onClick={handlePayment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              disabled={isLoadingPayment}
            >
              {isLoadingPayment ? 'Memproses...' : 'Bayar'}
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}
