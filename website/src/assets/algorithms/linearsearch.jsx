// import React, { useState } from "react";
// import LinearSearchApp from "./LinearSearchApp.jsx";

// const sections = [
//   { id: "intro", label: "Introduction", image: "./src/assets/img/intro.png"},
//   { id: "video", label: "Video Lecture", image: "./src/assets/img/video.png" },
//   { id: "algorithm", label: "Algorithm", image: "./src/assets/img/algorithm.png" },
//   { id: "working", label: "Working", image: "./src/assets/img/working.png" },
//   { id: "code", label: "Linear Search Code", image: "./src/assets/img/code.png" },
//   { id: "analysis", label: "Analysis", image: "./src/assets/img/analysis.png" },
// ];


// const LinearSearch = () => {
//   const [open, setOpen] = useState(true);

//   return (
//     <div className="flex bg-white min-h-screen">
//       {/* Sidebar */}
//       <div
//         className={`${
//           open ? "w-72" : "w-20"
//         } bg-gray-800 h-screen p-5 pt-8 fixed top-0 left-0 duration-300`}
//       >
//         {/* Toggle Button */}
//         <img
//           src="./src/assets/img/control.png"
//           className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
//            border-2 rounded-full ${!open && "rotate-180"}`}
//           onClick={() => setOpen(!open)}
//           alt="toggle"
//         />
//         {/* Logo and Title */}
//         <div className="flex gap-x-4 items-center">
//           <img
//             src="./src/assets/img/logo.png"
//             className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
//             alt="logo"
//           />
//           <h1
//             className={`text-white origin-left font-medium text-xl duration-200 ${
//               !open && "scale-0"
//             }`}
//           >
//             Linear Search
//           </h1>
//         </div>
//         {/* Sidebar Menu */}
//         <ul className="pt-6">
//           {sections.map((section) => (
//             <li
//               key={section.id}
//               className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2`}
//             >
//               <img
//                 src={section.image}
//                 alt={`${section.label} icon`}
//                 className="w-6 h-6"
//               />
//               <a
//                 href={`#${section.id}`}
//                 className={`text-gray-300 hover:text-white ${
//                   !open && "hidden"
//                 } origin-left duration-200`}
//               >
//                 {section.label}
//               </a>
//             </li>
//           ))}
//         </ul>

//       </div>

//       {/* Main Content */}
//       <div className={`flex-1 transition-all duration-300 ml-${open ? '72' : '20'}`}>

//         {sections.map((section) => (
//           <section
//             key={section.id}
//             id={section.id}
//             className="h-screen flex flex-col items-center justify-center bg-gray-100 border border-gray-300 p-8"
//           >
//             <div className="text-lg text-gray-700 text-center">
//               {/* Content for each section */}
//               {section.id === "intro" && (
//                 <>
//                   <div className="flex flex-col items-center">
//                     <img
//                       src="https://seeklogo.com/images/S/srm-university-logo-81BF9B8323-seeklogo.com.png"
//                       alt="SRM Logo"
//                       className="h-24 w-24 mb-4"
//                     />
//                     <h2 className="text-2xl font-bold">
//                       SRM Institute of Science and Technology
//                     </h2>
//                     <p className="text-lg">Department of Computational Intelligence</p>
//                     <p className="text-lg">
//                       Virtual Lab - Design and Analysis of Algorithms
//                     </p>
//                   </div>
                  
//                   <p className="mt-8">
//                     Linear search is a simple search algorithm that checks every
//                     element in a list sequentially until the desired element is
//                     found or the list ends.
//                   </p>
//                   <p>
//                     It is one of the most straightforward searching techniques and
//                     is easy to implement.
//                   </p>
//                 </>
//               )}
//               {section.id === "video" && (
//                 <>
//                   <h2 className="text-2xl font-semibold mt-4">Video Lecture</h2>
//                   <p>
//                     Watch our video lecture to understand linear search in detail.
//                   </p>
//                   <iframe
//                     width="560"
//                     height="315"
//                     src="https://www.youtube.com/embed/dQw4w9WgXcQ"
//                     title="YouTube video player"
//                     frameBorder="0"
//                     allowFullScreen
//                   ></iframe>
//                 </>
//               )}
//               {section.id === "algorithm" && (
//                 <>
//                   <h2 className="text-2xl font-semibold mt-4">Algorithm</h2>
//                   <p>The linear search algorithm works as follows:</p>
//                   <ol className="list-decimal list-inside mb-4">
//                     <li>Start from the first element of the list.</li>
//                     <li>Compare the current element with the target value.</li>
//                     <li>If they match, return the index of the current element.</li>
//                     <li>If not, move to the next element and repeat until the end of the list.</li>
//                     <li>If the end is reached without finding the target, return -1 (not found).</li>
//                   </ol>
//                 </>
//               )}
//               {section.id === "working" && (
//                 <>
//                   <LinearSearchApp />
//                 </>
//               )}
//               {section.id === "code" && (
//                 <>
//                   <h2 className="text-2xl font-semibold mt-4">
//                     Linear Search Code
//                   </h2>
//                   <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto">
//                     {`function linearSearch(arr, target) {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === target) {
//       return i; // Return index if found
//     }
//   }
//   return -1; // Return -1 if not found
// }`}
//                   </pre>
//                 </>
//               )}
//               {section.id === "analysis" && (
//                 <>
//                   <h2 className="text-2xl font-semibold mt-4">Analysis</h2>
//                   <p>
//                     The time complexity of linear search is O(n), where n is the
//                     number of elements in the array. This means that in the worst
//                     case, you may need to check every element in the array.
//                   </p>
//                   <p>
//                     While linear search is simple and effective for small
//                     datasets, it becomes inefficient for larger datasets compared
//                     to more advanced algorithms like binary search.
//                   </p>
//                 </>
//               )}
//             </div>
//           </section>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LinearSearch;

import React, { useState } from "react";
import LinearSearchApp from "./LinearSearchApp.jsx";

const sections = [
  { id: "intro", label: "Introduction", image: "./src/assets/img/intro.png"},
  { id: "video", label: "Video Lecture", image: "./src/assets/img/video.png" },
  { id: "algorithm", label: "Algorithm", image: "./src/assets/img/algorithm.png" },
  { id: "working", label: "Working", image: "./src/assets/img/working.png" },
  { id: "code", label: "Linear Search Code", image: "./src/assets/img/code.png" },
  { id: "analysis", label: "Analysis", image: "./src/assets/img/analysis.png" },
];

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
        {/* Toggle Button */}
        <img
          src="./src/assets/img/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="toggle"
        />
        {/* Logo and Title */}
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
        {/* Sidebar Menu */}
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
              <a
                href={`#${section.id}`}
                className={`text-gray-300 hover:text-white ${
                  !open && "hidden"
                } origin-left duration-200`}
              >
                {section.label}
              </a>
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
          <section
            key={section.id}
            id={section.id}
            className="h-screen flex flex-col items-center justify-center bg-gray-100 border border-gray-300 p-8"
          >
            <div className="text-lg text-gray-700 text-center">
              {/* Content for each section */}
              {section.id === "intro" && (
                <>
                  <div className="flex flex-col items-center">
                    <img
                      src="https://seeklogo.com/images/S/srm-university-logo-81BF9B8323-seeklogo.com.png"
                      alt="SRM Logo"
                      className="h-24 w-24 mb-4"
                    />
                    <h2 className="text-2xl font-bold">
                      SRM Institute of Science and Technology
                    </h2>
                    <p className="text-lg">Department of Computational Intelligence</p>
                    <p className="text-lg">
                      Virtual Lab - Design and Analysis of Algorithms
                    </p>
                  </div>
                  <p className="mt-8">
                    Linear search is a simple search algorithm that checks every
                    element in a list sequentially until the desired element is
                    found or the list ends.
                  </p>
                  <p>
                    It is one of the most straightforward searching techniques and
                    is easy to implement.
                  </p>
                </>
              )}
              {section.id === "video" && (
                <>
                  <h2 className="text-2xl font-semibold mt-4">Video Lecture</h2>
                  <p>
                    Watch our video lecture to understand linear search in detail.
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
      </div>
    </div>
  );
};

export default LinearSearch;
