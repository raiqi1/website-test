import React from 'react'

export default function VendorTypes({
  activity,
  selectedTypes,
  handleTypeChange,
  setSelectedTypes,
  vendorType,
}) {

  console.log('activity', activity)

  console.log('vendorType', vendorType)

  const typeVendor = vendorType?.data?.flatMap((f) => f.types)
  console.log('typeVendor', typeVendor)
  const uniqueType = [...new Set(typeVendor)]
  console.log('uniqueType', uniqueType)

  return (
    <div className="mt-4 flex flex-col">
      <div className="flex flex-col gap-2">
        <span>Choose The Activity</span>
        {uniqueType.map((type) => (
          <label key={type} className="inline-flex items-center">
            <input
              type="checkbox"
              value={type}
              checked={selectedTypes[type] || false}
              onChange={handleTypeChange}
              className="form-checkbox h-3 w-3 text-blue-600"
            />
            <span className="ml-2">{type}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
