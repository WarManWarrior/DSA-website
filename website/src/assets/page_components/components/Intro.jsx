import React from "react";

const Intro = ({ heading, content }) => (
  <div className="p-4">
    <h2 className="text-xl font-semibold">{heading}</h2>
    <p className="mt-2 text-lg">{content}</p>
  </div>
);

export default Intro;
