import { Link } from "react-router-dom";
import { trades } from "@/data/trades";
import { Button } from "@/components/ui/button";

const TradesSection = () => {
  // Use first 8 trades as featured
  const featuredTrades = trades.slice(0, 8);

  return (
    <section className="pb-12 pt-8 bg-background">
      <div className="container">
        <h2 className="text-3xl md:text-3xl font-bold text-foreground mb-14">
          Browse by trade
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTrades.map((trade) => (
            <Link
              key={trade.slug}
              to={`/${trade.serviceSlug}/${trade.slug}`}
              className="group flex overflow-hidden rounded-lg border bg-card hover:border-highlight transition-all hover:shadow-md h-24"
            >
              <div className="w-1/4 h-full relative">
                <img
                  src={trade.imageUrl}
                  alt={trade.name}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </div>
              <div className="w-3/4 p-3 flex flex-col justify-center">
                <span className="font-semibold text-foreground group-hover:text-highlight transition-colors mb-1 line-clamp-1">
                  {trade.name}
                </span>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {trade.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link to="/trades">View all trades</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TradesSection;
