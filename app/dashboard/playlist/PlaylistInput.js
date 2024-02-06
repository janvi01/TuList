"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import PlaylistList from "./PlaylistList";

const PlaylistInput = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const fetchPlaylists = async () => {
    try {
      const playlistsCollection = collection(db, "playlists");
      const playlistsSnapshot = await getDocs(playlistsCollection);
      const playlistsData = playlistsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlaylists(playlistsData);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  useEffect(() => {
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
        fetchPlaylists();
        setIsValidUrl(true);
      } else {
        setIsValidUrl(false);
      }
    } catch (error) {
      console.error("Error adding playlist:", error);
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      const playlistsCollection = collection(db, "playlists");
      await deleteDoc(doc(playlistsCollection, playlistId));
      fetchPlaylists();
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center mb-4 w-full">
        <input
          type="text"
          placeholder="Enter YouTube Playlist URL"
          value={playlistUrl}
          onChange={(e) => setPlaylistUrl(e.target.value)}
          className={`border text-black ${
            isValidUrl ? "border-gray-300" : "border-red-500"
          } p-3 mr-2 rounded-md w-[70%] focus:outline-none focus:ring focus:border-blue-500`}
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
