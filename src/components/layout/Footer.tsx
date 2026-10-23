import { Link } from "react-router-dom";
import { ArrowRight, ArrowUp, Facebook, MapPin, Twitter, Youtube } from "lucide-react";

type FooterLink = { label: string; to: string };

const CONTACT_EMAIL = "mailto:info@thebuildernetwork.com";

const linkGroups: { title: string; links: FooterLink[] }[] = [
  {
    title: "Homeowners",
    links: [
      { label: "Post a Job", to: "/post-job" },
      { label: "How it Works", to: "/how-it-works" },
      { label: "Find Tradespeople", to: "/trades" },
      { label: "Quality Checks", to: "/quality-checks" },
    ],
  },
  {
    title: "Tradespeople",
    links: [
      { label: "Register as a Tradesperson", to: "/tradesnetwork" },
      { label: "Professional Standards", to: "/quality-requirements" },
      { label: "Reviews Policy", to: "/reviews-policy" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Become a Partner", to: "/become-a-partner" },
      { label: "Services", to: "/services" },
      { label: "Contact Us", to: CONTACT_EMAIL },
    ],
  },
  {
    title: "Helpful Resources",
    links: [
      { label: "Trades", to: "/trades" },
      { label: "Cities", to: "/search" },
      { label: "Ask a Tradesperson", to: "/questions" },
    ],
  },
];

const cities = [
  "London",
  "Manchester",
  "Birmingham",
  "Leeds",
  "Glasgow",
  "Bristol",
  "Liverpool",
  "Sheffield",
  "Nottingham",
  "Leicester",
  "Edinburgh",
];

// TODO: Replace with real social media URLs
const socials = [
  { href: "https://facebook.com", label: "Facebook", icon: Facebook },
  { href: "https://youtube.com", label: "YouTube", icon: Youtube },
  { href: "https://twitter.com", label: "X (Twitter)", icon: Twitter },
];

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-primary";

const FooterAnchor = ({ label, to }: FooterLink) =>
  to.startsWith("mailto:") ? (
    <a href={to} className={linkClass}>
      {label}
    </a>
  ) : (
    <Link to={to} className={linkClass}>
      {label}
    </Link>
  );

const scrollToTop = () =>
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      {/* Brand + link columns */}
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_repeat(4,minmax(0,1fr))] lg:gap-0">
          <div className="lg:pr-10">
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
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Connecting homeowners with trusted local professionals for
              building, repair and home improvement work.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`The Builder Network on ${label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/[0.07] text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-4 lg:gap-0">
            {linkGroups.map((group) => (
              <div
                key={group.title}
                className="lg:border-l lg:px-6 xl:px-8"
              >
                <h4 className="mb-5 font-semibold text-foreground">
                  {group.title}
                </h4>
                <ul className="space-y-3.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <FooterAnchor {...link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Find tradespeople in your area */}
      <div className="bg-primary/[0.04]">
        <div className="container flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex gap-3 lg:max-w-xs">
            <MapPin
              className="mt-0.5 h-5 w-5 shrink-0 fill-primary text-primary [&>circle]:fill-background"
              aria-hidden
            />
            <div>
              <h4 className="font-semibold text-foreground">
                Find Tradespeople in Your Area
              </h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Browse trusted local professionals in your city or region.
              </p>
            </div>
          </div>
          {/* last column sizes to "More Locations" so the city pills stay equal width */}
          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:max-w-3xl lg:flex-1 lg:grid-cols-[repeat(5,minmax(0,1fr))_auto]">
            {cities.map((city) => (
              <li key={city}>
                <Link
                  to={`/search?city=${city.toLowerCase()}`}
                  className="flex h-10 items-center justify-center rounded-lg border bg-card px-3 text-sm text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {city}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/search"
                className="flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                More Locations
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="container flex flex-col items-center gap-4 py-5 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} The Builder Network. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <nav
              aria-label="Legal"
              className="flex items-center divide-x divide-border whitespace-nowrap [&>*]:px-2.5 [&>*:first-child]:pl-0 sm:[&>*]:px-4"
            >
              <Link to="/privacy" className="transition-colors hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/terms" className="transition-colors hover:text-primary">
                Terms &amp; Conditions
              </Link>
              <a href="/sitemap.xml" className="transition-colors hover:text-primary">
                Sitemap
              </a>
            </nav>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
