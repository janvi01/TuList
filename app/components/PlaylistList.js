import React, { useState, useEffect } from "react";

const PlaylistList = ({ playlists, onDeletePlaylist }) => {
  const [playlistDetails, setPlaylistDetails] = useState({});
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchPlaylistDetails = async (url) => {
      try {
        // Extract playlist ID from YouTube URL
        const playlistId = getPlaylistIdFromUrl(url);

        // Make a request to the YouTube Data API to get details
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlists?part=snippet&key=${apiKey}&maxResults=1&id=${playlistId}`
        );
        console.log(apiKey);

        if (response.ok) {
          const data = await response.json();

          if (data.items.length > 0) {
            const playlistDetails = data.items[0].snippet;
            setPlaylistDetails((prevDetails) => ({
              ...prevDetails,
              [url]: {
                title: playlistDetails.title,
                thumbnailUrl: playlistDetails.thumbnails.default.url,
              },
            }));
          } else {
            setPlaylistDetails((prevDetails) => ({
              ...prevDetails,
              [url]: null,
            }));
          }
        } else {
          console.error(
            "Error fetching playlist details:",
            response.statusText
          );
          setPlaylistDetails((prevDetails) => ({
            ...prevDetails,
            [url]: null,
          }));
        }
      } catch (error) {
        console.error("Error fetching playlist details:", error);
        setPlaylistDetails((prevDetails) => ({
          ...prevDetails,
          [url]: null,
        }));
      }
    };

    playlists.forEach((playlist) => {
      if (!playlistDetails[playlist.url]) {
        fetchPlaylistDetails(playlist.url);
      }
    });
  }, [playlists]);

  const getPlaylistIdFromUrl = (url) => {
    // Extract playlist ID from YouTube URL
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("list");
  };

  return (
    <div className="max-w-md bg-white border rounded-md p-4">
      <h2 className="text-xl font-semibold mb-4">Playlists</h2>
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className="flex justify-between items-center border-b py-2"
        >
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
      ))}
    </div>
  );
};

export default PlaylistList;
