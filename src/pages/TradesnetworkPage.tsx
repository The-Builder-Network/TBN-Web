import { Helmet } from "react-helmet-async";
import TradespersonHero from "@/components/tradesnetwork/HeroSection";
import TradespersonHowItWorks from "@/components/tradesnetwork/HowItWorksSection";
import TradespersonFeatures from "@/components/tradesnetwork/FeaturesSection";
import TradespersonCTA from "@/components/tradesnetwork/CTASection";
import TradespersonAppSection from "@/components/tradesnetwork/AppSection";

const TradesNetwork = () => {
  return (
    <>
      <Helmet>
        <title>Join The Builder Network — Get local trade work</title>
        <meta
          name="description"
          content="Find local trade jobs posted by homeowners. Join The Builder Network for free and get leads that match your trade and area."
        />
      </Helmet>
      <main className="flex flex-col">
        <TradespersonHero />
        <TradespersonHowItWorks />
        <TradespersonFeatures />
        <TradespersonAppSection />
      </main>
      <TradespersonCTA title="Say yes to the work you want" />
    </>
  );
};

export default TradesNetwork;
