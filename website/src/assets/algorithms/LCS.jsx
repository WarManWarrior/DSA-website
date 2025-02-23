import React, { useState, useEffect } from "react";

const LCSVisualizer = () => {
  const [string1, setString1] = useState("");
  const [string2, setString2] = useState("");
  const [dpTable, setDpTable] = useState([]);
  const [currentCell, setCurrentCell] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const [isRunning, setIsRunning] = useState(false);
  const [lcs, setLcs] = useState("");

  const calculateLCS = async () => {
    setIsRunning(true);
    const m = string1.length;
    const n = string2.length;
    const dp = Array(m + 1)
      .fill(null)
      .map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        setCurrentCell({ i, j });
        await new Promise((resolve) => setTimeout(resolve, animationSpeed));

        if (string1[i - 1] === string2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
        setDpTable([...dp]);
      }
    }
    reconstructLCS(dp);
    setIsRunning(false);
  };

  const reconstructLCS = (dp) => {
    let i = string1.length;
    let j = string2.length;
    let lcsResult = "";

    while (i > 0 && j > 0) {
      if (string1[i - 1] === string2[j - 1]) {
        lcsResult = string1[i - 1] + lcsResult;
        i--;
        j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
    setLcs(lcsResult);
  };

  return (
    <div className="f-full w-full bg-gray-100 p-5">
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-md">
        <h1 className="text-2xl font-bold text-center mb-4">LCS Visualizer</h1>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={string1}
            onChange={(e) => setString1(e.target.value)}
            placeholder="Enter String 1"
            className="border rounded-md px-3 py-2 w-full"
            disabled={isRunning}
          />
          <input
            type="text"
            value={string2}
            onChange={(e) => setString2(e.target.value)}
            placeholder="Enter String 2"
            className="border rounded-md px-3 py-2 w-full"
            disabled={isRunning}
          />
          <button
            onClick={calculateLCS}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={isRunning}
          >
            Visualize
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Animation Speed: {animationSpeed}ms
          </label>
          <input
            type="range"
            min="100"
            max="1000"
            step="100"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(e.target.value)}
            className="w-full"
            disabled={isRunning}
          />
        </div>

        {dpTable.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Memo Table</h2>
            <div className="overflow-auto">
              <table className="table-auto border-collapse border border-gray-400 mx-auto">
                <tbody>
                  {dpTable.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`border px-2 py-1 text-center ${
                            currentCell?.i === i && currentCell?.j === j
                              ? "bg-yellow-200"
                              : currentCell &&
                                (currentCell.i === i || currentCell.j === j)
                              ? "bg-blue-100"
                              : "bg-white"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {lcs && (
          <div className="mt-4">
            <h2 className="text-lg font-medium">
              Longest Common Subsequence:{" "}
              <span className="text-blue-600 font-bold">{lcs}</span>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default LCSVisualizer;