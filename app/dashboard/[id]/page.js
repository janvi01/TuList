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
              for (const item of data.items) {
                const videoId = item.snippet.resourceId.videoId;
                const videoResponse = await fetch(
                  `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`
                );

                if (videoResponse.ok) {
                  const videoData = await videoResponse.json();
                  const videoInfo = videoData.items[0];
                  console.log(videoInfo);

                  if (videoInfo) {
                    const duration = formatDuration(
                      videoInfo.contentDetails.duration
                    );
                    const viewCount = videoInfo.statistics.viewCount;
                    const likesCount = videoInfo.statistics.likeCount;

                    allVideos.push({
                      ...item,
                      duration,
                      viewCount,
                      likesCount,
                    });
                  }
                } else {
                  console.error(
                    "Error fetching video details:",
                    videoResponse.statusText
                  );
                }
              }
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

    // Helper function to format video duration
    const formatDuration = (duration) => {
      const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

      const hours = match[1] ? parseInt(match[1]) : 0;
      const minutes = match[2] ? parseInt(match[2]) : 0;
      const seconds = match[3] ? parseInt(match[3]) : 0;

      return `${hours ? hours + ":" : ""}${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
            <span className="bg-blue-500 text-white py-1 px-2 rounded text-sm mr-2">
              Duration: {video.duration}
            </span>
            <span className="bg-yellow-500 text-white py-1 px-2 rounded text-sm mr-2">
              Views: {video.viewCount}
            </span>
            <span className="bg-green-500 text-white py-1 px-2 rounded text-sm mr-2">
              Likes: {video.likesCount}
            </span>
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
