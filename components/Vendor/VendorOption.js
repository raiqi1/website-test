import React from "react";

const VendorOptions = ({ vendors }) => {

  return (
    <>
      <option className="dark:text-black" value="">
        All Vendor
      </option>
      {vendors.map((vendor) => (
        <option key={vendor.id} value={vendor.id} className="dark:text-black">
          {vendor.name}
        </option>
      ))}
    </>
  );
};

export default VendorOptions;
