import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import ActivityPage from '../../components/Activity/ActivityPage'
import { BaseUrl } from '../../components/BaseUrl'

export default function ActivityDetails() {
  const [activity, setActivity] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchDetails = async (id) => {
    try {
      const res = await fetch(
        `${BaseUrl}/${id}`,
        {
          method: 'GET',
        },
      )
      const data = await res.json()
      setActivity(data)
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil detail aktivitas:', error)
    }
  }

  console.log('activity', activity)

  useEffect(() => {
    const id = window.location.pathname.split('/').pop()
    const fetchData = async () => {
      setLoading(true)
      await Promise.all([fetchDetails(id)])
      setLoading(false)
    }
    fetchData()

  }, [])

  console.log('activity', activity)

  return (
    <Layout>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-900"></div>
            <p className="text-sm mt-2">Loading...</p>
          </div>
        </div>
      ) : (
          <ActivityPage activity={activity} />
      )}
    </Layout>
  )
}
