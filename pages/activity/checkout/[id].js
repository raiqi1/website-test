import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutPage from '../../../components/Checkout'
import { useRouter } from 'next/router'
import {
  setDestinationTarget,
  setLoading,
  setNumberOfPerson,
  setCheckoutData,
  setUserData,
} from '../../../tool/checkoutSlice'
import {
  fetchUserData,
  fetchActivityData,
  checkoutActivity,
} from '../../../tool/api'

export default function Checkout() {
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }
  const dispatch = useDispatch()
  const { destinationTarget, loading, userData } = useSelector(
    (state) => state.checkout,
  )
  const router = useRouter()
  const [previousPage, setPreviousPage] = useState(null)

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true))
        const token = localStorage.getItem('token')
        const data = await fetchUserData(token, router)
        dispatch(setUserData(data))
      } catch (error) {
        console.error(error)
        setPreviousPage(window.location.href)
        router.push('/login')
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchData()
  }, [dispatch, router])

  useEffect(() => {
    const fetchDataActivity = async () => {
      try {
        const id = window.location.pathname.split('/').pop()
        const data = await fetchActivityData(id)
        dispatch(setDestinationTarget(data))
        dispatch(setNumberOfPerson(data.minPerson || 1))
      } catch (error) {
        console.error(error)
      }
    }

    fetchDataActivity()
  }, [dispatch])

  useEffect(() => {
    // Set nilai default menggunakan setValue setelah fetchUser
    if (userData?.name) {
      setValue('contactFullname', userData.name)
    }
    if (userData?.phoneNumber) {
      setValue('contactNumber', userData.phoneNumber)
    }
    if (userData?.email) {
      setValue('contactEmail', userData.email)
    }
  }, [userData, setValue])

  const submitHandler = async ({
    contactEmail,
    contactFullname,
    contactNumber,
    date,
    numberOfPerson,
  }) => {
    try {
      const token = localStorage.getItem('token')
      const productUUID = destinationTarget.id
      const data = await checkoutActivity(
        token,
        contactEmail,
        contactFullname,
        contactNumber,
        date,
        numberOfPerson,
        productUUID,
      )
      dispatch(setCheckoutData(data))
      if (previousPage) {
        router.push(previousPage)
      } else {
        const id = data.id
        router.push(`/activity/checkout-success/${id}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="ml-20">
      <div className="flex">
        <div className="w-full">
          <h1 className="text-2xl font-bold w-full mt-5">Checkout</h1>
          {userData ? (
            <form
              className="max-w-screen-md mt-7"
              onSubmit={handleSubmit(submitHandler)}
            >
              <div className="mb-4">
                <label htmlFor="contactFullname">Name</label>
                <input
                  type="text"
                  className="w-full"
                  id="contactFullname"
                  {...register('contactFullname', {
                    required: 'Silakan masukkan nama lengkap',
                  })}
                  defaultValue={userData.name}
                />
                {errors.contactFullname && (
                  <div className="text-red-500">
                    {errors.contactFullname.message}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="contactNumber">Telpon Number</label>
                <input
                  type="text"
                  className="w-full"
                  id="contactNumber"
                  {...register('contactNumber', {
                    required: 'Silakan masukkan nama lengkap',
                  })}
                  defaultValue={userData.phoneNumber}
                />
                {errors.contactNumber && (
                  <div className="text-red-500">
                    {errors.contactNumber.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="contactEmail">Email</label>
                <input
                  type="email"
                  {...register('contactEmail', {
                    required: 'Silakan masukkan email',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                      message: 'Silakan masukkan email yang valid',
                    },
                  })}
                  defaultValue={userData.email}
                  className="w-full"
                  id="contactEmail"
                />
                {errors.contactEmail && (
                  <div className="text-red-500">
                    {errors.contactEmail.message}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  {...register('date', {
                    required: 'Silakan pilih tanggal',
                  })}
                  className="w-full"
                  id="date"
                />
                {errors.date && (
                  <div className="text-red-500">{errors.date.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="numberOfPerson">Number Of Person</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-full"
                    id="numberOfPerson"
                    {...register('numberOfPerson', {
                      required: 'Silakan masukkan jumlah orang',
                    })}
                  />
                </div>
              </div>

              <div className="mb-4">
                <button
                  className={`primary-button ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Memuat...' : 'Daftar'}
                </button>
              </div>
            </form>
          ) : (
            <p>Memuat data pengguna...</p>
          )}
        </div>
        <div>
          <CheckoutPage
            destinationTarget={destinationTarget}
            formatRupiah={formatRupiah}
          />
        </div>
      </div>
    </div>
  )
}
