import React from "react";

const Section = ({ id, children }) => (
  <div
    id={id}
    className="h-screen flex flex-col items-center justify-center bg-gray-100 border border-gray-300 p-8"
  >
    {children}
  </div>
);

export default Section;
