import React, { useState } from "react";

const VideoItem = ({ video, markVideoAsCompleted, completedVideos, id }) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoId = video.snippet.resourceId.videoId;

  const handleTitleClick = () => {
    setShowVideo(!showVideo);
  };

  return (
    <li
      key={video.id}
      className="flex flex-col w-full sm:flex-row gap-4 py-5 border-b mb-4 p-6 border rounded-lg shadow bg-gray-800 border-gray-700 hover:bg-gray-700"
    >
      <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
        <span className="m-4 text-white">{video.snippet.position + 1}.</span>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-24 w-24 rounded-full bg-gray-50"
            src={video.snippet.thumbnails.high.url}
            alt="Video Thumbnail"
          />
        </a>
      </div>
      <div className="flex flex-col flex-grow">
        <span
          className="text-white text-lg font-semibold mb-2 cursor-pointer"
          onClick={handleTitleClick}
        >
          {video.snippet.title}
        </span>
        {showVideo && (
          <div className="relative mb-4">
            <iframe
              title={video.snippet.title}
              width="80%"
              height="350"
              src={`https://www.youtube.com/embed/${videoId}`}
              allowFullScreen
              className="rounded-md mt-4"
            />
          </div>
        )}
        <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
          <span className="w-max py-1.5 px-4 rounded-full text-sm font-medium bg-green-800/30 text-green-500">
            Published on{" "}
            {new Date(video.snippet.publishedAt).toLocaleDateString()}
          </span>
          <span className="py-1.5 px-4 rounded-full text-sm font-medium bg-blue-800/30 text-blue-500">
            Duration: {video.duration}
          </span>
          <span className="py-1.5 px-4 rounded-full text-sm font-medium bg-yellow-800/30 text-yellow-500">
            Views: {video.viewCount}
          </span>
          <span className="py-1.5 px-4 rounded-full text-sm font-medium bg-teal-800/30 text-teal-500">
            Likes: {video.likesCount}
          </span>
        </div>
      </div>
      {completedVideos.has(video.snippet.resourceId.videoId) ? (
        <input
          type="checkbox"
          checked={completedVideos.has(video.snippet.resourceId.videoId)}
          onChange={() =>
            markVideoAsCompleted(video.snippet.resourceId.videoId, id, false)
          }
          className="w-10 mx-4 mt-4 sm:mt-0 cursor-pointer"
          title="mark video as incomplete"
        />
      ) : (
        <input
          type="checkbox"
          checked={completedVideos.has(video.snippet.resourceId.videoId)}
          onChange={() =>
            markVideoAsCompleted(video.snippet.resourceId.videoId, id, true)
          }
          className="w-10 mx-4 mt-4 sm:mt-0 cursor-pointer"
          title="mark video as completed"
        />
      )}
    </li>
  );
};

export default VideoItem;
