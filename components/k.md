const handleVendorChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedVendor(selectedValue);
    if (selectedValue === "") {
      setSearchQuery("");
      setActivityVendor([]);
    }
    console.log("Nilai yang dipilih:", selectedValue);
  };