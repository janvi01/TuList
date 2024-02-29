import React from "react";

const PlaylistHeader = ({ totalDuration }) => {
  return (
    <span className="py-1.5 px-4 m-4 rounded-full text-sm font-medium bg-teal-800/30 text-teal-500 w-max">
      Total Duration of Playlist: {totalDuration} seconds
    </span>
  );
};

export default PlaylistHeader;
