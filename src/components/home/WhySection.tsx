import { ArrowRightCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

const WhySection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Why
            <span className="mx-2 underline underline-offset-4 decoration-primary decoration-8">
              The Builder Network
            </span>{" "}
            is the reliable way
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Big or small - post your home or garden job on The Builder Network
            and get matched with verified tradespeople who'll get it done.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-12 items-center">
          {/* Left side - Benefits */}
          <div className="space-y-12 col-span-3">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Get matched with available tradespeople
              </h3>
              <p className="text-muted-foreground">
                Post your job for free and receive responses from tradespeople
                eager to take it on.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Choose who you want to connect with
              </h3>
              <p className="text-muted-foreground">
                Read customer reviews, view tradespeople profiles, and browse
                pictures from previous jobs before deciding who to chat with —
                then make an informed decision on whom to hire.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Hire with confidence
              </h3>
              <p className="text-muted-foreground mb-3">
                All tradespeople on The Builder Network undergo checks at
                registration - such as ID documents, company details,
                certifications for regulated jobs and skill assessments -
                allowing you to hire with confidence.
              </p>
              <Link
                to="/quality-checks"
                className="text-highlight hover:underline inline-flex items-center gap-1"
              >
                <ArrowRightCircle className="h-5 w-5 mr-1" /> More info about
                our checks here
              </Link>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative col-span-2">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src="/images/why_section_img_1.png"
                alt="Tradespeople profiles on mobile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
