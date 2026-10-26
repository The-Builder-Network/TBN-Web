import { Bell, FolderKanban, Heart, MessageSquare } from "lucide-react";

const features = [
  { icon: Bell, label: "Stay updated in real time" },
  { icon: MessageSquare, label: "Chat with professionals" },
  { icon: FolderKanban, label: "Manage all your projects" },
  { icon: Heart, label: "Save your favourite professionals" },
];

// Placeholder store links until the app is published: set VITE_GOOGLE_PLAY_URL /
// VITE_APP_STORE_URL to the real listings at launch.
const storeBadges = [
  {
    src: "/images/google-play.svg",
    label: "Get it on Google Play",
    // google-play.svg's width/height attrs don't match its viewBox, so pin the ratio
    ratio: "aspect-[27/8]",
    href:
      import.meta.env.VITE_GOOGLE_PLAY_URL ||
      "https://play.google.com/store/apps/details?id=com.google.android.gm",
  },
  {
    src: "/images/app-store.svg",
    label: "Download on the App Store",
    ratio: "",
    href:
      import.meta.env.VITE_APP_STORE_URL ||
      "https://apps.apple.com/app/gmail-email-by-google/id422689480",
  },
];

/** App store badges, shared with the tradesperson app section. */
export const StoreBadges = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-wrap items-center gap-3 ${className}`}>
    {storeBadges.map(({ src, label, ratio, href }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
      >
        <img src={src} alt="" className={`h-11 w-auto ${ratio}`} />
      </a>
    ))}
  </div>
);

const DownloadAppSection = () => {
  return (
    <section className="bg-background pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="container">
        <div className="relative grid items-center gap-10 overflow-hidden rounded-2xl border bg-primary/[0.04] px-6 py-10 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-0">
          <div className="reveal lg:order-2 lg:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              The Builder Network app
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Manage your projects on the go
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground md:text-lg">
              Post jobs, receive updates, chat with professionals and keep track
              of your projects — all from your phone.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3 text-sm font-medium text-foreground"
                >
                  <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>

            <StoreBadges className="mt-8" />
          </div>

          <div className="relative flex justify-center lg:order-1 lg:self-end lg:pt-12">
            <div
              className="absolute bottom-0 left-1/2 aspect-square w-[85%] max-w-md -translate-x-1/2 translate-y-1/3 rounded-full bg-primary/10"
              aria-hidden
            />
            <img
              src="/images/new-images/app-screen.webp"
              alt="The Builder Network app showing projects, saved tradespeople and recent activity"
              loading="lazy"
              decoding="async"
              className="relative -mb-10 w-64 sm:w-72 lg:mb-0 lg:w-[22rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
