import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { AuthProvider } from "@/contexts/AuthContext";
import PageLayout from "@/components/layout/PageLayout";

// ─── Public pages ───────────────────────────────────────────────
const HomePage = lazy(() => import("./pages/Home"));
const PostJob = lazy(() => import("./pages/PostJobPage"));
const HowItWorks = lazy(() => import("./pages/info/HowItWorksPage"));
const About = lazy(() => import("./pages/info/AboutPage"));
const Terms = lazy(() => import("./pages/legal/TermsPage"));
const Privacy = lazy(() => import("./pages/legal/PrivacyPage"));
const Trades = lazy(() => import("./pages/trades/Trades"));
const TradePage = lazy(() => import("./pages/trades/TradePage"));
const Cities = lazy(() => import("./pages/info/CitiesPage"));
const BecomeAPartner = lazy(() => import("./pages/info/BecomeAPartnerPage"));
const ReviewsPolicy = lazy(() => import("./pages/legal/ReviewsPolicyPage"));
const QualityRequirements = lazy(
  () => import("./pages/legal/QualityRequirementsPage"),
);
const QualityChecks = lazy(() => import("./pages/info/QualityChecksPage"));
const Services = lazy(() => import("./pages/services/ServicesPage"));
const ServicePage = lazy(() => import("./pages/services/ServicePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ─── Homeowner dashboard ────────────────────────────────────────
const HomeownerMyJobs = lazy(
  () => import("./pages/protected/homeowner/HomeownerMyJobsPage"),
);
const HomeownerProfile = lazy(
  () => import("./pages/protected/homeowner/HomeownerProfilePage"),
);
const HomeownerMyQuestionsPage = lazy(
  () => import("./pages/protected/homeowner/HomeownerMyQuestionsPage"),
);

// ─── Service-pro (tradesperson) dashboard ───────────────────────
const TradesPersonLeadDetail = lazy(
  () => import("./pages/protected/tradesperson/TradespersonLeadDetailPage"),
);
const TradesPersonProfile = lazy(
  () => import("./pages/protected/tradesperson/TradespersonProfilePage"),
);
const MyLeads = lazy(
  () => import("./pages/protected/tradesperson/TradespersonMyLeadsPage"),
);
const TradesNetwork = lazy(() => import("./pages/TradesnetworkPage"));
const TradespersonJoinPage = lazy(() => import("./pages/TradespersonJoinPage"));
const TradespersonPublicProfile = lazy(
  () => import("./pages/trades/TradespersonPublicProfilePage"),
);
const QuestionsPage = lazy(() => import("./pages/questions/QuestionsPage"));
const QuestionPage = lazy(() => import("./pages/questions/QuestionPage"));
const TradesPersonContactsPage = lazy(
  () => import("./pages/protected/tradesperson/TradespersonContactsPage"),
);
const JobResponses = lazy(() => import("./pages/unused/JobwithnoResponses"));
const RecommendedTradespeople = lazy(
  () => import("./pages/unused/recommendedtradespersons"),
);

const PageFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<PageFallback />}>
              <Routes>
                {/* ── Public pages (with shared Header + Footer layout) ── */}
                <Route element={<PageLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tradesnetwork" element={<TradesNetwork />} />
                  <Route path="/join" element={<TradespersonJoinPage />} />

                  <Route path="/post-job" element={<PostJob />} />

                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/cities" element={<Cities />} />
                  <Route
                    path="/become-a-partner"
                    element={<BecomeAPartner />}
                  />
                  <Route path="/quality-checks" element={<QualityChecks />} />

                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/reviews-policy" element={<ReviewsPolicy />} />
                  <Route
                    path="/quality-requirements"
                    element={<QualityRequirements />}
                  />

                  <Route path="/trades" element={<Trades />} />
                  <Route
                    path="/:serviceSlug/:tradeSlug"
                    element={<TradePage />}
                  />

                  <Route path="/services" element={<Services />} />
                  <Route
                    path="/services/:serviceSlug"
                    element={<ServicePage />}
                  />

                  <Route path="/questions" element={<QuestionsPage />} />
                  <Route
                    path="/questions/:questionId"
                    element={<QuestionPage />}
                  />

                  {/* ── Homeowner protected routes ── */}
                  <Route
                    path="/homeowner/my-jobs"
                    element={<HomeownerMyJobs />}
                  />
                  {/* TEMP: show new job response page instead of old job detail page */}
                  <Route
                    path="/homeowner/my-jobs/:jobId"
                    element={<JobResponses />}
                  />
                  <Route
                    path="/homeowner/my-jobs/:jobId/recommended"
                    element={<RecommendedTradespeople />}
                  />
                  <Route
                    path="/homeowner/profile"
                    element={<HomeownerProfile />}
                  />
                  <Route
                    path="/homeowner/my-questions"
                    element={<HomeownerMyQuestionsPage />}
                  />
                  <Route
                    path="/homeowner"
                    element={<Navigate to="/homeowner/profile" replace />}
                  />

                  {/* ── Tradesperson protected routes ── */}
                  <Route path="/tradesperson/my-leads" element={<MyLeads />} />
                  <Route
                    path="/tradesperson/my-leads/:leadId"
                    element={<TradesPersonLeadDetail />}
                  />
                  <Route
                    path="/tradesperson/contacts"
                    element={<TradesPersonContactsPage />}
                  />
                  <Route
                    path="/tradesperson/profile"
                    element={<TradesPersonProfile />}
                  />
                  <Route
                    path="/tradesperson"
                    element={<Navigate to="/tradesperson/profile" replace />}
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
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
