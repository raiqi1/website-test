import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import VendorTypes from "../components/Vendor/VendorTypes";
import VendorOptions from "../components/Vendor/VendorOption";
import ActivityCardVendor from "../components/Vendor/ActivityCardVendor";

export default function VendorScreen() {
  const [activity, setActivity] = useState([]);
  const [activityVendor, setActivityVendor] = useState([]);
  const [allActivityVendor, setAllActivityVendor] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState({});
  const [totalActivityPages, setTotalActivityPages] = useState(1);
  const [currentAllActivityPage, setCurrentAllActivityPage] = useState(1);

  const fetchVendor = async () => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity-vendor?page=1&limit=10&types=${Object.keys(
          selectedTypes
        ).join(",")}&search=${searchQuery}`,
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
      // setTotalPages(Math.ceil(dataVendor.meta.total / dataVendor.meta.limit));
      setLoading(false);
      setNotFound(dataVendor.data.length === 0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendor(currentPage);
  }, [currentPage, searchQuery, selectedTypes]);

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
    const selectedValue = e.target.value;
    setSelectedVendor(selectedValue);
    if (selectedValue === "") {
      setSearchQuery("");
    }
  };

  const fetchActivity = async (page) => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity?page=${page}&limit=3&search=${searchQuery}&mostVisited=true`,
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
      setAllActivityVendor(data.data);
      setTotalActivityPages(Math.ceil(data.meta.total / data.meta.limit));
      setLoading(false);
      setNotFound(data.data.length === 0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setLoading(false);
    }
  };

  const fetchActivityVendor = async () => {
    try {
      const response = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity-vendor/${selectedVendor}/activities?page=${currentPage}&limit=2&nearest=false`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "VACABADEV",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data aktivitas vendor");
      }
      const data = await response.json();
      setActivityVendor(data.data);
      setLoading(false);
      setNotFound(data.data.length === 0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedVendor === "") {
      fetchActivity(currentPage);
    } else {
      fetchActivityVendor(selectedVendor);
    }
  }, [selectedVendor, currentPage, searchQuery, selectedTypes]);

  useEffect(() => {
    fetchActivity(currentAllActivityPage);
  }, [currentAllActivityPage, searchQuery, selectedTypes]);

  return (
    <Layout>
      <div className="mt-6 ml-6">
        <h1 className="text-2xl font-bold">Semua Vendor</h1>
        <div className="flex">
          <div className="mr-4">
            <VendorTypes
              activity={activity}
              selectedTypes={selectedTypes}
              handleTypeChange={handleTypeChange}
            />
            <div className="mt-4">
              <label htmlFor="vendorSelect" className="mr-2">
                Pilih Vendor:
              </label>
              <select
                id="vendorSelect"
                value={selectedVendor}
                onChange={handleVendorChange}
                className="border rounded py-1 px-2"
              >
                <VendorOptions
                  vendors={activity.data || []}
                  handleSelectChange={handleVendorChange}
                />
              </select>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap mt-4 gap-7">
              {loading ? (
                <p>Sedang memuat...</p>
              ) : notFound ? (
                <p>Tidak ada aktivitas.</p>
              ) : activityVendor.length === 0 ? (
                allActivityVendor.map((a) => (
                  <ActivityCardVendor activity={a} key={a.id} />
                ))
              ) : (
                activityVendor.map((a) => (
                  <ActivityCardVendor activity={a} key={a.id} />
                ))
              )}
            </div>
            <div className="mt-4">
              {totalActivityPages > 1 && (
                <div>
                  {Array.from({ length: totalActivityPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 py-1 mx-1 bg-gray-200 rounded ${
                        currentPage === index + 1 ? 'bg-gray-500 text-white' : ''
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
