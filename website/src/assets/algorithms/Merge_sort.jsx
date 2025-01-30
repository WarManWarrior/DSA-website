import React, { useState, useEffect, useRef } from "react";

const MergeSortVisualizer = () => {
  const [blocks, setBlocks] = useState([]);
  const [compare, setCompare] = useState([]);
  const [sortedIndex, setSortedIndex] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [speed, setSpeed] = useState(250);
  const speedRef = useRef(speed);

  const generateRandomArray = (len = 30) => {
    setCompleted(false);
    setSorting(false);
    setSortedIndex([]);
    const randomArray = Array.from({ length: len }, (_, i) => i + 1);
    for (let i = randomArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      [randomArray[i], randomArray[randomIndex]] = [
        randomArray[randomIndex],
        randomArray[i],
      ];
    }
    setBlocks(randomArray);
  };

  useEffect(() => {
    generateRandomArray(30);
  }, []);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const mergeSort = () => {
    setSorting(true);
    const order = [];
    const dupBlocks = blocks.slice();

    const merge = (dupBlocks, l, mid, r) => {
      let i = l,
        j = mid + 1;
      const temp = [];

      while (i <= mid && j <= r) {
        order.push([i, j, null, null]);
        if (dupBlocks[i] <= dupBlocks[j]) {
          temp.push(dupBlocks[i++]);
        } else {
          temp.push(dupBlocks[j++]);
        }
      }

      while (i <= mid) {
        order.push([i, null, null, null]);
        temp.push(dupBlocks[i++]);
      }

      while (j <= r) {
        order.push([null, j, null, null]);
        temp.push(dupBlocks[j++]);
      }

      for (let k = l; k <= r; k++) {
        dupBlocks[k] = temp[k - l];
        order.push([k, null, dupBlocks.slice(), null]);
      }
    };

    const mergeSortHelper = (dupBlocks, l, r) => {
      if (l >= r) return;
      const mid = Math.floor((l + r) / 2);
      mergeSortHelper(dupBlocks, l, mid);
      mergeSortHelper(dupBlocks, mid + 1, r);
      merge(dupBlocks, l, mid, r);
    };

    mergeSortHelper(dupBlocks, 0, dupBlocks.length - 1);

    for (let i = 0; i < dupBlocks.length; i++) {
      order.push([null, null, null, i]);
    }

    animateMergeSort(order);
  };

  const animateMergeSort = (order) => {
    let i = 0;

    const loop = () => {
      if (i < order.length) {
        const [j, k, arr, index] = order[i];
        setCompare([j, k]);
        if (arr) setBlocks(arr);
        if (index !== null)
          setSortedIndex((prev) => (prev.includes(index) ? prev : [...prev, index]));

        i++;
        setTimeout(loop, speedRef.current);
      } else {
        setSorting(false);
        setCompleted(true);
      }
    };

    loop();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-blue-400 mb-8">Merge Sort Visualizer</h1>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={() => generateRandomArray(30)}
          disabled={sorting}
          className={`px-6 py-3 rounded-lg text-white font-medium shadow-md ${
            sorting ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Generate New Array
        </button>
        <button
          onClick={mergeSort}
          disabled={sorting || completed}
          className={`px-6 py-3 rounded-lg text-white font-medium shadow-md ${
            sorting || completed ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Start Sorting
        </button>
        <label className="flex items-center gap-2">
          <span className="text-gray-400 font-medium">Speed:</span>
          <input
            type="range"
            min="1"
            max="100"
            defaultValue="50"
            onChange={(e) => setSpeed(400 / e.target.value)}
            className="cursor-pointer"
          />
        </label>
      </div>
      <div className="flex items-end gap-1 w-full max-w-4xl px-4 bg-gray-800 shadow-lg rounded-lg py-4">
        {blocks.map((value, index) => (
          <div
            key={index}
            className={`transition-all duration-300 ease-in-out flex items-end justify-center text-xs font-bold text-white ${
              compare.includes(index)
                ? "bg-yellow-500"
                : sortedIndex.includes(index)
                ? "bg-green-500"
                : "bg-blue-500"
            }`}
            style={{
              height: `${value * 5}px`,
              width: `${100 / blocks.length - 0.5}%`,
            }}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg">
        <h2 className="text-lg font-bold mb-2">Legend</h2>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 bg-yellow-500 mr-2"></div>
          <span>Comparing Elements (Yellow)</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-4 h-4 bg-green-500 mr-2"></div>
          <span>Sorted Elements (Green)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 mr-2"></div>
          <span>Unsorted Elements (Blue)</span>
        </div>
      </div>
    </div>
  );
};

export default MergeSortVisualizer;