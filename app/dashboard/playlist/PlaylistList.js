import React, { useState, useEffect } from "react";
import PlaylistItem from "./PlaylistItem";

const PlaylistList = ({ playlists, onDeletePlaylist }) => {
  const [playlistDetails, setPlaylistDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchPlaylistDetails = async (url) => {
      try {
        // Check if playlist details are already fetched
        if (playlistDetails[url]) {
          return;
        }

        // Extract playlist ID from YouTube URL
        const playlistId = getPlaylistIdFromUrl(url);

        // Make a request to the YouTube Data API to get details
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&key=${apiKey}&maxResults=1&id=${playlistId}`
        );

        if (response.ok) {
          const data = await response.json();

          if (data.items.length > 0) {
            const playlistDetailsData = data.items[0];
            console.log(playlistDetailsData);
            const snippet = playlistDetailsData.snippet;
            const contentDetails = playlistDetailsData.contentDetails;

            const publishedDate = new Date(
              snippet.publishedAt
            ).toLocaleDateString();

            setPlaylistDetails((prevDetails) => ({
              ...prevDetails,
              [url]: {
                channelTitle: snippet.channelTitle,
                description: snippet.description,
                title: snippet.title,
                thumbnailUrl: snippet.thumbnails.standard.url,
                totalVideos: contentDetails.itemCount,
                publishedAt: publishedDate,
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

    const fetchData = async () => {
      setLoading(true);
      await Promise.all(
        playlists.map((playlist) => fetchPlaylistDetails(playlist.url))
      );
      setLoading(false);
    };

    fetchData();
  }, [playlists]);

  const getPlaylistIdFromUrl = (url) => {
    // Extract playlist ID from YouTube URL
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("list");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Playlists</h2>
      <div className="flex flex-col flex-wrap lg:flex-row justify-center gap-8 items-center border-b py-2">
        {playlists.map((playlist) => (
          <PlaylistItem
            key={playlist.id}
            playlist={playlist}
            playlistDetails={playlistDetails}
            onDeletePlaylist={onDeletePlaylist}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistList;
