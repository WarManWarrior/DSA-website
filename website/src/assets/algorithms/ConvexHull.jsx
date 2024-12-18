import React, { useState, useRef, useEffect } from 'react';

// Convex Hull Algorithm (Graham's Scan)
const ConvexHullVisualizer = () => {
  const [points, setPoints] = useState([]);
  const [hull, setHull] = useState([]);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const canvasRef = useRef(null);

  // Add a point when the user clicks on the canvas
  const addPoint = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setPoints((prevPoints) => [...prevPoints, { x, y }]);
    setHull([]);
    setAnimationIndex(0);
    setIsAnimating(false);
    setIsCalculating(false);
  };

  // Clear all points and reset state
  const clearCanvas = () => {
    setPoints([]);
    setHull([]);
    setAnimationIndex(0);
    setIsAnimating(false);
    setIsCalculating(false);
  };

  // Generate random points
  const generateRandomPoints = () => {
    const randomPoints = Array.from({ length: 15 }, () => ({
      x: Math.random() * 500,
      y: Math.random() * 500,
    }));
    setPoints(randomPoints);
    setHull([]);
    setAnimationIndex(0);
    setIsAnimating(false);
    setIsCalculating(false);
  };

  // Convex Hull Calculation (Graham's Scan)
  const calculateConvexHull = () => {
    if (points.length < 3) {
      alert('At least 3 points are required to calculate a convex hull.');
      return;
    }

    // Sort the points by x-coordinate and then by y-coordinate
    const sortedPoints = [...points].sort((a, b) =>
      a.x === b.x ? a.y - b.y : a.x - b.x
    );

    const crossProduct = (o, a, b) =>
      (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

    const steps = [];
    const lower = [];
    for (const point of sortedPoints) {
      while (
        lower.length >= 2 &&
        crossProduct(lower[lower.length - 2], lower[lower.length - 1], point) <=
          0
      ) {
        lower.pop();
        steps.push([...lower]); // Save the current hull at this step
      }
      lower.push(point);
      steps.push([...lower]);
    }

    const upper = [];
    for (let i = sortedPoints.length - 1; i >= 0; i--) {
      const point = sortedPoints[i];
      while (
        upper.length >= 2 &&
        crossProduct(upper[upper.length - 2], upper[upper.length - 1], point) <=
          0
      ) {
        upper.pop();
        steps.push([...lower, ...upper]); // Save the current hull at this step
      }
      upper.push(point);
      steps.push([...lower, ...upper]);
    }

    steps.push([...lower, ...upper.slice(1, upper.length - 1)]); // Final hull
    setHull(steps);
    setAnimationIndex(0);
    setIsAnimating(true);
    setIsCalculating(false);
  };

  // Animate the convex hull construction
  useEffect(() => {
    if (isAnimating && animationIndex < hull.length) {
      const timer = setTimeout(() => {
        setAnimationIndex((prev) => prev + 1);
      }, animationSpeed);
      return () => clearTimeout(timer);
    }
    if (animationIndex >= hull.length) {
      setIsAnimating(false); // Stop animation when completed
    }
  }, [isAnimating, animationIndex, hull.length, animationSpeed]);

  // Draw points and hull on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background (black canvas)
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw points (blue color)
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();
    });

    // Draw the hull steps (red color for current step)
    if (animationIndex > 0 && hull.length > 0) {
      const currentHull = hull[animationIndex - 1];
      ctx.beginPath();
      ctx.moveTo(currentHull[0].x, currentHull[0].y);
      currentHull.forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.closePath();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [points, hull, animationIndex]);

  // Handle Start Convex Hull button click
  const handleStartConvexHull = () => {
    if (points.length < 3) {
      alert('At least 3 points are required to calculate a convex hull.');
      return;
    }
    setIsCalculating(true);
    calculateConvexHull();
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold text-yellow-400 mb-5">Convex Hull Visualizer</h1>
      <canvas
        ref={canvasRef}
        onClick={addPoint}
        width="500"
        height="500"
        className="border border-gray-300"
      />
      <div className="flex space-x-4 mt-5">
        <button
          onClick={generateRandomPoints}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Generate Random Points
        </button>
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Canvas
        </button>
        <button
          onClick={handleStartConvexHull}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {isCalculating ? 'Calculating...' : 'Start Convex Hull'}
        </button>
      </div>
      <div className="mt-5 flex items-center space-x-4">
        <label htmlFor="speed" className="text-yellow-500">Speed:</label>
        <input
          id="speed"
          type="range"
          min="100"
          max="1000"
          step="100"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(Number(e.target.value))}
          className="w-48"
        />
        <span className="text-yellow-500">{animationSpeed} ms</span>
      </div>
    </div>
  );
};

export default ConvexHullVisualizer;
