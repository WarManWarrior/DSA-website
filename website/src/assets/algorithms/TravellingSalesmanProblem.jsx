import React, { useState, useRef, useEffect } from "react";

const App = () => {
  const [cities, setCities] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [edges, setEdges] = useState([]);
  const canvasRef = useRef(null);

  const calculateDistance = (city1, city2) => {
    return Math.sqrt(
      Math.pow(city1.x - city2.x, 2) + Math.pow(city1.y - city2.y, 2)
    );
  };

  const handleCanvasClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCities([...cities, { x, y }]);
  };

  const runAlgorithm = () => {
    switch (selectedAlgorithm) {
      case "Depth First Search":
        depthFirstSearch();
        break;
      case "Random Search":
        randomSearch();
        break;
      case "Branch and Bound":
        branchAndBound();
        break;
      case "Nearest Neighbour":
        nearestNeighbor();
        break;
      case "Nearest Insertion":
        nearestInsertion();
        break;
      case "Farthest Insertion":
        farthestInsertion();
        break;
      case "Arbitrary Insertion":
        arbitraryInsertion();
        break;
      case "Convex Hull":
        convexHull();
        break;
      default:
        alert("Please select an algorithm first!");
    }
  };

  const drawCitiesAndEdges = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    edges.forEach(([start, end]) => {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    });

    cities.forEach((city) => {
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(city.x, city.y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  useEffect(() => {
    drawCitiesAndEdges();
  }, [cities, edges]);

  // Algorithms Implementation

  const depthFirstSearch = () => {
    const permutations = (arr) => {
      if (arr.length === 1) return [arr];
      const result = [];
      arr.forEach((fixed, idx, array) => {
        const rest = [...array.slice(0, idx), ...array.slice(idx + 1)];
        const permuted = permutations(rest);
        permuted.forEach((perm) => result.push([fixed, ...perm]));
      });
      return result;
    };

    const allPermutations = permutations(cities);
    let minCost = Infinity;
    let bestPath = [];

    allPermutations.forEach((path) => {
      let cost = 0;
      for (let i = 0; i < path.length - 1; i++) {
        cost += calculateDistance(path[i], path[i + 1]);
      }
      cost += calculateDistance(path[path.length - 1], path[0]);
      if (cost < minCost) {
        minCost = cost;
        bestPath = path;
      }
    });

    const edgesToDraw = [];
    for (let i = 0; i < bestPath.length - 1; i++) {
      edgesToDraw.push([bestPath[i], bestPath[i + 1]]);
    }
    edgesToDraw.push([bestPath[bestPath.length - 1], bestPath[0]]);
    setEdges(edgesToDraw);

    console.log(`DFS Minimum Cost: ${minCost}`);
  };

  const randomSearch = () => {
    let minCost = Infinity;
    let bestPath = [];

    for (let i = 0; i < 1000; i++) {
      const shuffled = [...cities].sort(() => Math.random() - 0.5);
      let cost = 0;
      for (let i = 0; i < shuffled.length - 1; i++) {
        cost += calculateDistance(shuffled[i], shuffled[i + 1]);
      }
      cost += calculateDistance(shuffled[shuffled.length - 1], shuffled[0]);
      if (cost < minCost) {
        minCost = cost;
        bestPath = shuffled;
      }
    }

    const edgesToDraw = [];
    for (let i = 0; i < bestPath.length - 1; i++) {
      edgesToDraw.push([bestPath[i], bestPath[i + 1]]);
    }
    edgesToDraw.push([bestPath[bestPath.length - 1], bestPath[0]]);
    setEdges(edgesToDraw);

    console.log(`Random Search Minimum Cost: ${minCost}`);
  };

  const branchAndBound = () => {
    const solve = (path, remaining, cost, minCost) => {
      if (remaining.length === 0) {
        const finalCost = cost + calculateDistance(path[path.length - 1], path[0]);
        if (finalCost < minCost) return [path, finalCost];
        return [null, minCost];
      }

      let bestPath = null;
      remaining.forEach((city, index) => {
        const newCost = cost + calculateDistance(path[path.length - 1], city);
        const [newPath, newMinCost] = solve(
          [...path, city],
          [...remaining.slice(0, index), ...remaining.slice(index + 1)],
          newCost,
          minCost
        );
        if (newMinCost < minCost) {
          bestPath = newPath;
          minCost = newMinCost;
        }
      });

      return [bestPath, minCost];
    };

    const [bestPath, minCost] = solve([cities[0]], cities.slice(1), 0, Infinity);

    const edgesToDraw = [];
    for (let i = 0; i < bestPath.length - 1; i++) {
      edgesToDraw.push([bestPath[i], bestPath[i + 1]]);
    }
    edgesToDraw.push([bestPath[bestPath.length - 1], bestPath[0]]);
    setEdges(edgesToDraw);

    console.log(`Branch and Bound Minimum Cost: ${minCost}`);
  };

  const nearestNeighbor = () => {
    if (cities.length === 0) return;

    const visited = new Set();
    const edgesToDraw = [];
    let currentCity = cities[0];
    let totalCost = 0;

    while (visited.size < cities.length) {
      visited.add(currentCity);
      let nearest = null;
      let minDistance = Infinity;

      cities.forEach((city) => {
        if (!visited.has(city)) {
          const distance = calculateDistance(currentCity, city);
          if (distance < minDistance) {
            minDistance = distance;
            nearest = city;
          }
        }
      });

      if (nearest) {
        edgesToDraw.push([currentCity, nearest]);
        totalCost += minDistance;
        currentCity = nearest;
      }
    }

    edgesToDraw.push([currentCity, cities[0]]);
    totalCost += calculateDistance(currentCity, cities[0]);

    setEdges(edgesToDraw);

    console.log(`Nearest Neighbor Cost: ${totalCost}`);
  };

  const nearestInsertion = () => {
    let path = [cities[0]];
    let remaining = cities.slice(1);

    while (remaining.length > 0) {
      let bestInsertion = { city: null, position: 0, cost: Infinity };
      remaining.forEach((city) => {
        path.forEach((_, i) => {
          const cost =
            calculateDistance(path[i], city) +
            calculateDistance(city, path[(i + 1) % path.length]) -
            calculateDistance(path[i], path[(i + 1) % path.length]);
          if (cost < bestInsertion.cost) {
            bestInsertion = { city, position: i + 1, cost };
          }
        });
      });

      path.splice(bestInsertion.position, 0, bestInsertion.city);
      remaining = remaining.filter((city) => city !== bestInsertion.city);
    }

    const edgesToDraw = [];
    for (let i = 0; i < path.length - 1; i++) {
      edgesToDraw.push([path[i], path[i + 1]]);
    }
    edgesToDraw.push([path[path.length - 1], path[0]]);
    setEdges(edgesToDraw);
  };

  const farthestInsertion = () => {
    if (cities.length === 0) return;
    let path = [cities[0]];
    let remaining = cities.slice(1);

    while (remaining.length > 0) {
      let farthestCity = null;
      let maxDistance = -Infinity;

      remaining.forEach((city) => {
        path.forEach((p) => {
          const distance = calculateDistance(city, p);
          if (distance > maxDistance) {
            maxDistance = distance;
            farthestCity = city;
          }
        });
      });

      let bestPosition = 0;
      let minCost = Infinity;

      for (let i = 0; i < path.length; i++) {
        const currentCost =
          calculateDistance(path[i], farthestCity) +
          calculateDistance(farthestCity, path[(i + 1) % path.length]) -
          calculateDistance(path[i], path[(i + 1) % path.length]);
        if (currentCost < minCost) {
          minCost = currentCost;
          bestPosition = i + 1;
        }
      }

      path.splice(bestPosition, 0, farthestCity);
      remaining = remaining.filter((city) => city !== farthestCity);
    }

    const edgesToDraw = [];
    for (let i = 0; i < path.length - 1; i++) {
      edgesToDraw.push([path[i], path[i + 1]]);
    }
    edgesToDraw.push([path[path.length - 1], path[0]]);
    setEdges(edgesToDraw);
  };

  const arbitraryInsertion = () => {
    if (cities.length === 0) return;
    let path = [cities[0]];
    let remaining = cities.slice(1);

    while (remaining.length > 0) {
      const randomIndex = Math.floor(Math.random() * remaining.length);
      const city = remaining[randomIndex];

      let bestPosition = 0;
      let minCost = Infinity;

      for (let i = 0; i < path.length; i++) {
        const currentCost =
          calculateDistance(path[i], city) +
          calculateDistance(city, path[(i + 1) % path.length]) -
          calculateDistance(path[i], path[(i + 1) % path.length]);
        if (currentCost < minCost) {
          minCost = currentCost;
          bestPosition = i + 1;
        }
      }

      path.splice(bestPosition, 0, city);
      remaining = remaining.filter((_, idx) => idx !== randomIndex);
    }

    const edgesToDraw = [];
    for (let i = 0; i < path.length - 1; i++) {
      edgesToDraw.push([path[i], path[i + 1]]);
    }
    edgesToDraw.push([path[path.length - 1], path[0]]);
    setEdges(edgesToDraw);
  };

  const convexHull = () => {
    if (cities.length < 3) {
      alert("Convex Hull requires at least 3 cities!");
      return;
    }

    // Helper function to calculate orientation
    const orientation = (p, q, r) => {
      const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
      if (val === 0) return 0; // collinear
      return val > 0 ? 1 : -1; // 1 = clockwise, -1 = counterclockwise
    };

    // Step 1: Find the convex hull using Graham's scan or Jarvis March
    let hull = [];
    let leftmost = cities[0];

    cities.forEach((city) => {
      if (city.x < leftmost.x || (city.x === leftmost.x && city.y < leftmost.y)) {
        leftmost = city;
      }
    });

    let current = leftmost;
    do {
      hull.push(current);
      let next = cities[0];

      cities.forEach((candidate) => {
        if (
          candidate !== current &&
          (next === current || orientation(current, next, candidate) === -1)
        ) {
          next = candidate;
        }
      });

      current = next;
    } while (current !== leftmost);

    // Step 2: Insert remaining cities into the hull with minimum cost insertion
    const remainingCities = cities.filter((city) => !hull.includes(city));

    remainingCities.forEach((city) => {
      let bestPosition = 0;
      let minCost = Infinity;

      for (let i = 0; i < hull.length; i++) {
        const currentCost =
          calculateDistance(hull[i], city) +
          calculateDistance(city, hull[(i + 1) % hull.length]) -
          calculateDistance(hull[i], hull[(i + 1) % hull.length]);
        if (currentCost < minCost) {
          minCost = currentCost;
          bestPosition = i + 1;
        }
      }

      hull.splice(bestPosition, 0, city);
    });

    // Step 3: Draw the resulting edges
    const edgesToDraw = [];
    for (let i = 0; i < hull.length; i++) {
      edgesToDraw.push([hull[i], hull[(i + 1) % hull.length]]);
    }

    setEdges(edgesToDraw);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Travelling Salesman Visualizer</h1>
      <div className="flex flex-col items-center space-y-4">
        <select
          className="border rounded px-4 py-2"
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
        >
          <option value="">Select Algorithm</option>
          <option value="Depth First Search">Depth First Search</option>
          <option value="Random Search">Random Search</option>
          <option value="Branch and Bound">Branch and Bound</option>
          <option value="Nearest Neighbour">Nearest Neighbour</option>
          <option value="Nearest Insertion">Nearest Insertion</option>
          <option value="Farthest Insertion">Farthest Insertion</option>
          <option value="Arbitrary Insertion">Arbitrary Insertion</option>
          <option value="Convex Hull">Convex Hull</option>
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={runAlgorithm}
        >
          Run Algorithm
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setCities([]);
            setEdges([]);
          }}
        >
          Reset
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border mt-4"
        onClick={handleCanvasClick}
      />
    </div>
  );
};

export default App;


