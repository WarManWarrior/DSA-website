import React, { useState, useEffect } from "react";

const QuickSort = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [highlights, setHighlights] = useState({
    pivot: null,
    swap: [],
    sorted: [],
  });
  const [speed, setSpeed] = useState(300);

  useEffect(() => {
    resetArray();
  }, []);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const resetArray = () => {
    const newArray = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 100) + 10
    );
    setArray(newArray);
    setHighlights({ pivot: null, swap: [], sorted: [] });
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSort(arr, low, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, high);
    }
    if (low <= high) {
      setHighlights((prev) => ({
        ...prev,
        sorted: Array.from(new Set([...prev.sorted, ...Array.from({ length: high - low + 1 }, (_, i) => low + i)])),
      }));
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[low]; // Pivot is always the first element
    setHighlights({ pivot: low, swap: [], sorted: highlights.sorted });
    let i = low + 1; // Start right after pivot

    for (let j = low + 1; j <= high; j++) {
      if (arr[j] < pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setHighlights({ pivot: low, swap: [i, j], sorted: highlights.sorted });
        setArray([...arr]);
        await delay(speed);
        i++;
      }
    }

    // Move pivot to correct position
    [arr[low], arr[i - 1]] = [arr[i - 1], arr[low]];
    setHighlights({ pivot: i - 1, swap: [low, i - 1], sorted: highlights.sorted });
    setArray([...arr]);
    await delay(speed);

    return i - 1; // Return new pivot position
  };

  const handleSort = async () => {
    setIsSorting(true);
    const newArr = [...array];
    await quickSort(newArr, 0, newArr.length - 1);
    setHighlights((prev) => ({
      ...prev,
      sorted: Array.from({ length: array.length }, (_, i) => i),
    }));
    setIsSorting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">QuickSort Visualizer</h1>

      {/* Speed Controller */}
      <div className="mb-4 flex items-center space-x-2">
        <label className="text-sm text-gray-400">Speed:</label>
        <input
          type="range"
          min="50"
          max="1000"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-40"
        />
      </div>

      {/* Array Bars */}
      <div className="flex items-end space-x-1 mb-6 h-64">
        {array.map((value, index) => (
          <div
            key={index}
            className={`w-6 rounded-t-md flex justify-center items-end relative transition-all duration-300
              ${
                highlights.sorted.includes(index)
                  ? "bg-green-500"
                  : highlights.pivot === index
                  ? "bg-yellow-500"
                  : highlights.swap.includes(index)
                  ? "bg-blue-500"
                  : "bg-gray-600"
              }`}
            style={{ height: `${value * 2}px` }}
          >
            <span className="absolute bottom-[-20px] text-xs">{value}</span>
          </div>
        ))}
      </div>

      {/* Color Labels */}
      <div className="flex space-x-4 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-600"></div>
          <span>Unsorted</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500"></div>
          <span>Swapping</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500"></div>
          <span>Pivot</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500"></div>
          <span>Sorted</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={resetArray}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 disabled:bg-red-400"
          disabled={isSorting}
        >
          Reset Array
        </button>
        <button
          onClick={handleSort}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 disabled:bg-green-400"
          disabled={isSorting}
        >
          Start QuickSort
        </button>
      </div>
    </div>
  );
};

export default QuickSort;
