// src/components/Card.js

import React, { useState } from 'react';

const Card = ({ topic, subtopics, isActive, onClick }) => {
  return (
    <div
      className={`p-4 m-2 rounded-lg shadow-lg transition-all duration-300 
                  ${isActive ? 'bg-blue-500 text-white glow' : 'bg-white text-black'}
                  ${isActive ? 'scale-105' : 'scale-100'}`}
      onClick={onClick}
    >
      <h2 className="text-xl font-bold">{topic}</h2>
      {isActive && (
        <ul className="mt-2">
          {subtopics.map((subtopic, index) => (
            <li key={index} className="ml-4 text-sm">
              {subtopic}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default Card;