"use client";
import { UserAuth } from "@/app/context/AuthContext";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";

const PlaylistDetails = ({ params: { id } }) => {
  const { user } = UserAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const [completedVideos, setCompletedVideos] = useState(new Set()); // Use a Set to store unique video IDs
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        if (!id) {
          // when id is not defined
          console.warn("No playlist id provided.");
          return;
        }

        // Fetch completed videos if user is logged in
        if (user && user.uid) {
          const userDocRef = doc(db, "users", user.uid);
          const playlistDoc = await getDoc(
            doc(collection(userDocRef, "playlists"), id)
          );

          if (playlistDoc.exists()) {
            setCompletedVideos(
              new Set(playlistDoc.data().completedVideos || [])
            );
          }
        }

        let nextPageToken = "";
        const allVideos = [];
        let totalDurationInSeconds = 0;

        do {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${apiKey}&maxResults=50&playlistId=${id}&pageToken=${nextPageToken}`
          );

          if (response.ok) {
            const data = await response.json();

            if (data.items && data.items.length > 0) {
              for (const item of data.items) {
                const videoId = item.snippet.resourceId.videoId;
                const videoResponse = await fetch(
                  `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`
                );

                if (videoResponse.ok) {
                  const videoData = await videoResponse.json();
                  const videoInfo = videoData.items[0];

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

                    // Add the duration of the current video to the total duration
                    totalDurationInSeconds += parseDurationInSeconds(
                      videoInfo.contentDetails.duration
                    );
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

        setTotalDuration(totalDurationInSeconds);
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
  }, [id, apiKey, user]);

  // Helper function to parse duration and convert it to seconds
  const parseDurationInSeconds = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    return hours * 3600 + minutes * 60 + seconds;
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

  const markVideoAsCompleted = async (videoId, playlistId) => {
    if (!user) {
      console.warn("User not authenticated.");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      const playlistDocRef = doc(
        collection(userDocRef, "playlists"),
        playlistId
      );

      const playlistDoc = await getDoc(playlistDocRef);

      if (playlistDoc.exists()) {
        const completedVideos = playlistDoc.data().completedVideos || [];

        if (!completedVideos.includes(videoId)) {
          // If the document doesn't exist, use setDoc to create it with initial data
          await setDoc(
            playlistDocRef,
            {
              completedVideos: arrayUnion(videoId),
            },
            { merge: true } // Use merge to update only the specified fields
          );
        }
        setCompletedVideos(new Set(completedVideos).add(videoId));
      } else {
        console.error("Playlist document not found");
      }
    } catch (error) {
      console.error("Error marking video as completed:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="bg-blue-500 text-white py-1 px-2 rounded text-sm mb-4">
        Total Duration: {totalDuration} seconds
      </div>
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
              {completedVideos.has(video.snippet.resourceId.videoId) ? (
                <span className="bg-green-500 text-white font-bold py-2 px-4 rounded">
                  Completed
                </span>
              ) : (
                <button
                  onClick={() =>
                    markVideoAsCompleted(video.snippet.resourceId.videoId, id)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  mark as Completed
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistDetails;
