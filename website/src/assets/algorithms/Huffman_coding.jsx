// import React, { useState, useEffect, useRef } from "react";

// const HuffmanCodingVisualization = () => {
//   const [input, setInput] = useState("");
//   const [frequencyTable, setFrequencyTable] = useState([]);
//   const [huffmanTree, setHuffmanTree] = useState(null);
//   const [encodedResult, setEncodedResult] = useState("");
//   const [isVertical, setIsVertical] = useState(false);

//   const chartRef = useRef(null);
//   const treeRef = useRef(null);

//   const buildFrequencyTable = (str) => {
//     const freqMap = {};
//     for (let char of str) {
//       freqMap[char] = (freqMap[char] || 0) + 1;
//     }
//     return Object.entries(freqMap).map(([char, freq]) => ({ char, freq }));
//   };

//   const buildHuffmanTree = (freqTable) => {
//     const nodes = freqTable.map(({ char, freq }) => ({ char, freq, left: null, right: null }));

//     while (nodes.length > 1) {
//       nodes.sort((a, b) => a.freq - b.freq);

//       const left = nodes.shift();
//       const right = nodes.shift();

//       const newNode = {
//         char: null,
//         freq: left.freq + right.freq,
//         left,
//         right,
//       };

//       nodes.push(newNode);
//     }

//     return nodes[0];
//   };

//   const encode = (tree, str) => {
//     const codeMap = {};

//     const generateCode = (node, code) => {
//       if (!node.left && !node.right) {
//         codeMap[node.char] = code;
//         return;
//       }

//       if (node.left) generateCode(node.left, code + "0");
//       if (node.right) generateCode(node.right, code + "1");
//     };

//     generateCode(tree, "");

//     return str.split("").map((char) => codeMap[char]).join("");
//   };

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInput(value);

//     const freqTable = buildFrequencyTable(value);
//     setFrequencyTable(freqTable);

//     const tree = buildHuffmanTree(freqTable);
//     setHuffmanTree(tree);

//     if (tree) {
//       const encoded = encode(tree, value);
//       setEncodedResult(encoded);
//     } else {
//       setEncodedResult("");
//     }
//   };

//   const checkLayout = () => {
//     if (chartRef.current && treeRef.current) {
//       const chartWidth = chartRef.current.offsetWidth;
//       const treeWidth = treeRef.current.offsetWidth;

//       // Set vertical layout if tree takes more than twice the chart's width
//       setIsVertical(treeWidth > 2 * chartWidth);
//     }
//   };

//   useEffect(() => {
//     checkLayout();
//     window.addEventListener("resize", checkLayout);
//     return () => window.removeEventListener("resize", checkLayout);
//   }, [frequencyTable, huffmanTree]);

//   const renderTree = (node) => {
//     if (!node) return null;

//     return (
//       <div className="flex flex-col items-center">
//         <div className={`p-2 m-1 border rounded-md text-center bg-primary text-primary-content`}>
//           {node.char ? `${node.char} (${node.freq})` : `${node.freq}`}
//         </div>
//         <div className="flex">
//           {node.left && <div className="mr-4">{renderTree(node.left)}</div>}
//           {node.right && <div className="ml-4">{renderTree(node.right)}</div>}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="p-4 space-y-6">
//       <h1 className="text-3xl font-bold text-center text-primary">Huffman Coding Visualization</h1>

//       <div className="form-control">
//         <label className="label">
//           <span className="label-text">Enter a string to encode:</span>
//         </label>
//         <input
//           type="text"
//           value={input}
//           onChange={handleInputChange}
//           placeholder="Type something..."
//           className="input input-bordered input-primary w-full"
//         />
//       </div>

//       {/* Dynamic Layout */}
//       <div className={`flex ${isVertical ? "flex-col" : "flex-row"} space-y-4 lg:space-x-4`}>
//         {/* Frequency Table Section */}
//         {frequencyTable.length > 0 && (
//           <div ref={chartRef} className="flex-1 overflow-x-auto">
//             <h2 className="text-xl font-semibold text-center text-secondary">Frequency Table</h2>
//             <table className="table table-zebra w-full">
//               <thead>
//                 <tr>
//                   <th>Character</th>
//                   <th>Frequency</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {frequencyTable.map(({ char, freq }) => (
//                   <tr key={char}>
//                     <td>{char}</td>
//                     <td>{freq}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Tree and Encoded Result Section */}
//         <div ref={treeRef} className="flex-1 space-y-6">
//           {huffmanTree && (
//             <div>
//               <h2 className="text-xl font-semibold text-center text-secondary">Huffman Tree</h2>
//               <div className="flex justify-center mt-4">{renderTree(huffmanTree)}</div>
//             </div>
//           )}

//           {encodedResult && (
//             <div className="text-center">
//               <h2 className="text-xl font-semibold text-secondary">Encoded Result</h2>
//               <p className="p-2 mt-2 border rounded-md bg-accent text-accent-content">
//                 {encodedResult}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HuffmanCodingVisualization;
import React, { useState, useEffect, useRef } from "react";

const HuffmanCodingVisualization = () => {
  const [input, setInput] = useState("");
  const [frequencyTable, setFrequencyTable] = useState([]);
  const [huffmanTree, setHuffmanTree] = useState(null);
  const [encodedResult, setEncodedResult] = useState("");
  const [isVertical, setIsVertical] = useState(false);

  const chartRef = useRef(null);
  const treeRef = useRef(null);

  const buildFrequencyTable = (str) => {
    const freqMap = {};
    for (let char of str) {
      freqMap[char] = (freqMap[char] || 0) + 1;
    }
    return Object.entries(freqMap).map(([char, freq]) => ({ char, freq }));
  };

  const buildHuffmanTree = (freqTable) => {
    const nodes = freqTable.map(({ char, freq }) => ({ char, freq, left: null, right: null }));

    while (nodes.length > 1) {
      nodes.sort((a, b) => a.freq - b.freq);

      const left = nodes.shift();
      const right = nodes.shift();

      const newNode = {
        char: null,
        freq: left.freq + right.freq,
        left,
        right,
      };

      nodes.push(newNode);
    }

    return nodes[0];
  };

  const encode = (tree, str) => {
    const codeMap = {};

    const generateCode = (node, code) => {
      if (!node.left && !node.right) {
        codeMap[node.char] = code;
        return;
      }

      if (node.left) generateCode(node.left, code + "0");
      if (node.right) generateCode(node.right, code + "1");
    };

    generateCode(tree, "");

    return str.split("").map((char) => codeMap[char]).join("");
  };

  const assignLevels = (node, level = 0) => {
    if (!node) return;
    node.level = level;
    assignLevels(node.left, level + 1);
    assignLevels(node.right, level + 1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    const freqTable = buildFrequencyTable(value);
    setFrequencyTable(freqTable);

    const tree = buildHuffmanTree(freqTable);
    assignLevels(tree);
    setHuffmanTree(tree);

    if (tree) {
      const encoded = encode(tree, value);
      setEncodedResult(encoded);
    } else {
      setEncodedResult("");
    }
  };

  const renderTree = (node) => {
    if (!node) return null;

    return (
      <div className="flex f-full w-full flex-col items-center">
        <div className="flex flex-col items-center">
          <span className="text-sm font-bold">Level {node.level}</span>
          <div className={`p-2 m-1 border rounded-md text-center bg-primary text-primary-content`}>
            {node.char ? `${node.char} (${node.freq})` : `${node.freq}`}
          </div>
        </div>
        <div className="flex">
          {node.left && <div className="mr-4">{renderTree(node.left)}</div>}
          {node.right && <div className="ml-4">{renderTree(node.right)}</div>}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center text-primary">Huffman Coding Visualization</h1>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Enter a string to encode:</span>
        </label>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type something..."
          className="input input-bordered input-primary w-full text-white"
        />
      </div>

      <div className="flex flex-col space-y-4 lg:space-x-4">
        {frequencyTable.length > 0 && (
          <div ref={chartRef} className="flex-1 overflow-x-auto">
            <h2 className="text-xl font-semibold text-center text-secondary ">Frequency Table</h2>
            <table className="table table-zebra w-full text-primary">
              <thead>
                <tr>
                  <th>Character</th>
                  <th>Frequency</th>
                </tr>
              </thead>
              <tbody>
                {frequencyTable.map(({ char, freq }) => (
                  <tr key={char}>
                    <td>{char}</td>
                    <td>{freq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div ref={treeRef} className="flex-1 space-y-6">
          {huffmanTree && (
            <div>
              <h2 className="text-xl font-semibold text-center text-secondary">Huffman Tree</h2>
              <div className="flex justify-center mt-4">{renderTree(huffmanTree)}</div>
            </div>
          )}

          {encodedResult && (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-secondary">Encoded Result</h2>
              <p className="p-2 mt-2 border rounded-md bg-accent text-accent-content">
                {encodedResult}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HuffmanCodingVisualization;

