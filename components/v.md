{/* <div>
          <div className="flex flex-wrap mt-4 gap-7">
            {loading && <p className="text-gray-600">Memuat...</p>}
            {!loading &&
              activityVendor.length === 0 &&
              selectedVendor !== "" && <p>Aktivitas tidak ditemukan</p>}
            {!loading &&
              selectedVendor === "" &&
              allActivityVendor.map((a) => (
                <ActivityCardVendor activity={a} key={a.id} />
              ))}
            {!loading &&
              activityVendor.map((a) => (
                <ActivityCardVendor activity={a} key={a.id} />
              ))}
          </div>
        </div> */}