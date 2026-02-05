import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/post-job?category=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="hero-gradient">
      <div className="container py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              The reliable way<br />
              to hire a<br />
              tradesperson
            </h1>

            {/* Search Form */}
            <div className="mb-6">
              <p className="text-lg font-medium mb-4">What is your job?</p>
              <form onSubmit={handleSearch} className="flex gap-0">
                <input
                  type="text"
                  placeholder="For example: painting"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-12 px-4 text-foreground bg-background rounded-l-md border-0 focus:ring-2 focus:ring-primary/20 outline-none"
                />
                <Button 
                  type="submit" 
                  className="h-12 rounded-l-none px-4"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <span className="font-medium">Excellent</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-emerald-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                ))}
              </div>
              <span className="text-primary-foreground/60">Trustpilot</span>
            </div>
          </div>

          {/* Right Content - Placeholder for image */}
          <div className="hidden lg:block relative">
            <div className="aspect-[4/3] bg-primary-foreground/10 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground/40 text-sm">Tradesperson image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
