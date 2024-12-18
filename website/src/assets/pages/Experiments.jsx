import React, { useState } from "react";
import Header from "../page_components/ExperimentsPageComponents/Header";
import ThemeToggle from "../page_components/ExperimentsPageComponents/ThemeToggle";
import MainGrid from "../page_components/ExperimentsPageComponents/MainGrid";
import Footer from "../page_components/ExperimentsPageComponents/Footer";

const ExperimentsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} min-h-screen`}>
      <Header />
      <div className="flex justify-between items-center p-6">
        <h2 className="text-2xl font-bold">EXPERIMENTS</h2>
        <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <MainGrid />
      <Footer />
    </div>
  );
};

export default ExperimentsPage;
