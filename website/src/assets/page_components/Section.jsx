import React from "react";
import { Element } from "react-scroll";
import CodeEditor from "../page_components/CodeEditor";

const Section = ({ section, experiment }) => {
  return (
    <Element
      id={section.id}
      className="h-screen flex flex-col items-center justify-center bg-gray-100 border border-gray-300 p-8"
    >
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
      {section.id === "code" && <CodeEditor experiment={experiment} />}
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
    </Element>
  );
};

export default Section;
