import { Link } from "react-router-dom";
import { Facebook, Youtube, Twitter } from "lucide-react";
import PostJobStrip from "@/components/shared/PostJobStrip";
import { trades } from "@/constants/trades";

const Footer = () => {
  return (
    <>
      <footer className="border-t bg-background">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}

            {/* Homeowners */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Homeowners</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/post-job"
                    className="hover:text-foreground hover:underline transition-colors underline"
                  >
                    Post a job
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works"
                    className="hover:text-foreground hover:underline transition-colors underline"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/trades"
                    className="hover:text-foreground hover:underline transition-colors underline"
                  >
                    Find trades
                  </Link>
                </li>
                <li>
                  <Link
                    to="/quality-checks"
                    className="hover:text-foreground hover:underline transition-colors underline"
                  >
                    Quality checks
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tradespeople */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Tradespeople
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/tradesnetwork"
                    className="hover:text-foreground hover:underline transition-colors underline"
                  >
                    Register as tradesperson
                  </Link>
                </li>
                <li>
                  <Link
                    to="/quality-requirements"
                    className="hover:text-foreground hover:underline transition-colors underline"
                  >
                    Quality requirements
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reviews-policy"
                    className="hover:text-foreground hover:underline transition-colors underline"
                  >
                    Reviews policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company info */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Company info
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-foreground hover:underline transition-colors underline"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/become-a-partner"
                    className="hover:text-foreground hover:underline transition-colors underline"
                  >
                    Become a partner
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="hover:text-foreground hover:underline transition-colors underline"
                  >
                    Services
                  </Link>
                </li>
              </ul>
            </div>

            {/* Helpful resources */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Helpful resources
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/trades"
                    className="hover:text-foreground hover:underline transition-colors underline"
                  >
                    Trades
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                    className="hover:text-foreground hover:underline transition-colors underline"
                  >
                    Cities
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <Link
                to="/"
                className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
              >
                <img
                  src="/images/logo-black.png"
                  alt="The Builder Network"
                  className="w-full"
                />
              </Link>
            </div>
          </div>
        </div>
        {/* Find tradespeople in your area */}
        <div className="border-t  bg-primary/5">
          <div className="container py-8">
            <h4 className="font-semibold text-foreground mb-4">
              Find tradespeople in your area
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm text-muted-foreground">
              <Link
                to="/search?city=london"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                London
              </Link>
              <Link
                to="/search?city=manchester"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                Manchester
              </Link>
              <Link
                to="/search?city=birmingham"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                Birmingham
              </Link>
              <Link
                to="/search?city=leeds"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                Leeds
              </Link>
              <Link
                to="/search?city=glasgow"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                Glasgow
              </Link>
              <Link
                to="/search?city=bristol"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                Bristol
              </Link>
              <Link
                to="/search?city=liverpool"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                Liverpool
              </Link>
              <Link
                to="/search?city=sheffield"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                Sheffield
              </Link>
              <Link
                to="/search?city=edinburgh"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                Edinburgh
              </Link>
              <Link
                to="/search?city=cardiff"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                Cardiff
              </Link>
              <Link
                to="/search?city=newcastle"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                Newcastle
              </Link>
              <Link
                to="/search?city=leicester"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                Leicester
              </Link>
              <Link
                to="/search?city=nottingham"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                Nottingham
              </Link>
              <Link
                to="/search?city=southampton"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                Southampton
              </Link>
              <Link
                to="/search?city=cambridge"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                Cambridge
              </Link>
              <Link
                to="/search"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                More cities »
              </Link>
            </div>
          </div>
        </div>

        {/* Tradespeople professions */}
        <div className="border-t  bg-primary/10">
          <div className="container py-8">
            <h4 className="font-semibold text-foreground mb-4">
              Our tradespeople's professions
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm text-muted-foreground">
              {trades.slice(0, 17).map((trade) => (
                <Link
                  key={trade.slug}
                  to={`/${trade.serviceSlug}/${trade.slug}`}
                  className="hover:text-foreground hover:underline transition-colors underline"
                >
                  {trade.name}
                </Link>
              ))}
              <Link
                to="/trades"
                className="hover:text-foreground hover:underline transition-colors underline"
              >
                More trades »
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t bg-primary text-primary-foreground">
          <div className="container py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm ">
              <p>© 2026 The Builder Network. All rights reserved.</p>
              <div className="flex gap-6">
                <Link
                  to="/privacy"
                  className="hover:underline transition-colors underline"
                >
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  className="hover:underline transition-colors underline"
                >
                  Terms and conditions
                </Link>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex gap-4">
                  {/* TODO: Replace with real social media URLs */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                    aria-label="The Builder Network on Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                    aria-label="The Builder Network on YouTube"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors"
                    aria-label="The Builder Network on X (Twitter)"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
