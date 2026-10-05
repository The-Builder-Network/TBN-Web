import { Link } from "react-router-dom";
import { ArrowRight, Headset, ListChecks, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Verified professionals",
    description: "We help you connect with genuine, reliable tradespeople.",
  },
  {
    icon: Star,
    title: "Real customer feedback",
    description: "Read reviews from homeowners like you.",
  },
  {
    icon: ListChecks,
    title: "Easy comparison",
    description: "Compare profiles, services and quotes in one place.",
  },
  {
    icon: Headset,
    title: "Support when you need it",
    description: "Our team is here to help if you need assistance.",
  },
];

const WhySection = () => {
  return (
    <section className="bg-primary/[0.04] py-16 md:py-24">
      <div className="container grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-5">
          <span className="block h-1 w-10 rounded-full bg-primary" aria-hidden />
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Why homeowners choose The Builder Network
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            A simpler, safer way to find the right professional for your home
            project.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button asChild size="xl">
              <Link to="/about">Learn more about us</Link>
            </Button>
            <Link
              to="/quality-checks"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              How we check tradespeople
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {benefits.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="reveal flex gap-4 rounded-xl border bg-card p-6 shadow-card"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhySection;
