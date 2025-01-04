import React from "react";

function Navbar() {
  return (
    <div>
      <nav className="block w-full px-4 py-2 mx-auto bg-black bg-opacity-90 sticky top-3 shadow lg:px-8 lg:py-1 backdrop-blur-lg backdrop-saturate-150 z-[9999]">
        <div className="container flex items-center mx-auto text-white">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2022/01/srm-logo-white.svg.gzip"
              alt="SRM Logo"
              className="w-32"
            />
          </div>

          {/* Headings */}
          <div className="flex-grow text-center">
            <h1 className="text-2xl font-bold text-white">
              SRM Institute of Science and Technology
            </h1>
            <h2 className="text-lg font-medium text-gray-300 mt-1">
              Department of Computational Intelligence
            </h2>
            <h3 className="text-base font-normal text-gray-400 mt-1">
              Virtual Lab - Design and Analysis of Algorithms
            </h3>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
