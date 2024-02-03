import React from "react";

const PlaylistItem = ({ playlist, playlistDetails, onDeletePlaylist }) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      {playlistDetails[playlist.url] ? (
        <>
          <div className="flex items-center">
            <img
              src={playlistDetails[playlist.url].thumbnailUrl}
              alt="Playlist Thumbnail"
              className="w-12 h-12 mr-2 rounded-md"
            />
            <p className="text-blue-500">
              {playlistDetails[playlist.url].title}
            </p>
          </div>
        </>
      ) : (
        <p className="text-blue-500">{playlist.url}</p>
      )}
      <button
        onClick={() => onDeletePlaylist(playlist.id)}
        className="text-red-500 hover:text-red-700 focus:outline-none focus:text-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default PlaylistItem;
