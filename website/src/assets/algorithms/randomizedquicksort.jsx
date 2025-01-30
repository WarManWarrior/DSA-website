import React, { useState, useEffect } from "react";

const RandomizedQuickSort = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize] = useState(20);
  const [animationSpeed, setAnimationSpeed] = useState(300);
  const [pivotIndex, setPivotIndex] = useState(null);

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    setPivotIndex(null);
  };

  const randomPartition = (arr, low, high) => {
    const randomPivot = Math.floor(Math.random() * (high - low + 1)) + low;
    [arr[randomPivot], arr[high]] = [arr[high], arr[randomPivot]];
    return partition(arr, low, high);
  };

  const partition = (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  };

  const randomizedQuickSort = async (arr, low, high, updateArray) => {
    if (low < high) {
      const pi = randomPartition(arr, low, high);
      setPivotIndex(pi);
      updateArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, animationSpeed));
      await randomizedQuickSort(arr, low, pi - 1, updateArray);
      await randomizedQuickSort(arr, pi + 1, high, updateArray);
    }
  };

  const startSorting = async () => {
    setIsSorting(true);
    const arrayCopy = [...array];
    await randomizedQuickSort(arrayCopy, 0, arrayCopy.length - 1, setArray);
    setIsSorting(false);
    setPivotIndex(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">
        Randomized Quick Sort Visualization
      </h1>

      {/* Controls Section */}
      <div className="w-full max-w-4xl p-4 bg-gray-800 shadow-lg rounded-lg mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <label htmlFor="speed" className="font-medium text-gray-400">
              Speed (ms):
            </label>
            <input
              id="speed"
              type="range"
              min="50"
              max="1000"
              step="50"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              disabled={isSorting}
              className="w-32"
            />
            <span>{animationSpeed}</span>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={generateRandomArray}
              disabled={isSorting}
              className={`px-4 py-2 rounded-md font-medium text-white ${
                isSorting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              Generate Array
            </button>
            <button
              onClick={startSorting}
              disabled={isSorting || array.length === 0}
              className={`px-4 py-2 rounded-md font-medium text-white ${
                isSorting || array.length === 0
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Start Sorting
            </button>
          </div>
        </div>
      </div>

      {/* Color Labels */}
      <div className="flex space-x-6 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-400"></div>
          <span>Unsorted Element</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-red-500"></div>
          <span>Pivot Element</span>
        </div>
      </div>

      {/* Visualization Section */}
      <div className="relative flex items-end justify-center w-full max-w-5xl min-h-80 overflow-hidden">
        {array.map((value, index) => (
          <div
            key={index}
            className={`relative text-center text-white ${
              index === pivotIndex ? "bg-red-500" : "bg-blue-400"
            } mx-1 transition-all ease-in-out`}
            style={{
              height: `${Math.min(value * 3, 300)}px`,
              width: `${Math.max(25, Math.floor(800 / arraySize))}px`,
            }}
          >
            <span className="absolute top-[-20px] w-full text-sm">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomizedQuickSort;
