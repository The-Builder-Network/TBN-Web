import { Link } from "react-router-dom";
import { trades } from "@/data/trades";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";

const Trades = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {trades.map((trade) => (
              <Link
                key={trade.slug}
                to={`/trades/${trade.slug}`}
                className="group p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all bg-background"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {trade.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <CTASection title="Find the right tradesperson for your project today" />
      <Footer />
    </div>
  );
};

export default Trades;
