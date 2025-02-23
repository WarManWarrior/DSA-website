import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ExperimentsPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const experiments = [
    {
      id: 1,
      category: 'Sorting',
      description: 'Organizing elements in a specific order, such as ascending or descending.',
      subcategories: [
        { name: 'Insertion Sort', path: '/sorting/insertion-sort' },
        { name: 'Bubble Sort', path: '/sorting/bubble-sort' },
        { name: 'Randomized Quick Sort', path: '/sorting/randomized-quick-sort' },
      ],
    },
    {
      id: 2,
      category: 'Searching',
      description: 'Finding the position or existence of a specific element within a collection.',
      subcategories: [
        { name: 'Linear Search', path: '/searching/linear-search' },
        { name: 'Binary Search', path: '/searching/binary-search' },
      ],
    },
    {
      id: 3,
      category: 'Divide and Conquer',
      description: 'Breaking a problem into smaller sub-problems, solving each one, and combining the results.',
      subcategories: [
        { name: 'Merge Sort', path: '/divide-conquer/merge-sort' },
        { name: 'Quick Sort', path: '/divide-conquer/quick-sort' },
        { name: "Strassen's Matrix Multiplication", path: '/divide-conquer/strassen-matrix' },
        { name: 'Largest Sub Array Sum', path: '/divide-conquer/largest-subarray-sum' },
        { name: 'Finding Maximum and Minimum', path: '/divide-conquer/find-max-min' },
      ],
    },
    {
      id: 4,
      category: 'Greedy Approach',
      description: 'Making the locally optimal choice at each step with the hope of finding a global optimum.',
      subcategories: [
        { name: 'Huffman Tree', path: '/greedy/huffman-tree' },
        { name: 'Fractional Knapsack Problem', path: '/greedy/fractional-knapsack' },
        { name: "Travelling Salesman Problem", path: '/greedy/salesman-problem' },
        
      ],
    },
    {
      id: 5,
      category: 'Dynamic Programming',
      description: 'Breaking problems into subproblems, solving each once, and storing solutions for future use to ensure an optimal solution.',
      subcategories: [
        { name: 'Largest Common Subsequence', path: '/dynamic-programming/lcs' },
        { name: 'String Matching Algorithms', path: '/dynamic-programming/sma' },
      ],
    },
    {
      id: 6,
      category: 'Backtracking',
      description: 'Exploring all possibilities by making choices, undoing them when necessary, and backtracking to find the best solution.',
      subcategories: [
        { name: 'N Queens', path: '/backtracking/n-queens' },
      ],
    },
  ];
  

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen flex flex-col`}>
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-blue-700 text-white w-64 transition-transform duration-300 z-20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500">
          Close
        </button>
        <ul className="mt-16 space-y-4 p-6">
          <li><Link to="/" className="hover:bg-blue-600 p-2 rounded">Home</Link></li>
          <li className="hover:bg-blue-600 p-2 rounded">About</li>
          <li className="hover:bg-blue-600 p-2 rounded">Contact Us</li>
        </ul>
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-blue-900 text-white">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500">
          Menu
        </button>
        <h1 className="text-xl font-bold">SRM Institute of Science and Technology</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>

      {/* Experiment List */}
      <div className="p-10">
        <h1 className="text-3xl font-bold text-center mb-10">List of Experiments</h1>
        <div className="grid grid-cols-3 gap-6">
          {experiments.map((experiment, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative p-6 rounded-lg transition-transform duration-300 shadow-lg flex flex-col items-center justify-center ${
                hoveredCard === index ? 'transform scale-105' : ''
              } ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            >
              <div className="absolute top-3 left-3 bg-blue-700 text-white text-xl font-bold px-4 py-2 rounded-full">
                {String(experiment.id).padStart(2, '0')}
              </div>
              <h2 className="text-xl font-semibold mb-2 text-center">{experiment.category}</h2>
              <p className="mb-4 text-center text-sm">{experiment.description}</p>
              <ul className="list-none">
                {experiment.subcategories.map((sub, subIndex) => (
                  <li key={subIndex} className="cursor-pointer mt-2">
                    <Link to={sub.path} className="text-l bg-yellow-300 p-2 rounded-xl hover:bg-yellow-500 block text-center">
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperimentsPage;
