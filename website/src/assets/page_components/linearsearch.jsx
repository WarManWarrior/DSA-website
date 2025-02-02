import React, { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Section from "./components/Section.jsx";
import Intro from "./components/Intro.jsx";
import VideoLecture from "./components/VideoLecture.jsx";
import Algorithm from "./components/Algorithm.jsx";
import Analysis from "./components/Analysis.jsx";
import Working from "./components/Working.jsx";
import CodeEditor from "./components/CodeEditor.jsx";
import data from "./data.json";

const LinearSearch = () => {
  const [open, setOpen] = useState(true);
  const { sections, experiment } = data;

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar sections={sections} open={open} setOpen={setOpen} />
      <div className={`flex-1 transition-all duration-300 ${open ? "ml-72" : "ml-20"}`}>
        {sections.map((section) => (
          <Section key={section.id} id={section.id}>
            {section.id === "intro" && <Intro />}
            {section.id === "video" && <VideoLecture />}
            {section.id === "algorithm" && <Algorithm />}
            {section.id === "working" && <Working />}
            {section.id === "code" && <CodeEditor experiment={experiment} />}
            {section.id === "analysis" && <Analysis />}
          </Section>
        ))}
      </div>
    </div>
  );
};



export default LinearSearch;
