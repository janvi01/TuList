import React from "react";

const PlaylistHeader = ({
  totalDuration,
  totalVideos,
  totalCompletedVideos,
}) => {
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

  return (
    <div className="flex flex-col lg:flex-row items-center">
      <span className="py-1.5 px-4 my-4 mx-2 rounded-full text-sm font-medium bg-teal-800/30 text-teal-500 w-max">
        Total Duration of Playlist: {DurationFormatter(totalDuration)}
      </span>
      <span className="py-1.5 px-4 my-4 mx-2 rounded-full text-sm font-medium bg-teal-800/30 text-teal-500 w-max">
        Total Videos: {totalVideos}
      </span>
      <span className="py-1.5 px-4 my-4 mx-2 rounded-full text-sm font-medium bg-teal-800/30 text-teal-500 w-max">
        Total Completed Videos: {totalCompletedVideos}
      </span>
    </div>
  );
};

export default PlaylistHeader;
