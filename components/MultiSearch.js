import { useRouter } from 'next/router'
import { FaSearch } from 'react-icons/fa' // Import ikon pencarian dari react-icons

export const MultiSearch = () => {
  const router = useRouter() // Menggunakan router dari Next.js

  const handleSearch = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const keyword = formData.get('keyword')

    // Navigasi ke halaman destinasi dengan query params yang sesuai
    router.push({
      pathname: '/species',
      query: { Keyword: keyword, PageNumber: '1', PageSize: '10' },
    })
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <div className="relative w-full max-w-xs">
        {' '}
        {/* Membatasi lebar input */}
        <input
          className="input input-bordered w-full pr-12 py-2 rounded-full shadow-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 transition duration-200" // Styling input
          placeholder="Search"
          name="keyword"
          required // Tambahkan required agar input tidak kosong
        />
        <button
          type="submit"
          className="absolute right-[0.2vw] top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition duration-200 shadow-md" // Styling tombol
        >
          <FaSearch size={20} /> {/* Ikon pencarian */}
        </button>
      </div>
    </form>
  )
}
