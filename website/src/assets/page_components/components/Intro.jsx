import React from "react";

const Intro = (props) => (
  <div className="flex flex-col items-center">
    <p className="mt-4 sm:mt-8 text-lg">
      {props.intro}
    </p>
  </div>
);

export default Intro;
