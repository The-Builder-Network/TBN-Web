import { Check } from "lucide-react";
import { StoreBadges } from "@/components/home/sections/DownloadAppSection";

const features = [
  "Browse new leads",
  "Chat with homeowners",
  "Get instant updates",
  "Save interesting jobs",
];

/** Tradesperson-facing app promo; the homepage keeps the homeowner version. */
const TradespersonAppSection = () => {
  return (
    <section className="overflow-hidden bg-background pb-16 pt-4 md:pb-24 md:pt-8">
      <div className="container grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="reveal">
          <img
            src="/images/new-images/trades-app-mockup.webp"
            alt="The Builder Network on laptop and phone, showing a list of new leads with trade, location and time posted"
            loading="lazy"
            decoding="async"
            className="w-full"
          />
        </div>

        <div className="reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            The Builder Network app
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Manage your leads
            <br className="hidden sm:inline" /> anytime, anywhere
          </h2>
          <p className="mt-5 max-w-lg text-muted-foreground md:text-lg">
            Browse new leads, respond to homeowners, chat about the details and
            keep track of your jobs — all from your phone.
          </p>

          <ul className="mt-8 grid max-w-lg gap-x-6 gap-y-4 sm:grid-cols-2">
            {features.map((label) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-sm font-medium text-foreground"
              >
                <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                {label}
              </li>
            ))}
          </ul>

          <StoreBadges className="mt-10" />
        </div>
      </div>
    </section>
  );
};

export default TradespersonAppSection;
