// API.js
export const fetchUserData = async (token, router) => {
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
    return data.data
  } catch (err) {
    console.log(err.message)
    throw err
  }
}

export const fetchActivityData = async (id) => {
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
    return data.data
  } catch (err) {
    console.log(err.message)
    throw err
  }
}

export const checkoutActivity = async (
  token,
  contactEmail,
  contactFullname,
  contactNumber,
  date,
  numberOfPerson,
  productUUID,
) => {
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
          numberOfPerson: parseInt(numberOfPerson),
          productType: 'activity',
          productUUID,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-Api-Key': 'VACABADEV',
        },
      },
    )
    const data = await response.json()
    return data.data
  } catch (err) {
    console.log(err.message)
    throw err
  }
}
