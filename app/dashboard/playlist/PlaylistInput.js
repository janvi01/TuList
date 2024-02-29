"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  setDoc,
  Timestamp,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import PlaylistList from "./PlaylistList";
import { UserAuth } from "@/app/context/AuthContext";

const PlaylistInput = () => {
  const { user } = UserAuth();
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const fetchPlaylists = async () => {
    try {
      if (user) {
        // Use the user's UID to fetch playlists associated with the user
        const playlistsCollection = collection(
          db,
          "users",
          user.uid,
          "playlists"
        );
        const playlistsSnapshot = await getDocs(playlistsCollection);
        const playlistsData = playlistsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlaylists(playlistsData);
      }
    } catch (error) {
      console.error("Error fetching user playlists:", error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [user]);

  const isYouTubeUrl = (url) => {
    // Regular expression for a YouTube URL
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleAddPlaylist = async () => {
    try {
      if (user && isYouTubeUrl(playlistUrl)) {
        const playlistsCollection = collection(
          db,
          "users",
          user.uid,
          "playlists"
        );

        // Extract playlistId from the YouTube playlist URL
        const urlParams = new URLSearchParams(new URL(playlistUrl).search);
        const playlistId = urlParams.get("list");

        // Check if a valid playlistId is extracted
        if (playlistId) {
          // Create a document reference directly using the playlistId
          const playlistRef = doc(playlistsCollection, playlistId);

          await setDoc(playlistRef, {
            url: playlistUrl,
            timestamp: Timestamp.fromDate(new Date()),
            completedVideos: [],
          });

          setPlaylistUrl("");
          fetchPlaylists();
          setIsValidUrl(true);
        } else {
          setIsValidUrl(false);
        }
      } else {
        setIsValidUrl(false);
      }
    } catch (error) {
      console.error("Error adding playlist:", error);
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      if (user) {
        const playlistsCollection = collection(
          db,
          "users",
          user.uid,
          "playlists"
        );
        await deleteDoc(doc(playlistsCollection, playlistId));
        fetchPlaylists();
      }
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center mb-4 w-full">
        <input
          type="text"
          placeholder="Enter YouTube Playlist URL (for eg. https://www.youtube.com/playlist?list=ID)"
          value={playlistUrl}
          onChange={(e) => setPlaylistUrl(e.target.value)}
          className={`border text-black lg:w-[700px] p-3 mr-2 rounded-md focus:outline-none focus:ring focus:border-blue-500`}
        />
        <button
          onClick={handleAddPlaylist}
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Add Playlist
        </button>
      </div>

      {isValidUrl || (
        <p className="text-red-500 text-sm mb-2">
          Please enter a valid YouTube URL.
        </p>
      )}
      <PlaylistList
        playlists={playlists}
        onDeletePlaylist={handleDeletePlaylist}
      />
    </div>
  );
};

export default PlaylistInput;
