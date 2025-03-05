import React, { useState } from "react";
import { motion } from "framer-motion";

const LargestSubarraySum = () => {
  const [inputValue, setInputValue] = useState("2,-1,3,-4,5,-2,8,-6,3");
  const [array, setArray] = useState([2, -1, 3, -4, 5, -2, 8, -6, 3]);
  const [maxSubarray, setMaxSubarray] = useState([]);
  const [maxSum, setMaxSum] = useState(0);
  const [steps, setSteps] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setArray(e.target.value.split(",").map(Number));
  };

  const generateRandomArray = () => {
    const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 21) - 10);
    setInputValue(randomArray.join(","));
    setArray(randomArray);
  };

  const findMaxSubarray = () => {
    let maxSum = -Infinity, currentSum = 0;
    let start = 0, end = 0, tempStart = 0;
    let stepLogs = [];
    
    for (let i = 0; i < array.length; i++) {
      currentSum += array[i];
      stepLogs.push(`Adding ${array[i]}, current sum: ${currentSum}`);
      
      if (currentSum > maxSum) {
        maxSum = currentSum;
        start = tempStart;
        end = i;
        stepLogs.push(`New max subarray found from index ${start} to ${end}, sum: ${maxSum}`);
      }
      
      if (currentSum < 0) {
        currentSum = 0;
        tempStart = i + 1;
        stepLogs.push(`Resetting sum at index ${i}, next start at ${tempStart}`);
      }
    }
    setMaxSubarray(array.slice(start, end + 1));
    setMaxSum(maxSum);
    setSteps(stepLogs);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-900 p-6">
      <h2 className="text-xl font-bold text-white mb-4">Largest Subarray Sum</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="mb-4 p-2 rounded-lg border-2 border-gray-300 text-white"
        placeholder="Enter numbers separated by commas"
      />
      <div className="flex gap-2 mb-4">
        {array.map((num, index) => (
          <motion.div
            key={index}
            className={`p-4 rounded-lg text-white font-semibold text-lg shadow-lg transition-all ${
              maxSubarray.includes(num) ? "bg-green-500 scale-110" : "bg-blue-500"
            }`}
            layout
          >
            {num}
          </motion.div>
        ))}
      </div>
      <div className="flex gap-4 mb-4">
        <button onClick={findMaxSubarray} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
          Find Max Subarray
        </button>
        <button onClick={generateRandomArray} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition">
          Generate Random Array
        </button>
      </div>
      <div className="text-white text-left mb-4">
        <h3 className="font-bold">Max Subarray Sum: {maxSum}</h3>
      </div>
      <div className="text-white text-left">
        <h3 className="font-bold mb-2">Steps:</h3>
        <ul className="list-disc pl-5">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LargestSubarraySum;