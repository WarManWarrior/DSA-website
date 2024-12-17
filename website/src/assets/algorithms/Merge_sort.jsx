import React, { useState, useEffect } from 'react';

const SortingVisualizer = () => {
  const [blocks, setBlocks] = useState([]);
  const [compare, setCompare] = useState([]);
  const [sortedIndex, setSortedIndex] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [speed, setSpeed] = useState(250);

  // Helper to generate a random array
  const generateRandomArray = (len = 30) => {
    setCompleted(false);
    setSorting(false);
    setSortedIndex([]);
    const randomArray = Array.from({ length: len }, (_, i) => i + 1);
    for (let i = randomArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      [randomArray[i], randomArray[randomIndex]] = [randomArray[randomIndex], randomArray[i]];
    }
    setBlocks(randomArray);
  };

  // Load a default array on component mount
  useEffect(() => {
    generateRandomArray(30);
  }, []);

  // Merge Sort logic with animations
  const mergeSort = () => {
    const order = [];
    const dupBlocks = blocks.slice();

    const merge = (dupBlocks, l, mid, r) => {
      let i = l,
        j = mid + 1;
      const temp = [];

      while (i <= mid && j <= r) {
        order.push([i, j, null, null]); // Compare indices
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
      order.push([null, null, null, i]); // Mark index as sorted
    }

    animateMergeSort(order);
  };

  const animateMergeSort = (order) => {
    (function loop(i) {
      setTimeout(() => {
        if (i < order.length) {
          const [j, k, arr, index] = order[i];
          setCompare([j, k]);
          if (arr) setBlocks(arr);
          if (index !== null) setSortedIndex((prev) => [...prev, index]);
          loop(i + 1);
        } else {
          setSorting(false);
          setCompleted(true);
        }
      }, speed);
    })(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Sorting Visualizer</h1>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <button
          onClick={() => generateRandomArray(30)}
          disabled={sorting}
          className={`px-6 py-3 rounded-lg text-white font-medium shadow-md ${
            sorting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Generate New Array
        </button>
        <button
          onClick={mergeSort}
          disabled={sorting || completed}
          className={`px-6 py-3 rounded-lg text-white font-medium shadow-md ${
            sorting || completed ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Start Sorting
        </button>
        <label className="flex items-center gap-2">
          <span className="text-gray-700 font-medium">Speed:</span>
          <input
            type="range"
            min="1"
            max="100"
            defaultValue="50"
            onChange={(e) => setSpeed(400 / e.target.value)}
            disabled={sorting}
            className="cursor-pointer"
          />
        </label>
      </div>

      {/* Bars Display */}
      <div className="flex items-end gap-1 w-11/12 max-w-4xl px-4 bg-white shadow-lg rounded-lg py-4">
        {blocks.map((value, index) => (
          <div
            key={index}
            className={`w-full max-w-[12px] transition-all duration-200 ${
              compare.includes(index)
                ? 'bg-yellow-400'
                : sortedIndex.includes(index)
                ? 'bg-green-500'
                : 'bg-blue-500'
            }`}
            style={{ height: `${value * 5}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
