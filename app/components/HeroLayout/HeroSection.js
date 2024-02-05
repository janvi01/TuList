import React from "react";

function HeroSection() {
  return (
    <div>
      <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div class="flex justify-center">
          <a
            class="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            href="#"
          >
            Join the waitlist now
            <span class="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-400">
              <svg
                class="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>

        <div class="mt-5 max-w-2xl text-center mx-auto">
          <h1 class="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
            YouTube Playlist
            <span class="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
              {" "}
              Tracker
            </span>
          </h1>
        </div>

        <div class="mt-5 max-w-3xl text-center mx-auto">
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Want to follow a Youtube Playlist? Worry not!
            <br /> TuList is an intuitive platform built to track and organize
            your YouTube playlist videos in a better way.
          </p>
        </div>

        <div class="mt-8 gap-3 flex justify-center">
          <a
            class="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800"
            href="#"
          >
            Get started
            <svg
              class="flex-shrink-0 w-4 h-4"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </a>
          <button
            type="button"
            class="relative group p-2 ps-3 inline-flex items-center gap-x-2 text-sm font-mono rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            Login
          </button>
        </div>

        {/* <div class="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
          <span class="text-sm text-gray-600 dark:text-gray-400">
            Lorem Ipsum
          </span>
          <span class="text-sm font-bold text-gray-900 dark:text-white">
            Donor
          </span>
          <svg
            class="h-5 w-5 text-gray-300 dark:text-gray-600"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M6 13L10 3" stroke="currentColor" stroke-linecap="round" />
          </svg>
          <a
            class="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium"
            href="#"
          >
            Lorem ipsum
            <svg
              class="flex-shrink-0 w-4 h-4"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </a>
        </div> */}
      </div>
    </div>
  );
}

export default HeroSection;
