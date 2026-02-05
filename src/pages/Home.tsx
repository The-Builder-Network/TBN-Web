import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import WhySection from "@/components/home/WhySection";
import CategoriesSection from "@/components/home/CategoriesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import CTASection from "@/components/home/CTASection";
import DownloadAppSection from "@/components/home/DownloadAppSection";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col gap-8">
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <WhySection />
        <CategoriesSection />
        <DownloadAppSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
