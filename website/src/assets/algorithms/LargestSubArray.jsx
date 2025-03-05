import React, { useState, useEffect } from "react";
import { Button, Card, CardBody } from "daisyui";
import { motion } from "framer-motion";

const LargestSubarrayVisualizer = () => {
  const [arr, setArr] = useState([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
  const [subarray, setSubarray] = useState([]);
  const [maxSum, setMaxSum] = useState(null);
  
  const findMaxCrossingSubarray = (nums, left, mid, right) => {
    let leftSum = -Infinity, rightSum = -Infinity;
    let sum = 0, maxLeft = mid, maxRight = mid + 1;
    let tempLeft = [], tempRight = [];

    for (let i = mid; i >= left; i--) {
      sum += nums[i];
      tempLeft.unshift(nums[i]);
      if (sum > leftSum) {
        leftSum = sum;
        maxLeft = i;
      }
    }
    sum = 0;
    for (let j = mid + 1; j <= right; j++) {
      sum += nums[j];
      tempRight.push(nums[j]);
      if (sum > rightSum) {
        rightSum = sum;
        maxRight = j;
      }
    }
    return { sum: leftSum + rightSum, range: [maxLeft, maxRight] };
  };

  const findMaxSubarray = (nums, left, right) => {
    if (left === right) return { sum: nums[left], range: [left, right] };
    
    const mid = Math.floor((left + right) / 2);
    const leftSub = findMaxSubarray(nums, left, mid);
    const rightSub = findMaxSubarray(nums, mid + 1, right);
    const crossSub = findMaxCrossingSubarray(nums, left, mid, right);

    if (leftSub.sum >= rightSub.sum && leftSub.sum >= crossSub.sum) {
      return leftSub;
    } else if (rightSub.sum >= leftSub.sum && rightSub.sum >= crossSub.sum) {
      return rightSub;
    } else {
      return crossSub;
    }
  };

  const visualizeSubarray = () => {
    const result = findMaxSubarray(arr, 0, arr.length - 1);
    setSubarray(arr.slice(result.range[0], result.range[1] + 1));
    setMaxSum(result.sum);
  };

  return (
    <div className="flex flex-col items-center p-6 gap-4">
      <h1 className="text-2xl font-bold text-primary">Largest Subarray Sum Visualization</h1>
      <Card className="w-96 shadow-xl">
        <CardBody className="flex flex-wrap gap-2 justify-center">
          {arr.map((num, idx) => (
            <motion.div
              key={idx}
              className={`p-2 w-10 text-center rounded-md ${subarray.includes(num) ? "bg-green-500 text-white" : "bg-gray-300"}`}
              whileHover={{ scale: 1.2 }}>
              {num}
            </motion.div>
          ))}
        </CardBody>
      </Card>
      <Button className="btn-primary" onClick={visualizeSubarray}>Find Largest Subarray</Button>
      {maxSum !== null && (
        <div className="text-lg font-semibold">Max Sum: {maxSum}</div>
      )}
    </div>
  );
};

export default LargestSubarrayVisualizer;
