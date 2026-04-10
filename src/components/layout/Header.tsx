import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Briefcase,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoginModal from "@/components/modals/LoginModal";
import { CreditBalance } from "@/components/shared/CreditBalance";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isTradespersonPage = location.pathname === "/tradesnetwork";

  const { isAuthenticated, isHomeowner, isTradesperson, user, logout } =
    useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* Top Banner — only for unauthenticated users or homeowners */}
      {!isTradespersonPage && !isTradesperson && (
        <div className="bg-primary/10 text-primary text-sm py-1 text-center">
          <span className="font-medium">
            Are you a tradesperson looking for leads?{" "}
          </span>
          <Link
            to="/tradesnetwork"
            className="underline font-medium hover:no-underline"
          >
            Join for free
          </Link>
        </div>
      )}

      <header className="sticky top-0 z-50 w-full border-b py-3 bg-background">
        <div className="container flex h-12 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2"
          >
            <img
              src="/images/logo-black.png"
              alt="The Builder Network"
              className="h-12 mb-0.5"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {/* ── Not logged in ── */}
            {!isAuthenticated && (
              <>
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
                      <span className="text-base">
                        Sign up as a tradesperson
                      </span>
                    </Button>
                  </Link>
                )}
              </>
            )}

            {/* ── Homeowner ── */}
            {isAuthenticated && isHomeowner && (
              <>
                <Link
                  to="/post-job"
                  className="text-base font-medium text-foreground hover:text-primary transition-colors"
                >
                  Post a job
                </Link>
                <Link
                  to="/homeowner/my-jobs"
                  className="text-base font-medium text-foreground hover:text-primary transition-colors"
                >
                  My jobs
                </Link>
                <NotificationBell />
                <AccountDropdown
                  name={user?.name ?? ""}
                  onLogout={handleLogout}
                  onProfile={() => navigate("/homeowner")}
                  extraItems={[
                    {
                      label: "Ask a tradesperson",
                      icon: MessageSquare,
                      onClick: () => navigate("/questions"),
                    },
                  ]}
                />
              </>
            )}

            {/* ── Tradesperson ── */}
            {isAuthenticated && isTradesperson && (
              <>
                <CreditBalance />
                <NotificationBell />
                <AccountDropdown
                  name={user?.name ?? ""}
                  onLogout={handleLogout}
                  onProfile={() => navigate("/tradesperson/profile")}
                  extraItems={[
                    {
                      label: "My leads",
                      icon: Briefcase,
                      onClick: () => navigate("/tradesperson/my-leads"),
                    },
                  ]}
                />
              </>
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
              {!isAuthenticated && (
                <>
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
                        <Button
                          variant="outline"
                          size={"xl"}
                          className="w-full"
                        >
                          I'm a customer
                        </Button>
                      </Link>
                    ) : (
                      <Link
                        to="/tradesnetwork"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          size={"xl"}
                          className="w-full"
                        >
                          Sign up as a tradesperson
                        </Button>
                      </Link>
                    )}
                  </div>
                </>
              )}

              {isAuthenticated && isHomeowner && (
                <>
                  <Link
                    to="/post-job"
                    className="block px-4 py-3 text-sm font-medium hover:bg-muted rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Post a job
                  </Link>
                  <Link
                    to="/homeowner/my-jobs"
                    className="block px-4 py-3 text-sm font-medium hover:bg-muted rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My jobs
                  </Link>
                  <Link
                    to="/homeowner"
                    className="block px-4 py-3 text-sm font-medium hover:bg-muted rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      void handleLogout();
                    }}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-destructive hover:bg-muted rounded-md"
                  >
                    Log out
                  </button>
                </>
              )}

              {isAuthenticated && isTradesperson && (
                <>
                  <Link
                    to="/tradesperson/my-leads"
                    className="block px-4 py-3 text-sm font-medium hover:bg-muted rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My leads
                  </Link>
                  <Link
                    to="/tradesperson/profile"
                    className="block px-4 py-3 text-sm font-medium hover:bg-muted rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      void handleLogout();
                    }}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-destructive hover:bg-muted rounded-md"
                  >
                    Log out
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  );
};

// ── Account dropdown shared sub-component ────────────────────

interface AccountDropdownProps {
  name: string;
  onLogout: () => void;
  onProfile: () => void;
  extraItems?: {
    label: string;
    icon: React.ElementType;
    onClick: () => void;
  }[];
}

function AccountDropdown({
  name,
  onLogout,
  onProfile,
  extraItems = [],
}: AccountDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Menu className="h-4 w-4" />
          <span className="text-base">My account</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="font-normal text-muted-foreground">
          {name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onProfile} className="cursor-pointer gap-2">
          <User className="h-4 w-4" />
          Profile
        </DropdownMenuItem>
        {extraItems.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.onClick}
            className="cursor-pointer gap-2"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer gap-2 text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Header;
