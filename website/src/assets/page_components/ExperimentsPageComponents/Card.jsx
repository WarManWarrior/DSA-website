import React from "react";

const Card = ({ title, onLearnClick, onVisualizeClick }) => {
  return (
    <div className="bg-purple-500 p-6 rounded-lg shadow-md hover:scale-105 transform transition">
      <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
      <div className="flex gap-4">
        <button
          className="bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-500"
          onClick={onLearnClick}
        >
          Learn
        </button>
        <button
          className="bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-500"
          onClick={onVisualizeClick}
        >
          Visualize
        </button>
      </div>
    </div>
  );
};

export default Card;
