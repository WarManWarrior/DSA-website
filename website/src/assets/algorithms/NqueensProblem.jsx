import React, { useState, useEffect } from "react";

const NQueensVisualizer = () => {
  const [N, setN] = useState(8);
  const [board, setBoard] = useState(Array(8).fill().map(() => Array(8).fill(false)));
  const [speed, setSpeed] = useState(500);
  const [isSolving, setIsSolving] = useState(false);
  const [solutions, setSolutions] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSolution, setCurrentSolution] = useState(0);

  useEffect(() => {
    if (isSolving && currentStep < steps.length) {
      const timer = setTimeout(() => {
        setBoard(steps[currentStep]);
        setCurrentStep(currentStep + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
    if (isSolving && currentStep >= steps.length) {
      setIsSolving(false);
      if (steps.length > 0) {
        setBoard(steps[steps.length - 1]); // Ensure the final solution remains visible
      }
    }
  }, [isSolving, currentStep, steps, speed]);

  const isSafe = (board, row, col) => {
    for (let i = 0; i < col; i++) {
      if (board[row][i]) return false;
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j]) return false;
    }
    for (let i = row, j = col; i < N && j >= 0; i++, j--) {
      if (board[i][j]) return false;
    }
    return true;
  };

  const solveNQueensRecursively = (board, col, solutions, steps) => {
    if (col >= N) {
      const solution = board.map(row => [...row]);
      solutions.push(solution);
      steps.push(solution);
      return;
    }

    for (let i = 0; i < N; i++) {
      if (isSafe(board, i, col)) {
        board[i][col] = true;
        steps.push(board.map(row => [...row]));
        solveNQueensRecursively(board, col + 1, solutions, steps);
        board[i][col] = false;
        steps.push(board.map(row => [...row]));
      }
    }
  };

  const startVisualization = () => {
    setIsSolving(false);
    setCurrentStep(0);
    setSolutions([]);
    setCurrentSolution(0);
    const initialBoard = Array(N).fill().map(() => Array(N).fill(false));
    const foundSolutions = [];
    const animationSteps = [];
    solveNQueensRecursively(initialBoard, 0, foundSolutions, animationSteps);
    setSolutions(foundSolutions);
    if (foundSolutions.length > 0) {
      setSteps(animationSteps);
    }
    setIsSolving(true);
  };

  const prepareStepsForSolution = (solution) => {
    const animationSteps = [];
    const emptyBoard = Array(N).fill().map(() => Array(N).fill(false));
    solution.forEach((row, rowIndex) => {
      const step = emptyBoard.map(row => [...row]);
      const queenCol = row.findIndex(cell => cell);
      step[rowIndex][queenCol] = true;
      animationSteps.push(step);
    });
    animationSteps.push(solution); // Add the final solution explicitly
    return animationSteps;
  };

  const showSolution = (index) => {
    if (index >= 0 && index < solutions.length) {
      setCurrentSolution(index);
      const animationSteps = prepareStepsForSolution(solutions[index]);
      setSteps(animationSteps);
      setCurrentStep(0);
      setIsSolving(true);
    }
  };

  const nextSolution = () => {
    const nextIndex = (currentSolution + 1) % solutions.length;
    showSolution(nextIndex);
  };

  const previousSolution = () => {
    const prevIndex = (currentSolution - 1 + solutions.length) % solutions.length;
    showSolution(prevIndex);
  };

  const resetBoard = () => {
    setBoard(Array(N).fill().map(() => Array(N).fill(false)));
    setIsSolving(false);
    setSolutions([]);
    setSteps([]);
    setCurrentStep(0);
    setCurrentSolution(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">N-Queens Problem Visualizer</h1>

      <div className="flex space-x-4 mb-4">
        <label className="text-gray-700 font-medium">Board Size:</label>
        <input
          type="number"
          value={N}
          onChange={e => {
            const newSize = Math.max(4, Math.min(16, parseInt(e.target.value) || 8));
            setN(newSize);
            setBoard(Array(newSize).fill().map(() => Array(newSize).fill(false)));
            resetBoard();
          }}
          className="w-16 text-center border border-gray-400 rounded px-2 py-1"
        />

        <label className="text-gray-700 font-medium">Speed (ms):</label>
        <input
          type="number"
          value={speed}
          onChange={e => setSpeed(Math.max(100, parseInt(e.target.value) || 500))}
          className="w-16 text-center border border-gray-400 rounded px-2 py-1"
        />
      </div>

      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))`, width: `calc(${N} * 3rem)` }}>
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-12 h-12 flex items-center justify-center border ${
                (i + j) % 2 === 0 ? "bg-gray-300" : "bg-white"
              }`}
            >
              {cell && <span className="text-2xl">♟</span>}
            </div>
          ))
        )}
      </div>

      <div className="mt-6 space-x-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={startVisualization}
          disabled={isSolving}
        >
          {isSolving ? "Visualizing..." : "Find Solutions"}
        </button>
        <button
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={previousSolution}
          disabled={solutions.length === 0}
        >
          Previous Solution
        </button>
        <button
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={nextSolution}
          disabled={solutions.length === 0}
        >
          Next Solution
        </button>
        <button
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={resetBoard}
          disabled={isSolving}
        >
          Reset Board
        </button>
      </div>

      {solutions.length > 0 && (
        <div className="mt-4 text-green-600 font-medium">
          {`Total Solutions: ${solutions.length} | Currently Viewing Solution ${currentSolution + 1}`}
        </div>
      )}
      {isSolving && currentStep < steps.length && (
        <div className="mt-4 text-yellow-600 font-medium">Visualizing Step {currentStep + 1} of {steps.length}</div>
      )}
    </div>
  );
};

export default NQueensVisualizer;
