import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import HomePage from "./pages/Home";
import Tradesperson from "./pages/Tradesperson";
import Tradespeople from "./pages/Tradespeople";
import TradespersonProfile from "./pages/TradespersonProfile";
import PostJob from "./pages/PostJob";
import JobPosted from "./pages/JobPosted";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Trades from "./pages/Trades";
import TradePage from "./pages/TradePage";
import Cities from "./pages/Cities";
import BecomeAPartner from "./pages/BecomeAPartner";
import ReviewsPolicy from "./pages/ReviewsPolicy";
import QualityRequirements from "./pages/QualityRequirements";
import QualityChecks from "./pages/QualityChecks";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tradesperson" element={<Tradesperson />} />
          <Route path="/tradespeople" element={<Tradespeople />} />
          <Route path="/tradespeople/:id" element={<TradespersonProfile />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/job-posted" element={<JobPosted />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/trades/:slug" element={<TradePage />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/become-a-partner" element={<BecomeAPartner />} />
          <Route path="/reviews-policy" element={<ReviewsPolicy />} />
          <Route
            path="/quality-requirements"
            element={<QualityRequirements />}
          />
          <Route path="/quality-checks" element={<QualityChecks />} />
          <Route path="/services" element={<Services />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
