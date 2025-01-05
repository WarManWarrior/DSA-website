import React, { useState } from 'react';

const ExperimentsPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const experiments = [
    {
      title: 'Insertion Sort',
      description: 'Learn and visualize insertion sort algorithm.',
      subcategories: ['Learn', 'Visualize'],
    },
    {
      title: 'Bubble Sort',
      description: 'Explore the bubble sort algorithm with examples.',
      subcategories: ['Learn', 'Visualize'],
    },
    {
      title: 'Merge Sort',
      description: 'Understand merge sort through interactive visualization.',
      subcategories: ['Learn', 'Visualize'],
    },
    {
      title: 'Quick Sort',
      description: 'Analyze and visualize the quick sort algorithm.',
      subcategories: ['Learn', 'Visualize'],
    },
    {
      title: 'Huffman Coding',
      description: 'Discover how Huffman coding works with examples.',
      subcategories: ['Learn', 'Visualize'],
    },
    {
      title: 'Knapsack Problem',
      description: 'Solve the knapsack problem using greedy methods.',
      subcategories: ['Learn', 'Visualize'],
    },
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen flex`}>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-blue-500 text-white w-64 transition-transform duration-300 z-20 ${
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
          <li className="hover:bg-blue-600 p-2 rounded">Option 1</li>
          <li className="hover:bg-blue-600 p-2 rounded">Option 2</li>
          <li className="hover:bg-blue-600 p-2 rounded">Option 3</li>
          <li className="hover:bg-blue-600 p-2 rounded">Option 4</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <nav className="flex justify-between items-center p-6 bg-blue-500 text-white relative">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
          >
            Menu
          </button>
          <h1 className="text-xl font-bold absolute left-1/2 transform -translate-x-1/2">
            SRM Institute of Science and Technology
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>

        <div className="p-10">
          <h1 className="text-3xl font-bold text-center mb-10">Experiments</h1>
          <div className="grid grid-cols-3 gap-4 h-[calc(100vh-200px)]">
            {experiments.map((experiment, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative p-6 rounded-lg transition-transform duration-300 shadow-lg h-full flex items-center justify-center ${
                  hoveredCard === index
                    ? 'transform scale-110 z-10'
                    : hoveredCard !== null
                    ? 'blur-sm'
                    : ''
                } bg-purple-500 text-white`}
              >
                <h2 className="text-xl font-semibold mb-2 text-center">{experiment.title}</h2>
                {hoveredCard === index && (
                  <div className="absolute top-0 left-0 w-full h-full bg-purple-600 bg-opacity-90 p-6 flex flex-col justify-center items-center rounded-lg">
                    <p className="mb-4 text-center">{experiment.description}</p>
                    <div className="flex space-x-4">
                      {experiment.subcategories.map((subcategory, subIndex) => (
                        <button
                          key={subIndex}
                          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
                          onClick={() => alert(`Navigating to ${subcategory} of ${experiment.title}`)}
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



export default ExperimentsPage;
