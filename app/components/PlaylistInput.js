"use client";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  getDocs,
} from "firebase/firestore";
import PlaylistList from "./PlaylistList";

const PlaylistInput = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [isValidUrl, setIsValidUrl] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const playlistsCollection = collection(db, "playlists");
      const playlistsSnapshot = await getDocs(playlistsCollection);
      const playlistsData = playlistsSnapshot.docs.map((doc) => doc.data());
      setPlaylists(playlistsData);
    };

    fetchPlaylists();
  }, []);

  const isYouTubeUrl = (url) => {
    // Regular expression for a YouTube URL
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleAddPlaylist = async () => {
    try {
      if (isYouTubeUrl(playlistUrl)) {
        const playlistsCollection = collection(db, "playlists");
        await addDoc(playlistsCollection, {
          url: playlistUrl,
          timestamp: Timestamp.fromDate(new Date()),
        });

        setPlaylistUrl("");

        const playlistsSnapshot = await getDocs(playlistsCollection);
        const playlistsData = playlistsSnapshot.docs.map((doc) => doc.data());
        setPlaylists(playlistsData);
        setIsValidUrl(true);
      } else {
        setIsValidUrl(false);
      }
    } catch (error) {
      console.error("Error adding playlist:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter YouTube Playlist URL"
          value={playlistUrl}
          onChange={(e) => setPlaylistUrl(e.target.value)}
          className={`border ${
            isValidUrl ? "border-gray-300" : "border-red-500"
          } p-2 mr-2 rounded-md focus:outline-none focus:ring focus:border-blue-500`}
        />
        <button
          onClick={handleAddPlaylist}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Add Playlist
        </button>
      </div>

      {isValidUrl || (
        <p className="text-red-500 text-sm mb-2">
          Please enter a valid YouTube URL.
        </p>
      )}
      <PlaylistList playlists={playlists} />
    </div>
  );
};

export default PlaylistInput;
