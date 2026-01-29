import { Link } from "react-router-dom";
import { Briefcase, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <Briefcase className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold">BuilderHub</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              The UK's trusted platform connecting homeowners with quality tradespeople. 
              Get free quotes for your home improvement projects.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* For Homeowners */}
          <div>
            <h4 className="font-semibold mb-4">For Homeowners</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>
                <Link to="/post-job" className="hover:text-secondary transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-secondary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/tradespeople" className="hover:text-secondary transition-colors">
                  Find Tradespeople
                </Link>
              </li>
              <li>
                <Link to="/advice" className="hover:text-secondary transition-colors">
                  Advice Centre
                </Link>
              </li>
              <li>
                <Link to="/guarantee" className="hover:text-secondary transition-colors">
                  BuilderHub Guarantee
                </Link>
              </li>
            </ul>
          </div>

          {/* For Tradespeople */}
          <div>
            <h4 className="font-semibold mb-4">For Tradespeople</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>
                <Link to="/join" className="hover:text-secondary transition-colors">
                  Join BuilderHub
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-secondary transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="hover:text-secondary transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-secondary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/app" className="hover:text-secondary transition-colors">
                  Mobile App
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>0800 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:help@builderhub.com" className="hover:text-secondary transition-colors">
                  help@builderhub.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  123 Builder Street<br />
                  London, EC1A 1BB
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2024 BuilderHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
            <Link to="/terms" className="hover:text-secondary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="hover:text-secondary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
