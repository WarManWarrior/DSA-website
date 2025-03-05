import React, { useState } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, toggleSidebar, sections }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${open ? "w-72" : "w-20"} bg-gray-800 h-screen p-5 pt-8 fixed top-0 left-0 transition-all duration-300`}
    >
      {/* Sidebar Toggle Button */}
      <motion.button
        onClick={toggleSidebar}
        className="absolute -right-6 top-9 bg-blue-500 text-white p-1 rounded-full shadow-md transition-all"
        animate={{ rotate: open ? 0 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {open ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </motion.button>

      {/* Logo */}
      <div className="flex items-center gap-x-4">
        <motion.img
          src="/img/logo.png"
          className="w-10 h-10 cursor-pointer"
          alt="logo"
          animate={{ rotate: open ? 360 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        <h1 className={`text-white text-xl font-medium transition-all ${!open && "hidden"}`}>
          DAA Website
        </h1>
      </div>

      {/* Sidebar Menu */}
      <ul className="pt-6">
        {sections.map((section) => (
          <li key={section.id} className="mt-2">
            {/* Clickable Entire Area */}
            <Link
              to={section.id}
              smooth={true}
              duration={500}
              className="flex items-center rounded-md p-2 cursor-pointer hover:bg-gray-700 text-gray-300 text-sm gap-x-4 w-full"
            >
              {/* Dynamically Load Image Based on Section ID */}
              <img src={`/img/${section.id}.png`} alt={section.label} className="w-6 h-6" />

              {/* Sidebar Text (Visible Only When Open) */}
              <span className={`${!open && "hidden"} transition-all`}>{section.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Additional Buttons */}
      <div className="mt-6 space-y-2">
        <button
          onClick={() => navigate("/")}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-all flex items-center justify-center"
        >
          {open ? "Home" : <img src="/img/home.png" alt="Feature 1" className="w-6 h-6" />}
        </button>
        <button
          onClick={() => navigate("/explist")}
          className="w-full bg-yellow-300 text-white py-2 rounded-md hover:bg-red-600 transition-all flex items-center justify-center"
        >
          {open ? "List of Experiments" : <img src="/img/list.png" alt="Feature 2" className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
