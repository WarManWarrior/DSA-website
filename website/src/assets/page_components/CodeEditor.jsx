import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Trash2, Play } from "lucide-react";
import data from "./data.json";

const CodeEditor = () => {
  const [language, setLanguage] = useState("python3");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const defaultCode = data.Insertion_Sort.sections.find(
      (section) => section.id === "code"
    )?.experiment.configs[language]?.code || "";
    setCode(defaultCode);
  }, [language]);

  const executeCode = () => {
    const languageMap = {
      python3: "python",
      c: "c",
      cpp: "cpp",
      java: "java",
    };

    const programizUrl = `https://www.programiz.com/${languageMap[language]}-programming/online-compiler`;

    const form = document.createElement("form");
    form.method = "POST";
    form.action = programizUrl;
    form.target = "_blank";

    const inputField = document.createElement("textarea");
    inputField.name = "code";
    inputField.value = code;

    form.appendChild(inputField);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
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
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-900 text-white p-6">
      <div className="flex w-full max-w-3xl mb-2 items-center space-x-2">
        <select
          className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white flex-1"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python3">Python</option>
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

      <div className="w-full max-w-3xl border border-gray-700 rounded-lg overflow-hidden">
        <textarea
          className="w-full h-48 p-2 bg-gray-800 text-white outline-none resize-none"
          placeholder="Write your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="w-full max-w-3xl mt-4">
        <h2 className="text-lg font-semibold mb-1">Program Input</h2>
        <textarea
          className="w-full h-20 p-2 bg-gray-800 text-white outline-none resize-none"
          placeholder="Enter input values for the program..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

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