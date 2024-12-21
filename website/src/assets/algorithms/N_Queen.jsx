import React, { useState, useEffect, useRef } from 'react';

const NQueensVisualizer = () => {
  const [n, setN] = useState(8);
  const [solutions, setSolutions] = useState([]);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(500); // milliseconds
  const animationInterval = useRef(null);

  useEffect(() => {
    solveNQueens(n);
    setCurrentSolutionIndex(0); // Reset index when n changes
  }, [n]);

  useEffect(() => {
    clearInterval(animationInterval.current); // Clear any existing interval

    if (solutions.length > 0) {
        animationInterval.current = setInterval(() => {
            setCurrentSolutionIndex((prevIndex) => (prevIndex + 1) % solutions.length);
        }, animationSpeed);
    }

    return () => clearInterval(animationInterval.current); // Cleanup on unmount or dependency change
}, [solutions, animationSpeed]);

  const isSafe = (board, row, col) => {
    for (let i = 0; i < row; i++) {
      if (board[i] === col || Math.abs(board[i] - col) === row - i) {
        return false;
      }
    }
    return true;
  };

  const solveNQueens = (n) => {
    const result = [];
    const solve = (board, row) => {
      if (row === n) {
        result.push([...board]);
        return;
      }
      for (let col = 0; col < n; col++) {
        if (isSafe(board, row, col)) {
          board[row] = col;
          solve(board, row + 1);
        }
      }
    };
    solve(new Array(n), 0);
    setSolutions(result);
  };

  const currentBoard = solutions.length > 0 ? solutions[currentSolutionIndex] : null;

  return (
    <div className="container mx-auto p-4 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-primary">N-Queens Visualizer</h1>

      <div className="flex items-center justify-center mb-4 space-x-4">
        <label htmlFor="n-input" className="text-lg">N:</label>
        <input
          type="number"
          id="n-input"
          min="1"
          max="12" // Limit for performance reasons
          value={n}
          onChange={(e) => setN(parseInt(e.target.value, 10))}
          className="input input-bordered w-16"
        />
        <label htmlFor="speed-slider">Animation Speed:</label>
        <input
            id="speed-slider"
            type="range"
            min="100"
            max="1000"
            step="50"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseInt(e.target.value, 10))}
            className="range"
        />
      </div>

      <div className="grid grid-cols-1 justify-items-center">
        {currentBoard && (
          <div className={`grid grid-cols-${n} gap-1 border border-base-content p-2 rounded-lg shadow-lg`}>
            {Array.from({ length: n * n }).map((_, index) => {
              const row = Math.floor(index / n);
              const col = index % n;
              const isQueen = currentBoard[row] === col;

              return (
                <div
                  key={index}
                  className={`w-12 h-12 border border-base-300 flex items-center justify-center ${
                    (row + col) % 2 === 0 ? 'bg-base-100' : 'bg-base-200'
                  } ${isQueen ? 'animate-pulse text-primary text-4xl' : ''}`}
                >
                  {isQueen && '♛'}
                </div>
              );
            })}
          </div>
        )}
      </div>
        <p className="text-center mt-4 text-sm text-base-content">
            {solutions.length} solutions found. Showing solution {currentSolutionIndex + 1} of {solutions.length}.
        </p>
    </div>
  );
};

export default NQueensVisualizer;