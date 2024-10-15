/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Product from '../models/Product'
import db from '../utils/db'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ActivityCardVendor from '../components/Vendor/ActivityCardVendor'

export default function Home() {
  const [species, setSpecies] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://test.api.sahabatlautlestari.com/species?PageNumber=${pageNumber}&PageSize=${pageSize}`
        )
        setSpecies(data.data)
        setTotalPages(data.totalPages)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pageNumber, pageSize])

  console.log('species', species)

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  const handlePageClick = (page) => {
    setPageNumber(page)
  }

  return (
    <Layout title="Home Page">
      <Carousel showThumbs={false} autoPlay>
          <div >
              <img src="https://sahabatlautlestari.com/wp-content/uploads/2022/11/11-1.png" alt='' />
          </div>
      </Carousel>
      <h2 className="h2 my-4">Latest Species</h2>
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {species?.map((p) => (
              <ActivityCardVendor activity={p} key={p._id} />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination flex justify-center items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={pageNumber === 1}
              className={`px-4 py-2 mx-1 rounded ${
                pageNumber === 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white'
              }`}
            >
              Previous
            </button>
            
            {/* Menampilkan angka halaman */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                className={`px-3 py-1 mx-1 rounded ${
                  pageNumber === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={pageNumber === totalPages}
              className={`px-4 py-2 mx-1 rounded ${
                pageNumber === totalPages
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white'
              }`}
            >
              Next
            </button>
          </div>
        </>
    </Layout>
  )
}

// export async function getServerSideProps() {
//   await db.connect()
//   const featuredProducts = await Product.find({ isFeatured: true }).lean()
//   return {
//     props: {
//       featuredProducts: featuredProducts.map(db.convertDocToObj),
//     },
//   }
// }
