import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-center shadow-lg">
      <img
        src="https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2022/01/srm-logo-white.svg.gzip"
        alt="SRM Logo"
        className="h-12 w-12 mr-4"
      />
      <div>
        <h1 className="text-xl font-bold">SRM Institute of Science and Technology</h1>
        <p className="text-sm">Department of Computational Intelligence</p>
        <p className="text-sm">Virtual Lab - Design and Analysis of Algorithms</p>
      </div>
    </nav>
  );
};

export default Navbar;
