import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { services } from "@/constants/services";
import { trades } from "@/constants/trades";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/home/sections/CTASection";
import PostcodeInput from "@/components/shared/PostcodeInput";
import PageBreadcrumb from "@/components/shared/Breadcrumb";

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
      <Helmet>
        <title>{service.name} — Builder Network</title>
        <meta
          name="description"
          content={`Find trusted ${service.name.toLowerCase()} professionals near you. Post a job free and get matched with verified tradespeople on Builder Network.`}
        />
      </Helmet>
      <main className="flex-1">
        {/* Breadcrumb */}
        <PageBreadcrumb
          items={[
            { label: "Services", href: "/services" },
            { label: service.name },
          ]}
        />

        {/* Hero Section */}
        <div className="bg-primary/5">
          <div className="container py-12 md:py-20">
            <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Left Column - Content */}
              <div className="col-span-3">
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
                <span>
                  Enter your postcode to find local {service.name.toLowerCase()}{" "}
                  specialists
                </span>

                {/* Postcode Input */}
                <div className="max-w-sm space-y-3 mt-4">
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

              {/* Right Column - Image */}
              <div className="order-first md:order-last col-span-2">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted shadow-lg">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceTrades.map((trade) => (
                <Link
                  key={trade.slug}
                  to={`/${service.slug}/${trade.slug}`}
                  className="group flex overflow-hidden rounded-lg border bg-card hover:border-highlight transition-all hover:shadow-md h-24"
                >
                  <div className="w-1/4 h-full relative">
                    <img
                      src={trade.imageUrl}
                      alt={trade.name}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  </div>
                  <div className="w-3/4 p-3 flex flex-col justify-center">
                    <span className="font-semibold text-foreground group-hover:text-highlight transition-colors mb-1 line-clamp-1">
                      {trade.name}
                    </span>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {trade.description}
                    </p>
                  </div>
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
