// VendorScreen.js

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import VendorPage from "../components/Vendor";
import VendorTypes from "../components/Vendor/VendorTypes";

export default function VendorScreen() {
  const [activity, setActivity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState({});
  const [selectedVendor, setSelectedVendor] = useState(null); // State untuk menyimpan vendor yang dipilih

  const fetchVendor = async (page) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity-vendor?page=${page}&limit=7&types=${Object.keys(
          selectedTypes
        ).join(",")}&search=${searchQuery}` + (selectedVendor ? `&vendor=${selectedVendor}` : ""), // Sertakan vendor yang dipilih dalam URL jika ada
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

      const dataVendor = await response.json();
      setActivity(dataVendor.data);
      setTotalPages(Math.ceil(dataVendor.meta.total / dataVendor.meta.limit));
      setLoading(false);
      setNotFound(dataVendor.data.length === 0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendor(currentPage);
  }, [currentPage, searchQuery, selectedTypes, selectedVendor]); // Tambahkan selectedVendor ke dalam dependencies useEffect

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedTypes((prev) => {
      if (prev[type]) {
        const { [type]: omit, ...rest } = prev;
        return rest;
      } else {
        return { ...prev, [type]: true };
      }
    });
  };

  const handleVendorChange = (e) => {
    setSelectedVendor(e.target.value); // Update selectedVendor saat pengguna memilih vendor dari dropdown
  };

  return (
    <Layout>
      <div className="mt-6 ml-6">
        <h1 className="text-2xl font-bold">All Vendor</h1>
        <div className="flex ">
          <div className="mr-4">
            <div className="mt-4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Cari aktivitas..."
                className="border rounded py-1 px-2 mr-2"
              />
            </div>
            <VendorTypes
              activity={activity}
              selectedTypes={selectedTypes}
              handleTypeChange={handleTypeChange}
            />
            <div className="mt-4"> {/* Tambahkan dropdown untuk memilih vendor */}
              <label htmlFor="vendorSelect" className="mr-2">
                Pilih Vendor:
              </label>
              <select
                id="vendorSelect"
                value={selectedVendor}
                onChange={handleVendorChange}
                className="border rounded py-1 px-2"
              >
                <option value="">Semua Vendor</option>
                {/* Render opsi untuk setiap vendor */}
                {activity?.data?.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap mt-4 gap-7">
              {loading ? (
                <p>Sedang memuat...</p>
              ) : notFound ? (
                <p>Activity not found.</p>
              ) : (
                activity?.data.map((a) => (
                  <div key={a.id}>
                    <VendorPage card={a} />
                  </div>
                ))
              )}
            </div>
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
