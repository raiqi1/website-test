/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CheckoutPage from '../../../components/Checkout'
import { useRouter } from 'next/router'

export default function Checkout() {
  const [destinationTarget, setDestinationsTarget] = useState({})
  const [loading, setLoading] = useState(false)
  const [numberOfPerson, setNumberOfPerson] = useState(1)
  const [checkoutData, setCheckoutData] = useState({})
  const [userData, setUserData] = useState({})
  const router = useRouter()

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue, // Dapatkan setValue dari useForm
  } = useForm()

  useEffect(() => {
    // Set nilai default menggunakan setValue setelah fetchUser
    if (userData.name) {
      setValue('contactFullname', userData.name)
    }
    if (userData.phoneNumber) {
      setValue('contactNumber', userData.phoneNumber)
    }
    if (userData.email) {
      setValue('contactEmail', userData.email)
    }
  }, [userData, setValue])

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/users/profile`,
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
        throw new Error('Gagal mengambil data user')
      }

      const data = await response.json()
      setUserData(data.data)
      console.log(data)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  console.log('userData', userData)
  console.log('email', userData.email)
  console.log('name', userData.name)
  console.log('phone', userData.phoneNumber)

  const fetchDataActivity = async (id) => {
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

      if (!response.ok) {
        throw new Error('Gagal mengambil data destinasi')
      }

      const data = await response.json()
      setDestinationsTarget(data.data)

      // Set nilai default numberOfPerson dari data.data
      setNumberOfPerson(data.data.minPerson || 1)
    } catch (err) {
      console.log(err.message)
    }
  }

  console.log('numberOfPerson', numberOfPerson)

  useEffect(() => {
    const id = window.location.pathname.split('/').pop()
    fetchDataActivity(id)
  }, [])

  const submitHandler = async ({
    contactEmail,
    contactFullname,
    contactNumber,
    date,
    numberOfPerson,
  }) => {
    try {
      const response = await fetch(
        'https://api.dev.vacaba.id/api/v1/activity-service/checkout',
        {
          method: 'POST',
          body: JSON.stringify({
            contactEmail,
            contactFullname,
            contactNumber,
            date: new Date(date).toISOString(),
            numberOfPerson: parseInt(numberOfPerson), // Konversi ke angka
            productType: 'activity',
            productUUID: destinationTarget.id,
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
          // Jika status 401, arahkan pengguna ke halaman login dengan menyertakan parameter redirect
          router.push(`/login?redirect=${window.location.pathname}`)
          return
        }
        throw new Error('Gagal mengambil data destinasi')
      }
      const data = await response.json()
      setCheckoutData(data.data)
      console.log(data)
    } catch (err) {
      console.log(err.message)
    }
  }

  console.log('checkoutData', checkoutData)

  useEffect(() => {
    if (checkoutData.id) {
      window.location.href = `/activity/checkout-success/${checkoutData.id}`
    }
  }, [checkoutData])

  return (
    <div className="ml-20">
      <div className="flex">
        <div className="w-full">
          <h1 className="text-2xl font-bold w-full mt-5">Checkout</h1>
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
