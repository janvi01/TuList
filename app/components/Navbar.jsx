import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <header className="z-50 w-full text-sm">
      <nav
        className="mt-6 relative md:w-[85rem] max-w-full flex border rounded-[36px] mx-2 px-4 items-center justify-between py-4 md:py-0 md:px-6 lg:px-8 xl:mx-auto bg-gray-800 border-gray-700"
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
        <div className="flex flex-row gap-4 mt-0 items-center justify-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7">
          <a
            className="font-medium md:py-6 text-white hover:text-blue-500"
            href="/"
            aria-current="page"
          >
            Home
          </a>
          {!user ? null : (
            <a
              className="font-medium md:py-6 text-white hover:text-blue-500"
              href="/dashboard"
            >
              Dashboard
            </a>
          )}
          {loading ? null : !user ? (
            <div className="flex">
              <a
                className="flex items-center gap-x-2 font-medium cursor-pointer  md:border-s md:border-gray-300 md:my-6 md:ps-6 dark:border-gray-700 text-gray-400 hover:text-blue-500"
                onClick={handleSignIn}
              >
                <UserIcon className="w-6 h-6" />
                Log in
              </a>
            </div>
          ) : (
            <div>
              <a
                className="flex items-center gap-x-2 font-medium cursor-pointer md:border-s md:border-gray-300 md:my-6 md:ps-6 border-gray-700 text-white hover:text-blue-500"
                onClick={handleSignOut}
              >
                Sign out
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
