import React, { useEffect, useState } from 'react';
import './style.css'; // Assuming your CSS is in style.css

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
    <div>
      <br />
      <p className="header">Linear Search</p>
      
      <div id="array">
        {array.map((value, index) => (
          <div 
            key={index} 
            className="block" 
            style={{ height: `${value * 3}px`, backgroundColor: colors[index], position: 'absolute', bottom: '0', transition: '0.2s all ease', transform: `translate(${index * 30}px)` }}
          >
            <label className="block_id">{value}</label>
          </div>
        ))}
      </div>
      
      <br /><br />

      <div style={{ textAlign: 'center' }}>
        <label htmlFor="fname">Number to be Searched:</label>
        <input 
          type="text" 
          id="fname" 
          name="fname" 
          value={searchValue} 
          onChange={(e) => setSearchValue(e.target.value)} 
           className="mt-2 p-2 w-full border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <br /><br />
        
        <button
            onClick={() => linearSearch(searchValue)}
            className="bg-gray-300 text-black border border-gray-500 rounded px-4 py-2 hover:bg-gray-400 transition"
            >
            Search
            </button>

        
        <br /><br />
        
        <div id="text">{resultMessage}</div>
      </div>
    </div>
  );
};

export default LinearSearchApp;