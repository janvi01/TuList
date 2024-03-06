import React from "react";
import VideoItem from "./VideoItem";

const VideoList = ({ videos, markVideoAsCompleted, completedVideos, id }) => {
  return (
    <ul className="m-4 w-full max-w-screen-xl overflow-y-auto">
      {videos.map((video) => (
        <VideoItem
          key={video.id}
          video={video}
          markVideoAsCompleted={markVideoAsCompleted}
          completedVideos={completedVideos}
          id={id}
        />
      ))}
    </ul>
  );
};

export default VideoList;
