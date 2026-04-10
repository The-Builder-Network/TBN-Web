import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TradespersonCTASection from "@/components/tradesnetwork/CTASection";
import { Helmet } from "react-helmet-async";

const BecomeAPartner = () => {
  return (
    <>
      <Helmet>
        <title>Become a Partner | The Builder Network</title>
        <meta
          name="description"
          content="Join Builder Network as a partner and grow your business connecting with homeowners."
        />
      </Helmet>
      <div className="flex-1 container py-16 md:py-16">
        <h1 className="text-5xl font-bold mb-2">Become a partner</h1>
        <p className="text-muted-foreground mb-12">Updated on 09/01/2026</p>

        <p className="text-lg mb-12">
          Whether you are a large contractor or a retailer, partner with us to
          expand your business.
        </p>

        {/* For e-commerce section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">For e-commerce</h2>
          <h3 className="text-xl font-semibold mb-4">
            Enhance your customer experience with seamless service integration
          </h3>

          <p className="text-lg mb-6">
            Installation concerns can often hinder online sales.
          </p>

          <p className="text-lg mb-8">
            Help your customers hire trusted, professional installers for their
            purchases - at no cost to you or your customers.
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <span className="text-primary mr-3">✓</span>
              <span>
                Increase conversion rates by removing installation worries.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">✓</span>
              <span>Proven successful, example use case</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">✓</span>
              <span>
                Fulfilled by our extensive network of qualified, vetted, and
                reviewed professionals.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">✓</span>
              <span>Drive higher conversions and customer experience.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">✓</span>
              <span>Zero cost, simple implementation, no liabilities.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">✓</span>
              <span>High customer satisfaction (NPS score: 9.4/10).</span>
            </li>
          </ul>

          <p className="text-lg font-semibold mb-4">
            Interested in improving conversion and customer experience?
          </p>

          <Button asChild size="lg">
            <Link to="/about">Discover our solution</Link>
          </Button>
        </div>

        {/* For large contractors section */}
        <div>
          <h2 className="text-3xl font-bold mb-6">For large contractors</h2>
          <h3 className="text-xl font-semibold mb-4">
            Do you operate a multi-van trade business and want to expand?
          </h3>

          <p className="text-lg mb-8">
            We would love to help you get the most out of our platform and add
            real value for your business.
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <span className="text-primary mr-3">✓</span>
              <span>Access a steady stream of tailored leads.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">✓</span>
              <span>Take on the jobs you want, when you want them.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">✓</span>
              <span>
                Only pay when both you and the homeowner agree to connect.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">✓</span>
              <span>No subscription fees or fixed costs.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">✓</span>
              <span>Sign up for multiple services for free.</span>
            </li>
          </ul>

          <p className="text-lg font-semibold mb-4">
            Interested in growing your business with a reliable solution?
          </p>

          <Button asChild size="lg">
            <Link to="/tradesnetwork">Get started</Link>
          </Button>
        </div>
      </div>
      <TradespersonCTASection title="Join for free and start getting the work you want" />
    </>
  );
};

export default BecomeAPartner;
