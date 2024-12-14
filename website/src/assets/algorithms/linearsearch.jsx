import React, { useState } from "react";
import LinearSearchApp from './LinearSearchApp.jsx';


const sections = [
  { id: "intro", label: "Introduction" },
  { id: "video", label: "Video Lecture" },
  { id: "algorithm", label: "Algorithm" },
  { id: "working", label: "Working" },
  { id: "code", label: "Linear Search Code" },
  { id: "analysis", label: "Analysis" },
];

function LinearSearch() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="min-h-screen flex bg-white flex-col">
      {/* Fixed Menu Button */}
      <button
        className="fixed top-10 left-6 btn btn-sm btn-primary z-50"
        onClick={toggleNav}
      >
        {isNavOpen ? "Close" : "Menu"}
      </button>

      {/* Collapsible Sidebar */}
      <nav
        className={`fixed left-0 top-0 h-full bg-gray-800 shadow-md z-50 transform ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <ul className="flex flex-col space-y-4 mt-16 p-4">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="btn btn-link text-lg text-white hover:text-gray-300"
                onClick={toggleNav} // Close menu on link click
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Page Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isNavOpen ? "ml-64" : "ml-0"
        }`}
      >
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="h-screen flex flex-col items-center justify-center bg-gray-100 border border-gray-300 p-8"
          >
            
            <div className="text-lg text-gray-700 text-center">
              {section.id === "intro" && (
                <>
                  <div className="flex flex-col items-center">
                    <img
                      src="https://seeklogo.com/images/S/srm-university-logo-81BF9B8323-seeklogo.com.png"
                      alt="SRM Logo"
                      className="absolute top-4 left-60 h-24 w-24"
                    />
                    <h2 className="text-2xl font-bold absolute top-4 left-130">SRM Institute of Science and Technology</h2>
                    <p className="text-lg absolute top-12 left-130">Department of Computational Intelligence</p>
                    <p className="text-lg absolute top-20 left-130">
                      Virtual Lab - Design and Analysis of Algorithms
                    </p>
                    <hr className="absolute top-28 left-130 w-[100%] border-t-2 border-gray-300" />
                  </div>
                  <p className="mt-8">
                    Linear search is a simple search algorithm that checks every
                    element in a list sequentially until the desired element is
                    found or the list ends.
                  </p>
                  <p>
                    It is one of the most straightforward searching techniques
                    and is easy to implement.
                  </p>
                </>
              )}
              {section.id === "video" && (
                <>
                  <h2 className="text-2xl font-semibold mt-4">Video Lecture</h2>
                  <p>
                    Watch our video lecture to understand linear search in
                    detail.
                  </p>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </>
              )}
              {section.id === "algorithm" && (
                <>
                  <h2 className="text-2xl font-semibold mt-4">Algorithm</h2>
                  <p>The linear search algorithm works as follows:</p>
                  <ol className="list-decimal list-inside mb-4">
                    <li>Start from the first element of the list.</li>
                    <li>Compare the current element with the target value.</li>
                    <li>If they match, return the index of the current element.</li>
                    <li>If not, move to the next element and repeat until the end of the list.</li>
                    <li>If the end is reached without finding the target, return -1 (not found).</li>
                  </ol>
                </>
              )}
              {section.id === "working" && (
                <>
                  <LinearSearchApp />
                </>
              )}
              {section.id === "code" && (
                <>
                  <h2 className="text-2xl font-semibold mt-4">
                    Linear Search Code
                  </h2>
                  <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto">
                    {`function linearSearch(arr, target) {
                      for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === target) {
                          return i; // Return index if found
                        }
                      }
                      return -1; // Return -1 if not found
                    }`}
                  </pre>
                </>
              )}
              {section.id === "analysis" && (
                <>
                  <h2 className="text-2xl font-semibold mt-4">Analysis</h2>
                  <p>
                    The time complexity of linear search is O(n), where n is the
                    number of elements in the array. This means that in the worst
                    case, you may need to check every element in the array.
                  </p>
                  <p>
                    While linear search is simple and effective for small
                    datasets, it becomes inefficient for larger datasets compared
                    to more advanced algorithms like binary search.
                  </p>
                </>
              )}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default LinearSearch;
