import { Helmet } from "react-helmet-async";
import DownloadAppSection from "@/components/home/sections/DownloadAppSection";
import TradespersonHero from "@/components/tradesnetwork/HeroSection";
import TradespersonHowItWorks from "@/components/tradesnetwork/HowItWorksSection";
import TradespersonFeatures from "@/components/tradesnetwork/FeaturesSection";
import TradespersonCTA from "@/components/tradesnetwork/CTASection";

const TradesNetwork = () => {
  return (
    <>
      <Helmet>
        <title>Join Builder Network — Get local trade work</title>
        <meta
          name="description"
          content="Find local trade jobs posted by homeowners. Join thousands of verified tradespeople on Builder Network."
        />
      </Helmet>
      <main className="flex flex-col">
        <TradespersonHero />
        <TradespersonHowItWorks />
        <TradespersonFeatures />
        <DownloadAppSection />
      </main>
      <TradespersonCTA title="Say yes to the work you want" />
    </>
  );
};

export default TradesNetwork;
