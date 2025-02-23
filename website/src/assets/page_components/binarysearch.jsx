import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx"; // Import the Navbar
import Sidebar from "./components/Sidebar.jsx";
import Section from "./components/Section.jsx";
import Intro from "./components/Intro.jsx";
import VideoLecture from "./components/VideoLecture.jsx";
import Algorithm from "./components/Algorithm.jsx";
import Analysis from "./components/Analysis.jsx";
import Working from "./components/Working.jsx";
import CodeEditor from "./components/CodeEditor.jsx";
import Binary_Search from "../algorithms/Binary_Search.jsx"
import data from "./data.json";

const Binarysearch = () => {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  const { title, sections, experiment } = data.Binary_Search;

  return (
    <div className="flex flex-col bg-white min-h-screen text-black">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar sections={sections} open={open} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 transition-all duration-300 ${open ? "ml-72" : "ml-20"} p-4`}>
          {/* Title */}
          {title && <h1 className="text-3xl font-bold text-center mb-6">{title}</h1>}
          
          {/* Render Sections */}
          {sections.map((section) => (
            <Section key={section.id} id={section.id}>
              {/* Subheading */}
              <h2 className="text-xl font-semibold mb-2">{section.label}</h2>

              {/* Conditionally Render Components Based on Section ID */}
              {section.id === "intro" && <Intro content={section.content} />}
              {section.id === "video" && <VideoLecture videoUrl={section.videoUrl} />}
              {section.id === "algorithm" && <Algorithm content={section.content} />}
              {section.id === "working" && (
                <div className="w-full h-full flex justify-center items-center">
                  <Binary_Search />
                </div>
              )}
              {section.id === "code" && <CodeEditor experiment={experiment} />}
              {section.id === "analysis" && <Analysis content={section.content} />}
            </Section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Binarysearch;