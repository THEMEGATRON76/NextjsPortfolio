'use client'
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export default function Themewrapper({ children }) {
  //true = dark false = light
  const [currentTheme, setCurrentTheme] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || true;
    setCurrentTheme(savedTheme);
  }, []);

  function toggleTheme() {
    setIsTransitioning(true);
    setCurrentTheme((prevVal) => {
      localStorage.setItem("theme", !prevVal);
      document.documentElement.setAttribute("data-theme", !prevVal?'dark':'light');
      return !prevVal;
    });

    setTimeout(() => {
        setIsTransitioning(false);
    }, 500);
  }

  const valueobj = {
    currentTheme,
    toggleTheme,
    isTransitioning,
  };

  return <ThemeContext.Provider value={valueobj}>{children}</ThemeContext.Provider>;
}
