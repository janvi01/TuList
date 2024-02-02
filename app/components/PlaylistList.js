// PlaylistList.js

import React from "react";

const PlaylistList = ({ playlists }) => {
  return (
    <div className="max-w-md bg-white border rounded-md p-4">
      <h2 className="text-xl font-semibold mb-4">Playlists</h2>
      {playlists.map((playlist, index) => (
        <div key={index} className="border-b py-2">
          <p className="text-blue-500">{playlist.url}</p>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;
