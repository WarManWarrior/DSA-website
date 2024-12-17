import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind is set up in your project

const LinearSearchApp = () => {
  const [array, setArray] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [colors, setColors] = useState(Array(20).fill('#6b5b95'));

  // Function to generate the array of blocks
  const generateArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.ceil(Math.random() * 100));
    setArray(newArray);
    setColors(Array(20).fill('#6b5b95')); // Reset colors
    setResultMessage(''); // Reset result message
  };

  // Asynchronous LinearSearch function
  const linearSearch = async (num) => {
    setResultMessage('');
    let found = false;

    for (let i = 0; i < array.length; i++) {
      // Change color of current block to red
      const newColors = [...colors];
      newColors[i] = '#FF4949';
      setColors(newColors);

      await new Promise((resolve) => setTimeout(resolve, 300)); // Delay

      // Extracting the value of current block
      const value = array[i];

      if (value === Number(num)) {
        found = true;
        newColors[i] = '#13CE66'; // Change color to green if found
        setColors(newColors);
        setResultMessage('Element Found');
        break;
      } else {
        // Reset color back to original if not found
        newColors[i] = '#6b5b95';
        setColors(newColors);
      }
    }

    if (!found) {
      setResultMessage('Element Not Found');
    }
  };

  useEffect(() => {
    generateArray(); // Generate array on component mount
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <p className="text-4xl font-bold text-center mb-6">Linear Search</p>

      <div
        id="array"
        className="bg-white border border-gray-300 rounded shadow-md h-[305px] w-[598px] mx-auto relative mt-8"
      >
        {array.map((value, index) => (
          <div
            key={index}
            className="absolute bottom-0 transition-transform"
            style={{
              height: `${value * 2.5}px`,
              backgroundColor: colors[index],
              width: '28px',
              transform: `translateX(${index * 30}px)`,
            }}
          >
            <label className="block text-center text-black -mt-5 w-full">{value}</label>
          </div>
        ))}
      </div>

      <div className="text-center mt-8 space-y-4">
        <label htmlFor="searchValue" className="block text-lg font-medium text-gray-700">
          Number to be Searched:
        </label>
        <input
          type="text"
          id="searchValue"
          name="searchValue"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="p-2 border border-gray-300 rounded w-64 bg-gray-200 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <br />
        <button
          onClick={() => linearSearch(searchValue)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Search
        </button>
        <div className="text-xl font-semibold mt-4">{resultMessage}</div>
      </div>
    </div>
  );
};

export default LinearSearchApp;
