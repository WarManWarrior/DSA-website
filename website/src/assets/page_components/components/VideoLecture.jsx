import React from "react";

const VideoLecture = (props) => (
  <div>
    <h2 className="text-2xl font-semibold mt-4">Video Lecture</h2>
    <p>Watch our video lecture to understand in detail.</p>
    <div className="aspect-w-16 h-full w-full max-w-4xl">
      <iframe
        src={props.vlink}
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  </div>
);

export default VideoLecture;
