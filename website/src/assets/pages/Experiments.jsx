import React, { useState } from 'react';

const ExperimentsPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const experiments = [
    {
      title: 'Sorting Algorithms',
      description: 'Efficient techniques to organize and order data for optimized processing.',
      subcategories: ['Insertion Sort', 'Bubble Sort', 'Merge Sort', 'Quick Sort', 'Randomized Quick Sort'],
    },
    {
      title: 'Searching Algorithms',
      description: 'Methods to locate specific data within structures efficiently and accurately.',
      subcategories: ['Linear Search', 'Binary Search'],
    },
    {
      title: 'Array Manipulation and Optimization Algorithms',
      description: 'Techniques to modify, process, and enhance array operations efficiently.',
      subcategories: ['Finding Maximum and Minimum in an Array', 'Knapsack using Greedy'],
    },
    {
      title: 'String and Text Processing Algorithms',
      description: 'Algorithms to analyze, transform, and manage text data efficiently.',
      subcategories: ['Huffman Coding', 'String Matching', 'Longest Common Sequence'],
    },
    {
      title: 'Graph and Combinatorial Problems',
      description: 'Algorithms solving connectivity, paths, and arrangements in complex networks.',
      subcategories: ['Convex Hull Problem', "N Queen's Algorithms", 'Travelling Salesman Problem'],
    },
    {
      title: 'Advanced Algorithms',
      description: 'Complex algorithms for optimizing performance and solving sophisticated computational problems.',
      subcategories: ['Strassen Matrix Multiplication'],
    },
  ];

  return (
    <div
      className={`${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      } min-h-screen flex flex-col`}
    >
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-blue-700 text-white w-64 transition-transform duration-300 z-20 ${
          sidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        >
          Close
        </button>
        <ul className="mt-16 space-y-4 p-6">
          <li className="hover:bg-blue-600 p-2 rounded">Home</li>
          <li className="hover:bg-blue-600 p-2 rounded">About</li>
          <li className="hover:bg-blue-600 p-2 rounded">Contact Us</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <nav className="flex justify-between items-center p-6 bg-blue-900 text-white">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
          >
            Menu
          </button>
          <h1 className="text-xl font-bold">SRM Institute of Science and Technology</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>

        <div className="p-10">
          <h1 className="text-3xl font-bold text-center mb-10">Experiments</h1>
          <div className="grid grid-cols-3 gap-6">
            {experiments.map((experiment, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative p-6 rounded-lg transition-transform duration-300 shadow-lg flex flex-col items-center justify-center ${
                  hoveredCard === index ? 'transform scale-105' : ''
                } ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
                }`}
              >
                <h2 className="text-xl font-semibold mb-2">{experiment.title}</h2>
                <p className="mb-4 text-center">{experiment.description}</p>
                <div className="grid grid-cols-2 gap-2 w-full">
                  {experiment.subcategories.map((subcategory, subIndex) => (
                    <button
                      key={subIndex}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 w-full text-center"
                      onClick={() =>
                        alert(`Navigating to ${subcategory} of ${experiment.title}`)
                      }
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentsPage;
