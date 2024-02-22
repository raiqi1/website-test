import React from 'react'

const VendorOptions = ({ vendor, selectedVendor, handleVendorChange }) => {
  console.log('vendors', vendor)

  return (
    <div>
      <label key={vendor.id} className="inline-flex items-center">
        <input
          type="checkbox"
          value={vendor.id}
          checked={selectedVendor === vendor.id}
          onChange={handleVendorChange}
          className="form-checkbox h-3 w-3 text-blue-600"
        />
        <span className="ml-2 w-56">{vendor.name}</span>
      </label>
    </div>
  )
}

export default VendorOptions
