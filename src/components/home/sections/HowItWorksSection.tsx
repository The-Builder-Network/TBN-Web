import { Link } from "react-router-dom";
import {
  ArrowRight,
  ClipboardList,
  Scale,
  ThumbsUp,
  Users,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Tell us about your project",
    description: "Share what you need, your location and any useful details.",
  },
  {
    icon: Users,
    title: "Hear from local professionals",
    description:
      "Relevant tradespeople can review your request and get in touch.",
  },
  {
    icon: Scale,
    title: "Compare your options",
    description: "View profiles, experience, reviews and quotes.",
  },
  {
    icon: ThumbsUp,
    title: "Choose the right professional",
    description:
      "Chat directly and hire the professional that suits your needs.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-background pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="container">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            How The Builder Network Works
          </h2>
          <p className="mt-3 text-muted-foreground md:text-lg">
            Get from idea to completed project in four simple steps.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }, i) => (
            <li
              key={title}
              className="reveal relative rounded-xl border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-sm font-semibold tabular-nums text-muted-foreground/60">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              {i < steps.length - 1 && (
                <span
                  className="absolute -right-[1.375rem] top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border bg-background text-primary lg:flex"
                  aria-hidden
                >
                  <ArrowRight className="h-3 w-3" />
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            See how it works
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
