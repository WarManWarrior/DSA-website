import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, GraduationCap, Beaker, Search, SplitSquareVertical, Target, Binary, ArrowBigLeftDash } from 'lucide-react';

const ExperimentsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/introduction' },
    { label: 'Resources', path: 'https://www.youtube.com/@ulaganathansakthi2280/featured' },
    { label: 'eLab', path: 'https://dld.srmist.edu.in/' },
  ];

  const experiments = [
    {
      id: 1,
      category: 'Sorting Algorithms',
      icon: <Beaker className="w-6 h-6" />,
      description: 'Organizing elements in a specific order, such as ascending or descending.',
      subcategories: [
        { name: 'Insertion Sort', path: '/sorting/insertion-sort' },
        { name: 'Bubble Sort', path: '/sorting/bubble-sort' },
        { name: 'Randomized Quick Sort', path: '/sorting/randomized-quick-sort' },
      ],
      color: 'from-indigo-500 to-purple-500', // Gradient colors for this category
    },
    {
      id: 2,
      category: 'Search Techniques',
      icon: <Search className="w-6 h-6" />,
      description: 'Finding the position or existence of a specific element within a collection.',
      subcategories: [
        { name: 'Linear Search', path: '/searching/linear-search' },
        { name: 'Binary Search', path: '/searching/binary-search' },
      ],
      color: 'from-teal-500 to-cyan-500', // Gradient colors for this category
    },
    {
      id: 3,
      category: 'Divide & Conquer',
      icon: <SplitSquareVertical className="w-6 h-6" />,
      description: 'Breaking a problem into smaller sub-problems, solving each one, and combining the results.',
      subcategories: [
        { name: 'Merge Sort', path: '/divide-conquer/merge-sort' },
        { name: 'Quick Sort', path: '/divide-conquer/quick-sort' },
        { name: "Strassen's Matrix Multiplication", path: '/divide-conquer/strassen-matrix' },
        { name: 'Largest Sub Array Sum', path: '/divide-conquer/largest-subarray-sum' },
        { name: 'Finding Maximum and Minimum', path: '/divide-conquer/find-max-min' },
      ],
      color: 'from-orange-500 to-yellow-500', // Gradient colors for this category
    },
    {
      id: 4,
      category: 'Greedy Methods',
      icon: <Target className="w-6 h-6" />,
      description: 'Making the locally optimal choice at each step with the hope of finding a global optimum.',
      subcategories: [
        { name: 'Huffman Tree', path: '/greedy/huffman-tree' },
        { name: 'Fractional Knapsack Problem', path: '/greedy/fractional-knapsack' },
        { name: "Travelling Salesman Problem", path: '/greedy/salesman-problem' },
      ],
      color: 'from-pink-500 to-red-500', // Gradient colors for this category
    },
    {
      id: 5,
      category: 'Dynamic Programming',
      icon: <Binary className="w-6 h-6" />,
      description: 'Breaking problems into subproblems, solving each once, and storing solutions for future use.',
      subcategories: [
        { name: 'Largest Common Subsequence', path: '/dynamic-programming/lcs' },
        { name: 'String Matching Algorithms', path: '/dynamic-programming/sma' },
      ],
      color: 'from-blue-500 to-indigo-500', // Gradient colors for this category
    },
    {
      id: 6,
      category: 'Backtracking',
      icon: <ArrowBigLeftDash className="w-6 h-6" />,
      description: 'Exploring all possibilities by making choices, undoing them when necessary, and backtracking to find the best solution.',
      subcategories: [
        { name: 'N Queens', path: '/backtracking/n-queens' },
      ],
      color: 'from-green-500 to-lime-500', // Gradient colors for this category
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300">
      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <GraduationCap className="h-8 w-8 text-indigo-600" />
                <span className="ml-3 text-xl font-semibold text-slate-900">
                  SRM INSTITUTE OF SCIENCE AND TECHNOLOGY
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-slate-600 hover:text-indigo-600 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50 p-6">
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-slate-600 hover:text-indigo-600 transition-colors font-medium"
                  onClick={() => setSidebarOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl font-bold gradient-text opacity-100 text-black">
          Laboratory Experiments
        </h1>

          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of computer science algorithms and data structures through interactive experiments and visualizations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((experiment, index) => (
            <div
              key={index}
              className={`group bg-white rounded-xl p-6
                shadow-md hover:shadow-lg transition-all duration-300
                border border-slate-200 hover:border-indigo-300
                transform hover:-translate-y-2 hover:scale-105
                ${mounted ? 'animate-fade-in opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`flex items-center justify-center w-10 h-10 rounded-lg
                  bg-gradient-to-r ${experiment.color}
                  text-white group-hover:scale-110 transition-transform duration-300`}>
                  {experiment.icon}
                </span>
                <h2 className="text-lg font-semibold text-slate-900">
                  {experiment.category}
                </h2>
              </div>

              <p className="text-sm text-slate-600 mb-6 line-clamp-2">
                {experiment.description}
              </p>

              <div className="space-y-2">
                {experiment.subcategories.map((sub, subIndex) => (
                  <Link
                    key={subIndex}
                    to={sub.path}
                    className={`block px-4 py-2.5 rounded-lg text-sm
                      bg-slate-50 hover:bg-gradient-to-r
                      ${
                        sub.name === 'Linear Search'
                          ? 'hover:from-blue-400 hover:to-blue-700 hover:text-white' // Blueish hover for Linear Search
                          : 'hover:from-blue-400 hover:to-blue-700 hover:text-white' // Default hover for others
                      }
                      text-slate-700
                      transition-all duration-200`}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExperimentsPage;