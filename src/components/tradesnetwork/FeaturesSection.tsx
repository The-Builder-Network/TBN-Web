import { Check } from "lucide-react";

const IMG = "/images/new-images/";

const points = [
  {
    title: "Leads that match your skills",
    description: "Only see jobs in the trades you offer",
  },
  {
    title: "Work where you want",
    description: "Choose your area and how far you travel",
  },
  {
    title: "You're in control",
    description: "Join for free and respond when it suits you",
  },
  {
    title: "Grow your reputation",
    description: "Showcase your work and collect customer reviews",
  },
];

const TradespersonFeatures = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        <div className="reveal grid items-center gap-12 overflow-hidden rounded-2xl bg-primary/[0.05] px-6 py-10 sm:px-10 lg:grid-cols-2 lg:gap-10 lg:px-14 lg:py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Why join The Builder Network
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
              Ready to find work
              <br className="hidden sm:inline" /> the reliable way?
            </h2>

            <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {points.map(({ title, description }) => (
                <li key={title} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Overlapping photo collage; stacks into a simple row on small screens */}
          <div className="relative mx-auto grid w-full max-w-lg grid-cols-2 gap-3 sm:h-[340px] sm:max-w-none sm:grid-cols-none sm:gap-0 lg:h-[360px]">
            <img
              src={`${IMG}collage-builders.webp`}
              alt="Builders on a new-build housing site"
              loading="lazy"
              className="col-span-2 aspect-[16/9] w-full rounded-xl object-cover shadow-lg sm:absolute sm:left-0 sm:top-0 sm:aspect-auto sm:h-[58%] sm:w-[72%]"
            />
            <img
              src={`${IMG}collage-plumber.webp`}
              alt="Plumber fixing pipework under a kitchen sink"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-xl object-cover shadow-lg ring-4 ring-background sm:absolute sm:bottom-0 sm:right-0 sm:aspect-auto sm:h-[58%] sm:w-[50%]"
            />
            <img
              src={`${IMG}collage-gardener.webp`}
              alt="Gardener trimming hedges"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-xl object-cover shadow-lg ring-4 ring-background sm:absolute sm:bottom-[4%] sm:left-0 sm:aspect-auto sm:h-[36%] sm:w-[40%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradespersonFeatures;
