import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import PageLayout from "@/components/layout/PageLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// ─── Public pages ───────────────────────────────────────────────
import HomePage from "./pages/Home";
import PostJob from "./pages/PostJob";
import HowItWorks from "./pages/info/HowItWorks";
import About from "./pages/info/About";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Trades from "./pages/trades/Trades";
import TradePage from "./pages/trades/TradePage";
import Cities from "./pages/info/Cities";
import BecomeAPartner from "./pages/info/BecomeAPartner";
import ReviewsPolicy from "./pages/legal/ReviewsPolicy";
import QualityRequirements from "./pages/legal/QualityRequirements";
import QualityChecks from "./pages/info/QualityChecks";
import Services from "./pages/services/Services";
import ServicePage from "./pages/services/ServicePage";
import NotFound from "./pages/NotFound";

// ─── Homeowner dashboard ────────────────────────────────────────
import HomeownerRedirect from "./pages/protected/homeowner/HomeownerRedirect";
import HomeownerMyJobs from "./pages/protected/homeowner/MyJobs";
import HomeownerJobDetail from "./pages/protected/homeowner/JobDetail";
import HomeownerProfile from "./pages/protected/homeowner/Profile";

// ─── Service-pro (tradesperson) dashboard ───────────────────────
import ServiceProRedirect from "./pages/protected/tradesperson/ServiceProRedirect";
import ServiceProLeadDetail from "./pages/protected/tradesperson/LeadDetail";
import ServiceProProfile from "./pages/protected/tradesperson/Profile";
import MyLeads from "./pages/protected/tradesperson/MyLeads";
import TradesNetwork from "./pages/Tradesnetwork";
import TradespersonPublicProfile from "./pages/trades/TradespersonPublicProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* ── Public pages (with shared Header + Footer layout) ── */}
            <Route element={<PageLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/tradesnetwork" element={<TradesNetwork />} />

              <Route path="/post-job" element={<PostJob />} />

              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/cities" element={<Cities />} />
              <Route path="/become-a-partner" element={<BecomeAPartner />} />
              <Route path="/quality-checks" element={<QualityChecks />} />

              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/reviews-policy" element={<ReviewsPolicy />} />
              <Route
                path="/quality-requirements"
                element={<QualityRequirements />}
              />

              <Route path="/trades" element={<Trades />} />
              <Route path="/:serviceSlug/:tradeSlug" element={<TradePage />} />

              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceSlug" element={<ServicePage />} />

              {/* ── Homeowner protected routes ── */}
              <Route element={<ProtectedRoute allowedRole="homeowner" />}>
                <Route path="/homeowner" element={<HomeownerRedirect />} />
                <Route
                  path="/homeowner/my-jobs"
                  element={<HomeownerMyJobs />}
                />
                <Route
                  path="/homeowner/my-jobs/:jobId"
                  element={<HomeownerJobDetail />}
                />
                <Route
                  path="/homeowner/profile"
                  element={<HomeownerProfile />}
                />
              </Route>

              {/* ── Service-pro (tradesperson) protected routes ── */}
              <Route element={<ProtectedRoute allowedRole="tradesperson" />}>
                <Route path="/tradesperson" element={<ServiceProRedirect />} />
                <Route path="/tradesperson/my-leads" element={<MyLeads />} />
                <Route
                  path="/tradesperson/my-leads/:leadId"
                  element={<ServiceProLeadDetail />}
                />
                <Route
                  path="/tradesperson/profile"
                  element={<ServiceProProfile />}
                />
              </Route>

              {/* Public tradesperson profile (not protected) */}
              <Route
                path="/tradesperson/:username"
                element={<TradespersonPublicProfile />}
              />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
