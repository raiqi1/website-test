/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  fetchVendorData,
  fetchActivityData,
  fetchActivityVendorData,
  fetchPackageData,
  fetchPackageVendorData,
  fetchTypeVendorData,
} from "../utils/api";
import VendorContent from "../components/Vendor/VendorContent";

export const VendorContext = createContext();

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
  const [totalActivityVendor, setTotalActivityVendor] = useState(1);
  const [currentActivityVendor, setCurrentActivityVendor] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [allPackage, setAllPackage] = useState([]);
  const [currentAllPackagePage, setCurrentAllPackagePage] = useState(1);
  const [totalPackagePages, setTotalPackagePages] = useState(1);
  const [packageVendor, setPackageVendor] = useState([]);
  const [currentPackageVendor, setCurrentPackageVendor] = useState(1);
  const [totalPackageVendor, setTotalPackageVendor] = useState(1);
  const [vendorType, setVendorType] = useState([]);

  useEffect(() => {
    fetchVendor();
  }, [currentPage, searchQuery, selectedTypes]);

  useEffect(() => {
    fetchTypeVendor();
  },[])

  useEffect(() => {
    if (selectedVendor === "") {
      fetchActivity(currentPage);
      fetchPackage(currentPage);
    } else {
      fetchActivityVendor(currentPage);
      fetchPackageVendor(currentPage);
    }
  }, [
    selectedVendor,
    currentPage,
    searchQuery,
    selectedTypes,
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    fetchActivityVendor(currentActivityVendor);
  }, [
    selectedVendor,
    currentActivityVendor,
    searchQuery,
    selectedTypes,
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    fetchPackageVendor(currentPackageVendor);
  }, [
    selectedVendor,
    currentPackageVendor,
    searchQuery,
    selectedTypes,
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    fetchActivity(currentAllActivityPage);
  }, [currentAllActivityPage, searchQuery, selectedTypes, minPrice, maxPrice]);

  useEffect(() => {
    fetchPackage(currentAllPackagePage);
  }, [currentAllPackagePage, searchQuery, selectedTypes, minPrice, maxPrice]);

  const fetchVendor = async () => {
    try {
      const dataVendor = await fetchVendorData(selectedTypes, searchQuery);
      setActivity(dataVendor.data);
      setLoading(false);
      setNotFound(dataVendor.data.length === 0);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchTypeVendor = async () => {
    try {
      const data = await fetchTypeVendorData();
      setVendorType(data.data);
      setLoading(false);
      setNotFound(data.data.length === 0);
    } catch (error) {
      setLoading(false);
    }
  };

  console.log("vendorType", vendorType);

  const fetchActivity = async (page) => {
    try {
      const data = await fetchActivityData(
        page,
        searchQuery,
        minPrice,
        maxPrice
      );
      setAllActivityVendor(data.data);
      setTotalActivityPages(Math.ceil(data.meta.total / data.meta.limit));
      setLoading(false);
      setNotFound(data.data.length === 0);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchPackage = async (page) => {
    try {
      const dataPackage = await fetchPackageData(
        page,
        searchQuery,
        minPrice,
        maxPrice
      );
      setAllPackage(dataPackage.data);
      setTotalPackagePages(
        Math.ceil(dataPackage.meta.total / dataPackage.meta.limit)
      );
      setLoading(false);
      setNotFound(dataPackage.data.length === 0);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchActivityVendor = async (page) => {
    try {
      const data = await fetchActivityVendorData(
        selectedVendor,
        page,
        searchQuery,
        minPrice,
        maxPrice
      );
      setActivityVendor(data.data);
      setTotalActivityVendor(Math.ceil(data.meta.total / data.meta.limit));
      setLoading(false);
      setNotFound(data.data.length === 0);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchPackageVendor = async (page) => {
    try {
      const data = await fetchPackageVendorData(
        selectedVendor,
        page,
        searchQuery,
        minPrice,
        maxPrice
      );
      setPackageVendor(data.data);
      setTotalPackageVendor(Math.ceil(data.meta.total / data.meta.limit));
      setLoading(false);
      setNotFound(data.data.length === 0);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedTypes((prev) => {
      if (prev[type]) {
        // eslint-disable-next-line no-unused-vars
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
      setActivityVendor([]);
      setPackageVendor([]);
    }
    console.log("Nilai yang dipilih:", selectedValue);
  };

  const handleClearFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setLoading(false);
    setCurrentAllActivityPage(1);
    setCurrentAllActivityPage(1);
  };

  console.log("allPackage", allPackage);
  console.log("allPackageVendor", packageVendor);

  return (
    <Layout>
      <VendorContext.Provider
        value={{
          activity,
          setActivity,
          activityVendor,
          setActivityVendor,
          allActivityVendor,
          setAllActivityVendor,
          selectedVendor,
          setSelectedVendor,
          currentPage,
          setCurrentPage,
          totalPages,
          setTotalPages,
          searchQuery,
          setSearchQuery,
          loading,
          setLoading,
          notFound,
          setNotFound,
          selectedTypes,
          setSelectedTypes,
          totalActivityPages,
          setTotalActivityPages,
          currentAllActivityPage,
          setCurrentAllActivityPage,
          totalActivityVendor,
          setTotalActivityVendor,
          currentActivityVendor,
          setCurrentActivityVendor,
          handleTypeChange,
          handleVendorChange,
          handleClearFilter,
          minPrice,
          setMinPrice,
          maxPrice,
          setMaxPrice,
          allPackage,
          setAllPackage,
          currentAllPackagePage,
          setCurrentAllPackagePage,
          totalPackagePages,
          setTotalPackagePages,
          packageVendor,
          setPackageVendor,
          currentPackageVendor,
          setCurrentPackageVendor,
          totalPackageVendor,
          setTotalPackageVendor,
          vendorType,
          setVendorType,
        }}
      >
        <VendorContent />
      </VendorContext.Provider>
    </Layout>
  );
}
