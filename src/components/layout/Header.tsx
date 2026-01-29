import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Briefcase, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">BuilderHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                Find Tradespeople
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/tradespeople" className="cursor-pointer">Browse All</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/tradespeople?category=builders" className="cursor-pointer">Builders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/tradespeople?category=plumbers" className="cursor-pointer">Plumbers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/tradespeople?category=electricians" className="cursor-pointer">Electricians</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/tradespeople?category=roofers" className="cursor-pointer">Roofers</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/post-job">
            <Button variant="ghost">Post a Job</Button>
          </Link>

          <Link to="/how-it-works">
            <Button variant="ghost">How It Works</Button>
          </Link>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </Link>
          <Link to="/post-job">
            <Button variant="cta" size="sm">
              Get Quotes
            </Button>
          </Link>
        </div>

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
        <div className="md:hidden border-t bg-white animate-fade-in">
          <nav className="container py-4 space-y-2">
            <Link
              to="/tradespeople"
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search className="h-5 w-5 text-muted-foreground" />
              <span>Find Tradespeople</span>
            </Link>
            <Link
              to="/post-job"
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <span>Post a Job</span>
            </Link>
            <Link
              to="/how-it-works"
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-muted-foreground">How It Works</span>
            </Link>
            <div className="border-t my-2 pt-2">
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5 text-muted-foreground" />
                <span>Login</span>
              </Link>
              <div className="px-4 pt-2">
                <Link to="/post-job" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="cta" className="w-full">Get Quotes</Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
