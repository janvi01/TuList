import React from "react";

const PlaylistList = ({ playlists, onDeletePlaylist }) => {
  const handleDeletePlaylist = async (playlistId) => {
    try {
      await onDeletePlaylist(playlistId);
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  return (
    <div className="max-w-md bg-white border rounded-md p-4">
      <h2 className="text-xl font-semibold mb-4">Playlists</h2>
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className="flex justify-between items-center border-b py-2"
        >
          <p className="text-blue-500">{playlist.url}</p>
          <button
            onClick={() => handleDeletePlaylist(playlist.id)}
            className="text-red-500 hover:text-red-700 focus:outline-none focus:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;
