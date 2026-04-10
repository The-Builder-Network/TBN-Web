import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/home/sections/HeroSection";
import StatsSection from "@/components/home/sections/StatsSection";
import WhySection from "@/components/home/sections/WhySection";
import TradesSection from "@/components/home/sections/TradesSection";
import HowItWorksSection from "@/components/home/sections/HowItWorksSection";
import CTASection from "@/components/home/sections/CTASection";
import DownloadAppSection from "@/components/home/sections/DownloadAppSection";
import PostJobStrip from "@/components/shared/PostJobStrip";

const HomePage = () => {
  return (
    <main className="flex flex-col gap-8">
      <Helmet>
        <title>The Builder Network — Find trusted tradespeople near you</title>
        <meta
          name="description"
          content="Post a job for free and get matched with verified, reviewed tradespeople near you. Compare quotes for plumbing, roofing, extensions and more."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="The Builder Network — Find trusted tradespeople near you"
        />
        <meta
          property="og:description"
          content="Post a job for free and get matched with verified, reviewed tradespeople near you. Compare quotes for plumbing, roofing, extensions and more."
        />
        <meta property="og:url" content="https://thebuildernetwork.co.uk" />
      </Helmet>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <WhySection />
      <TradesSection />
      <DownloadAppSection />
      <PostJobStrip />
    </main>
  );
};

export default HomePage;
