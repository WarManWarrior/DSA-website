import React from "react";

const Algorithm = () => (
  <div>
    <h2 className="text-2xl font-semibold mt-4">Algorithm</h2>
    <ol className="list-decimal list-inside mb-4">
      <li>Start from the first element of the list.</li>
      <li>Compare the current element with the target value.</li>
      <li>If they match, return the index of the current element.</li>
      <li>If not, move to the next element and repeat until the end of the list.</li>
      <li>If the end is reached without finding the target, return -1.</li>
    </ol>
  </div>
);

export default Algorithm;
