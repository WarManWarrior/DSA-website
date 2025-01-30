import React, { useState, useEffect } from "react";

const StrassenMatrixVisualization = () => {
  const [matrixA, setMatrixA] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
  ]);

  const [matrixB, setMatrixB] = useState([
    [17, 18, 19, 20],
    [21, 22, 23, 24],
    [25, 26, 27, 28],
    [29, 30, 31, 32]
  ]);

  const [steps, setSteps] = useState([]);
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setSteps(strassenSteps(matrixA, matrixB));
  }, [matrixA, matrixB]);

  useEffect(() => {
    if (isPlaying && step < steps.length - 1) {
      const timeout = setTimeout(() => setStep(step + 1), 1000);
      return () => clearTimeout(timeout);
    }
  }, [isPlaying, step, steps]);

  const strassenSteps = (A, B) => {
    const [A11, A12, A21, A22] = divideMatrix(A);
    const [B11, B12, B21, B22] = divideMatrix(B);

    const M1 = multiplyMatrices(addMatrices(A11, A22), addMatrices(B11, B22));
    const M2 = multiplyMatrices(addMatrices(A21, A22), B11);
    const M3 = multiplyMatrices(A11, subtractMatrices(B12, B22));
    const M4 = multiplyMatrices(A22, subtractMatrices(B21, B11));
    const M5 = multiplyMatrices(addMatrices(A11, A12), B22);
    const M6 = multiplyMatrices(subtractMatrices(A21, A11), addMatrices(B11, B12));
    const M7 = multiplyMatrices(subtractMatrices(A12, A22), addMatrices(B21, B22));

    const C11 = addMatrices(subtractMatrices(addMatrices(M1, M4), M5), M7);
    const C12 = addMatrices(M3, M5);
    const C21 = addMatrices(M2, M4);
    const C22 = addMatrices(subtractMatrices(addMatrices(M1, M3), M2), M6);

    const resultMatrix = combineMatrix(C11, C12, C21, C22);

    return [
      { message: "Calculating M1", value: M1 },
      { message: "Calculating M2", value: M2 },
      { message: "Calculating M3", value: M3 },
      { message: "Calculating M4", value: M4 },
      { message: "Calculating M5", value: M5 },
      { message: "Calculating M6", value: M6 },
      { message: "Calculating M7", value: M7 },
      { message: "Final result", value: resultMatrix }
    ];
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex flex-col items-center text-white">
      <h1 className="text-3xl font-bold mb-4">Strassen Matrix Multiplication</h1>
      <div className="flex gap-6">
        <MatrixDisplay title="Matrix A" matrix={matrixA} />
        <MatrixDisplay title="Matrix B" matrix={matrixB} />
      </div>

      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">{steps[step]?.message}</h3>
        <MatrixDisplay matrix={steps[step]?.value || [[]]} />
      </div>

      <div className="mt-6 flex gap-4">
        <button onClick={() => setStep(Math.max(step - 1, 0))} className="bg-blue-500 px-4 py-2 rounded-lg">Previous</button>
        <button onClick={() => setIsPlaying(!isPlaying)} className="bg-green-500 px-4 py-2 rounded-lg">{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={() => setStep(Math.min(step + 1, steps.length - 1))} className="bg-blue-500 px-4 py-2 rounded-lg">Next</button>
      </div>
    </div>
  );
};

const MatrixDisplay = ({ title, matrix }) => (
  <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
    {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
    <div className="grid grid-cols-4 gap-2">
      {matrix.map((row, rowIndex) =>
        row.map((val, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="w-12 h-12 flex items-center justify-center bg-indigo-500 text-white rounded-lg">
            {val}
          </div>
        ))
      )}
    </div>
  </div>
);

const addMatrices = (A, B) => A.map((row, i) => row.map((val, j) => val + B[i][j]));
const subtractMatrices = (A, B) => A.map((row, i) => row.map((val, j) => val - B[i][j]));
const multiplyMatrices = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((sum, _, k) => sum + A[i][k] * B[k][j], 0)));

const divideMatrix = (M) => {
  const n = M.length / 2;
  return [
    M.slice(0, n).map(row => row.slice(0, n)),
    M.slice(0, n).map(row => row.slice(n)),
    M.slice(n).map(row => row.slice(0, n)),
    M.slice(n).map(row => row.slice(n))
  ];
};

const combineMatrix = (C11, C12, C21, C22) => {
  const top = C11.map((row, i) => [...row, ...C12[i]]);
  const bottom = C21.map((row, i) => [...row, ...C22[i]]);
  return [...top, ...bottom];
};

export default StrassenMatrixVisualization;
