// import React, { useState, useEffect } from "react";

// const QuickSort = () => {
//   const [array, setArray] = useState([50, 30, 70, 10, 90, 20, 60, 40]);
//   const [isSorting, setIsSorting] = useState(false);
//   const [highlights, setHighlights] = useState({ pivot: null, swap: [] });

//   const delay = (ms) => new Promise((res) => setTimeout(res, ms));

//   const quickSort = async (arr, low, high) => {
//     if (low < high) {
//       const pivotIndex = await partition(arr, low, high);
//       await quickSort(arr, low, pivotIndex - 1);
//       await quickSort(arr, pivotIndex + 1, high);
//     }
//   };

//   const partition = async (arr, low, high) => {
//     const pivot = arr[high];
//     setHighlights({ pivot: high, swap: [] });
//     let i = low - 1;

//     for (let j = low; j < high; j++) {
//       if (arr[j] < pivot) {
//         i++;
//         [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
//         setArray([...arr]);
//         setHighlights({ pivot: high, swap: [i, j] });
//         await delay(500);
//       }
//     }
//     [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot
//     setArray([...arr]);
//     setHighlights({ pivot: high, swap: [i + 1, high] });
//     await delay(500);

//     setHighlights({ pivot: null, swap: [] });
//     return i + 1;
//   };

//   const handleSort = async () => {
//     setIsSorting(true);
//     const newArr = [...array];
//     await quickSort(newArr, 0, newArr.length - 1);
//     setIsSorting(false);
//   };

//   const randomizeArray = () => {
//     const newArray = Array.from({ length: 8 }, () =>
//       Math.floor(Math.random() * 100)
//     );
//     setArray(newArray);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//       <h1 className="text-3xl font-bold mb-6">QuickSort Visualizer</h1>
//       <div className="flex space-x-2 mb-6">
//         {array.map((value, index) => (
//           <div
//             key={index}
//             className={`relative h-12 w-12 flex items-center justify-center text-sm rounded-md
//               ${
//                 highlights.pivot === index
//                   ? "bg-yellow-500"
//                   : highlights.swap.includes(index)
//                   ? "bg-blue-500"
//                   : "bg-gray-700"
//               }
//               transition-all duration-500 ease-in-out`}
//           >
//             {value}
//           </div>
//         ))}
//       </div>
//       <div className="flex space-x-4">
//         <button
//           onClick={randomizeArray}
//           className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 disabled:bg-blue-400"
//           disabled={isSorting}
//         >
//           Randomize Array
//         </button>
//         <button
//           onClick={handleSort}
//           className="px-4 py-2 bg-green-600 rounded hover:bg-green-500 disabled:bg-green-400"
//           disabled={isSorting}
//         >
//           Start QuickSort
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuickSort;


import React, { useState, useEffect } from "react";

const QuickSort = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [highlights, setHighlights] = useState({
    pivot: null,
    swap: [],
    sorted: [],
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    resetArray();
  }, []);

  // Utility: Delay function for animations
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // Generate a random array
  const resetArray = () => {
    const newArray = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 100) + 10
    );
    setArray(newArray);
    setHighlights({ pivot: null, swap: [], sorted: [] });
    setProgress(0);
  };

  // QuickSort algorithm with visualization
  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSort(arr, low, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, high);
    }
    // At the end, mark the current range as sorted
    if (low <= high) {
      setHighlights((prev) => ({
        ...prev,
        sorted: Array.from(new Set([...prev.sorted, ...Array.from({ length: high - low + 1 }, (_, i) => low + i)])),
      }));
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    setHighlights({ pivot: high, swap: [], sorted: highlights.sorted });
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
        setHighlights({ pivot: high, swap: [i, j], sorted: highlights.sorted });
        setArray([...arr]);
        setProgress((prev) => prev + 1);
        await delay(300);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot
    setHighlights({
      pivot: high,
      swap: [i + 1, high],
      sorted: highlights.sorted,
    });
    setArray([...arr]);
    setProgress((prev) => prev + 1);
    await delay(300);

    return i + 1;
  };

  // Start QuickSort
  const handleSort = async () => {
    setIsSorting(true);
    const newArr = [...array];
    await quickSort(newArr, 0, newArr.length - 1);
    setHighlights((prev) => ({
      ...prev,
      sorted: Array.from({ length: array.length }, (_, i) => i),
    })); // Mark all indices as sorted at the end
    setIsSorting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">QuickSort Visualizer</h1>

      {/* Progress */}
      <div className="mb-4 w-full max-w-md">
        <div className="text-sm text-gray-400 mb-2">
          Sorting Progress: {progress} steps
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${(progress / (array.length * 5)) * 100}%` }}
          ></div>
        </div>
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
