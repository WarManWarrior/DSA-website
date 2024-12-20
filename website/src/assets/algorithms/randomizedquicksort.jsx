import React, { useState } from "react";

const RandomizedQuickSort = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(30);
  const [animationSpeed, setAnimationSpeed] = useState(300);
  const [pivotIndex, setPivotIndex] = useState(null);

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
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">
        Randomized Quick Sort Visualization
      </h1>

      {/* Controls Section */}
      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <label htmlFor="arraySize" className="font-medium text-gray-700">
              Array Size:
            </label>
            <input
              id="arraySize"
              type="range"
              min="10"
              max="100"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isSorting}
              className="w-32"
            />
            <span>{arraySize}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="speed" className="font-medium text-gray-700">
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
                  ? "bg-gray-400 cursor-not-allowed"
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
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Start Sorting
            </button>
          </div>
        </div>
      </div>

      {/* Visualization Section */}
      <div className="relative flex items-end justify-center w-full max-w-5xl h-80 bg-white rounded-lg shadow-lg p-4 border-t-4 border-blue-700">
        {array.map((value, index) => (
          <div
            key={index}
            className={`${
              index === pivotIndex ? "bg-red-600" : "bg-blue-500"
            } mx-[2px] transition-all ease-in-out`}
            style={{
              height: `${value * 2.5}px`,
              width: `${Math.max(
                2,
                Math.floor(200 / arraySize)
              )}px`, // Dynamic width based on array size
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default RandomizedQuickSort;

