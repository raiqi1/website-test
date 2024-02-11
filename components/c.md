/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import VendorTypes from "../components/Vendor/VendorTypes";
import VendorOptions from "../components/Vendor/VendorOption";
import ActivityCardVendor from "../components/Vendor/ActivityCardVendor";
import PaginationVendor from "../components/Vendor/PaginationVendor";
import {
  fetchVendorData,
  fetchActivityData,
  fetchActivityVendorData,
} from "../utils/api";
import PriceFilter from "../components/Activity/PriceFilter";
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

  useEffect(() => {
    fetchVendor();
  }, [currentPage, searchQuery, selectedTypes]);

  useEffect(() => {
    if (selectedVendor === "") {
      fetchActivity(currentPage);
    } else {
      fetchActivityVendor(currentPage);
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
  }, [selectedVendor, currentActivityVendor, searchQuery, selectedTypes]);

  useEffect(() => {
    fetchActivity(currentAllActivityPage);
  }, [currentAllActivityPage, searchQuery, selectedTypes, minPrice, maxPrice]);

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

  const fetchActivityVendor = async (page) => {
    try {
      const data = await fetchActivityVendorData(selectedVendor, page);
      setActivityVendor(data.data);
      setTotalActivityVendor(Math.ceil(data.meta.total / data.meta.limit));
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
    }
    console.log("Nilai yang dipilih:", selectedValue);
  };

  const handleClearFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    // setSearchQuery("");
    setLoading(false);
    setCurrentAllActivityPage(1);
  };

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
      }}
    >
      <VendorContent />
    </VendorContext.Provider>
  </Layout>
  );
}
