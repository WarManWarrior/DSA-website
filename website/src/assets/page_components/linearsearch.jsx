import React, { useState } from "react";
import { Link, Element } from "react-scroll";
import CodeEditor from "../page_components/CodeEditor"; // Import the CodeEditor component

const sections = [
  { id: "intro", label: "Introduction", image: "./src/assets/img/intro.png" },
  { id: "video", label: "Video Lecture", image: "./src/assets/img/video.png" },
  { id: "algorithm", label: "Algorithm", image: "./src/assets/img/algorithm.png" },
  { id: "working", label: "Working", image: "./src/assets/img/working.png" },
  { id: "code", label: "Linear Search Code", image: "./src/assets/img/code.png" },
  { id: "analysis", label: "Analysis", image: "./src/assets/img/analysis.png" },
];

// Hardcoded experiment data
const experiment = {
  title: "Linear Search Code",
  configs: {
    python3: {
      code: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Example
arr = [2, 4, 6, 8, 10]
print(linear_search(arr, 6))  # Output: 2`,
      output: "2",
    },
    c: {
      code: `#include <stdio.h>
int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target)
            return i;
    }
    return -1;
}
int main() {
    int arr[] = {2, 4, 6, 8, 10};
    int n = sizeof(arr) / sizeof(arr[0]);
    printf("%d\\n", linearSearch(arr, n, 6));  // Output: 2
    return 0;
}`,
      output: "2",
    },
    cpp: {
      code: `#include <iostream>
using namespace std;

int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target)
            return i;
    }
    return -1;
}

int main() {
    int arr[] = {2, 4, 6, 8, 10};
    int n = sizeof(arr) / sizeof(arr[0]);
    cout << linearSearch(arr, n, 6) << endl;  // Output: 2
    return 0;
}`,
      output: "2",
    },
    java: {
      code: `public class LinearSearch {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target)
                return i;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {2, 4, 6, 8, 10};
        System.out.println(linearSearch(arr, 6));  // Output: 2
    }
}`,
      output: "2",
    },
  },
};

const LinearSearch = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex bg-white min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-gray-800 h-screen p-5 pt-8 fixed top-0 left-0 duration-300`}
      >
        <img
          src="./src/assets/img/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
          alt="toggle"
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/img/logo.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
            alt="logo"
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Linear Search
          </h1>
        </div>
        <ul className="pt-6">
          {sections.map((section) => (
            <li
              key={section.id}
              className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2"
            >
              <img
                src={section.image}
                alt={`${section.label} icon`}
                className="w-6 h-6"
              />
              <Link
                to={section.id}
                smooth={true}
                duration={500}
                className={`text-gray-300 hover:text-white ${
                  !open && "hidden"
                } origin-left duration-200`}
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          open ? "ml-72" : "ml-20"
        }`}
      >
        {sections.map((section) => (
          <Element
            key={section.id}
            id={section.id}
            className="h-screen flex flex-col items-center justify-center bg-gray-100 border border-gray-300 p-8"
          >
            <div className="text-lg text-gray-700 text-center">
              {section.id === "intro" && (
                <div className="flex flex-col items-center">
                  <img
                    src="https://d23qowwaqkh3fj.cloudfront.net/wp-content/uploads/2022/01/srm-logo-white.svg.gzip"
                    alt="SRM Logo"
                    className="h-24 w-24 mb-4 max-w-full"
                  />
                  <h2 className="text-2xl font-bold">SRM Institute of Science and Technology</h2>
                  <p className="text-lg">Department of Computational Intelligence</p>
                  <p className="text-lg">Virtual Lab - Design and Analysis of Algorithms</p>
                  <p className="mt-4 sm:mt-8">
                    Linear search is a simple search algorithm that checks every
                    element in a list sequentially until the desired element is found or the list ends.
                  </p>
                </div>
              )}
              {section.id === "video" && (
                <>
                  <h2 className="text-2xl font-semibold mt-4">Video Lecture</h2>
                  <p>Watch our video lecture to understand linear search in detail.</p>
                  <div className="aspect-w-16 h-full w-full max-w-4xl">
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="YouTube video player"
                      frameBorder="0"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </>
              )}
              {section.id === "algorithm" && (
                <>
                  <h2 className="text-2xl font-semibold mt-4">Algorithm</h2>
                  <ol className="list-decimal list-inside mb-4">
                    <li>Start from the first element of the list.</li>
                    <li>Compare the current element with the target value.</li>
                    <li>If they match, return the index of the current element.</li>
                    <li>If not, move to the next element and repeat until the end of the list.</li>
                    <li>If the end is reached without finding the target, return -1.</li>
                  </ol>
                </>
              )}
              {section.id === "working" && (
                <>
                  <h2 className="text-2xl font-semibold mt-4">Working of Linear Search</h2>
                  <p>Here we demonstrate how Linear Search works:</p>
                </>
              )}
              {section.id === "code" && (
                <CodeEditor experiment={experiment} />
              )}
              {section.id === "analysis" && (
                <>
                  <h2 className="text-2xl font-semibold mt-4">Analysis</h2>
                  <p>
                    The time complexity of linear search is O(n), where n is the
                    number of elements in the array.
                  </p>
                  <p>
                    While simple and effective for small datasets, it becomes
                    inefficient for larger datasets compared to advanced
                    algorithms.
                  </p>
                </>
              )}
            </div>
          </Element>
        ))}
      </div>
    </div>
  );
};

export default LinearSearch;
