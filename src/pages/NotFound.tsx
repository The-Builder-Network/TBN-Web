import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center text-center py-24 px-4">
        <h1 className="mb-4 text-8xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Page not found</h2>
        <p className="mb-8 text-md text-muted-foreground max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or doesn't exist.
        </p>
        <Button asChild size="lg">
          <Link to="/">Return to Home</Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
