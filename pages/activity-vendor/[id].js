/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import VendorDetail from "../../components/Vendor/VendorDetails";
import ActivityCardVendor from "../../components/Vendor/ActivityCardVendor";
import PackageCardVendor from "../../components/Vendor/PackageCardVendor";

export default function VendorDetails() {
  const [packages, setPackage] = useState({});
  const [vendorId, setVendorId] = useState(null);
  const [activityVendor, setActivityVendor] = useState([]);
  const [packagesVendor, setPackagesVendor] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeDetail, setActiveDetail] = useState("overview");

  const fetchDetails = async (id) => {
    try {
      const res = await fetch(
        `https://api.dev.vacaba.id/api/v1/activity-service/activity-vendor/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "VACABADEV",
          },
        }
      );
      const data = await res.json();
      setPackage(data);
      setVendorId(data.data.id); 
    } catch (error) {
      console.error(
        "Terjadi kesalahan saat mengambil detail aktivitas:",
        error
      );
    }
  };

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    fetchDetails(id);
  }, []);

  useEffect(() => {
    if (vendorId) {
      fetchActivityVendor();
      fetchPackageVendor();
    }
  }, [vendorId]);

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
      setActivityVendor(data.data);
      setLoading(false);
      setNotFound(data.data.length === 0);
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
      setPackagesVendor(data.data);
      setLoading(false);
      setNotFound(data.data.length === 0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setLoading(false);
    }
  };

  console.log("packages", packages);
  console.log("activityVendor", activityVendor);
  console.log("packagesVendor", packagesVendor);

  return (
    <Layout>
      <div className=" ml-6 mr-6 ">
        <VendorDetail vendor={packages} />
        <div className="flex">
          <div className=" w-full">
            <ul className="flex gap-8 w-full mt-4">
              <li className="">
                <button
                  onClick={() => setActiveDetail("overview")}
                  className={`transition ${
                    activeDetail === "overview"
                      ? "border-b-2 border-black text-black"
                      : "border-b hover:border-b-2 hover:border-black"
                  }`}
                >
                  Products
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => setActiveDetail("packagesection")}
                  className={`transition ${
                    activeDetail === "packagesection"
                      ? "border-b-2 border-black text-black"
                      : "border-b hover:border-b-2 hover:border-black"
                  }`}
                >
                  Packages
                </button>
              </li>
            </ul>
            <div>
              {activeDetail === "overview" && (
                <section className="mt-4 mb-4 flex gap-5">
                  {activityVendor.map((item, i) => (
                    <div key={i} className="flex">
                      <ActivityCardVendor activity={item} />
                    </div>
                  ))}
                </section>
              )}
              {activeDetail === "overview" && activityVendor.length === 0 && (
                <div className="flex justify-center items-center h-40">
                  <p className="text-gray-400 text-2xl">
                    No activities available
                  </p>
                </div>
              )}
              {activeDetail === "packagesection" && (
                <section className="mt-4 mb-4 flex gap-5">
                  {packagesVendor.map((p, i) => (
                    <div key={i} className="flex">
                      <PackageCardVendor packageCard={p} />
                    </div>
                  ))}
                </section>
              )}
              {activeDetail === "packagesection" &&
                packagesVendor.length === 0 && (
                  <div className="flex justify-center items-center h-40">
                    <p className="text-gray-400 text-2xl">
                      No packages available
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
