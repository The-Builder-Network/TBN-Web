import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { trades } from "@/constants/trades";

const IMG = "/images/new-images/";

// Display copy for the homepage; destinations come from the real trade taxonomy.
const popular = [
  { slug: "builder", label: "Builders", description: "Extensions, renovations and more", image: "Builders.png" },
  { slug: "plumber", label: "Plumbers", description: "Repairs, installations and leaks", image: "plumber.png" },
  { slug: "electrician", label: "Electricians", description: "Installations, repairs and electrical checks", image: "Electricians.png" },
  { slug: "painter-decorator", label: "Painters & Decorators", description: "Interior and exterior work", image: "Painters & Decorators.png" },
  { slug: "carpenter-joiner", label: "Carpenters", description: "Custom woodwork and repairs", image: "Carpenters.png" },
  { slug: "roofer", label: "Roofers", description: "Repairs, new roofs and maintenance", image: "Roofers.png" },
  { slug: "heating-engineer", label: "Heating Engineers", description: "Boilers, heating systems and servicing", image: "Heating Engineers.png" },
  { slug: "gardener", label: "Gardeners", description: "Garden maintenance and landscaping", image: "Gardeners.png" },
  { slug: "cleaner", label: "Cleaners", description: "Home and commercial cleaning", image: "9.png" },
  { slug: "security-system-installer", label: "Security & CCTV", description: "Security systems and installations", image: "Security & CCTV.png" },
].flatMap((item) => {
  const trade = trades.find((t) => t.slug === item.slug);
  return trade
    ? [{ ...item, to: `/${trade.serviceSlug}/${trade.slug}`, image: encodeURI(IMG + item.image) }]
    : [];
});

const ViewAllLink = ({ className = "" }: { className?: string }) => (
  <Link
    to="/trades"
    className={`inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline ${className}`}
  >
    View all services
    <ArrowRight className="h-4 w-4" aria-hidden />
  </Link>
);

const TradesSection = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        <div className="reveal flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Popular Home Services
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              Find skilled professionals for every project, big or small.
            </p>
          </div>
          <ViewAllLink className="hidden sm:inline-flex" />
        </div>

        {/* Tablet uses compact horizontal cards so 10 items don't orphan or run tall */}
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {popular.map(({ slug, label, description, image, to }) => (
            <li key={slug} className="reveal">
              <Link
                to={to}
                className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all hover:border-primary/40 hover:shadow-card-hover motion-safe:hover:-translate-y-0.5 sm:flex-row lg:flex-col"
              >
                <div className="aspect-[8/5] shrink-0 overflow-hidden bg-muted sm:aspect-auto sm:w-2/5 lg:aspect-[8/5] lg:w-auto">
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 p-3 sm:self-center sm:p-4 lg:self-auto">
                  <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary sm:text-base">
                    {label}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center sm:hidden">
          <ViewAllLink />
        </div>
      </div>
    </section>
  );
};

export default TradesSection;
