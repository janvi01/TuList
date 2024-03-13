import React, { useState } from "react";

const PlaylistHeader = ({
  totalDuration,
  totalCompletedVideos,
  videos,
  setVideos,
}) => {
  const [sortBy, setSortBy] = useState("none");

  const DurationFormatter = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    let formattedDuration = "";
    if (hours > 0) {
      formattedDuration += `${hours} ${hours === 1 ? "hour" : "hours"} `;
    }
    if (minutes > 0) {
      formattedDuration += `${minutes} ${
        minutes === 1 ? "minute" : "minutes"
      } `;
    }
    if (seconds > 0) {
      formattedDuration += `${seconds} ${seconds === 1 ? "second" : "seconds"}`;
    }
    return formattedDuration;
  };

  const sortByCriteria = (criteria) => {
    const sortingFunction = (a, b) => {
      if (criteria === "likes") {
        return b.likesCount - a.likesCount;
      } else if (criteria === "views") {
        return b.viewCount - a.viewCount;
      } else {
        return a.snippet.position - b.snippet.position; // Default sorting
      }
    };
    const sortedVideos = [...videos].sort(sortingFunction);
    setVideos(sortedVideos);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    sortByCriteria(value);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center">
      <span className="py-1.5 px-4 my-4 mx-2 rounded-full text-sm font-medium bg-teal-800/30 text-teal-500 w-max">
        Total Duration of Playlist: {DurationFormatter(totalDuration)}
      </span>
      <span className="py-1.5 px-4 my-4 mx-2 rounded-full text-sm font-medium bg-teal-800/30 text-teal-500 w-max">
        Total Videos: {videos.length}
      </span>
      <span className="py-1.5 px-4 my-4 mx-2 rounded-full text-sm font-medium bg-teal-800/30 text-teal-500 w-max">
        Total Completed Videos: {totalCompletedVideos}
      </span>
      <div className="py-1.5 px-4 my-4 text-sm rounded-full font-medium bg-teal-800/30 text-teal-500">
        <label htmlFor="sort">Sort videos by:</label>
        <select
          id="sort"
          value={sortBy}
          onChange={handleSortChange}
          className="ml-2 pr-6 bg-transparent cursor-pointer focus:outline-none text-yellow-500"
        >
          <option value="none">None</option>
          <option value="likes">Likes</option>
          <option value="views">Views</option>
        </select>
      </div>
    </div>
  );
};

export default PlaylistHeader;
