import React from "react";
import { Link } from "react-scroll";

const Sidebar = ({ open, toggleSidebar, sections }) => {
  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } bg-gray-800 h-screen p-5 pt-8 fixed top-0 left-0 duration-300`}
    >
      <img
        src="./src/assets/img/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
          !open && "rotate-180"
        }`}
        onClick={toggleSidebar}
        alt="toggle"
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="./src/assets/img/logo.png"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          alt="logo"
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Linear Search
        </h1>
      </div>
      <ul className="pt-6">
        {sections.map((section) => (
          <li
            key={section.id}
            className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2"
          >
            <img
              src={section.image}
              alt={`${section.label} icon`}
              className="w-6 h-6"
            />
            <Link
              to={section.id}
              smooth={true}
              duration={500}
              className={`text-gray-300 hover:text-white ${
                !open && "hidden"
              } origin-left duration-200`}
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
