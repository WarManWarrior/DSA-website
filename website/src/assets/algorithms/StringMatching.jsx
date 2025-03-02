import React, { useState, useEffect } from 'react';

const StringMatchingVisualizer = () => {
  const [text, setText] = useState('');
  const [pattern, setPattern] = useState('');
  const [algorithm, setAlgorithm] = useState('Naive');
  const [matches, setMatches] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [comparisonPath, setComparisonPath] = useState([]);
  const [trajectory, setTrajectory] = useState([]);
  const [speed, setSpeed] = useState(500);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  const colors = {
    match: 'bg-green-400 text-white',
    current: 'bg-blue-400 text-white',
    default: 'bg-gray-200',
    comparison: 'bg-yellow-300',
  };

  const resetVisualization = () => {
    setMatches([]);
    setCurrentIndex(null);
    setComparisonPath([]);
    setTrajectory([]);
    setRunning(false);
    setResult(null);
  };

  const algorithms = {
    Naive: () => {
      const n = text.length;
      const m = pattern.length;
      const results = [];

      const visualize = async () => {
        for (let i = 0; i <= n - m; i++) {
          setCurrentIndex(i);
          let j;
          for (j = 0; j < m; j++) {
            setComparisonPath([i + j]);
            setTrajectory((prev) => [...prev, [i, j]]);
            if (text[i + j] !== pattern[j]) {
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, speed));
          }
          if (j === m) {
            results.push(i);
            setMatches([...results]);
          }
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
        setResult(results.length > 0 ? `Pattern found at indices: ${results.join(', ')}` : 'Pattern not found');
        setRunning(false);
      };

      visualize();
    },

    KMP: () => {
      const n = text.length;
      const m = pattern.length;
      const lps = Array(m).fill(0);
      const results = [];

      const computeLPS = () => {
        let len = 0;
        let i = 1;
        while (i < m) {
          if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
          } else if (len !== 0) {
            len = lps[len - 1];
          } else {
            lps[i] = 0;
            i++;
          }
        }
      };

      const visualize = async () => {
        computeLPS();
        let i = 0;
        let j = 0;
        while (i < n) {
          setCurrentIndex(i - j);
          setComparisonPath([i, i + j]);
          setTrajectory((prev) => [...prev, [i, j]]);
          if (pattern[j] === text[i]) {
            i++;
            j++;
          }
          if (j === m) {
            results.push(i - j);
            setMatches([...results]);
            j = lps[j - 1];
          } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
              j = lps[j - 1];
            } else {
              i++;
            }
          }
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
        setResult(results.length > 0 ? `Pattern found at indices: ${results.join(', ')}` : 'Pattern not found');
        setRunning(false);
      };

      visualize();
    },

    RabinKarp: () => {
      const d = 256;
      const q = 101;
      const n = text.length;
      const m = pattern.length;
      const results = [];

      const visualize = async () => {
        let p = 0;
        let t = 0;
        let h = 1;

        for (let i = 0; i < m - 1; i++) {
          h = (h * d) % q;
        }

        for (let i = 0; i < m; i++) {
          p = (d * p + pattern.charCodeAt(i)) % q;
          t = (d * t + text.charCodeAt(i)) % q;
        }

        for (let i = 0; i <= n - m; i++) {
          setCurrentIndex(i);
          setComparisonPath([i]);
          if (p === t) {
            let match = true;
            for (let j = 0; j < m; j++) {
              setComparisonPath([i + j]);
              setTrajectory((prev) => [...prev, [i, j]]);
              if (text[i + j] !== pattern[j]) {
                match = false;
                break;
              }
              await new Promise((resolve) => setTimeout(resolve, speed));
            }
            if (match) {
              results.push(i);
              setMatches([...results]);
            }
          }
          if (i < n - m) {
            t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
            if (t < 0) t += q;
          }
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
        setResult(results.length > 0 ? `Pattern found at indices: ${results.join(', ')}` : 'Pattern not found');
        setRunning(false);
      };

      visualize();
    },

    BoyerMoore: () => {
      // Boyer-Moore implementation
      // Left for extension as per requirement
    },
  };

  const handleStart = () => {
    resetVisualization();
    setRunning(true);
    algorithms[algorithm]();
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-purple-200 to-blue-100 h-full w-full">
      <h1 className="text-4xl font-bold text-center text-gray-800">String Matching Visualizer</h1>

      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border border-gray-400 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
            disabled={running}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Pattern</label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="border border-gray-400 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
            disabled={running}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">Algorithm</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="border border-gray-400 p-2 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
            disabled={running}
          >
            <option value="Naive">Naive</option>
            <option value="KMP">Knuth-Morris-Pratt</option>
            <option value="RabinKarp">Rabin-Karp</option>
            <option value="BoyerMoore">Boyer-Moore</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-lg font-medium text-gray-700">Speed</label>
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={running}
        />
      </div>

      <button
        onClick={handleStart}
        disabled={running || !text || !pattern}
        className="w-full p-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 disabled:bg-gray-300"
      >
        Start Visualization
      </button>

      <div className="flex flex-wrap space-x-2 mt-6">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`px-4 py-2 border rounded-lg ${
              matches.includes(index)
                ? colors.match
                : comparisonPath.includes(index)
                ? colors.comparison
                : index === currentIndex
                ? colors.current
                : colors.default
            }`}
          >
            {char}
          </span>
        ))}
      </div>

      {comparisonPath.length > 0 && (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 rounded-lg border border-yellow-300">
          Comparing: {comparisonPath.map((idx) => text[idx] || '').join('')} with {pattern}
        </div>
      )}

      {trajectory.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-700">Comparison Trajectory</h2>
          <div className="grid grid-cols-12 gap-1 mt-4">
            {trajectory.map(([i, j], index) => (
              <div
                key={index}
                className="p-2 text-center border rounded-lg bg-blue-200"
              >
                T{i} - P{j}
              </div>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg border border-green-300">
          {result}
        </div>
      )}
    </div>
  );
};

export default StringMatchingVisualizer;