import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter} from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <nav className="block w-full px-4 py-2 mx-auto bg-black bg-opacity-90 sticky top-3 shadow lg:px-8 lg:py-1 backdrop-blur-lg backdrop-saturate-150 z-[9999]">
        <div className="container flex flex-wrap items-center justify-between mx-auto text-white">
          <a
            href="#"
            className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold"
          >
            <div className="flex items-center gap-2">
              <img
                src="https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2022/01/srm-logo-white.svg.gzip"
                alt=""
                className="w-32"
              />
              <img
                src="/images/cintel.png"
                alt=""
                className="w-32"
              />
            </div>
          </a>

          <div id="menu" className="hidden lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              
              <li className="flex items-center p-1 text-lg gap-x-2 text-white hover:text-yellow-400">
              <Link to="/introduction" className="flex items-center">About Us</Link>
              </li>
              <li className="flex items-center p-1 text-lg gap-x-2 text-white hover:text-yellow-400">
              <Link to="/explist" className="flex items-center">List of Experiments</Link>
              </li>
              
            </ul>
          </div>
          <button
            id="hamburger"
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div
          id="mobileMenu"
          className="fixed inset-0 z-[9998] bg-black bg-opacity-90 text-white flex flex-col items-center justify-center gap-6"
        >
          <ul className="flex flex-col items-center gap-6 text-lg hover:text-yellow-400">
            <li>
              <a href="#" className="">
                Introduction
              </a>
            </li>
            <li>
              <a href="#" className="">
                List of Experiments
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
