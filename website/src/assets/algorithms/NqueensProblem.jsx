import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NQueens = () => {
  const [N, setN] = useState(4);
  const [board, setBoard] = useState(Array(4).fill().map(() => Array(4).fill(false)));
  const [speed, setSpeed] = useState(500);
  const [isSolving, setIsSolving] = useState(false);
  const [solutions, setSolutions] = useState([]);
  const [currentSolution, setCurrentSolution] = useState(0);

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

  const solveNQueensRecursively = (board, col, solutions) => {
    if (col >= N) {
      solutions.push(board.map(row => [...row]));
      return;
    }

    for (let i = 0; i < N; i++) {
      if (isSafe(board, i, col)) {
        board[i][col] = true;
        solveNQueensRecursively(board, col + 1, solutions);
        board[i][col] = false;
      }
    }
  };

  const startVisualization = () => {
    setIsSolving(false);
    setSolutions([]);
    setCurrentSolution(0);
    const initialBoard = Array(N).fill().map(() => Array(N).fill(false));
    const foundSolutions = [];
    solveNQueensRecursively(initialBoard, 0, foundSolutions);
    setSolutions(foundSolutions);
    if (foundSolutions.length > 0) {
      setBoard(foundSolutions[0]);
    }
  };

  const resetBoard = () => {
    setIsSolving(false);
    setBoard(Array(N).fill().map(() => Array(N).fill(false)));
    setSolutions([]);
    setCurrentSolution(0);
  };

  const nextSolution = () => {
    if (solutions.length > 0) {
      setCurrentSolution((prev) => (prev + 1) % solutions.length);
      setBoard(solutions[(currentSolution + 1) % solutions.length]);
    }
  };

  const prevSolution = () => {
    if (solutions.length > 0) {
      setCurrentSolution((prev) => (prev - 1 + solutions.length) % solutions.length);
      setBoard(solutions[(currentSolution - 1 + solutions.length) % solutions.length]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">N-Queens Problem Visualizer</h1>
      <div className="mb-4">
        <label className="mr-2">Board Size:</label>
        <input
          type="number"
          min="4"
          max="20"
          value={N}
          onChange={(e) => setN(Number(e.target.value))}
          className="border border-gray-400 p-1 rounded text-white"
        />
      </div>
      <p className="mb-2">Solutions Found: {solutions.length}</p>
      <p className="mb-2">Current Solution: {solutions.length > 0 ? currentSolution + 1 : 0}</p>
      <div
        className="grid gap-2 bg-gray-400 p-4 rounded-lg border border-black"
        style={{ gridTemplateColumns: `repeat(${N}, 1fr)`, width: `calc(${N} * 4rem)` }}
      >
        {board.map((row, i) =>
          row.map((cell, j) => (
            <motion.div
              key={`${i}-${j}`}
              className={`flex items-center justify-center border border-black rounded-md shadow-lg transition-all duration-300 ${
                (i + j) % 2 === 0 ? "bg-gray-300" : "bg-white"
              }`}
              style={{ width: `3rem`, height: `3rem` }}
              animate={{ scale: cell ? 1.3 : 1 }}
            >
              {cell && <motion.span className="text-4xl text-purple-700" animate={{ opacity: 1 }} exit={{ opacity: 0 }}>♛</motion.span>}
            </motion.div>
          ))
        )}
      </div>
      <div className="mt-6 space-x-4">
        <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={startVisualization} disabled={isSolving}>Find Solutions</button>
        <button className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={resetBoard}>Reset</button>
        <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={prevSolution} disabled={solutions.length === 0}>Previous Solution</button>
        <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={nextSolution} disabled={solutions.length === 0}>Next Solution</button>
      </div>
    </div>
  );
};

export default NQueens;
