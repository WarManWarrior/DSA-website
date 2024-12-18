import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeEditor = () => {
  const [language, setLanguage] = useState("python3");
  const [code, setCode] = useState("print('Hello, World!')");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);

  // Function to execute code
  const executeCode = async () => {
    setIsLoading(true);
    setOutput("");
    setSubmissionId(null);

    const requestBody = {
      language_id: getLanguageId(language),
      source_code: code,
      stdin: "",
      expected_output: "",
    };

    try {
      const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": "your-rapidapi-key", // Replace with your API key
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Unknown API Error");
      }

      setSubmissionId(result.token);
      checkSubmissionStatus(result.token);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setIsLoading(false);
    }
  };

  const checkSubmissionStatus = async (token) => {
    try {
      const response = await fetch(
        `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": "your-rapidapi-key", // Replace with your API key
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Unknown API Error");
      }

      if (result.status?.id === 3) {
        setOutput(result.stdout || result.stderr || "No output");
        setIsLoading(false);
      } else {
        setTimeout(() => checkSubmissionStatus(token), 1000);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setIsLoading(false);
    }
  };

  const getLanguageId = (lang) => {
    switch (lang) {
      case "python3":
        return 71;
      case "c":
        return 50;
      case "cpp":
        return 54;
      case "java":
        return 62;
      default:
        return 71;
    }
  };

  const handleCodeChange = (e) => setCode(e.target.value);
  const handleLanguageChange = (e) => setLanguage(e.target.value);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <header className="py-4 bg-gray-800 shadow-md">
        <h1 className="text-center text-3xl font-bold">Multi-Language Code Editor</h1>
      </header>
      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Panel: Code Editor */}
        <div className="flex-1">
          <div className="mb-4">
            
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="python3">Python</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
          </div>
          <textarea
            className="w-full h-80 p-4 bg-gray-800 text-sm font-mono border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={code}
            onChange={handleCodeChange}
          />
          <button
            onClick={executeCode}
            disabled={isLoading}
            className={`mt-4 px-4 py-2 w-full text-sm font-semibold ${
              isLoading ? "bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            {isLoading ? "Running..." : "Run Code"}
          </button>
        </div>

        {/* Right Panel: Output and Preview */}
        <div className="flex-1">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Output</h2>
            <div className="p-4 bg-gray-800 border border-gray-700 rounded-md text-sm font-mono whitespace-pre-wrap">
              {output || "Your output will appear here"}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Preview</h2>
            <div className="p-4 bg-gray-800 border border-gray-700 rounded-md overflow-auto">
              <SyntaxHighlighter language={getSyntaxHighlightLanguage(language)} style={tomorrow}>
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const getSyntaxHighlightLanguage = (lang) => {
  switch (lang) {
    case "c":
      return "c";
    case "cpp":
      return "cpp";
    case "python3":
      return "python";
    case "java":
      return "java";
    default:
      return "plaintext";
  }
};

export default CodeEditor;
