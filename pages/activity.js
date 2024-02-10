import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ActivityCard from "../components/ActivityCard";
import PriceFilter from "../components/Activity/PriceFilter";
import Pagination from "../components/Pagination";

export default function ActivityScreen() {
  const [activity, setActivity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchActivity = async (page) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity?page=${page}&limit=2&search=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}&mostVisited=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "VACABADEV",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data aktivitas");
      }
      const data = await response.json();
      console.log("Data aktivitas:", data);
      setActivity(data.data);
      const totalPages = Math.ceil(data.meta.total / 2);
      setTotalPages(totalPages);
      setLoading(false);
      setNotFound(data.data.length === 0); // Set notFound jika data tidak ditemukan
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity(currentPage);
  }, [currentPage, minPrice, maxPrice, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = () => {
    setLoading(true);
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    // setSearchQuery("");
    setLoading(false);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Layout>
      <div className="">
        <h1 className="text-2xl font-bold">Activity</h1>
        <div className="flex">
          {loading && <p>Sedang memuat...</p>}
          {!loading && (
            <div className="mt-4 mb-3 ">
              <div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Cari aktivitas..."
                  className="border rounded py-1 px-2 mr-2"
                />
                <PriceFilter
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                  handleFilterChange={handleFilterChange}
                  handleClearFilter={handleClearFilter}
                />
              </div>
            </div>
          )}
          <div>
            {!loading && !notFound && (
              <div className="flex gap-3">
                {activity.map((a) => (
                  <div key={a.id} className="">
                    <ActivityCard card={a} />
                  </div>
                ))}
              </div>
            )}
            {notFound && <p className="">Activity not found.</p>}
            {!loading && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                notFound={notFound}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
