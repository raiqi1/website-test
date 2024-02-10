import React, { useEffect, useState } from "react";

export default function VendorActivity({ vendorId }) {
  const [activity, setActivity] = useState(() => {
    const savedData = localStorage.getItem("activity");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchActivityVendor = async () => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity-vendor/${vendorId}/activities?page=${currentPage}&limit=2&search=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}&nearest=false`,
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

  const fetchPackageVendor = async () => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity-vendor/${vendorId}/packages?page=${currentPage}&limit=2&search=${searchQuery}&minPrice=${minPrice}&maxPrice=${maxPrice}&nearest=false`,
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
    fetchActivityVendor();
  }, [currentPage, minPrice, maxPrice, searchQuery]);

  console.log("activity", activity);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : notFound ? (
        <p>Data tidak ditemukan.</p>
      ) : (
        <ul>
          {activity.map((item) => (
            <li key={item.id}>{/* Tampilkan data aktivitas */}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
