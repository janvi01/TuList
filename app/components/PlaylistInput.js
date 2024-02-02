// PlaylistInput.js
"use client";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const PlaylistInput = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");

  const handleAddPlaylist = async () => {
    try {
      // Add the playlist to Firebase
      const playlistsCollection = collection(db, "playlists");
      await addDoc(playlistsCollection, {
        url: playlistUrl,
        timestamp: Timestamp.fromDate(new Date()),
      });

      // Clear the input field after adding
      setPlaylistUrl("");
    } catch (error) {
      console.error("Error adding playlist:", error);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Enter YouTube Playlist URL"
        value={playlistUrl}
        onChange={(e) => setPlaylistUrl(e.target.value)}
        className="border border-gray-300 p-2 mr-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
      />
      <button
        onClick={handleAddPlaylist}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Add Playlist
      </button>
    </div>
  );
};

export default PlaylistInput;
