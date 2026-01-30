import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground text-sm py-2 text-center">
        <span>Are you a tradesperson looking for leads? </span>
        <Link to="/join" className="underline font-medium hover:no-underline">
          Join for free
        </Link>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">BuilderHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/post-job" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Post a job
            </Link>
            <Link to="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Log in
            </Link>
            <Link to="/join">
              <Button variant="outline" size="sm">
                Sign up as a tradesperson
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background animate-fade-in">
            <nav className="container py-4 space-y-2">
              <Link
                to="/post-job"
                className="block px-4 py-3 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Post a job
              </Link>
              <Link
                to="/login"
                className="block px-4 py-3 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <div className="px-4 pt-2">
                <Link to="/join" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign up as a tradesperson
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
