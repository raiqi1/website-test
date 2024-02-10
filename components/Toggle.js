// components/Layout.js
import React from 'react';
import Theme from './Theme'; 

const Toggle = ({ children }) => {
  return (
    <div className="dark:bg-gray-900 bg-white text-black dark:text-white">
      <Theme />
      <div className="">
        {children}
      </div>
    </div>
  );
};

export default Toggle;
