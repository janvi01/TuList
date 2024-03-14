import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  CheckIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useMemo } from "react";

const featuresList = [
  {
    name: "Add and Watch Playlist just by adding URL",
    description:
      "Add and watch all your YouTube playlists in one place by pasting the URL, whether it's a direct playlist URL or a video URL within the playlist.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Get Videos Stats",
    description:
      "Gain insights into the total duration of playlists, likes, views, total videos, etc. count of your Playlist.",
    icon: ArrowPathIcon,
  },
  {
    name: "Mark as watched",
    description: "Mark your videos as watched in one click.",
    icon: CheckIcon,
  },
  {
    name: "Sort Videos of the Playlist",
    description: "Sort videos based on the likes, views count, etc.",
    icon: AdjustmentsHorizontalIcon,
  },
];

function FeatureItem({ name, description, Icon }) {
  return (
    <div className="relative pl-16">
      <dt className="text-base font-semibold leading-7 text-indigo-600">
        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        {name}
      </dt>
      <dd className="mt-2 text-base leading-7 text-neutral-300">
        {description}
      </dd>
    </div>
  );
}

export default function Features() {
  const FeatureComponents = useMemo(() => {
    return featuresList.map((feature) => (
      <FeatureItem
        key={feature.name}
        name={feature.name}
        description={feature.description}
        Icon={feature.icon}
      />
    ));
  }, []);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Follow YouTube Playlist at ease
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What TuList can do?
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            Are you learning or following any course or watching any web series
            on Youtube? Add and watch all your Youtube Playlist at one place.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {FeatureComponents}
          </dl>
        </div>
      </div>
    </div>
  );
}
