"use client";
import React, { useState, useEffect } from "react";

const PlaylistDetails = ({ params: { id } }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        if (!id) {
          // when id is not defined
          console.warn("No playlist id provided.");
          return;
        }

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${apiKey}&maxResults=50&playlistId=${id}`
        );

        if (response.ok) {
          const data = await response.json();

          if (data.items && data.items.length > 0) {
            setVideos(data.items);
          } else {
            console.warn("No videos found for the playlist.");
          }
        } else {
          console.error("Error fetching playlist videos:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching playlist videos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlaylistVideos();
    }
  }, [id, apiKey]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-black">
        Playlist Details
      </h2>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <img
              src={video.snippet.thumbnails.default.url}
              alt="Video Thumbnail"
              className="w-12 h-12 mr-2 rounded-md"
            />
            <p>{video.snippet.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistDetails;
