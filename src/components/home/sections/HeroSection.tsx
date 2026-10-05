import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Search, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JobServiceCombobox from "@/components/shared/JobServiceCombobox";
import { StarRating } from "@/components/shared/StarRating";
import { useFeaturedReviews } from "@/api/reviews";
import { trades } from "@/constants/trades";

const HERO_IMAGE = "/images/new-images/hero-home.webp";

const popularSearches = [
  { label: "Plumber", slug: "plumber" },
  { label: "Electrician", slug: "electrician" },
  { label: "Painter", slug: "painter-decorator" },
  { label: "Builder", slug: "builder" },
  { label: "Cleaner", slug: "cleaner" },
].flatMap(({ label, slug }) => {
  const trade = trades.find((t) => t.slug === slug);
  return trade ? [{ label, service: trade.serviceSlug }] : [];
});

const trustPoints = [
  { icon: ShieldCheck, label: "Trusted professionals" },
  { icon: Star, label: "Real customer reviews" },
  { icon: MapPin, label: "Local to your area" },
];

/** Builds the existing post-job URL (PostJobPage reads ?service and ?postcode). */
function postJobUrl(service: string, postcode: string) {
  const params = new URLSearchParams();
  if (service) params.set("service", service);
  if (postcode.trim()) params.set("postcode", postcode.trim());
  const qs = params.toString();
  return qs ? `/post-job?${qs}` : "/post-job";
}

const HeroSection = () => {
  const [selectedService, setSelectedService] = useState("");
  const [postcode, setPostcode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(postJobUrl(selectedService, postcode));
  };

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Desktop image layer */}
      <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:block">
        <img
          src={HERO_IMAGE}
          alt="Smiling tradesperson standing outside a family home"
          className="h-full w-full object-cover object-[72%_center]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
      </div>

      <div className="container relative grid items-center gap-10 py-10 md:py-14 lg:min-h-[640px] lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-7 xl:col-span-6">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
            Get your home <br className="hidden sm:inline" />
            project done
            <span className="block text-primary">with confidence</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Connect with trusted local professionals for building, repair and
            home improvement work.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex max-w-2xl flex-col gap-2 rounded-xl border bg-card p-2 shadow-lg shadow-foreground/5 sm:flex-row sm:items-center"
            role="search"
          >
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <JobServiceCombobox
                value={selectedService}
                onChange={setSelectedService}
                placeholder="What service do you need?"
                triggerClassName="h-12 border-0 pl-9 text-base font-normal shadow-none"
              />
            </div>
            <div className="hidden h-8 w-px bg-border sm:block" aria-hidden />
            <div className="relative sm:w-48">
              <MapPin
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                value={postcode}
                onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                placeholder="Enter your postcode"
                aria-label="Your postcode"
                autoComplete="postal-code"
                className="h-12 border-0 pl-9 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button type="submit" size="xl" className="px-6">
              <Search aria-hidden />
              Search
            </Button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="mr-1 text-muted-foreground">Popular:</span>
            {popularSearches.map(({ label, service }) => (
              <Link
                key={service}
                to={postJobUrl(service, postcode)}
                className="rounded-full border bg-card px-3 py-1 font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {label}
              </Link>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-foreground">
            {trustPoints.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile / tablet image with inline card */}
        <div className="lg:hidden">
          <img
            src={HERO_IMAGE}
            alt=""
            className="aspect-[16/10] w-full rounded-2xl object-cover object-[78%_center] sm:aspect-[2/1]"
          />
          <HeroTrustCard className="-mt-10 ml-4 mr-4 sm:ml-6 sm:max-w-sm" />
        </div>

        {/* Desktop floating card, over the image */}
        <div className="hidden self-end lg:col-span-5 lg:flex lg:justify-end xl:col-span-6">
          <HeroTrustCard className="max-w-xs" />
        </div>
      </div>
    </section>
  );
};

/** Shows a real review when one exists; otherwise a factual trust statement. */
function HeroTrustCard({ className = "" }: { className?: string }) {
  const [review] = useFeaturedReviews(3);

  return (
    <div
      className={`relative rounded-xl border bg-card/95 p-5 shadow-xl shadow-foreground/10 backdrop-blur ${className}`}
    >
      {review ? (
        <>
          {review.rating > 0 && <StarRating rating={review.rating} size="sm" />}
          <p className="mt-2 line-clamp-3 text-sm font-medium leading-relaxed text-foreground">
            “{review.comment}”
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            {review.authorName}
            {review.jobTitle ? ` · ${review.jobTitle}` : ""}
          </p>
        </>
      ) : (
        <div className="flex gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Every tradesperson is checked
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              ID, company details and certifications are reviewed at
              registration.{" "}
              <Link
                to="/quality-checks"
                className="font-medium text-primary hover:underline"
              >
                Our checks
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroSection;
