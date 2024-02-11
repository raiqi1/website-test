 <div>
          <div className="flex flex-wrap mt-4 gap-7">
            {allActivityVendor.length > 0 ||
              (activityVendor.length === 0 &&
                allActivityVendor.map((a) => (
                  <ActivityCardVendor activity={a} key={a.id} />
                )))}

            
            {activityVendor.map((a) => (
              <ActivityCardVendor activity={a} key={a.id} />
            ))}
          </div>
        </div>