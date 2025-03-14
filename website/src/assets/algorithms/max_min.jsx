// import React, { useState } from "react";

// const DivideAndConquerVisualizer = () => {
//   const [inputArray, setInputArray] = useState("");
//   const [steps, setSteps] = useState([]);
//   const [result, setResult] = useState({ min: null, max: null });

//   // Function to find min and max using divide and conquer
//   const findMinMax = (arr, low, high) => {
//     if (low === high) {
//       return { min: arr[low], max: arr[low] };
//     }

//     if (high === low + 1) {
//       return {
//         min: Math.min(arr[low], arr[high]),
//         max: Math.max(arr[low], arr[high]),
//       };
//     }

//     const mid = Math.floor((low + high) / 2);
//     const left = findMinMax(arr, low, mid);
//     const right = findMinMax(arr, mid + 1, high);

//     return {
//       min: Math.min(left.min, right.min),
//       max: Math.max(left.max, right.max),
//     };
//   };

//   // Handle user input and start visualization
//   const handleVisualize = () => {
//     const arr = inputArray.split(",").map((num) => parseInt(num.trim(), 10));
//     if (arr.some(isNaN)) {
//       alert("Please enter valid numbers separated by commas.");
//       return;
//     }

//     const steps = [];
//     const result = findMinMax(arr, 0, arr.length - 1);
//     setResult(result);

//     // Visualize steps (for simplicity, we log the steps)
//     console.log("Steps to find min and max:", steps);
//     setSteps(steps);
//   };

//   return (
//     <div className="p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
//       <h1 className="text-4xl font-bold text-white mb-8 text-center">
//         Divide and Conquer: Find Maximum and Minimum
//       </h1>
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Enter numbers (comma-separated):
//           </label>
//           <input
//             type="text"
//             value={inputArray}
//             onChange={(e) => setInputArray(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             placeholder="e.g., 3, 7, 1, 9, 4"
//           />
//         </div>
//         <button
//           onClick={handleVisualize}
//           className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
//         >
//           Visualize
//         </button>

//         {result.min !== null && result.max !== null && (
//           <div className="mt-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Result:</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-green-100 p-4 rounded-lg">
//                 <p className="text-green-800 font-semibold">Minimum:</p>
//                 <p className="text-2xl font-bold text-green-800">
//                   {result.min}
//                 </p>
//               </div>
//               <div className="bg-blue-100 p-4 rounded-lg">
//                 <p className="text-blue-800 font-semibold">Maximum:</p>
//                 <p className="text-2xl font-bold text-blue-800">
//                   {result.max}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DivideAndConquerVisualizer;

import React, { useState } from "react";

const DivideAndConquerVisualizer = () => {
  const [inputArray, setInputArray] = useState("");
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState({ min: null, max: null });

  // Function to find min and max using divide and conquer
  const findMinMax = (arr, low, high) => {
    if (low === high) {
      return { min: arr[low], max: arr[low] };
    }

    if (high === low + 1) {
      return {
        min: Math.min(arr[low], arr[high]),
        max: Math.max(arr[low], arr[high]),
      };
    }

    const mid = Math.floor((low + high) / 2);
    const left = findMinMax(arr, low, mid);
    const right = findMinMax(arr, mid + 1, high);

    return {
      min: Math.min(left.min, right.min),
      max: Math.max(left.max, right.max),
    };
  };

  // Handle user input and start visualization
  const handleVisualize = () => {
    const arr = inputArray.split(",").map((num) => parseInt(num.trim(), 10));
    if (arr.some(isNaN)) {
      alert("Please enter valid numbers separated by commas.");
      return;
    }

    const steps = [];
    const result = findMinMax(arr, 0, arr.length - 1);
    setResult(result);

    // Visualize steps (for simplicity, we log the steps)
    console.log("Steps to find min and max:", steps);
    setSteps(steps);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Divide and Conquer: Find Maximum and Minimum
      </h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter numbers (comma-separated):
          </label>
          <input
            type="text"
            value={inputArray}
            onChange={(e) => setInputArray(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 3, 7, 1, 9, 4"
          />
        </div>
        <button
          onClick={handleVisualize}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Visualize
        </button>

        {result.min !== null && result.max !== null && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Result:</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <p className="text-green-800 font-semibold">Minimum:</p>
                <p className="text-2xl font-bold text-green-800">
                  {result.min}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-blue-800 font-semibold">Maximum:</p>
                <p className="text-2xl font-bold text-blue-800">
                  {result.max}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DivideAndConquerVisualizer;