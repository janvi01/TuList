"use client";
import { UserAuth } from "@/app/context/AuthContext";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import Spinner from "@/app/components/Spinner";
import PlaylistHeader from "./PlaylistHeader";
import VideoList from "./VideoList";

const PlaylistDetails = ({ params: { id } }) => {
  const { user } = UserAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const [completedVideos, setCompletedVideos] = useState(new Set());
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

  const markVideoAsCompleted = async (videoId, playlistId, isChecked) => {
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
        const completedVideos = new Set(
          playlistDoc.data().completedVideos || []
        );
        const updatedCompletedVideos = isChecked
          ? new Set([...completedVideos, videoId])
          : new Set([...completedVideos].filter((id) => id !== videoId));

        await setDoc(
          playlistDocRef,
          {
            completedVideos: Array.from(updatedCompletedVideos),
          },
          { merge: true }
        );

        setCompletedVideos(updatedCompletedVideos);
      } else {
        console.error("Playlist document not found");
      }
    } catch (error) {
      console.error("Error marking video as completed:", error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col w-full items-center ">
      <PlaylistHeader
        totalDuration={totalDuration}
        totalVideos={videos.length}
        totalCompletedVideos={completedVideos.size}
      />
      <VideoList
        videos={videos}
        markVideoAsCompleted={markVideoAsCompleted}
        completedVideos={completedVideos}
        id={id}
      />
    </div>
  );
};

export default PlaylistDetails;
