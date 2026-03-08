import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { services } from "@/data/services";
import { trades } from "@/data/trades";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import CTASection from "@/components/home/sections/CTASection";
import PostcodeInput from "@/components/shared/PostcodeInput";

const ServicePage = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const navigate = useNavigate();
  const [postcode, setPostcode] = useState("");
  const [postcodeValid, setPostcodeValid] = useState(false);

  const service = services.find((s) => s.slug === serviceSlug);

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  // Get all trade objects belonging to this service
  const serviceTrades = trades.filter((t) => t.serviceSlug === service.slug);

  const handleContinue = () => {
    if (postcodeValid && postcode) {
      navigate(
        `/post-job?service=${encodeURIComponent(service.slug)}&postcode=${encodeURIComponent(postcode)}`,
      );
    }
  };

  return (
    <>
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/20">
          <div className="container py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link
                to="/services"
                className="hover:text-foreground transition-colors"
              >
                Services
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{service.name}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-primary/5">
          <div className="container py-12 md:py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-primary uppercase tracking-wide mb-2">
                service
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Find qualified tradespeople for your{" "}
                <span className="lowercase">{service.name}</span> jobs
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Get matched with screened and reviewed{" "}
                {service.name.toLowerCase()} specialists near you. Compare
                quotes, read reviews, and hire with confidence.
              </p>

              {/* Postcode Input */}
              <div className="max-w-sm space-y-3">
                <PostcodeInput
                  value={postcode}
                  onChange={setPostcode}
                  onValidationChange={setPostcodeValid}
                  className="h-12"
                />
                <Button
                  size="lg"
                  className="w-full"
                  disabled={!postcodeValid}
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trades under this service */}
        {serviceTrades.length > 0 && (
          <div className="container py-12">
            <h2 className="text-2xl font-semibold mb-6">
              Trades in {service.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {serviceTrades.map((trade) => (
                <Link
                  key={trade.slug}
                  to={`/${service.slug}/${trade.slug}`}
                  className="group p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all bg-background"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {trade.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <CTASection
        title={`Ready to hire a ${service.name.toLowerCase()} specialist?`}
      />
    </>
  );
};

export default ServicePage;
