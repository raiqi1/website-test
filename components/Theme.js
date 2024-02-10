import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

export default function Theme() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme");
      setDarkMode(theme === "dark");
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newDarkMode ? "dark" : "light");
      if (newDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  return (
    <div
      className={`relative w-12 h-6 flex items-center ${
        darkMode ? "dark:bg-dark" : "bg-teal-500"
      } cursor-pointer rounded-full p-1 transition-all duration-300 ease-in-out`}
      onClick={toggleDarkMode}
    >
      <FaMoon className="text-white" size={14} />
      <div
        className={`absolute bg-white ${
          darkMode ? "dark:bg-medium" : "bg-white"
        } w-5 h-5 rounded-full shadow-md transform transition-transform duration-300`}
        style={darkMode ? { left: "1px" } : { right: "1px" }}
      ></div>
      <BsSunFill className="ml-auto text-yellow-400" size={14} />
    </div>
  );
}
