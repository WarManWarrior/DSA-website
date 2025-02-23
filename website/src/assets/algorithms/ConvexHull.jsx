import React, { useState, useRef, useEffect } from 'react';

const ConvexHullVisualizer = () => {
  const [points, setPoints] = useState([]);
  const [leftHull, setLeftHull] = useState([]);
  const [rightHull, setRightHull] = useState([]);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef(null);

  const addPoint = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPoints((prev) => [...prev, { x, y }]);
    setLeftHull([]);
    setRightHull([]);
    setAnimationIndex(0);
    setIsAnimating(false);
  };

  const clearCanvas = () => {
    setPoints([]);
    setLeftHull([]);
    setRightHull([]);
    setAnimationIndex(0);
    setIsAnimating(false);
  };

  const generateRandomPoints = () => {
    const randomPoints = Array.from({ length: 15 }, () => ({
      x: Math.random() * 500,
      y: Math.random() * 500,
    }));
    setPoints(randomPoints);
    setLeftHull([]);
    setRightHull([]);
    setAnimationIndex(0);
    setIsAnimating(false);
  };

  const calculateConvexHull = () => {
    if (points.length < 3) {
      alert('At least 3 points are required.');
      return;
    }
    const sortedPoints = [...points].sort((a, b) => a.x - b.x);
    const crossProduct = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    const left = [], right = [], leftSteps = [], rightSteps = [];

    for (const point of sortedPoints) {
      while (left.length >= 2 && crossProduct(left[left.length - 2], left[left.length - 1], point) <= 0) left.pop();
      left.push(point);
      leftSteps.push([...left]);
    }
    
    for (let i = sortedPoints.length - 1; i >= 0; i--) {
      const point = sortedPoints[i];
      while (right.length >= 2 && crossProduct(right[right.length - 2], right[right.length - 1], point) <= 0) right.pop();
      right.push(point);
      rightSteps.push([...right]);
    }

    setLeftHull(leftSteps);
    setRightHull(rightSteps);
    setAnimationIndex(0);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (isAnimating && animationIndex < Math.max(leftHull.length, rightHull.length)) {
      const timer = setTimeout(() => setAnimationIndex((prev) => prev + 1), animationSpeed);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, animationIndex, leftHull, rightHull, animationSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    points.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();
    });

    const drawHull = (hull, color) => {
      if (animationIndex > 0 && hull.length > 0) {
        const step = hull[Math.min(animationIndex - 1, hull.length - 1)];
        ctx.beginPath();
        ctx.moveTo(step[0].x, step[0].y);
        step.forEach(({ x, y }) => ctx.lineTo(x, y));
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    drawHull(leftHull, 'red');
    drawHull(rightHull, 'yellow');
  }, [points, leftHull, rightHull, animationIndex]);

  return (
    <div className="flex h-full w-full flex-col items-center mt-10">
      <h1 className="text-3xl font-bold text-yellow-400 mb-5">Convex Hull Visualizer</h1>
      <canvas ref={canvasRef} onClick={addPoint} width="500" height="500" className="border border-gray-300" />
      <div className="flex space-x-4 mt-5">
        <button onClick={generateRandomPoints} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Generate Random Points</button>
        <button onClick={clearCanvas} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Clear Canvas</button>
        <button onClick={calculateConvexHull} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Start Convex Hull</button>
      </div>
      <div className="mt-5 flex items-center space-x-4">
        <label htmlFor="speed" className="text-yellow-500">Speed:</label>
        <input id="speed" type="range" min="100" max="1000" step="100" value={animationSpeed} onChange={(e) => setAnimationSpeed(Number(e.target.value))} className="w-48" />
        <span className="text-yellow-500">{animationSpeed} ms</span>
      </div>
    </div>
  );
};

export default ConvexHullVisualizer;
