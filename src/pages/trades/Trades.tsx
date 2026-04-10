import { Link } from "react-router-dom";
import { trades } from "@/constants/trades";
import CTASection from "@/components/home/sections/CTASection";
import { Helmet } from "react-helmet-async";

const Trades = () => {
  return (
    <>
      <Helmet>
        <title>Browse Trades | The Builder Network</title>
        <meta
          name="description"
          content="Explore all trades on Builder Network. Find plumbers, electricians, roofers and more near you."
        />
      </Helmet>
      <main className="flex-1">
        {/* Header Section */}
        <div className="bg-primary/5 py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our tradespeople's professions
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Browse our complete directory of skilled tradespeople. Find the
              right professional for your project.
            </p>
          </div>
        </div>

        {/* Trades Grid */}
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trades.map((trade) => (
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
        </div>
      </main>
      <CTASection title="Find the right tradesperson for your project today" />
    </>
  );
};

export default Trades;
