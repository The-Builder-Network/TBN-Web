import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="text-xl font-bold text-primary">
              BuilderHub
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              The UK's trusted platform for finding quality tradespeople.
            </p>
          </div>

          {/* For Homeowners */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Homeowners</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/post-job" className="hover:text-foreground transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/tradespeople" className="hover:text-foreground transition-colors">
                  Find Tradespeople
                </Link>
              </li>
            </ul>
          </div>

          {/* For Tradespeople */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Tradespeople</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/join" className="hover:text-foreground transition-colors">
                  Join BuilderHub
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 BuilderHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
