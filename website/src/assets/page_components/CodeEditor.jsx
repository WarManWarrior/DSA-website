import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Trash2, Play } from "lucide-react";
import data from "./data.json";

const CodeEditor = () => {
  const algorithms = Object.keys(data);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]);
  const [language, setLanguage] = useState("python3");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [experiments, setExperiments] = useState([]);
  const [selectedExperiment, setSelectedExperiment] = useState("");

  useEffect(() => {
    const selectedData = data[selectedAlgorithm]?.sections.find((section) => section.id === "code");
    if (selectedData && selectedData.experiment) {
      const experimentConfigs = selectedData.experiment.configs;
      setExperiments(Object.keys(experimentConfigs));
      setSelectedExperiment(Object.keys(experimentConfigs)[0] || "");
    } else {
      setExperiments([]);
      setSelectedExperiment("");
      setCode("");
    }
  }, [selectedAlgorithm]);

  useEffect(() => {
    const selectedData = data[selectedAlgorithm]?.sections.find((section) => section.id === "code");
    if (selectedData && selectedData.experiment) {
      const experimentCode = selectedData.experiment.configs[language]?.code || "";
      setCode(experimentCode);
    } else {
      setCode("");
    }
  }, [selectedAlgorithm, language, selectedExperiment]);

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

    const codeField = document.createElement("input");
    codeField.type = "hidden";
    codeField.name = "code";
    codeField.value = code;

    const inputField = document.createElement("input");
    inputField.type = "hidden";
    inputField.name = "input";
    inputField.value = input;

    form.appendChild(codeField);
    form.appendChild(inputField);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-gray-900 text-white">
      <div className="flex flex-wrap w-full max-w-full mb-2 gap-2">
        <select
          className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white flex-1"
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
        >
          {algorithms.map((algo) => (
            <option key={algo} value={algo}>{data[algo].title}</option>
          ))}
        </select>

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

        {experiments.length > 0 && (
          <select
            className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white flex-1"
            value={selectedExperiment}
            onChange={(e) => setSelectedExperiment(e.target.value)}
          >
            {experiments.map((exp) => (
              <option key={exp} value={exp}>{exp}</option>
            ))}
          </select>
        )}
      </div>

      <div className="w-full max-w-full border border-gray-700 rounded-lg overflow-hidden">
        <textarea
          className="w-full min-h-[200px] p-2 bg-gray-800 text-white outline-none resize-none"
          placeholder="Write your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="w-full max-w-full flex flex-wrap gap-2 mt-4">
        <button className="flex-1 p-2 bg-blue-600 hover:bg-blue-700 rounded-md" onClick={executeCode}><Play size={18} /> Run</button>
        <button className="flex-1 p-2 bg-gray-700 hover:bg-gray-600 rounded-md" onClick={() => navigator.clipboard.writeText(code)}><Copy size={18} /> Copy</button>
        <button className="flex-1 p-2 bg-red-600 hover:bg-red-700 rounded-md" onClick={() => { setCode(''); setInput(''); setOutput(''); }}><Trash2 size={18} /> Clear</button>
      </div>

      <div className="w-full max-w-full mt-4">
        <h2 className="text-lg font-semibold mb-1">Program Input</h2>
        <textarea className="w-full min-h-[100px] p-2 bg-gray-800 text-white outline-none resize-none" placeholder="Enter input values for the program..." value={input} onChange={(e) => setInput(e.target.value)} />
      </div>

      <div className="w-full max-w-full mt-4">
        <h2 className="text-lg font-semibold mb-1">Output</h2>
        <div className="p-3 bg-black text-green-400 rounded-md min-h-[100px] overflow-y-auto border border-gray-700">
          {loading ? <p className="text-gray-400">Executing...</p> : <SyntaxHighlighter language="bash" style={materialDark}>{output || "Output will be shown here..."}</SyntaxHighlighter>}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
