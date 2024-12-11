import React, { useState } from 'react';

const InsertionSortVisualizer = () => {
  const [array, setArray] = useState([30, 10, 50, 20, 40]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [comparingIndex, setComparingIndex] = useState(null);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const insertionSort = async () => {
    let arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      setCurrentIndex(i);
      await sleep(500);

      while (j >= 0 && arr[j] > key) {
        setComparingIndex(j);
        arr[j + 1] = arr[j];
        setArray([...arr]);
        await sleep(500);
        j = j - 1;
      }

      arr[j + 1] = key;
      setArray([...arr]);
      setComparingIndex(null);
      await sleep(500);
    }

    setCurrentIndex(null);
  };

  const generateRandomArray = () => {
    const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(randomArray);
    setCurrentIndex(null);
    setComparingIndex(null);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Insertion Sort Visualization</h1>
      <div className="flex items-end gap-2 mb-6">
        {array.map((value, index) => (
          <div
            key={index}
            className={`w-6 bg-blue-500 text-white text-xs text-center rounded transition-all ease-in-out duration-500 ${
              index === currentIndex ? 'bg-red-500' : index === comparingIndex ? 'bg-yellow-500' : ''
            }`}
            style={{ height: `${value * 3}px` }}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button 
          onClick={generateRandomArray} 
          className="btn btn-primary">
          Generate New Array
        </button>
        <button 
          onClick={insertionSort} 
          className="btn btn-secondary">
          Start Sorting
        </button>
      </div>
    </div>
  );
};

export default InsertionSortVisualizer;

// Tailwind CSS and DaisyUI utility classes are used for styling. Animations are applied via the `transition-all`, `ease-in-out`, and `duration-500` classes to animate the height and background color changes smoothly.