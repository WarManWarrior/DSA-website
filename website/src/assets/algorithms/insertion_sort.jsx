import React, { useState } from 'react';

const InsertionSortVisualizer = () => {
  const [array, setArray] = useState([50, 30, 20, 40, 10]);
  const [sorting, setSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentCompare, setCurrentCompare] = useState(-1);
  const [activeIndices, setActiveIndices] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(500);

  const generateNewArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setSorting(false);
    setCurrentIndex(-1);
    setCurrentCompare(-1);
    setActiveIndices([]);
  };

  const insertionSort = async () => {
    setSorting(true);
    const arr = [...array];

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      setCurrentIndex(i); // The key element (current element to be sorted)
      setActiveIndices([i]);

      // Start the comparison process
      while (j >= 0 && arr[j] > key) {
        setCurrentCompare(j); // The element being compared with the key

        // Swap the current element with the one being compared
        const tempArray = [...arr];
        tempArray[j + 1] = tempArray[j];
        tempArray[j] = key;
        setArray([...tempArray]);

        await new Promise((resolve) => setTimeout(resolve, animationSpeed));

        // After swap, the previously compared element is highlighted in purple
        setCurrentIndex(j);
        setCurrentCompare(j - 1);

        arr[j + 1] = arr[j];
        arr[j] = key;
        j -= 1;
      }

      setArray([...arr]);
      setActiveIndices([]); // Reset active indices after each iteration
      await new Promise((resolve) => setTimeout(resolve, animationSpeed));
    }

    setSorting(false);
    setCurrentIndex(-1);
    setCurrentCompare(-1);
    setActiveIndices([]);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-200">
      <h1 className="text-4xl font-bold text-primary my-5 animate-fade-in">Insertion Sort Visualizer</h1>
      <div className="flex space-x-4 mb-6">
        <button
          className="btn btn-primary animate-pulse"
          onClick={generateNewArray}
          disabled={sorting}
        >
          Generate New Array
        </button>
        <button
          className="btn btn-secondary animate-pulse"
          onClick={insertionSort}
          disabled={sorting}
        >
          Start Sorting
        </button>
      </div>
      <div className="mb-6">
        <label className="mr-4">Animation Speed:</label>
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
      <div className="flex space-x-2 items-end relative">
        {array.map((value, index) => (
          <div
            key={index}
            className={`
              w-10 rounded-md transition-all transform duration-500
              ${index === currentIndex ? 'bg-yellow-500 scale-105' : 'bg-accent'}
              ${index === currentCompare ? 'bg-purple-500' : ''}
              ${activeIndices.includes(index) && index !== currentIndex && index !== currentCompare ? '' : ''}
            `}
            style={{ height: `${value * 3}px` }}
          >
            <span className="block text-center text-xs text-white">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsertionSortVisualizer;
