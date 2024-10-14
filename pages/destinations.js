import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import DestinationPage from '../components/Destinations'
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  const [desData, setDesData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Fungsi untuk mengambil data destinasi dari API
  const fetchDestinations = async (queryParams) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/destinations${queryParams}`,
      )

      if (!response.ok) {
        throw new Error('Gagal mengambil data destinasi')
      }

      const data = await response.json()
      setDesData(data.data)
      setTotalPages(Math.ceil(data.meta.total / data.meta.limit))
      setCurrentPage(parseInt(router.query.page) || 1)
      setError(null)
    } catch (error) {
      setError(error.message)
      setDesData([])
      setTotalPages(1)
    }
    setLoading(false)
  }

  useEffect(() => {
    const { page = '', limit = '', day = '', name = '' } = router.query
    const queryParams = `?page=${page}&limit=${limit}&day=${day}&name=${name}`
    fetchDestinations(queryParams)
  }, [router.query])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page },
    })
  }

  const renderPagination = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`px-3 py-1 rounded-lg mr-2 focus:outline-none ${
            currentPage === i
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500'
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      )
    }
    return pages
  }

  return (
    <Layout>
      <div className="header mt-6 ml-6 font-['Poppins']">
        <h2 className="text-4xl font-bold dark:text-white">Mau Kemana?</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div className="flex flex-row flex-wrap justify-around w-4/5 mx-auto">
          {desData.map((data, index) => (
            <DestinationPage data={data} key={index} />
          ))}
        </div>
        <div className="pagination mt-4 flex justify-center items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-3 py-1 rounded-lg mr-2 focus:outline-none ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-white text-blue-500'
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {renderPagination()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-3 py-1 rounded-lg ml-2 focus:outline-none ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-white text-blue-500'
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  )
}
