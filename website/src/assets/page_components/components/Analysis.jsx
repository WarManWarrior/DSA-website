import React from "react";

const Analysis = ({ heading = "", content = "" }) => {
  const parseContent = (text) => {
    // Split text by new lines
    return text.split("\n").map((line, index) => (
      <p key={index} className="leading-relaxed">
        {/* Split line by bold markers and wrap bold text in <strong> */}
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
    <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">{heading}</h2>

      {/* Content */}
      <div className="text-lg space-y-2">
        {content ? parseContent(content) : <p>No analysis content available.</p>}
      </div>
    </div>
  );
};

export default Analysis;

