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

        let nextPageToken = "";
        const allVideos = [];

        do {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${apiKey}&maxResults=50&playlistId=${id}&pageToken=${nextPageToken}`
          );

          if (response.ok) {
            const data = await response.json();
            console.log(data);

            if (data.items && data.items.length > 0) {
              allVideos.push(...data.items);
            } else {
              console.warn("No videos found for the playlist.");
            }

            nextPageToken = data.nextPageToken;
          } else {
            console.error(
              "Error fetching playlist videos:",
              response.statusText
            );
            break;
          }
        } while (nextPageToken);

        setVideos(allVideos);
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
    <ul className="bg-gray-700 m-8 p-4 overflow-y-auto">
      {videos.map((video) => (
        <li
          key={video.id}
          className="flex flex-col sm:flex-row gap-4 py-5 border-b border-gray-600 mb-4"
        >
          <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
            <span className="m-4">{video.snippet.position + 1}</span>
            <a
              href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
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
            <a
              href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-lg font-semibold mb-2"
            >
              {video.snippet.title}
            </a>
            <span className="bg-green-500 text-white py-1 px-2 rounded text-sm w-max">
              Published on{" "}
              {new Date(video.snippet.publishedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-end mt-4 sm:mt-0">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Complete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PlaylistDetails;
