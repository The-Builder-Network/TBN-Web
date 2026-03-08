import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/LoginModal";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const location = useLocation();
  const isTradespersonPage = location.pathname === "/tradesnetwork";

  return (
    <>
      {/* Top Banner */}
      {!isTradespersonPage && (
        <div className="bg-highlight/90 text-primary-foreground text-sm py-1 text-center">
          <span>Are you a tradesperson looking for leads? </span>
          <Link
            to="/tradesnetwork"
            className="underline font-medium hover:no-underline"
          >
            Join for free
          </Link>
        </div>
      )}

      <header className="sticky top-0 z-50 w-full border-b py-4 bg-background">
        <div className="container flex h-12 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/logo-black.png"
              alt="The Builder Network"
              className="h-12 mb-0.5"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {!isTradespersonPage && (
              <Link
                to="/post-job"
                className="text-base font-medium text-foreground hover:text-primary transition-colors"
              >
                Post a job
              </Link>
            )}
            <button
              onClick={() => setLoginModalOpen(true)}
              className="text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              Log in
            </button>
            {isTradespersonPage ? (
              <Link to="/">
                <Button variant="outline" size="sm">
                  <span className="text-base">I'm a customer</span>
                </Button>
              </Link>
            ) : (
              <Link to="/tradesnetwork">
                <Button variant="outline" size="sm">
                  <span className="text-base">Sign up as a tradesperson</span>
                </Button>
              </Link>
            )}
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
              {!isTradespersonPage && (
                <Link
                  to="/post-job"
                  className="block px-4 py-3 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Post a job
                </Link>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginModalOpen(true);
                }}
                className="block w-full text-left px-4 py-3 text-sm font-medium hover:bg-muted rounded-md transition-colors"
              >
                Log in
              </button>
              <div className="px-4 pt-2">
                {isTradespersonPage ? (
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size={"xl"} className="w-full">
                      I'm a customer
                    </Button>
                  </Link>
                ) : (
                  <Link
                    to="/tradesnetwork"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="outline" size={"xl"} className="w-full">
                      Sign up as a tradesperson
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  );
};

export default Header;
