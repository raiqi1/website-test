import { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
export default function Checkout() {
  // const [date, setPaymentName] = useState("");
  const [ConvienceStore, setConvienceStore] = useState([])
  const [CreditCard, setCreditCard] = useState([])
  const [destinationTarget, setDestinationsTarget] = useState([])
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [PhoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  // const [postData, setPostData] = useState({});

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const date = new Date().toJSON().slice(0, 10)

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  // console.log(token);
  // console.log(token.data);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm()

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity/01796537-7572-4691-a78e-7ce8f5bf6e34`,
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
      console.log(destinationTarget)
    } catch (err) {
      console.log(err.message)
    }
  }
  const submitHandler = async ({
    contactEmail,
    contactFullname,
    contactNumber,
    date,
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
            date: new Date(date).toISOString(), // Ubah tanggal menjadi string
            numberOfPerson: 1, // Misalnya, Anda dapat menetapkan jumlah orang secara default
            productType: 'activity',
            productUUID: destinationTarget.id, // Menggunakan nilai id sebagai productUUID
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'X-Api-Key': 'VACABADEV',
          },
        },
      )
      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err.message)
    }
  }

  console.log(Name)
  console.log(Email)
  console.log(PhoneNumber)
  console.log('destinationTarget.id', destinationTarget.id)
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
    <div className="px-4 pt-8">
      <p className="text-xl font-medium">Ringkasan Pesanan</p>
      <p className="text-gray-400">
        Periksa item Anda dan pilih metode pengiriman yang sesuai.
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
            <span className="float-right text-gray-400">x1</span>
            <p className="text-lg font-bold text-black">
              {formatRupiah(destinationTarget.price)}
            </p>
          </div>
        </div>
      </div>
    </div>
      <div>
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="mb-4">
            <label htmlFor="contactFullname">Nama Lengkap</label>
            <input
              type="text"
              className="w-full"
              id="contactFullname"
              {...register('contactFullname', {
                required: 'Silakan masukkan nama lengkap',
              })}
            />
            {errors.contactFullname && (
              <div className="text-red-500">
                {errors.contactFullname.message}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="contactNumber">No.Telp</label>
            <input
              type="text"
              className="w-full"
              id="contactNumber"
              {...register('contactNumber', {
                required: 'Silakan masukkan nama lengkap',
              })}
            />
            {errors.contactNumber && (
              <div className="text-red-500">{errors.contactNumber.message}</div>
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
              className="w-full"
              id="contactEmail"
            ></input>
            {errors.contactEmail && (
              <div className="text-red-500">{errors.contactEmail.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="date">Tanggal</label>
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
            <label htmlFor="numberOfPerson">Jumlah Orang</label>
            <input
              type="number"
              {...register('numberOfPerson', {
                required: 'Silakan masukkan jumlah orang',
                min: {
                  value: 1,
                  message: 'Minimal satu orang',
                },
              })}
              className="w-full"
              id="numberOfPerson"
            />
            {errors.numberOfPerson && (
              <div className="text-red-500">
                {errors.numberOfPerson.message}
              </div>
            )}
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
    </>
  )
}
