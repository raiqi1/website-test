import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import DestinationPage from '../components/Destinations'
import { useRouter } from 'next/router'
import { BaseUrl } from '../components/BaseUrl'

export default function Page() {
  const router = useRouter()
  const [speciesData, setSpeciesData] = useState([])
  const [loading, setLoading] = useState(false) // State untuk loading
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [keyword, setKeyword] = useState('') // State untuk menyimpan kata kunci pencarian

  const fetchDestinations = async (queryParams) => {
    setLoading(true) // Set loading ke true saat mulai fetch data
    try {
      const response = await fetch(`${BaseUrl}/${queryParams}`)

      if (!response.ok) {
        throw new Error('Gagal mengambil data destinasi')
      }

      const data = await response.json()
      console.log('data', data)
      setSpeciesData(data.data)
      setTotalPages(data.totalPages)
      setCurrentPage(parseInt(router.query.PageNumber) || 1)
      setError(null)
    } catch (error) {
      setError(error.message)
      setSpeciesData([])
      setTotalPages(1)
    }
    setLoading(false) // Set loading ke false setelah fetch selesai
  }

  console.log('speciesData', speciesData)

  useEffect(() => {
    const { Keyword = '', PageNumber = '1', PageSize = '10' } = router.query
    const queryParams = `?PageNumber=${PageNumber}&PageSize=${PageSize}${
      Keyword ? `&Keyword=${Keyword}` : ''
    }`
    fetchDestinations(queryParams)
  }, [router.query])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    router.push({
      pathname: router.pathname,
      query: { ...router.query, PageNumber: page },
    })
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setLoading(true) // Set loading ke true saat pencarian dimulai

    // Jika keyword kosong, hapus query Keyword dari URL
    if (keyword.trim() === '') {
      router.push({
        pathname: router.pathname,
        query: { PageNumber: '1', PageSize: '10' }, // Hanya menyimpan PageNumber dan PageSize
      })
      setKeyword('') // Pastikan keyword dikosongkan
    } else {
      router.push({
        pathname: router.pathname,
        query: { Keyword: keyword, PageNumber: '1', PageSize: '10' },
      })
    }
  }

  const handleClearSearch = () => {
    setKeyword('') // Kosongkan input keyword
    router.push({
      pathname: router.pathname,
      query: { PageNumber: '1', PageSize: '10' }, // Hapus query keyword dari URL
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
        <h2 className="text-2xl font-bold dark:text-white mb-2">Cari Species</h2>

        {/* Form Pencarian */}
        <form onSubmit={handleSearchSubmit} className="mb-4 flex items-center justify-center">
          <input
            type="text"
            className="border p-2 mr-2 rounded w-[20vw]"
            placeholder="Masukkan keyword species"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-2 rounded"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleClearSearch}
            className="bg-red-500 text-white px-2 py-2 rounded ml-2"
          >
            Clear
          </button>
        </form>

        {/* Loading indikator */}
        {loading && <p>Loading data species...</p>}

        {/* Tampilkan error jika ada */}
        {error && <p>{error}</p>}

        {/* Tampilkan pesan jika tidak ada data */}
        {!loading && speciesData.length === 0 && (
          <p>Species tidak ditemukan.</p>
        )}

        {/* Tampilkan data species jika tidak dalam keadaan loading */}
        {!loading && speciesData.length > 0 && (
          <div className="flex flex-row flex-wrap justify-around  mx-auto">
            {speciesData.map((data, index) => (
              <DestinationPage data={data} key={index} />
            ))}
          </div>
        )}

        {/* Pagination */}
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
