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
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

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
const HomeownerJobDetail = lazy(
  () => import("./pages/protected/homeowner/HomeownerJobDetailPage"),
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
                  <Route
                    path="/"
                    element={
                      <ErrorBoundary name="home page">
                        <HomePage />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/tradesnetwork"
                    element={
                      <ErrorBoundary name="tradesnetwork page">
                        <TradesNetwork />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/join"
                    element={
                      <ErrorBoundary name="join page">
                        <TradespersonJoinPage />
                      </ErrorBoundary>
                    }
                  />

                  <Route
                    path="/post-job"
                    element={
                      <ErrorBoundary name="post-job flow">
                        <PostJob />
                      </ErrorBoundary>
                    }
                  />

                  <Route
                    path="/how-it-works"
                    element={
                      <ErrorBoundary name="how it works">
                        <HowItWorks />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <ErrorBoundary name="about page">
                        <About />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/cities"
                    element={
                      <ErrorBoundary name="cities page">
                        <Cities />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/become-a-partner"
                    element={
                      <ErrorBoundary name="become a partner">
                        <BecomeAPartner />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/quality-checks"
                    element={
                      <ErrorBoundary name="quality checks">
                        <QualityChecks />
                      </ErrorBoundary>
                    }
                  />

                  <Route
                    path="/terms"
                    element={
                      <ErrorBoundary name="terms page">
                        <Terms />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/privacy"
                    element={
                      <ErrorBoundary name="privacy page">
                        <Privacy />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/reviews-policy"
                    element={
                      <ErrorBoundary name="reviews policy">
                        <ReviewsPolicy />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/quality-requirements"
                    element={
                      <ErrorBoundary name="quality requirements">
                        <QualityRequirements />
                      </ErrorBoundary>
                    }
                  />

                  <Route
                    path="/trades"
                    element={
                      <ErrorBoundary name="trades directory">
                        <Trades />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/:serviceSlug/:tradeSlug"
                    element={
                      <ErrorBoundary name="trade page">
                        <TradePage />
                      </ErrorBoundary>
                    }
                  />

                  <Route
                    path="/services"
                    element={
                      <ErrorBoundary name="services directory">
                        <Services />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/services/:serviceSlug"
                    element={
                      <ErrorBoundary name="service page">
                        <ServicePage />
                      </ErrorBoundary>
                    }
                  />

                  <Route
                    path="/questions"
                    element={
                      <ErrorBoundary name="questions list">
                        <QuestionsPage />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/questions/:questionId"
                    element={
                      <ErrorBoundary name="question detail">
                        <QuestionPage />
                      </ErrorBoundary>
                    }
                  />

                  {/* ── Homeowner protected routes ── */}
                  <Route
                    path="/homeowner/my-jobs"
                    element={
                      <ErrorBoundary name="my jobs">
                        <HomeownerMyJobs />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/homeowner/my-jobs/:jobId"
                    element={
                      <ErrorBoundary name="job detail">
                        <HomeownerJobDetail />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/homeowner/my-jobs/:jobId/recommended"
                    element={
                      <ErrorBoundary name="recommended tradespeople">
                        <RecommendedTradespeople />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/homeowner/profile"
                    element={
                      <ErrorBoundary name="homeowner profile">
                        <HomeownerProfile />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/homeowner/my-questions"
                    element={
                      <ErrorBoundary name="my questions">
                        <HomeownerMyQuestionsPage />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/homeowner"
                    element={<Navigate to="/homeowner/profile" replace />}
                  />

                  {/* ── Tradesperson protected routes ── */}
                  <Route
                    path="/tradesperson/my-leads"
                    element={
                      <ErrorBoundary name="my leads">
                        <MyLeads />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/tradesperson/my-leads/:leadId"
                    element={
                      <ErrorBoundary name="lead detail">
                        <TradesPersonLeadDetail />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/tradesperson/contacts"
                    element={
                      <ErrorBoundary name="contacts & messaging">
                        <TradesPersonContactsPage />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/tradesperson/profile"
                    element={
                      <ErrorBoundary name="tradesperson profile">
                        <TradesPersonProfile />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/tradesperson"
                    element={<Navigate to="/tradesperson/profile" replace />}
                  />

                  {/* Public tradesperson profile (not protected) */}
                  <Route
                    path="/tradesperson/:username"
                    element={
                      <ErrorBoundary name="public profile">
                        <TradespersonPublicProfile />
                      </ErrorBoundary>
                    }
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
