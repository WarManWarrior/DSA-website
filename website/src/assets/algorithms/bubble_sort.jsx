import React, { useState } from "react";

const BubbleSortVisualizer = () => {
  const [array, setArray] = useState([50, 30, 20, 40, 10]);
  const [sorting, setSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentCompare, setCurrentCompare] = useState(-1);
  const [animationSpeed, setAnimationSpeed] = useState(500);

  const generateNewArray = () => {
    const newArray = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setSorting(false);
    setCurrentIndex(-1);
    setCurrentCompare(-1);
  };

  const swapElements = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const bubbleSort = async () => {
    setSorting(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCurrentIndex(j);
        setCurrentCompare(j + 1);

        if (arr[j] > arr[j + 1]) {
          // Swap the elements
          swapElements(arr, j, j + 1);
          setArray([...arr]); // Update the state with the swapped array
        }

        await new Promise((resolve) => setTimeout(resolve, animationSpeed));
      }
    }

    setSorting(false);
    setCurrentIndex(-1);
    setCurrentCompare(-1);
  };

  return (
    <div className="flex flex-col items-center h-full w-full bg-base-200">
      <h1 className="text-4xl font-bold text-primary my-5">Bubble Sort Visualizer</h1>

      <div className="flex space-x-4 mb-6">
        <button
          className="btn btn-primary"
          onClick={generateNewArray}
          disabled={sorting}
        >
          Generate New Array
        </button>
        <button
          className="btn btn-secondary"
          onClick={bubbleSort}
          disabled={sorting}
        >
          Start Sorting
        </button>
      </div>

      <div className="mb-6">
        <label className="mr-4 text-teal-50">Animation Speed:</label>
        <input
          type="range"
          min="100"
          max="2000"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(Number(e.target.value))}
          className="range range-primary"
          disabled={sorting}
        />
      </div>

      <div className="flex space-x-2 items-end mb-4">
        {array.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`
                w-10 rounded-md text-center text-xs text-white
                ${index === currentIndex ? "bg-yellow-500" : ""}
                ${index === currentCompare ? "bg-purple-500" : "bg-accent"}
              `}
              style={{
                height: `${value * 3}px`,
                transition: `height ${animationSpeed}ms ease, background-color 0.2s`,
              }}
            ></div>
            <span className="text-white mt-1">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4 text-teal-50">Legend</h2>
        <div className="flex flex-col space-y-2 text-left">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-yellow-500 mr-2"></div>
            <span className="text-teal-50">Current Element</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-purple-500 mr-2"></div>
            <span className="text-teal-50">Element Being Compared</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-accent mr-2"></div>
            <span className="text-teal-50">Default State</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleSortVisualizer;
