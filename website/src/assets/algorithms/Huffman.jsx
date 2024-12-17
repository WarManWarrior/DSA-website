import React, { useState } from 'react';

// Huffman Node Class
class HuffmanNode {
  constructor(char = null, freq = 0) {
    this.char = char;
    this.freq = freq;
    this.left = null;
    this.right = null;
  }
}

const HuffmanTreeVisualization = () => {
  const [inputText, setInputText] = useState('');
  const [huffmanTree, setHuffmanTree] = useState(null);
  const [frequencyMap, setFrequencyMap] = useState({});
  const [animatedNodes, setAnimatedNodes] = useState([]);

  // Calculate Frequency
  const calculateFrequency = (text) => {
    const freq = {};
    for (let char of text) {
      freq[char] = (freq[char] || 0) + 1;
    }
    return freq;
  };

  // Build Huffman Tree
  const buildHuffmanTree = (frequencyMap) => {
    const nodes = Object.entries(frequencyMap)
      .map(([char, freq]) => new HuffmanNode(char, freq))
      .sort((a, b) => a.freq - b.freq);

    const steps = [];

    while (nodes.length > 1) {
      const left = nodes.shift();
      const right = nodes.shift();
      const parent = new HuffmanNode(null, left.freq + right.freq);
      parent.left = left;
      parent.right = right;
      nodes.push(parent);
      nodes.sort((a, b) => a.freq - b.freq);

      steps.push({ parent, left, right });
    }
    animateTreeFormation(steps);
    return nodes[0];
  };

  // Animate Tree Formation
  const animateTreeFormation = (steps) => {
    setAnimatedNodes([]);
    steps.forEach((step, index) => {
      setTimeout(() => {
        setAnimatedNodes((prev) => [...prev, step]);
      }, index * 1000); // 1-second delay for animation
    });
  };

  const generateHuffmanTree = () => {
    const freq = calculateFrequency(inputText);
    setFrequencyMap(freq);
    if (Object.keys(freq).length > 0) {
      const tree = buildHuffmanTree(freq);
      setHuffmanTree(tree);
    }
  };

  // Recursive Tree Rendering
  const renderTreeNode = (node, x, y, depth = 0) => {
    if (!node) return null;

    const horizontalGap = 200 / (depth + 1);

    const nodeStyle = {
      position: 'absolute',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#4caf50',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      left: `${x}px`,
      top: `${y}px`,
      transition: 'transform 0.5s, opacity 0.5s',
    };

    return (
      <div key={`node-${node.freq}-${x}-${y}`}>
        {/* Node */}
        <div style={nodeStyle}>
          {node.char || 'Σ'}:{node.freq}
        </div>

        {/* Left Child */}
        {node.left &&
          renderEdge(x, y, x - horizontalGap, y + 100) &&
          renderTreeNode(node.left, x - horizontalGap, y + 100, depth + 1)}

        {/* Right Child */}
        {node.right &&
          renderEdge(x, y, x + horizontalGap, y + 100) &&
          renderTreeNode(node.right, x + horizontalGap, y + 100, depth + 1)}
      </div>
    );
  };

  // Edge Rendering
  // Edge Rendering
const renderEdge = (x1, y1, x2, y2) => {
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  
    const edgeStyle = {
      position: 'absolute',
      height: '100px',
      backgroundColor: '#000000', // Make edges black for better visibility
      transformOrigin: '0 0',
      width: `${length}px`,
      left: `${x1}px`,
      top: `${y1}px`,
      transform: `rotate(${angle}deg)`,
      zIndex: 1, // Ensure the edge is visible on top
      transition: 'width 0.5s ease, transform 0.5s ease',
    };
  
    return <div style={edgeStyle} />;
  };
  

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Huffman Tree Visualization</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text"
        style={{
          padding: '8px',
          margin: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <button
        onClick={generateHuffmanTree}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Generate Huffman Tree
      </button>

      {/* Frequency Map */}
      {Object.keys(frequencyMap).length > 0 && (
        <div style={{ margin: '20px' }}>
          <h3>Character Frequencies:</h3>
          {Object.entries(frequencyMap).map(([char, freq]) => (
            <div key={char}>
              {char}: {freq}
            </div>
          ))}
        </div>
      )}

      {/* Tree Visualization */}
      <div
        style={{
          position: 'relative',
          width: '1000px',
          height: '800px',
          margin: '20px auto',
          border: '1px solid #ddd',
          backgroundColor: '#fafafa',
        }}
      >
        {animatedNodes.length > 0
          ? animatedNodes.map((step, index) =>
              renderTreeNode(step.parent, 400, 50)
            )
          : huffmanTree && renderTreeNode(huffmanTree, 400, 50)}
      </div>
    </div>
  );
};

export default HuffmanTreeVisualization;