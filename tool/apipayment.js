import { toast } from 'react-toastify'

// api.js
export const fetchCheckoutDataAPI = async (bookingId, token) => {
  try {
    const response = await fetch(
      `https://api.dev.vacaba.id/api/v1/bookings/${bookingId}`,
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
    return data.data
  } catch (err) {
    console.error(err.message)
    return null
  }
}

export const fetchCheckoutSuccessDataAPI = async (id, token) => {
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
      throw new Error('Gagal mengambil data destinasi')
    }

    const data = await response.json()
    return data.data
  } catch (err) {
    console.error(err.message)
    return null
  }
}

export const postPaymentAPI = async ({
  bookingId,
  paymentChannel,
  paymentMethodId,
  usePoint,
  token,
}) => {
  try {
    const response = await fetch(`https://api.dev.vacaba.id/api/v1/payments`, {
      method: 'POST',
      body: JSON.stringify({
        bookingId,
        paymentChannel,
        paymentMethodId,
        usePoint,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Api-Key': 'VACABADEV',
      },
    })

    if (!response.ok) {
      throw new Error('Gagal melakukan pembayaran')
    }

    const data = await response.json()
    return data
  } catch (err) {
    toast.error(err.message)
    console.error(err.message)
    return null
  }
}

export const fetchPointDataAPI = async (token) => {
  try {
    const response = await fetch('https://api.dev.vacaba.id/api/v1/points', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Api-Key': 'VACABADEV',
      },
    })

    if (!response.ok) {
      throw new Error('Gagal mengambil data poin')
    }

    const data = await response.json()
    return data.data
  } catch (err) {
    console.error(err.message)
    return null
  }
}

export const fetchPaymentMethodsAPI = async (token) => {
  try {
    const response = await fetch(
      'https://api.dev.vacaba.id/api/v1/payments/methods',
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
      throw new Error('Gagal mengambil data metode pembayaran')
    }

    const data = await response.json()
    return data.data
  } catch (err) {
    console.error(err.message)
    return null
  }
}
