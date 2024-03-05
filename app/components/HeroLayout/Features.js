import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

const featuresList = [
  {
    name: "Add Playlist just by adding URL",
    description:
      "Add Playlist just by adding Playlist URL or video URL of the Playlist it is part of.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Mark videos as completed",
    description:
      "To track whether your Playlist is completed, you can mark videos as completed.",
    icon: CheckIcon,
  },
  {
    name: "Get time stats related to the Playlist.",
    description:
      "Track how much time you need to devote more to complete the Playlist.",
    icon: ArrowPathIcon,
  },
  {
    name: "Coming soon!",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: CheckIcon,
  },
];

export default function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Track efforlessly
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What TuList can do?
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Are you learning or following any course or watching any web series
            on Youtube ? Add all your Youtube Playlist at one place.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {featuresList.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-indigo-600">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-neutral-300">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
