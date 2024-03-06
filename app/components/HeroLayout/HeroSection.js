"use client";
import { UserAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import Demo from "../../assets/demo.png";

function HeroSection() {
  const { handleSignIn } = UserAuth();
  return (
    <div className="text-white">
      <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="mt-5 max-w-3xl text-center mx-auto">
          <h1 className="block font-bold text-4xl md:text-5xl lg:text-6xl">
            YouTube Playlist{" "}
            <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
              Manager
            </span>
          </h1>
        </div>

        <div className="mt-5 max-w-3xl text-center mx-auto">
          <p className="text-lg">
            Want to follow a YouTube Playlist? Worry not!
            <br /> TuList is an intuitive platform built to track and organize
            your <br />
            YouTube playlist videos in a better way.
          </p>
        </div>

        <div className="mt-8 gap-3 flex justify-center">
          <button
            className="inline-flex justify-center cursor-pointer items-center gap-x-3 bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4"
            onClick={handleSignIn}
          >
            Get started
            <svg
              className="flex-shrink-0 w-4 h-4"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center mt-8 space-y-2 px-3 py-2 rounded-full bg-gray-800 hover:border-gray-600">
            <p>More features incoming soon ✨ Stay tuned 😉</p>
          </div>
          <Image
            src={Demo}
            width={900}
            height={"auto"}
            alt="TuList Demo"
            className="mt-8 object-cover shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
