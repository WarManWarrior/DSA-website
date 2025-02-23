import React, { useState } from "react";

const BinarySearchVisualization = () => {
  const generateNewArray = () =>
    Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 1).sort((a, b) => a - b);

  const [array, setArray] = useState(generateNewArray());
  const [target, setTarget] = useState(50);
  const [current, setCurrent] = useState(null);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(array.length - 1);
  const [speed, setSpeed] = useState(1);
  const [resultIndex, setResultIndex] = useState(null);

  const resetVisualization = () => {
    const newArray = generateNewArray();
    setArray(newArray);
    setLow(0);
    setHigh(newArray.length - 1);
    setCurrent(null);
    setResultIndex(null);
  };

  const binarySearch = () => {
    setLow(0);
    setHigh(array.length - 1);
    setCurrent(null);
    setResultIndex(null);

    let lowIdx = 0;
    let highIdx = array.length - 1;

    const searchStep = () => {
      if (lowIdx > highIdx) {
        setCurrent(null);
        setResultIndex(-1);
        return;
      }

      const mid = Math.floor((lowIdx + highIdx) / 2);
      setCurrent(mid);

      setTimeout(() => {
        if (array[mid] === target) {
          setResultIndex(mid);
          return;
        } else if (array[mid] < target) {
          lowIdx = mid + 1;
          setLow(lowIdx);
        } else {
          highIdx = mid - 1;
          setHigh(highIdx);
        }

        searchStep();
      }, 1000 / speed);
    };

    searchStep();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-base-200">
      <h1 className="text-2xl font-bold mb-4">Binary Search Visualization</h1>

      <div className="flex space-x-2 items-center mb-6">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          className="input input-bordered input-primary w-20"
          placeholder="Target"
        />
        <button onClick={binarySearch} className="btn btn-primary">
          Start Search
        </button>
        <button onClick={resetVisualization} className="btn btn-secondary">
          Reset
        </button>
      </div>

      <div className="flex flex-col items-center mb-4">
        <label className="mb-2 font-semibold">Animation Speed</label>
        <input
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="range range-primary"
        />
        <span>{speed}x</span>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center space-y-2 mb-6">
        <div className="w-full flex items-end space-x-2">
          {array.map((num, idx) => (
            <div
              key={idx}
              className={`flex-1 relative rounded-md transition-all animate-ease-in-out duration-500 ${
                idx === current
                  ? "bg-yellow-500"
                  : idx === low || idx === high
                  ? "bg-purple-500"
                  : "bg-blue-500"
              }`}
              style={{ height: `${num * 3}px` }}
            >
              <span className="absolute top-1 left-1/2 transform -translate-x-1/2 text-white text-sm font-bold">
                {num}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-between text-sm font-bold text-gray-700">
          {array.map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 text-center ${
                idx === current
                  ? "text-yellow-500"
                  : idx === low || idx === high
                  ? "text-purple-500"
                  : ""
              }`}
            >
              {idx}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Legend</h2>
        <div className="flex flex-col space-y-2 text-left">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-yellow-500 mr-2"></div>
            <span>Current Element</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-purple-500 mr-2"></div>
            <span>Boundary Elements (Low or High)</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-500 mr-2"></div>
            <span>Default State</span>
          </div>
        </div>
      </div>

      {resultIndex !== null && (
        <div className="mt-4 text-lg font-bold text-green-600">
          {resultIndex === -1
            ? "Target not found"
            : `Target found at index: ${resultIndex}`}
        </div>
      )}
    </div>
  );
};

export default BinarySearchVisualization;
