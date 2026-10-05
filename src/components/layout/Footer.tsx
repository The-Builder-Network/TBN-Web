import { Link } from "react-router-dom";
import { Facebook, Youtube, Twitter } from "lucide-react";
import { trades } from "@/constants/trades";

const linkGroups = [
  {
    title: "Homeowners",
    links: [
      { label: "Post a job", to: "/post-job" },
      { label: "How it works", to: "/how-it-works" },
      { label: "Find trades", to: "/trades" },
      { label: "Quality checks", to: "/quality-checks" },
    ],
  },
  {
    title: "Tradespeople",
    links: [
      { label: "Register as tradesperson", to: "/tradesnetwork" },
      { label: "Quality requirements", to: "/quality-requirements" },
      { label: "Reviews policy", to: "/reviews-policy" },
    ],
  },
  {
    title: "Company info",
    links: [
      { label: "About us", to: "/about" },
      { label: "Become a partner", to: "/become-a-partner" },
      { label: "Services", to: "/services" },
    ],
  },
  {
    title: "Helpful resources",
    links: [
      { label: "Trades", to: "/trades" },
      { label: "Cities", to: "/search" },
    ],
  },
];

const cityLinks = [
  "London",
  "Manchester",
  "Birmingham",
  "Leeds",
  "Glasgow",
  "Bristol",
  "Liverpool",
  "Sheffield",
  "Edinburgh",
  "Cardiff",
  "Newcastle",
  "Leicester",
  "Nottingham",
  "Southampton",
  "Cambridge",
].map((name) => ({ label: name, to: `/search?city=${name.toLowerCase()}` }));

const professionLinks = trades
  .slice(0, 17)
  .map((t) => ({ label: t.name, to: `/${t.serviceSlug}/${t.slug}` }));

// TODO: Replace with real social media URLs
const socials = [
  { href: "https://facebook.com", label: "Facebook", icon: Facebook },
  { href: "https://youtube.com", label: "YouTube", icon: Youtube },
  { href: "https://twitter.com", label: "X (Twitter)", icon: Twitter },
];

const linkClass =
  "text-muted-foreground transition-colors hover:text-primary hover:underline underline-offset-4";

const LinkGrid = ({
  title,
  links,
  more,
}: {
  title: string;
  links: { label: string; to: string }[];
  more: { label: string; to: string };
}) => (
  <div>
    <h4 className="mb-4 text-sm font-semibold text-foreground">{title}</h4>
    <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {[...links, more].map((l) => (
        <li key={l.to + l.label}>
          <Link to={l.to} className={linkClass}>
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-6">
          <div className="col-span-2">
            <Link
              to="/"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <img
                src="/images/logo-black.png"
                alt="The Builder Network"
                className="h-10"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Connecting homeowners with trusted local tradespeople for
              building, repair and home improvement work.
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">
                {group.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t bg-primary/[0.04]">
        <div className="container space-y-10 py-10">
          <LinkGrid
            title="Find tradespeople in your area"
            links={cityLinks}
            more={{ label: "More cities »", to: "/search" }}
          />
          <LinkGrid
            title="Our tradespeople's professions"
            links={professionLinks}
            more={{ label: "More trades »", to: "/trades" }}
          />
        </div>
      </div>

      <div className="bg-primary text-primary-foreground">
        <div className="container flex flex-col items-center justify-between gap-4 py-5 text-sm md:flex-row">
          <p className="text-primary-foreground/90">
            © 2026 The Builder Network. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link to="/terms" className="hover:underline underline-offset-4">
              Terms and conditions
            </Link>
          </div>
          <div className="flex gap-4">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                aria-label={`The Builder Network on ${label}`}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
