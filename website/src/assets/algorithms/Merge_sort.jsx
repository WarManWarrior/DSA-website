import React, { useState, useEffect } from 'react';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arrayColors, setArrayColors] = useState([]);
  const [animationArray, setAnimationArray] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [isSorting, setIsSorting] = useState(false);

  const DEFAULT_COLOR = 'bg-green-400';
  const COMPARE_COLOR = 'bg-red-400';
  const SORTED_COLOR = 'bg-blue-400';

  const generateArray = () => {
    if (isSorting) return;
    const newArray = Array.from({ length: 150 }, () => Math.floor(Math.random() * 100) + 1);
    const newColors = Array(150).fill(DEFAULT_COLOR);
    setArray(newArray);
    setArrayColors(newColors);
    setAnimationArray(Array(150).fill(0));
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const mergeSort = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const auxArray = [...array];
    await mergeSortHelper(array, 0, array.length - 1, auxArray);

    setArrayColors(Array(array.length).fill(SORTED_COLOR));
    setIsSorting(false);
  };

  const mergeSortHelper = async (mainArray, start, end, auxArray) => {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSortHelper(auxArray, start, mid, mainArray);
    await mergeSortHelper(auxArray, mid + 1, end, mainArray);
    await merge(mainArray, start, mid, end, auxArray);
  };

  const merge = async (mainArray, start, mid, end, auxArray) => {
    let i = start;
    let j = mid + 1;
    let k = start;

    const newColors = [...arrayColors];

    const targetPosition = (index, start, end) => {
      return (index - start) * 100 / (end - start);
    };

    while (i <= mid && j <= end) {
      newColors.fill(SORTED_COLOR, 0, start);
      newColors.fill(DEFAULT_COLOR, start, end + 1);
      newColors[i] = COMPARE_COLOR;
      newColors[j] = COMPARE_COLOR;
      setArrayColors([...newColors]);

      const newAnimationArray = [...animationArray];
      newAnimationArray[i] = targetPosition(i, start, end);
      newAnimationArray[j] = targetPosition(j, start, end);
      setAnimationArray(newAnimationArray);

      await sleep(speed);

      if (auxArray[i] <= auxArray[j]) {
        mainArray[k++] = auxArray[i++];
      } else {
        mainArray[k++] = auxArray[j++];
      }
      setArray([...mainArray]);
    }

    while (i <= mid) {
      newColors.fill(SORTED_COLOR, 0, start);
      newColors.fill(DEFAULT_COLOR, start, end + 1);
      newColors[i] = COMPARE_COLOR;
      setArrayColors([...newColors]);

      const newAnimationArray = [...animationArray];
      newAnimationArray[i] = targetPosition(i, start, end);
      setAnimationArray(newAnimationArray);

      await sleep(speed);

      mainArray[k++] = auxArray[i++];
      setArray([...mainArray]);
    }

    while (j <= end) {
      newColors.fill(SORTED_COLOR, 0, start);
      newColors.fill(DEFAULT_COLOR, start, end + 1);
      newColors[j] = COMPARE_COLOR;
      setArrayColors([...newColors]);

      const newAnimationArray = [...animationArray];
      newAnimationArray[j] = targetPosition(j, start, end);
      setAnimationArray(newAnimationArray);

      await sleep(speed);

      mainArray[k++] = auxArray[j++];
      setArray([...mainArray]);
    }

    newColors.fill(SORTED_COLOR, start, end + 1);
    setArrayColors([...newColors]);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const maxVal = Math.max(...array);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-4">Sorting Visualizer</h1>

      <div className="flex space-x-4 mb-6">
        <button onClick={generateArray} className="btn btn-primary" disabled={isSorting}>
          Generate New Array
        </button>
        <button onClick={mergeSort} className="btn btn-secondary" disabled={isSorting}>
          Start Merge Sort
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <label htmlFor="speed" className="text-lg font-medium">Speed:</label>
        <input
          id="speed"
          type="range"
          min="10"
          max="200"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="range"
        />
      </div>

      <div className="relative flex w-full max-w-4xl h-96 bg-white border rounded-lg shadow">
        {array.map((value, index) => (
          <div
            key={index}
            className={`${arrayColors[index]} h-full`}
            style={{
              height: `${(value / maxVal) * 100}%`, // Map the value to the height percentage
              width: `${100 / array.length}%`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
