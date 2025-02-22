import React from "react";

const Intro = ({ heading, content }) => {
  const parseContent = (text) => {
    // Replace **text** with <strong>text</strong>
    return text.split("\n").map((line, index) => (
      <p key={index} className="text-lg text-gray-700 mb-2">
        {line.split(/(\*\*.*?\*\*)/).map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={i} className="font-bold">
                {part.slice(2, -2)} {/* Remove the ** from the text */}
              </strong>
            );
          }
          return part;
        })}
      </p>
    ));
  };

  return (
    <div className="p-4">
      {/* Heading */}
      {heading && <h2 className="text-2xl font-bold text-gray-800 mb-4">{heading}</h2>}
      
      {/* Render Content */}
      {content && parseContent(content)}
    </div>
  );
};

export default Intro;
