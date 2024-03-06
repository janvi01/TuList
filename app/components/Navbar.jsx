import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { UserIcon } from "@heroicons/react/24/outline";
import Spinner from "./Spinner";

const Navbar = () => {
  const { user, handleSignIn, handleSignOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setLoading(false);
    };

    checkAuthentication();
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <header className="z-50 w-full text-sm">
      <nav
        className="mt-6 relative md:w-[85rem] max-w-full flex border rounded-[36px] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] mx-2 px-4 items-center justify-between py-4 md:py-0 md:px-6 lg:px-8 xl:mx-auto bg-gray-800 border-gray-700"
        aria-label="Global"
      >
        <div className="flex items-center justify-center">
          <a
            className="flex-none text-2xl font-semibold text-white"
            href="/"
            aria-label="Brand"
          >
            TuList
          </a>
        </div>
        <div className="flex flex-row gap-4 mt-0 items-center justify-center md:justify-end md:gap-y-0 md:mt-0 md:ps-7">
          <a
            className={`font-medium md:py-6 text-white hover:text-blue-500`}
            href="/"
            aria-current="page"
          >
            Home
          </a>
          <a
            className={`font-medium md:py-6 text-white hover:text-blue-500 ${
              !user && "hidden"
            }`}
            href="/dashboard"
          >
            Dashboard
          </a>
          <span
            className={`flex items-center gap-x-2 font-medium cursor-pointer md:border-s md:border-gray-300 md:my-6 md:ps-6 border-gray-700 text-white hover:text-blue-500 ${
              !user && "hidden"
            }`}
            onClick={handleSignOut}
          >
            <UserIcon className="w-6 h-6" />
            Sign out
          </span>
          <span
            className={`flex items-center gap-x-2 font-medium cursor-pointer md:border-s md:border-gray-300 md:my-6 md:ps-6 border-gray-700 text-white hover:text-blue-500 ${
              user && "hidden"
            }`}
            onClick={handleSignIn}
          >
            <UserIcon className="w-6 h-6" />
            Log in
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
