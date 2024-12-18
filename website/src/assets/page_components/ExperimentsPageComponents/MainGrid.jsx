import React from "react";
import Card from "./Card";

const MainGrid = () => {
  const cardTitles = [
    "Simple Algorithm-Insertion sort",
    "Bubble Sort",
    "Linear search, Binary search",
    "Merge sort",
    "Quick sort",
    "Strassen Matrix multiplication",
    "Finding Maximum and Minimum in an array, Convex Hull problem",
    "Huffman coding",
    "Knapsack using greedy",
    "Longest common subsequence",
    "N queen’s problem",
    "Travelling salesman problem",
    "Randomized quick sort",
    "String matching algorithms",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
      {cardTitles.map((title, index) => (
        <Card
          key={index}
          title={title}
          onLearnClick={() => alert(`Learn: ${title}`)}
          onVisualizeClick={() => alert(`Visualize: ${title}`)}
        />
      ))}
    </div>
  );
};

export default MainGrid;
