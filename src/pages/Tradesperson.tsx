import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DownloadAppSection from "@/components/home/DownloadAppSection";
import TradespersonHero from "@/components/tradesperson/TradespersonHero";
import TradespersonHowItWorks from "@/components/tradesperson/TradespersonHowItWorks";
import TradespersonFeatures from "@/components/tradesperson/TradespersonFeatures";
import TradespersonCTA from "@/components/tradesperson/TradespersonCTA";

const Tradesperson = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col">
        <TradespersonHero />
        <TradespersonHowItWorks />
        <TradespersonFeatures />
        <DownloadAppSection />
      </main>
      <TradespersonCTA title="Say yes to the work you want" />
      <Footer />
    </div>
  );
};

export default Tradesperson;
