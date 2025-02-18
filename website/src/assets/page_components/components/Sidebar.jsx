import React from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import { ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = ({ open, toggleSidebar, sections }) => {
  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } bg-gray-800 h-screen p-5 pt-8 fixed top-0 left-0 transition-all duration-300`}
    >
      {/* Rotating Sidebar Toggle Button */}
      <motion.button
        onClick={toggleSidebar}
        className="absolute -right-6 top-9 bg-blue-500 text-white p-1 rounded-full shadow-md transition-all"
        animate={{ rotate: open ? 180 : 0 }} // ✅ Rotate button
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <motion.img
          src="./src/assets/img/control.png" // ✅ Ensure correct path
          alt="toggle icon"
          className="w-6 h-6"
          animate={{ rotate: open ? 180 : 0 }} // ✅ Rotate lightning icon
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </motion.button>

      {/* Rotating Logo */}
      <div className="flex items-center gap-x-4">
        <motion.img
          src="./src/assets/img/logo.png"
          className="w-10 h-10 cursor-pointer"
          alt="logo"
          animate={{ rotate: open ? 360 : 0 }} // ✅ Rotate logo 360° when opening
          transition={{ duration: 0.6, ease: "easeInOut" }} // ✅ Smooth animation
        />
        <h1 className={`text-white text-xl font-medium transition-all ${!open && "hidden"}`}>
          
        </h1>
      </div>

      {/* Sidebar Menu */}
      <ul className="pt-6">
        {sections.map((section) => (
          <li
            key={section.id}
            className="flex rounded-md p-2 cursor-pointer hover:bg-gray-700 text-gray-300 text-sm items-center gap-x-4 mt-2"
          >
            <img src={section.image} alt="icon" className="w-6 h-6" />
            <Link
              to={section.id}
              smooth={true}
              duration={500}
              className={`text-gray-300 hover:text-white transition-all ${!open && "hidden"}`}
            >
              {section.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
