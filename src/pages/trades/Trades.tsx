import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { trades, type Trade } from "@/constants/trades";
import CTASection from "@/components/home/sections/CTASection";
import { PageHero, Section } from "@/components/shared/ContentBlocks";

const groups: { title: string; slugs: string[] }[] = [
  {
    title: "Heating, Gas & Boiler Professionals",
    slugs: ["boiler-installation-specialist", "boiler-repair-specialist", "gas-engineer", "heating-engineer", "stove-fitter", "fireplace-installer"],
  },
  {
    title: "Building & Construction Professionals",
    slugs: ["builder", "bricklayer", "extension-builder", "new-home-builder", "demolition-company", "groundworker", "conversion-specialist", "garage-conversion-specialist", "loft-conversion-company", "building-restoration-refurbishment-company", "stonemason", "repointing-specialist"],
  },
  {
    title: "Architecture & Planning Professionals",
    slugs: ["architectural-designer", "architectural-technician"],
  },
  {
    title: "Carpentry, Joinery & Interior Fitting",
    slugs: ["carpenter-joiner", "cabinet-maker", "wardrobe-fitter", "kitchen-fitter", "bathroom-fitter", "door-fitter", "conservatory-installer", "conservatory-repair-specialist"],
  },
  { title: "Plumbing & Electrical Professionals", slugs: ["plumber", "electrician"] },
  { title: "Decorating, Plastering & Tiling", slugs: ["painter-decorator", "plasterer", "tiler"] },
  { title: "Flooring Professionals", slugs: ["carpet-fitter", "flooring-fitter", "vinyl-flooring-fitter"] },
  { title: "Windows, Doors & Glazing", slugs: ["window-fitter", "double-glazing-repair-specialist", "glazier"] },
  {
    title: "Roofing, Gutters & Chimneys",
    slugs: ["roofer", "roof-repair-specialist", "roof-cleaner", "gutter-cleaning-specialist", "gutter-repair-specialist", "guttering-installer", "fascias-soffits-installer", "chimney-sweep", "chimney-repair-specialist"],
  },
  {
    title: "Gardens & Outdoor Spaces",
    slugs: ["gardener", "garden-maintenance-company", "landscaper", "garden-clearance-specialist", "tree-surgeon", "fencer", "decking-installer", "driveways-installer", "tarmac-driveway-company"],
  },
  {
    title: "Security & Specialist Property Services",
    slugs: ["cctv-installer", "security-system-installer", "locksmith", "damp-proofer", "insulation-company"],
  },
  {
    title: "Cleaning, Clearance & Moving",
    slugs: ["cleaner", "window-cleaner", "waste-rubbish-clearance", "moving-company"],
  },
  { title: "General Home Maintenance", slugs: ["handyman"] },
];

const bySlug = new Map(trades.map((t) => [t.slug, t]));
const grouped = new Set(groups.flatMap((g) => g.slugs));
// Safety net: a trade added to the taxonomy later still shows up
const ungrouped = trades.filter((t) => !grouped.has(t.slug));
const allGroups = ungrouped.length
  ? [...groups, { title: "More trades", slugs: ungrouped.map((t) => t.slug) }]
  : groups;

const TradeCard = ({ trade }: { trade: Trade }) => (
  <Link
    to={`/${trade.serviceSlug}/${trade.slug}`}
    className="group flex h-full overflow-hidden rounded-xl border bg-card transition-all hover:border-primary/40 hover:shadow-card-hover"
  >
    <div className="w-24 shrink-0 overflow-hidden bg-muted sm:w-28">
      <img
        src={trade.imageUrl}
        alt=""
        loading="lazy"
        // remote image URLs can rot; fall back to the muted tile
        onError={(e) => (e.currentTarget.style.visibility = "hidden")}
        className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
      />
    </div>
    <div className="flex-1 p-4">
      <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
        {trade.name}
      </h3>
      <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {trade.description}
      </p>
    </div>
  </Link>
);

const Trades = () => {
  return (
    <>
      <Helmet>
        <title>Browse Trades | The Builder Network</title>
        <meta
          name="description"
          content="Find skilled tradespeople across the UK. Explore professionals by trade — plumbers, electricians, roofers, builders and more."
        />
      </Helmet>
      <main className="flex-1">
        <PageHero
          eyebrow="Find Skilled Tradespeople Across the UK"
          title="Explore Professionals by Trade"
        >
          <p>
            Every project calls for different skills. Browse our directory to
            find the type of tradesperson who can help with your home
            improvement, maintenance or construction requirements.
          </p>
        </PageHero>

        {allGroups.map((group, i) => (
          <Section key={group.title} title={group.title} tinted={i % 2 === 1}>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {group.slugs.flatMap((slug) => {
                const trade = bySlug.get(slug);
                return trade
                  ? [
                      <li key={slug}>
                        <TradeCard trade={trade} />
                      </li>,
                    ]
                  : [];
              })}
            </ul>
          </Section>
        ))}
      </main>
      <CTASection
        title="Ready to Find the Right Trade?"
        description="Choose a profession, describe what you need and explore relevant professionals in your area. Your next home improvement project starts with the right connection."
        ctaText="Search Tradespeople"
        to="/search"
      />
    </>
  );
};

export default Trades;
