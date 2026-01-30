import { Link } from "react-router-dom";
import { Star, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  },
];

const FeaturedTradesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Featured tradespeople
          </h2>
          <Link to="/tradespeople">
            <Button variant="outline" size="sm">
              View all
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredTrades.map((trade) => (
            <Link
              key={trade.id}
              to={`/tradespeople/${trade.id}`}
              className="group p-6 rounded-lg border bg-card hover:border-primary transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium">
                  {trade.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {trade.name}
                    </h3>
                    {trade.verified && (
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{trade.company}</p>
                  <p className="text-sm font-medium text-primary mt-1">{trade.trade}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-star text-star" />
                  <span className="font-medium">{trade.rating}</span>
                  <span className="text-muted-foreground">({trade.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {trade.location}
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
