import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";
import { Copy, Trash2, Play } from "lucide-react";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const executeCode = async () => {
    setLoading(true);
    setOutput(""); // Clear previous output
    try {
      const response = await axios.post("YOUR_API_ENDPOINT", {
        language,
        code,
        input,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error executing code.");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  const clearCode = () => {
    setCode("");
    setOutput("");
    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">⚡ Interactive Code Editor</h1>

      {/* Language Selector + Buttons */}
      <div className="flex w-full max-w-3xl mb-2 items-center space-x-2">
        <select
          className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white flex-1"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
        <button
          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center space-x-2"
          onClick={executeCode}
        >
          <Play size={18} />
          <span>Run</span>
        </button>
        <button
          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md flex items-center space-x-2"
          onClick={copyToClipboard}
        >
          <Copy size={18} />
          <span>Copy</span>
        </button>
        <button
          className="p-2 bg-red-600 hover:bg-red-700 rounded-md flex items-center space-x-2"
          onClick={clearCode}
        >
          <Trash2 size={18} />
          <span>Clear</span>
        </button>
      </div>

      {/* Code Editor */}
      <div className="w-full max-w-3xl border border-gray-700 rounded-lg overflow-hidden">
        <textarea
          className="w-full h-48 p-2 bg-gray-800 text-white outline-none resize-none"
          placeholder="Write your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      {/* Input Section */}
      <div className="w-full max-w-3xl mt-4">
        <h2 className="text-lg font-semibold mb-1">Program Input</h2>
        <textarea
          className="w-full h-20 p-2 bg-gray-800 text-white outline-none resize-none"
          placeholder="Enter input values for the program..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {/* Output Section */}
      <div className="w-full max-w-3xl mt-4">
        <h2 className="text-lg font-semibold mb-1">Output</h2>
        <div className="p-3 bg-black text-green-400 rounded-md h-32 overflow-y-auto border border-gray-700">
          {loading ? (
            <p className="text-gray-400">Executing...</p>
          ) : (
            <SyntaxHighlighter language="bash" style={materialDark}>
              {output || "Output will be shown here..."}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
