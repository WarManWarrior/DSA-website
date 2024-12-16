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

  const [result, setResult] = useState(null);
  const [step, setStep] = useState(0);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    // Compute Strassen algorithm steps and store them
    const computedSteps = strassenSteps(matrixA, matrixB);
    setSteps(computedSteps);
  }, [matrixA, matrixB]);

  useEffect(() => {
    if (steps.length > 0 && step < steps.length) {
      const timeout = setTimeout(() => setStep(step + 1), 1000);
      return () => clearTimeout(timeout); // Clear timeout on cleanup
    }
  }, [step, steps]);

  const strassenSteps = (A, B) => {
    if (A.length !== 4 || A[0].length !== 4 || B.length !== 4 || B[0].length !== 4) {
      return [{ message: "Invalid matrices. Ensure both are 4x4.", value: null }];
    }

    // Strassen's algorithm divides matrices into 2x2 quadrants for calculation.
    const [A11, A12, A21, A22] = divideMatrix(A);
    const [B11, B12, B21, B22] = divideMatrix(B);

    // Recursive multiplications for Strassen's algorithm.
    const M1 = multiplyMatrices(addMatrices(A11, A22), addMatrices(B11, B22));
    const M2 = multiplyMatrices(addMatrices(A21, A22), B11);
    const M3 = multiplyMatrices(A11, subtractMatrices(B12, B22));
    const M4 = multiplyMatrices(A22, subtractMatrices(B21, B11));
    const M5 = multiplyMatrices(addMatrices(A11, A12), B22);
    const M6 = multiplyMatrices(subtractMatrices(A21, A11), addMatrices(B11, B12));
    const M7 = multiplyMatrices(subtractMatrices(A12, A22), addMatrices(B21, B22));

    // Combine results into final matrix
    const C11 = addMatrices(subtractMatrices(addMatrices(M1, M4), M5), M7);
    const C12 = addMatrices(M3, M5);
    const C21 = addMatrices(M2, M4);
    const C22 = addMatrices(subtractMatrices(addMatrices(M1, M3), M2), M6);

    const resultMatrix = combineMatrix(C11, C12, C21, C22);

    const steps = [
      { message: "Calculating M1", value: M1 },
      { message: "Calculating M2", value: M2 },
      { message: "Calculating M3", value: M3 },
      { message: "Calculating M4", value: M4 },
      { message: "Calculating M5", value: M5 },
      { message: "Calculating M6", value: M6 },
      { message: "Calculating M7", value: M7 },
      { message: "Combining results", value: resultMatrix }
    ];

    return steps;
  };

  const handleReset = () => {
    setStep(0);
    setSteps(strassenSteps(matrixA, matrixB));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Strassen Matrix Multiplication Visualization
      </h1>
      <div className="flex gap-8 items-start">
        <MatrixDisplay title="Matrix A" matrix={matrixA} bgColor="bg-blue-500" />
        <MatrixDisplay title="Matrix B" matrix={matrixB} bgColor="bg-green-500" />
      </div>

      <div className="mt-8 w-full max-w-4xl">
        <div className="bg-white shadow-lg rounded-lg p-6 animate-slideIn">
          {step < steps.length ? (
            <div>
              <h3 className="text-lg font-semibold">{steps[step].message}</h3>
              <MatrixDisplay matrix={steps[step].value || []} bgColor="bg-purple-500" />
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold">Result</h3>
              <MatrixDisplay matrix={steps[steps.length - 1]?.value || []} bgColor="bg-purple-500" />
            </div>
          )}
        </div>
        <button
          className="mt-6 w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
          onClick={handleReset}
        >
          Reset Animation
        </button>
      </div>
    </div>
  );
};

const MatrixDisplay = ({ title, matrix, bgColor }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
    <div className="grid grid-cols-4 gap-2">
      {matrix.map((row, rowIndex) =>
        row.map((val, colIndex) => (
          <div
            key={`${title}-${rowIndex}-${colIndex}`}
            className={`w-12 h-12 flex items-center justify-center ${bgColor} text-white rounded-lg`}
          >
            {val}
          </div>
        ))
      )}
    </div>
  </div>
);

// Helper functions for matrix operations
const addMatrices = (A, B) =>
  A.map((row, i) => row.map((val, j) => val + B[i][j]));

const subtractMatrices = (A, B) =>
  A.map((row, i) => row.map((val, j) => val - B[i][j]));

const multiplyMatrices = (A, B) =>
  A.map((row, i) =>
    B[0].map((_, j) => row.reduce((sum, _, k) => sum + A[i][k] * B[k][j], 0))
  );

const divideMatrix = (M) => {
  const n = M.length / 2;
  return [
    M.slice(0, n).map((row) => row.slice(0, n)),
    M.slice(0, n).map((row) => row.slice(n)),
    M.slice(n).map((row) => row.slice(0, n)),
    M.slice(n).map((row) => row.slice(n))
  ];
};

const combineMatrix = (C11, C12, C21, C22) => {
  const top = C11.map((row, i) => [...row, ...C12[i]]);
  const bottom = C21.map((row, i) => [...row, ...C22[i]]);
  return [...top, ...bottom];
};

export default StrassenMatrixVisualization;
