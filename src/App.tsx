import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import PageLayout from "@/components/layout/PageLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// ─── Public pages ───────────────────────────────────────────────
import HomePage from "./pages/Home";
import PostJob from "./pages/PostJobPage";
import HowItWorks from "./pages/info/HowItWorksPage";
import About from "./pages/info/AboutPage";
import Terms from "./pages/legal/TermsPage";
import Privacy from "./pages/legal/PrivacyPage";
import Trades from "./pages/trades/TradesPage";
import TradePage from "./pages/trades/TradePage";
import Cities from "./pages/info/CitiesPage";
import BecomeAPartner from "./pages/info/BecomeAPartnerPage";
import ReviewsPolicy from "./pages/legal/ReviewsPolicyPage";
import QualityRequirements from "./pages/legal/QualityRequirementsPage";
import QualityChecks from "./pages/info/QualityChecksPage";
import Services from "./pages/services/ServicesPage";
import ServicePage from "./pages/services/ServicePage";
import NotFound from "./pages/NotFound";

// ─── Homeowner dashboard ────────────────────────────────────────
import HomeownerMyJobs from "./pages/protected/homeowner/HomeownerMyJobsPage";
import HomeownerJobDetail from "./pages/protected/homeowner/HomeownerJobDetailPage";
import HomeownerProfile from "./pages/protected/homeowner/HomeownerProfilePage";

// ─── Service-pro (tradesperson) dashboard ───────────────────────
import ServiceProLeadDetail from "./pages/protected/tradesperson/TradespersonLeadDetailPage";
import ServiceProProfile from "./pages/protected/tradesperson/TradespersonProfilePage";
import MyLeads from "./pages/protected/tradesperson/TradespersonMyLeadsPage";
import TradesNetwork from "./pages/TradesnetworkPage";
import TradespersonPublicProfile from "./pages/trades/TradespersonPublicProfilePage";
import QuestionsPage from "./pages/questions/QuestionsPage";
import HomeownerMyQuestionsPage from "./pages/protected/homeowner/HomeownerMyQuestionsPage";

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

              <Route path="/questions" element={<QuestionsPage />} />

              {/* ── Homeowner protected routes ── */}

              <Route path="/homeowner/my-jobs" element={<HomeownerMyJobs />} />
              <Route
                path="/homeowner/my-jobs/:jobId"
                element={<HomeownerJobDetail />}
              />
              <Route path="/homeowner/profile" element={<HomeownerProfile />} />
              <Route
                path="/homeowner/my-questions"
                element={<HomeownerMyQuestionsPage />}
              />
              <Route
                path="/homeowner"
                element={<Navigate to="/homeowner/profile" replace />}
              />

              {/* ── Service-pro (tradesperson) protected routes ── */}
              <Route path="/tradesperson/my-leads" element={<MyLeads />} />
              <Route
                path="/tradesperson/my-leads/:leadId"
                element={<ServiceProLeadDetail />}
              />
              <Route
                path="/tradesperson/profile"
                element={<ServiceProProfile />}
              />

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
