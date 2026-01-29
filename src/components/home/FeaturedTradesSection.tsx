import { Link } from "react-router-dom";
import { Star, MapPin, Shield, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const featuredTrades = [
  {
    id: 1,
    name: "James Wilson",
    company: "Wilson Building Services",
    trade: "Builder",
    location: "London, E1",
    rating: 4.9,
    reviews: 128,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    badges: ["Top Rated", "Responds Fast"],
    completedJobs: 234,
  },
  {
    id: 2,
    name: "Sarah Thompson",
    company: "ST Plumbing & Heating",
    trade: "Plumber",
    location: "Manchester, M1",
    rating: 4.8,
    reviews: 96,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    badges: ["Top Rated"],
    completedJobs: 189,
  },
  {
    id: 3,
    name: "Mike Davies",
    company: "Davies Electrical",
    trade: "Electrician",
    location: "Birmingham, B1",
    rating: 5.0,
    reviews: 74,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    badges: ["Top Rated", "Responds Fast"],
    completedJobs: 156,
  },
  {
    id: 4,
    name: "Emma Roberts",
    company: "Roberts Decorating",
    trade: "Painter & Decorator",
    location: "Leeds, LS1",
    rating: 4.9,
    reviews: 112,
    verified: true,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    badges: ["Responds Fast"],
    completedJobs: 203,
  },
];

const FeaturedTradesSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Tradespeople
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Top-rated professionals ready to help with your next project
            </p>
          </div>
          <Link to="/tradespeople">
            <Button variant="outline" className="gap-2">
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Featured Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTrades.map((trade) => (
            <Link
              key={trade.id}
              to={`/tradespeople/${trade.id}`}
              className="group bg-card rounded-xl shadow-card card-hover overflow-hidden border"
            >
              {/* Card Header with Background */}
              <div className="h-24 bg-gradient-to-br from-primary/10 to-accent/10 relative">
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <img
                      src={trade.avatar}
                      alt={trade.name}
                      className="w-20 h-20 rounded-full avatar-ring object-cover"
                    />
                    {trade.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground rounded-full p-1 verified-glow">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="pt-12 p-6 text-center">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {trade.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{trade.company}</p>
                <p className="text-sm font-medium text-primary mt-1">{trade.trade}</p>

                {/* Location */}
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-3">
                  <MapPin className="h-3.5 w-3.5" />
                  {trade.location}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-star text-star" />
                    <span className="font-semibold">{trade.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    ({trade.reviews} reviews)
                  </span>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {trade.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Shield className="h-3.5 w-3.5" />
                    Verified
                  </div>
                  <div className="text-muted-foreground">
                    {trade.completedJobs} jobs
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTradesSection;
