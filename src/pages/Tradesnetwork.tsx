import DownloadAppSection from "@/components/home/sections/DownloadAppSection";
import TradespersonHero from "@/components/tradesperson/TradespersonHero";
import TradespersonHowItWorks from "@/components/tradesperson/TradespersonHowItWorks";
import TradespersonFeatures from "@/components/tradesperson/TradespersonFeatures";
import TradespersonCTA from "@/components/tradesperson/TradespersonCTA";

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
