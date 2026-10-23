import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { services } from "@/constants/services";
import CTASection from "@/components/home/sections/CTASection";
import { PageHero, Section } from "@/components/shared/ContentBlocks";

const groups: { title: string; slugs: string[] }[] = [
  {
    title: "Building & Structural Work",
    slugs: ["architectural-services", "bricklaying-repointing", "conversions", "demolition-clearance", "extensions", "groundwork-foundations", "loft-conversion", "new-build", "restoration-refurbishment", "stonemasonry"],
  },
  {
    title: "Interiors & Home Renovation",
    slugs: ["bathroom-fitting", "carpentry-joinery", "carpets-lino-flooring", "kitchen-fitting", "painting-decorating", "plastering-rendering", "tiling"],
  },
  {
    title: "Plumbing, Heating & Electrical",
    slugs: ["central-heating", "chimney-fireplace", "electrical", "gas-works", "insulation", "plumbing"],
  },
  {
    title: "Exterior & Outdoor Improvements",
    slugs: ["conservatories", "driveways-paving", "fascias-soffits-guttering", "fencing", "gardening-landscaping", "roofing", "tree-surgery", "windows-door-fitting"],
  },
  {
    title: "Property Maintenance & Specialist Services",
    slugs: ["cleaning-services", "damp-proofing", "handyman", "locksmith", "moving-services", "security-systems"],
  },
];

const bySlug = new Map(services.map((s) => [s.slug, s]));

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | The Builder Network</title>
        <meta
          name="description"
          content="Explore home improvement services on The Builder Network — from essential repairs to complete property transformations."
        />
      </Helmet>
      <main className="flex-1">
        <PageHero
          eyebrow="Explore Our Home Improvement Services"
          title="The Right Expertise for Every Corner of Your Home"
        >
          <p>
            From essential household repairs to complete property
            transformations, The Builder Network helps homeowners find
            professionals across a wide variety of trades.
          </p>
          <p>
            Browse our service categories to discover the type of specialist
            your project requires.
          </p>
        </PageHero>

        {groups.map((group, i) => (
          <Section key={group.title} title={group.title} tinted={i % 2 === 1}>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.slugs.flatMap((slug) => {
                const service = bySlug.get(slug);
                return service
                  ? [
                      <li key={slug}>
                        <Link
                          to={`/services/${slug}`}
                          className="group flex h-full flex-col rounded-xl border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-card-hover"
                        >
                          <span className="flex items-center justify-between gap-2 font-semibold text-foreground group-hover:text-primary">
                            {service.name}
                            <ArrowRight
                              className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:text-primary motion-safe:group-hover:translate-x-0.5"
                              aria-hidden
                            />
                          </span>
                          <span className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                            {service.description}
                          </span>
                        </Link>
                      </li>,
                    ]
                  : [];
              })}
            </ul>
          </Section>
        ))}
      </main>
      <CTASection
        title="Find a Professional for Your Next Project"
        description="Whatever your plans, start by choosing the service that best matches the work you need. Describe your project and explore professionals serving your area."
        ctaText="Find a Tradesperson"
        to="/post-job"
      />
    </>
  );
};

export default Services;
