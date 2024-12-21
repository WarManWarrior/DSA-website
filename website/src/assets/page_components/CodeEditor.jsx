import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeEditor = ({ experiment }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("python3");
  const [runOutput, setRunOutput] = useState("");

  const { title, configs } = experiment;
  const currentConfig = configs[selectedLanguage];

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleRunCode = () => {
    // Simulating the running of the code by setting the output
    setRunOutput(currentConfig.output);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">{title}</h1>
      </header>

      {/* Language Buttons */}
      <div className="mb-4 flex space-x-2">
        {Object.keys(configs).map((lang) => (
          <button
            key={lang}
            className={`px-4 py-2 rounded-md ${
              selectedLanguage === lang ? "bg-blue-500" : "bg-gray-700"
            }`}
            onClick={() => handleLanguageChange(lang)}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Code Editor */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Code</h2>
        <SyntaxHighlighter language={selectedLanguage} style={tomorrow}>
          {currentConfig.code}
        </SyntaxHighlighter>
      </div>

      {/* Run Code Button */}
      <div className="mb-4">
        <button
          className="px-6 py-3 bg-blue-600 rounded-md"
          onClick={handleRunCode}
        >
          Run Code
        </button>
      </div>

      {/* Output */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Output</h2>
        <div className="p-4 bg-gray-800 rounded-md">
          {runOutput || "Click 'Run Code' to see the output."}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
