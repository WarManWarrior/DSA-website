import React from "react";

const Intro = () => (
  <div className="flex flex-col items-center">
    <img
      src="https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2022/01/srm-logo-white.svg.gzip"
      alt="SRM Logo"
      className="h-24 w-24 mb-4 max-w-full"
    />
    <h2 className="text-2xl font-bold">SRM Institute of Science and Technology</h2>
    <p className="text-lg">Department of Computational Intelligence</p>
    <p className="text-lg">Virtual Lab - Design and Analysis of Algorithms</p>
    <p className="mt-4 sm:mt-8">
      Linear search is a simple search algorithm that checks every element in a list sequentially until the desired element is found or the list ends.
    </p>
  </div>
);

export default Intro;
