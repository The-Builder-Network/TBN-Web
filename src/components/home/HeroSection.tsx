import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, ArrowRight, Shield, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/tradespeople?q=${searchQuery}&location=${location}`);
  };

  return (
    <section className="relative hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm mb-8 animate-fade-in">
            <Shield className="h-4 w-4 text-secondary" />
            <span>Trusted by 2 million+ homeowners across the UK</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Find trusted tradespeople
            <span className="block text-secondary">for your next project</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in">
            Post your job for free and receive quotes from vetted, reviewed professionals in your area
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="animate-fade-in">
            <div className="flex flex-col md:flex-row gap-3 p-3 bg-white rounded-2xl shadow-2xl max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="What do you need done?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 text-foreground rounded-lg border-0 focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Postcode or town"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 text-foreground rounded-lg border-0 focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <Button type="submit" variant="hero" className="md:w-auto">
                Get Quotes
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </form>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 text-sm">
            <span className="text-white/60">Popular:</span>
            {["Builders", "Plumbers", "Electricians", "Roofers", "Painters"].map((trade) => (
              <button
                key={trade}
                onClick={() => navigate(`/tradespeople?category=${trade.toLowerCase()}`)}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                {trade}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto animate-fade-in">
          {[
            { icon: Users, value: "50,000+", label: "Verified Tradespeople" },
            { icon: Star, value: "4.8/5", label: "Average Rating" },
            { icon: Shield, value: "100%", label: "Money Back Guarantee" },
            { value: "2M+", label: "Jobs Completed" },
          ].map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(210 20% 98%)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
