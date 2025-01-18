import React from "react";

const VideoLecture = () => (
  <div>
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
  </div>
);

export default VideoLecture;
