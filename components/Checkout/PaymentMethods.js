import React, { useState } from 'react';

export default function PaymentMethods({ payment }) {
  const [selectedChannel, setSelectedChannel] = useState("");

  const handleChannelChange = (channel) => {
    setSelectedChannel(channel);
    console.log('Nilai yang dipilih:', channel);
  };

  return (
    <div>
      <div className="flex mb-2 font-bold items-center">
        <h1 className="mr-2">{payment.name}</h1>
        <h1 className="mr-2">{payment.description}</h1>
        <h1 className="mr-2">{payment.code}</h1>
      </div>
      <div>
        {payment.channels.map((channel, i) => (
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
  );
}
