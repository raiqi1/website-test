import React, { useState } from 'react'

export default function PaymentMethods({
  p,
  selectedChannel,
  handleChannelChange,
}) {
  // const [selectedChannel, setSelectedChannel] = useState('')

  // const handleChannelChange = (channel) => {
  //   setSelectedChannel(channel)
  //   console.log('Nilai yang dipilih:', channel)
  // }

  return (
    <div>
      <div>
        <div className="flex mb-2 font-bold items-center">
          <h1 className="mr-2">{p.name}</h1>
          <h1 className="mr-2">{p.description}</h1>
          <h1 className="mr-2">{p.code}</h1>
        </div>
        <div>
          {p.channels.map((channel, i) => (
            <div key={i} className="mb-2">
              <input
                type="radio"
                id={channel.code}
                name="paymentChannel"
                value={channel.code}
                checked={selectedChannel === channel.code}
                onChange={() => handleChannelChange(channel.code)}
                className="mr-2"
              />
              <label htmlFor={channel.code} className="mr-2">
                {channel.name} - {channel.description}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
