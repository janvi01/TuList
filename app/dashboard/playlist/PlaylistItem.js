import React from "react";
import Link from "next/link";

const PlaylistItem = ({ playlist, playlistDetails, onDeletePlaylist }) => {
  const getPlaylistIdFromUrl = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("list");
  };

  const id = getPlaylistIdFromUrl(playlist.url);

  return (
    <div className="max-w-md h-[600px] flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      {playlistDetails[playlist.url] ? (
        <>
          <img
            src={playlistDetails[playlist.url].thumbnailUrl}
            alt="Playlist Thumbnail"
            className=" bg-blue-600 rounded-t-xl"
          />
          <div className="p-4 md:p-6">
            <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">
              {playlistDetails[playlist.url].channelTitle}
            </span>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
              {playlistDetails[playlist.url].title}
            </h3>
            <p className="my-3 text-white">
              {playlistDetails[playlist.url].description}
            </p>
            <span class="py-1.5 px-4 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500">
              Published on: {playlistDetails[playlist.url].publishedAt}
            </span>
            <span class="py-1.5 px-4 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500">
              Total Videos: {playlistDetails[playlist.url].totalVideos}
            </span>
            <span class="py-1.5 px-4 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500">
              Total Views: {playlistDetails[playlist.url].views}
            </span>
            <span class="py-1.5 px-4 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500">
              Last Updated: {playlistDetails[playlist.url].lastUpdated}
            </span>
          </div>
          <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
            <Link
              href={`/dashboard/${encodeURIComponent(id)}`}
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              View Playlist
            </Link>
            <button
              onClick={() => onDeletePlaylist(playlist.id)}
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <p className="text-blue-500">{playlist.url}</p>
      )}
    </div>
  );
};

export default PlaylistItem;
