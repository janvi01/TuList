"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import PlaylistInput from "./playlist/PlaylistInput";
import Spinner from "../components/Spinner";

const Page = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    };

    checkAuthentication();
  }, [user]);

  return (
    <div className="p-4 min-h-screen">
      {loading ? (
        <Spinner />
      ) : user ? (
        <div className="flex flex-col items-center">
          <div className="py-1.5 px-4 text-lg rounded-full font-medium bg-teal-800/30 text-teal-500">
            Welcome, {user.displayName} ✨
          </div>
          <p className="mt-6 text-lg leading-8 text-gray-600 mb-4">
            You are logged in to the Dashboard page - a protected route. Please
            add your playlists below.
          </p>
          <PlaylistInput />
        </div>
      ) : null}
      {!user && !loading && (
        <p className="text-center">You must be logged in to view this page.</p>
      )}
    </div>
  );
};

export default Page;
