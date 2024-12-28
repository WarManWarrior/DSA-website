
import Card from './Card'; // Adjust the import path as necessary
// src/App.js

import React, { useState } from 'react';


const App = () => {
  const [activeCard, setActiveCard] = useState(null);

  const topics = [
    { topic: 'React', subtopics: ['Hooks', 'Components', 'State Management'] },
    { topic: 'JavaScript', subtopics: ['ES6', 'Promises', 'Async/Await'] },
    { topic: 'CSS', subtopics: ['Flexbox', 'Grid', 'Animations'] },
  ];

  return (
    <div className="flex flex-wrap justify-center p-10">
      {topics.map((item, index) => (
        <Card
          key={index}
          topic={item.topic}
          subtopics={item.subtopics}
          isActive={activeCard === index}
          onClick={() => setActiveCard(activeCard === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default App;