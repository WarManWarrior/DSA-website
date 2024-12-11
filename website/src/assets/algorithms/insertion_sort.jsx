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
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <h1 className="text-3xl font-bold mb-6">Insertion Sort Visualization</h1>
      <div className="flex items-end justify-center gap-2 w-full max-w-4xl mx-auto mb-6">
        {array.map((value, index) => (
          <div
            key={index}
            className={`w-6 text-center text-white rounded ${
              index === currentIndex
                ? 'bg-error'
                : index === comparingIndex
                ? 'bg-warning'
                : 'bg-primary'
            }`}
            style={{ height: `${value * 3}px` }}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button className="btn btn-primary" onClick={generateRandomArray}>Generate New Array</button>
        <button className="btn btn-secondary" onClick={insertionSort}>Start Sorting</button>
      </div>
    </div>
  );
};

export default InsertionSortVisualizer;