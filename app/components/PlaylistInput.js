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

  useEffect(() => {
    const fetchPlaylists = async () => {
      const playlistsCollection = collection(db, "playlists");
      const playlistsSnapshot = await getDocs(playlistsCollection);
      const playlistsData = playlistsSnapshot.docs.map((doc) => doc.data());
      setPlaylists(playlistsData);
    };

    fetchPlaylists();
  }, []);

  const handleAddPlaylist = async () => {
    try {
      const playlistsCollection = collection(db, "playlists");
      await addDoc(playlistsCollection, {
        url: playlistUrl,
        timestamp: Timestamp.fromDate(new Date()),
      });

      setPlaylistUrl("");

      const playlistsSnapshot = await getDocs(playlistsCollection);
      const playlistsData = playlistsSnapshot.docs.map((doc) => doc.data());
      setPlaylists(playlistsData);
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
          className="border border-gray-300 p-2 mr-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          onClick={handleAddPlaylist}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Add Playlist
        </button>
      </div>

      {/* Use the PlaylistList component */}
      <PlaylistList playlists={playlists} />
    </div>
  );
};

export default PlaylistInput;
