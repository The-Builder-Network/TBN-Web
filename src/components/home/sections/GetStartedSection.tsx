import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Homepage closing CTA. The shared CTASection is used by other pages and left as-is. */
const GetStartedSection = () => {
  return (
    <section className="bg-background pb-16 md:pb-24">
      <div className="container">
        <div className="reveal relative isolate overflow-hidden rounded-2xl bg-foreground">
          <img
            src="/images/new-images/cta-builders.webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[75%_center]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-primary/90 to-primary/30 sm:via-primary/85 sm:to-transparent" />

          <div className="max-w-2xl px-6 py-12 sm:px-10 md:py-16 lg:px-16 lg:py-20">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
              Ready to start your next project?
            </h2>
            <p className="mt-4 text-primary-foreground/85 md:text-lg">
              Tell us what you need and connect with trusted local
              professionals today.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="xl"
                className="bg-background text-primary hover:bg-background/90"
              >
                <Link to="/post-job">
                  Get Started
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/services">Browse Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
