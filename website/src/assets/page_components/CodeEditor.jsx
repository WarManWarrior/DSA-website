// import React, { useState } from "react";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

// const CodeEditor = () => {
//   const [language, setLanguage] = useState("python3"); // Default language
//   const [code, setCode] = useState("print('Hello, World!')"); // Default Python code
//   const [output, setOutput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [submissionId, setSubmissionId] = useState(null);

//   // Function to execute code
//   const executeCode = async () => {
//     setIsLoading(true);
//     setOutput(""); // Clear previous output
//     setSubmissionId(null); // Reset submission ID

//     const requestBody = {
//       language_id: getLanguageId(language), // Get the language ID
//       source_code: code, // Code to execute
//       stdin: "", // No input for now
//       expected_output: "", // Optional: specify expected output
//     };

//     try {
//       // Create a new submission (POST request)
//       const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//           "X-RapidAPI-Key": "your-rapidapi-key", // Replace with your API key
//         },
//         body: JSON.stringify(requestBody),
//       });

//       const result = await response.json();
//       if (!response.ok) {
//         console.error("API Response Error:", result);
//         throw new Error(result.message || "Unknown API Error");
//       }

//       // Save the submission ID for later
//       setSubmissionId(result.token);
//       checkSubmissionStatus(result.token); // Now check the status
//     } catch (error) {
//       console.error("Error:", error);
//       setOutput(`Error: ${error.message}`);
//       setIsLoading(false);
//     }
//   };

//   // Function to check the status of the submission
//   const checkSubmissionStatus = async (token) => {
//     try {
//       const response = await fetch(
//         `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
//         {
//           method: "GET",
//           headers: {
//             "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//             "X-RapidAPI-Key": "7c80f3a3c5mshcbb5627a3a649dbp197417jsn4f5d0903f82b", // Replace with your API key
//           },
//         }
//       );

//       const result = await response.json();
//       if (!response.ok) {
//         throw new Error(result.message || "Unknown API Error");
//       }

//       // Check if the status is "completed"
//       if (result.status?.id === 3) {
//         setOutput(result.stdout || result.stderr || "No output");
//         setIsLoading(false); // Stop loading when completed
//       } else {
//         // If status is not "completed", retry after a short delay
//         setTimeout(() => checkSubmissionStatus(token), 1000); // Retry after 1 second
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setOutput(`Error: ${error.message}`);
//       setIsLoading(false);
//     }
//   };

//   // Helper function to map language to language ID
//   const getLanguageId = (lang) => {
//     switch (lang) {
//       case "python3":
//         return 71;
//       case "c":
//         return 50;
//       case "cpp":
//         return 54;
//       case "java":
//         return 62;
//       default:
//         return 71; // Default to Python
//     }
//   };

//   const handleCodeChange = (e) => setCode(e.target.value);
//   const handleLanguageChange = (e) => setLanguage(e.target.value);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//       <h1 className="text-2xl font-bold mb-4">Multi-Language Code Editor</h1>

//       {/* Language Selector */}
//       <div className="w-11/12 max-w-4xl mb-4">
//         <label className="block text-sm font-medium mb-2">Select Language:</label>
//         <select
//           value={language}
//           onChange={handleLanguageChange}
//           className="w-full p-2 text-black rounded-md"
//         >
//           <option value="python3">Python</option>
//           <option value="c">C</option>
//           <option value="cpp">C++</option>
//           <option value="java">Java</option>
//         </select>
//       </div>

//       {/* Code Editor */}
//       <div className="w-11/12 max-w-4xl">
//         <textarea
//           className="w-full h-60 p-4 font-mono text-sm bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={code}
//           onChange={handleCodeChange}
//         />
//       </div>

//       {/* Run Code Button */}
//       <div className="flex justify-end w-11/12 max-w-4xl mt-4">
//         <button
//           onClick={executeCode}
//           disabled={isLoading}
//           className={`px-4 py-2 text-sm font-semibold ${
//             isLoading ? "bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
//           } text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
//         >
//           {isLoading ? "Running..." : "Run Code"}
//         </button>
//       </div>

//       {/* Output */}
//       <div className="w-11/12 max-w-4xl mt-6">
//         <h2 className="text-lg font-semibold mb-2">Output:</h2>
//         <div className="p-4 bg-gray-800 border border-gray-700 rounded-md text-sm font-mono whitespace-pre-wrap">
//           {output || "Your output will appear here"}
//         </div>
//       </div>

//       {/* Syntax Highlighting */}
//       <div className="w-11/12 max-w-4xl mt-6">
//         <h2 className="text-lg font-semibold mb-2">Preview:</h2>
//         <div className="p-4 bg-gray-800 border border-gray-700 rounded-md overflow-auto">
//           <SyntaxHighlighter language={getSyntaxHighlightLanguage(language)} style={tomorrow}>
//             {code}
//           </SyntaxHighlighter>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper function to map the language to syntax highlighter
// const getSyntaxHighlightLanguage = (lang) => {
//   switch (lang) {
//     case "c":
//       return "c";
//     case "cpp":
//       return "cpp";
//     case "python3":
//       return "python";
//     case "java":
//       return "java";
//     default:
//       return "plaintext";
//   }
// };

// export default CodeEditor;


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
