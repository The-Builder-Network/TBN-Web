import DownloadAppSection from "@/components/home/sections/DownloadAppSection";
import TradespersonHero from "@/components/tradesnetwork/HeroSection";
import TradespersonHowItWorks from "@/components/tradesnetwork/HowItWorksSection";
import TradespersonFeatures from "@/components/tradesnetwork/FeaturesSection";
import TradespersonCTA from "@/components/tradesnetwork/CTASection";

const TradesNetwork = () => {
  return (
    <>
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
