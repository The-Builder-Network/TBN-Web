import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Separator } from "@/components/ui/separator";
import { VerifiedIcon } from "lucide-react";
import CTASection from "@/components/home/CTASection";

const QualityChecks = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="py-6">
          <div className="container text-center">
            <img
              src="/images/logo-black.png"
              alt="The Builder Network"
              className="mx-auto mb-6 h-20"
            />
            <p className="text-xl md:text-2xl flex items-center justify-center gap-2 font-bold mb-4 text-green-600">
              Quality Checks <VerifiedIcon className="w-6 h-6" />
            </p>
          </div>
        </div>
        <Separator />
        {/* Intro Section */}
        <div className="container py-12">
          <div className=" text-center mb-16">
            <p className="text-md md:text-lg">
              All tradespeople on The Builder Network undergo checks at
              registration - such as ID documents, company details,
              certifications for regulated jobs and skill assessments - allowing
              you to hire with confidence.
            </p>
          </div>

          {/* Checks Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Our checks before tradespeople join The Builder Network
            </h2>

            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Check 1 */}
              <div className="border rounded-lg p-8 bg-card">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-xl font-bold mb-3">Company Verification</h3>
                <p className="text-muted-foreground">
                  For tradespeople operating under a company, we make sure every
                  tradesperson has a registered business.
                </p>
              </div>

              {/* Check 2 */}
              <div className="border rounded-lg p-8 bg-card">
                <div className="text-4xl mb-4">🪪</div>
                <h3 className="text-xl font-bold mb-3">ID verification</h3>
                <p className="text-muted-foreground">
                  When a tradesperson joins The Builder Network, we ask for a
                  valid ID — like a passport, ID card, or eIDAS certificate.
                </p>
              </div>

              {/* Check 3 */}
              <div className="border rounded-lg p-8 bg-card">
                <div className="text-4xl mb-4">🛠️</div>
                <h3 className="text-xl font-bold mb-3">Skills verification</h3>
                <p className="text-muted-foreground">
                  We ensure that tradespeople either have certifications for
                  regulated jobs or undergo an assessment of their expertise
                  through an online skills check.
                </p>
              </div>

              {/* Check 4 */}
              <div className="border rounded-lg p-8 bg-card">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="text-xl font-bold mb-3">
                  Staying up to standard
                </h3>
                <p className="text-muted-foreground">
                  We take prompt and effective action on issues identified
                  through our complaints process or monitoring activities. If
                  someone doesn't meet our standards, they are removed from The
                  Builder Network.
                </p>
              </div>
            </div>
          </div>
        </div>
        <CTASection title="Yes, they are screened and verified!" />
      </main>
      <Footer />
    </div>
  );
};

export default QualityChecks;
