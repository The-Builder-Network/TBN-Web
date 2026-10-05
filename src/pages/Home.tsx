import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/home/sections/HeroSection";
import StatsSection from "@/components/home/sections/StatsSection";
import WhySection from "@/components/home/sections/WhySection";
import TradesSection from "@/components/home/sections/TradesSection";
import HowItWorksSection from "@/components/home/sections/HowItWorksSection";
import ReviewsSection from "@/components/home/sections/ReviewsSection";
import DownloadAppSection from "@/components/home/sections/DownloadAppSection";
import GetStartedSection from "@/components/home/sections/GetStartedSection";

const HomePage = () => {
  return (
    <div className="flex flex-col">
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
      <ReviewsSection />
      <DownloadAppSection />
      <GetStartedSection />
    </div>
  );
};

export default HomePage;
