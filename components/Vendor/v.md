import React, { useContext, useEffect, useState } from 'react'
import VendorTypes from './VendorTypes'
import VendorOptions from './VendorOption'
import ActivityCardVendor from './ActivityCardVendor'
import PaginationVendor from './PaginationVendor'
import PriceFilter from '../Activity/PriceFilter'
import { VendorContext } from '../../pages/vendor'
import PackageCardVendor from './PackageCardVendor'

function VendorContent() {
  const {
    activity,
    selectedTypes,
    setSelectedTypes,
    handleTypeChange,
    selectedVendor,
    handleVendorChange,
    loading,
    notFound,
    allActivityVendor,
    activityVendor,
    setActivityVendor,
    currentActivityVendor,
    totalActivityVendor,
    currentAllActivityPage,
    totalActivityPages,
    setCurrentAllActivityPage,
    setCurrentActivityVendor,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    handleClearFilter,
    allPackage,
    currentAllPackagePage,
    setCurrentAllPackagePage,
    totalPackagePages,
    packageVendor,
    setPackageVendor,
    currentPackageVendor,
    setCurrentPackageVendor,
    totalPackageVendor,
    setTotalPackageVendor,
    vendorType,
    setVendorType,
    notFoundPackage,
    setNotFoundPackage,
    filtering,
  } = useContext(VendorContext)

  const [activeDetail, setActiveDetail] = useState('products')
  const [showActivityNotFound, setShowActivityNotFound] = useState(false)

  console.log('activityVendor', activityVendor)
  console.log('selectedVendor', selectedVendor)
  console.log('allPackage', allPackage)
  console.log('packageVendor', packageVendor)
  console.log('vendorType', vendorType)

  useEffect(() => {
    if (loading) {
      setCurrentAllActivityPage(1)
      setCurrentAllPackagePage(1)
    }
  }, [loading])

  return (
    <div className="mt-6 ml-6">
      <h1 className="text-2xl font-bold">Semua Vendor</h1>
      <div className="flex">
        <div className="mr-4">
          <VendorTypes
            activity={activity}
            selectedTypes={selectedTypes}
            handleTypeChange={handleTypeChange}
            setSelectedTypes={setSelectedTypes}
            vendorType={vendorType}
          />
          <div className="mt-5">Pilih Vendor:</div>
          <div className="flex flex-col max-h-[100px] overflow-x-hidden overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
            {activity?.data?.map((vendor) => (
              <VendorOptions
                vendor={vendor}
                key={vendor.id}
                selectedVendor={selectedVendor}
                handleVendorChange={handleVendorChange}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#888 #f1f1f1',
                }}
              />
            ))}
          </div>

          <div>
            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              handleClearFilter={handleClearFilter}
              filtering={filtering} 
            />
          </div>
        </div>

        <div className="flex">
          <div className=" w-full">
            <ul className="flex gap-8 w-full mt-4">
              <li className="">
                <button
                  onClick={() => setActiveDetail('products')}
                  className={`transition ${
                    activeDetail === 'products'
                      ? 'border-b-2 border-black text-black'
                      : 'border-b hover:border-b-2 hover:border-black'
                  }`}
                >
                  Products
                </button>
              </li>
              <li className="">
                <button
                  onClick={() => setActiveDetail('packagesection')}
                  className={`transition ${
                    activeDetail === 'packagesection'
                      ? 'border-b-2 border-black text-black'
                      : 'border-b hover:border-b-2 hover:border-black'
                  }`}
                >
                  Packages
                </button>
              </li>
            </ul>
            <div>
              {activeDetail === 'products' && (
                <section className="mt-4 mb-4 flex flex-col ">
                  <div className="flex gap-5">
                    {!loading &&
                      selectedVendor === '' &&
                      allActivityVendor.map((a) => (
                        <ActivityCardVendor activity={a} key={a.id} />
                      ))}
                    {!loading &&
                      activityVendor.map((a) => (
                        <ActivityCardVendor activity={a} key={a.id} />
                      ))}
                    <div>
                      <div>{loading && <p>Memuat...</p>}</div>
                      <div>
                        {!loading &&
                          notFound &&
                          activeDetail === 'products' && (
                            <p>Tidak ada aktivitas yang ditemukan.</p>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="justify-center flex">
                    {activityVendor.length > 0 ? (
                      <PaginationVendor
                        currentPage={currentActivityVendor}
                        totalPages={totalActivityVendor}
                        setCurrentPage={setCurrentActivityVendor}
                      />
                    ) : (
                      ''
                    )}
                    { selectedVendor === '' && (
                      <PaginationVendor
                        currentPage={currentAllActivityPage}
                        totalPages={totalActivityPages}
                        setCurrentPage={setCurrentAllActivityPage}
                      />
                    )}
                  </div>
                </section>
              )}
              {activeDetail === 'packagesection' && (
                <section className="mt-4 mb-4 flex flex-col">
                  <div className="flex gap-5">
                    {!loading &&
                      selectedVendor === '' &&
                      allPackage.map((p, i) => (
                        <PackageCardVendor packageCard={p} key={i} />
                      ))}
                    {!loading &&
                      packageVendor.map((c, i) => (
                        <PackageCardVendor packageCard={c} key={i} />
                      ))}
                  </div>
                  <div>
                    <div>{loading && <p>Memuat...</p>}</div>
                    <div>
                      {!loading && notFoundPackage && (
                        <p>Tidak ada aktivitas yang ditemukan.</p>
                      )}
                    </div>
                  </div>
                  <div className="justify-center flex">
                    { packageVendor.length > 0 ? (
                      <PaginationVendor
                        currentPage={currentPackageVendor}
                        totalPages={totalPackageVendor}
                        setCurrentPage={setCurrentPackageVendor}
                      />
                    ) : (
                      ''
                    )}
                    {selectedVendor === '' && (
                      <PaginationVendor
                        currentPage={currentAllPackagePage}
                        totalPages={totalPackagePages}
                        setCurrentPage={setCurrentAllPackagePage}
                      />
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorContent
